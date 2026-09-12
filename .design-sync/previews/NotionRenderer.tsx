import { NotionRenderer } from 'unbarrier-education';
import type { BlockNode } from '@/lib/notion';

// Minimal Notion block objects — only the fields the renderer reads:
// `type`, `id`, `<type>.rich_text[]` (plain_text, annotations, href),
// and `__children` for nested list items. Cast at the end because the
// real BlockObjectResponse carries dozens of fields nobody renders.

type Ann = Partial<{
  bold: boolean;
  italic: boolean;
  code: boolean;
  underline: boolean;
  strikethrough: boolean;
}>;

function rt(plain_text: string, ann: Ann = {}, href: string | null = null) {
  return {
    type: 'text',
    plain_text,
    href,
    annotations: {
      bold: false,
      italic: false,
      code: false,
      underline: false,
      strikethrough: false,
      color: 'default',
      ...ann,
    },
  };
}

let n = 0;
function block(type: string, rich: ReturnType<typeof rt>[], children?: unknown[]) {
  n += 1;
  return {
    object: 'block',
    id: `blk-${n}`,
    type,
    has_children: !!children,
    [type]: { rich_text: rich, color: 'default' },
    ...(children ? { __children: children } : {}),
  };
}

const article = [
  block('paragraph', [
    rt('the dashboard said green. every child in the class had logged in. the licence report went to the trust and the trust was pleased.'),
  ]),
  block('paragraph', [
    rt('then i sat next to a year 8 boy for twenty minutes and watched him not read a single word. the reader was on. the text was there. it was reaching the screen. it was not reaching '),
    rt('him', { italic: true }),
    rt('.'),
  ]),
  block('heading_2', [rt('what the number was measuring')]),
  block('paragraph', [
    rt('logins measure the door. they do not measure the room. when i run an '),
    rt('unbarrier.audit'),
    rt(' the first thing we do is put the licence report to one side and ask three questions instead:'),
  ]),
  block(
    'numbered_list_item',
    [rt('did the child know the tool was there?')],
  ),
  block('numbered_list_item', [rt('could the child turn it on without asking an adult?')]),
  block(
    'numbered_list_item',
    [rt('did anything change in what they '), rt('produced', { bold: true }), rt('?')],
    [
      block('bulleted_list_item', [rt('not what they clicked. what they made.')]),
      block('bulleted_list_item', [rt('a paragraph, a voice note, a drawing with a label on it.')]),
    ],
  ),
  block('quote', [
    rt('the app did not reach the child. it reached the spreadsheet.'),
  ]),
  block('heading_3', [rt('the bit that is my fault too')]),
  block('paragraph', [
    rt('i sold some of those licences. i said the words '),
    rt('"just switch it on"', { italic: true }),
    rt(' in a staffroom in 2019 and i meant them. i was wrong, and this is the post where i say so out loud. if you want the longer argument it is in '),
    rt('the receipts', {}, '/the-receipts.html'),
    rt('.'),
  ]),
  block('callout', [
    rt('if you take one thing: ', { bold: true }),
    rt('walk to the back of the room. sit next to one child. watch for ten minutes. that is the audit.'),
  ]),
  block('divider', []),
  block('bulleted_list_item', [rt('written as a voice note on the drive home')]),
  block('bulleted_list_item', [
    rt('typed up with '),
    rt('unbarrier.voice'),
    rt(', reread four times, still probably a typo in it'),
  ]),
  block('paragraph', []),
  block('paragraph', [
    rt('if this hit a nerve, send it to one person.'),
  ]),
] as unknown as BlockNode[];

const closing = [
  block('quote', [rt('the app did not reach the child. it reached the spreadsheet.')]),
  block('callout', [
    rt('if you take one thing: ', { bold: true }),
    rt('walk to the back of the room. sit next to one child. watch for ten minutes. that is the audit.'),
  ]),
  block('paragraph', [
    rt('the longer argument, with sources, is in '),
    rt('the receipts', {}, '/the-receipts.html'),
    rt('. the tool i actually use to type these is '),
    rt('unbarrier.voice'),
    rt(', and yes, there is '),
    rt('still', { italic: true }),
    rt(' probably a typo in it.'),
  ]),
  block('divider', []),
  block('bulleted_list_item', [rt('written as a voice note on the drive home')]),
  block('bulleted_list_item', [rt('reread four times before it went up')]),
] as unknown as BlockNode[];

/** The blocks the height cap hides on the full article: a Notion quote (rendered as PullQuote), a callout, a link and brand accent inline, a divider, a bulleted list. */
export const QuoteAndCallout = () => (
  <div style={{ maxWidth: 820 }}>
    <NotionRenderer blocks={closing} />
  </div>
);

/** A short out-loud post as the slug page renders it: paragraphs, headings, both list kinds (one nested), a quote, a callout, a divider, a link and the brand accents. */
export const Article = () => (
  <div style={{ maxWidth: 820 }}>
    <NotionRenderer blocks={article} />
  </div>
);
