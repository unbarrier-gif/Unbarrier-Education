// Renders an array of Notion blocks (with nested children attached as
// `__children` by lib/notion.ts) into branded React elements.
//
// Block coverage matches what real posts will use on day one:
// paragraph, heading_1/2/3, bulleted/numbered list (incl. nested),
// quote → <PullQuote>, callout, image, code, divider. Unsupported
// types are silently skipped — add cases here as posts demand them.

import type { ReactElement, ReactNode } from 'react';
import { Fragment } from 'react';
import type { RichTextItemResponse } from '@notionhq/client';
import { PullQuote } from './PullQuote';
import type { BlockNode } from '@/lib/notion';
import styles from './NotionRenderer.module.css';

type Props = {
  blocks: BlockNode[];
};

export function NotionRenderer({ blocks }: Props) {
  return <article className={styles.article}>{renderBlocks(blocks)}</article>;
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
    case 'paragraph':
      if (b.paragraph.rich_text.length === 0) {
        return <div className={styles.spacer} aria-hidden="true" />;
      }
      return (
        <p className={styles.paragraph}>
          {renderRichText(b.paragraph.rich_text)}
        </p>
      );
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={alt} loading="lazy" />
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
    let node: ReactNode = item.plain_text;
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
