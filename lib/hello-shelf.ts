// The standing shelf on /hello — every free resource, with its status.
//
// The public page shows only the LIVE ones (13 Sep 2026: three). The held
// ones stay in this list so the signed-in shelf can show their status pill and
// so switching one on is a one-word change here, not a rebuild. Card copy for
// a live resource = its title + the existing page's own first line. Nothing
// new is written for a card.
//
// Source of truth for the today block is the Notion "hello links" table
// (lib/hello-links.ts); this file is the shelf beneath it.

import { SITE_FLAGS } from './site-flags';

export type ShelfStatus =
  | 'live'
  | 'live · revamp pending'
  | 'held for blog'
  | 'live · url to confirm';

export type ShelfItem = {
  /** Plausible card key and the CtaCard colour key. */
  card: string;
  title: string;
  meta: string;
  href: string;
  /** Reading time, in minutes, shown as a pill under the card. */
  minutes: number;
  /** "ask" = a question set; "read" = a one-pager. */
  shelf: 'ask' | 'read';
  status: ShelfStatus;
  /** Rendered on the public page only when true. */
  live: boolean;
  accent?: string;
  accentRgb?: string;
  initial?: string;
};

export const HELLO_SHELF: ShelfItem[] = [
  {
    card: 'seven_questions',
    title: 'the takeaway — the seven questions',
    meta: 'the talk, on one page. seven questions to take back to your school. pick one. ask it monday.',
    href: 'https://www.unbarrier.me/the-takeaway.html',
    minutes: 2,
    shelf: 'ask',
    status: 'live',
    live: true,
  },
  {
    card: 'belonging_check',
    title: 'the belonging check',
    meta: 'a prompt that builds a five-minute form for your people. does your setting have a belonging problem?',
    href: 'https://www.unbarrier.me/belonging-check',
    minutes: 5,
    shelf: 'ask',
    status: 'live',
    live: true,
  },
  {
    card: 'receipts',
    title: 'the receipts',
    meta: 'six numbers under the talk, each with its source and year.',
    href: 'https://www.unbarrier.me/the-receipts.html',
    minutes: 3,
    shelf: 'read',
    status: 'live',
    live: true,
  },
  // OPEN — held until the revamp lands. Not shown.
  {
    card: 'one_thing_template',
    title: 'the one-thing template',
    meta: 'one page for busy brains: what matters for your next step, and the one thing to do about it.',
    href: 'https://www.unbarrier.me/one-thing-template.html',
    minutes: 10,
    shelf: 'read',
    status: 'live · revamp pending',
    live: false,
    accent: 'var(--school-bus-yellow)',
    accentRgb: '255, 194, 3',
  },
  // Held for the blog. SITE_FLAGS.handsMoveOnHello puts it on the shelf.
  {
    card: 'why_your_hands_move',
    title: 'why your hands move',
    meta: 'a read, not a tool: what the body does before the words arrive, and why it matters for access.',
    href: 'https://www.unbarrier.me/why-your-hands-move.html',
    minutes: 6,
    shelf: 'read',
    status: SITE_FLAGS.handsMoveOnHello ? 'live' : 'held for blog',
    live: SITE_FLAGS.handsMoveOnHello,
    accent: 'var(--orchid-mist)',
    accentRgb: '219, 125, 204',
  },
  // OPEN — the url is not confirmed. Not shown.
  {
    card: 'neurodiversity_conversation',
    title: 'the neurodiversity conversation, without the scaremongering',
    meta: 'the headlines, answered in plain english. every figure with its source and year. a living page.',
    href: 'https://www.unbarrier.me/neurodiversity-conversation.html',
    minutes: 25,
    shelf: 'read',
    status: 'live · url to confirm',
    live: false,
    accent: 'var(--pearl-aqua)',
    accentRgb: '105, 217, 209',
    initial: 'n',
  },
];

export const LIVE_SHELF = HELLO_SHELF.filter((item) => item.live);

const WORDS = ['one', 'two', 'three', 'four', 'five', 'six'];

/** "three to read." — counts what is actually live, so it is never wrong. */
export function countHeading(n: number, verb: string): string {
  return `${WORDS[n - 1] ?? String(n)} to ${verb}.`;
}
