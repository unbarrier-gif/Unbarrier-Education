// Renders an array of Notion blocks (with nested children attached as
// `__children` by lib/notion.ts) into branded React elements.
//
// Block coverage matches what real posts will use on day one:
// paragraph, heading_1/2/3, bulleted/numbered list (incl. nested),
// quote → <PullQuote>, callout, image, code, divider. Unsupported
// types are silently skipped — add cases here as posts demand them.

import type { ReactElement, ReactNode } from 'react';
import { Fragment } from 'react';
import Image from 'next/image';
import type { RichTextItemResponse } from '@notionhq/client';
import { PullQuote } from './PullQuote';
import type { BlockNode } from '@/lib/notion';
import styles from './NotionRenderer.module.css';

type Props = {
  blocks: BlockNode[];
};

// Render-time accent map: sub-brand names get coloured + bolded inline so
// the prose has rest points instead of reading as one high-contrast wall.
// Keyed on the literal brand string (matched case-insensitively, but the
// original casing is preserved in output). Longest-first so a longer token
// wins if two ever shared a prefix. Each token reuses an existing semantic
// colour token — no new design tokens. Bold is applied alongside colour so
// colour isn't the only signal (WCAG 1.4.1); all four pass AA on amethyst.
const BRANDS: { match: string; className: string }[] = [
  { match: 'unbarrier.access', className: styles.brandPremium },
  { match: 'unbarrier.audit', className: styles.brandQuiet },
  { match: 'unbarrier.voice', className: styles.brandHuman },
  { match: 'loop breakers', className: styles.brandPayoff },
].sort((a, b) => b.match.length - a.match.length);

function highlightBrands(text: string): ReactNode {
  if (!text) return text;
  const lower = text.toLowerCase();
  const out: ReactNode[] = [];
  let i = 0;
  let last = 0;
  let key = 0;
  while (i < text.length) {
    const hit = BRANDS.find((b) => lower.startsWith(b.match, i));
    if (hit) {
      if (i > last) out.push(text.slice(last, i));
      out.push(
        <strong key={`b${key++}`} className={hit.className}>
          {text.slice(i, i + hit.match.length)}
        </strong>,
      );
      i += hit.match.length;
      last = i;
    } else {
      i++;
    }
  }
  if (last < text.length) out.push(text.slice(last));
  if (out.length === 0) return text;
  if (out.length === 1 && typeof out[0] === 'string') return out[0];
  return out;
}

// The one genuinely long paragraph — the "60% in the middle" block — reads
// as a dense slab of five sentences. Split it into three shorter paragraphs
// at sentence boundaries. Keyed on a stable opening signature so it touches
// only this paragraph; if the Notion copy ever changes it degrades to the
// original single paragraph rather than mis-splitting. The block is fully
// plain text (no links/inline formatting), so splitting on plain_text is safe.
const SPLIT_SIGNATURE = 'These are the children who';

function splitLongParagraph(rt: RichTextItemResponse[]): string[] | null {
  const text = rt.map((r) => r.plain_text).join('');
  if (!text.startsWith(SPLIT_SIGNATURE)) return null;
  if (rt.some((r) => r.href)) return null;
  const sentences = text.split(/(?<=\.)\s+/);
  if (sentences.length < 5) return null;
  return [
    sentences.slice(0, 2).join(' '),
    sentences.slice(2, 3).join(' '),
    sentences.slice(3).join(' '),
  ];
}

export function NotionRenderer({ blocks }: Props) {
  // id is the narration scope target for <ListenButton />. Stable id
  // rather than the hashed CSS-module class. Do not rename.
  return (
    <article id="post-body" className={styles.article}>
      {renderBlocks(blocks)}
    </article>
  );
}

function renderBlocks(blocks: BlockNode[]): ReactElement[] {
  // Group consecutive list items so they render inside one <ul>/<ol>.
  // Notion returns each item as a sibling block — without grouping
  // we'd produce one list per item.
  const out: ReactElement[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.type === 'bulleted_list_item' || b.type === 'numbered_list_item') {
      const listType = b.type;
      const items: BlockNode[] = [];
      while (i < blocks.length && blocks[i].type === listType) {
        items.push(blocks[i]);
        i++;
      }
      const Tag = listType === 'bulleted_list_item' ? 'ul' : 'ol';
      out.push(
        <Tag key={items[0].id} className={styles.list}>
          {items.map((item) => {
            const richText =
              item.type === 'bulleted_list_item'
                ? item.bulleted_list_item.rich_text
                : item.type === 'numbered_list_item'
                ? item.numbered_list_item.rich_text
                : [];
            return (
              <li key={item.id} className={styles.listItem}>
                {renderRichText(richText)}
                {item.__children && item.__children.length > 0 && (
                  <div className={styles.nestedList}>
                    {renderBlocks(item.__children)}
                  </div>
                )}
              </li>
            );
          })}
        </Tag>,
      );
      continue;
    }
    const node = renderBlock(b);
    if (node) out.push(<Fragment key={b.id}>{node}</Fragment>);
    i++;
  }
  return out;
}

function renderBlock(b: BlockNode): ReactElement | null {
  switch (b.type) {
    case 'paragraph': {
      const rich = b.paragraph.rich_text;
      if (rich.length === 0) {
        return <div className={styles.spacer} aria-hidden="true" />;
      }
      const chunks = splitLongParagraph(rich);
      if (chunks) {
        return (
          <>
            {chunks.map((chunk, idx) => (
              <p key={idx} className={styles.paragraph}>
                {highlightBrands(chunk)}
              </p>
            ))}
          </>
        );
      }
      return <p className={styles.paragraph}>{renderRichText(rich)}</p>;
    }
    case 'heading_1':
      return (
        <h2 className={styles.h1}>{renderRichText(b.heading_1.rich_text)}</h2>
      );
    case 'heading_2':
      return (
        <h2 className={styles.h2}>{renderRichText(b.heading_2.rich_text)}</h2>
      );
    case 'heading_3':
      return (
        <h3 className={styles.h3}>{renderRichText(b.heading_3.rich_text)}</h3>
      );
    case 'quote':
      return <PullQuote>{renderRichText(b.quote.rich_text)}</PullQuote>;
    case 'callout':
      return (
        <aside className={styles.callout}>
          {renderRichText(b.callout.rich_text)}
        </aside>
      );
    case 'image': {
      const url =
        b.image.type === 'external' ? b.image.external.url : b.image.file.url;
      const alt = plain(b.image.caption);
      const captionNode =
        b.image.caption.length > 0 ? renderRichText(b.image.caption) : null;
      return (
        <figure className={styles.figure}>
          <Image
            src={url}
            alt={alt}
            width={0}
            height={0}
            sizes="(min-width: 760px) 760px, 100vw"
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
          {captionNode && (
            <figcaption className={styles.figcaption}>{captionNode}</figcaption>
          )}
        </figure>
      );
    }
    case 'divider':
      return <hr className={styles.divider} />;
    case 'code':
      return (
        <pre className={styles.code}>
          <code>{plain(b.code.rich_text)}</code>
        </pre>
      );
    default:
      // unsupported (table, columns, toggles, embeds, etc.)
      return null;
  }
}

function renderRichText(items: RichTextItemResponse[]): ReactElement[] {
  return items.map((item, idx) => {
    const ann = item.annotations;
    let node: ReactNode = highlightBrands(item.plain_text);
    if (ann.code) node = <code className={styles.inlineCode}>{node}</code>;
    if (ann.bold) node = <strong>{node}</strong>;
    if (ann.italic) node = <em>{node}</em>;
    if (ann.underline) node = <u>{node}</u>;
    if (ann.strikethrough) node = <s>{node}</s>;
    if (item.href) {
      const isExternal = /^https?:\/\//.test(item.href);
      node = (
        <a
          href={item.href}
          className={styles.link}
          {...(isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {node}
        </a>
      );
    }
    return <Fragment key={idx}>{node}</Fragment>;
  });
}

function plain(items: RichTextItemResponse[]): string {
  return items.map((i) => i.plain_text).join('');
}
