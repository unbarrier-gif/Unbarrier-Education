import {
  GROUP_HEADING,
  type HelloGroup,
  type HelloLink,
} from '@/lib/hello-links';

// THE COMMITTED FALLBACK FOR /hello.
//
// This renders whenever Notion cannot answer: no NOTION_TOKEN, no
// NOTION_HELLO_DATABASE_ID, a network error, an API error, a rate limit, or a
// database where nothing is ticked Show. getHelloLinks() collapses all of
// those to null and the page uses this instead.
//
// It is in the repo, not fetched, on purpose. /hello is the page a room opens
// off a QR code on conference wifi while Nici is still on the platform. An
// error page, an empty page, or a spinner that never resolves are all worse
// than slightly stale links. Stale beats absent.
//
// It also means /hello is shippable BEFORE the Notion database exists — this
// is what renders until it is created and filled.
//
// TWO RULES FOR ANYTHING ADDED HERE:
//
//  1. EVERY DESTINATION MUST WORK WITH NOTION DOWN. That is the only day this
//     file renders. Every href below is either a static file in /public or an
//     app route with no Notion dependency. NOT the blog — /blog/* is
//     Notion-driven, so a blog link in this list would 404 on exactly the day
//     the fallback exists to cover.
//  2. EVERY DESTINATION MUST RESOLVE. If one is retired, fix it here as well
//     as in Notion. This is the version that shows on the worst day.
//
// Contents are the approved /hello copy (28 Aug 2026), which names two lists:
// the question sets, and the one-pagers. There is deliberately no "from
// today's session" group — that block is per-event and a stale one would be
// worse than none, so it renders only when Notion is actually answering.

type FallbackGroup = {
  group: HelloGroup;
  heading: string;
  links: HelloLink[];
};

let seq = 0;

function card(
  group: HelloGroup,
  title: string,
  meta: string,
  href: string,
  accent: string,
  accentRgb: string,
  external: boolean,
): HelloLink {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return {
    id: `fallback-${(seq += 1)}`,
    title,
    meta,
    href,
    group,
    order: seq,
    accent,
    accentRgb,
    external,
    image: '',
    initial: title.trim().charAt(0).toUpperCase(),
    slug,
  };
}

export const HELLO_FALLBACK_GROUPS: FallbackGroup[] = [
  {
    group: 'the question sets',
    heading: GROUP_HEADING['the question sets'],
    links: [
      // ⚠️ "the seven questions" and "the takeaway" point at the same file.
      // There is no separate seven-questions page in the repo — the takeaway
      // one-pager IS the seven questions on one page. The approved copy lists
      // them as two items, so both are here under the labels it uses. Flagged
      // for Nici: either the seven questions needs its own page, or the two
      // labels should be merged.
      card(
        'the question sets',
        'the seven questions',
        'the talk, on one page. pick one. ask it monday.',
        '/the-takeaway.html',
        'var(--spring-green)',
        '56, 255, 153',
        true,
      ),
      card(
        'the question sets',
        'the belonging check',
        'a prompt to build a 5-minute form for your people. does your setting have a belonging problem?',
        '/belonging-check',
        'var(--orchid-mist)',
        '219, 125, 204',
        false,
      ),
    ],
  },
  {
    group: 'the one-pagers',
    heading: GROUP_HEADING['the one-pagers'],
    links: [
      card(
        'the one-pagers',
        'the receipts',
        'six numbers under the talk. the belonging fact sheet.',
        '/the-receipts.html',
        'var(--pearl-aqua)',
        '105, 217, 209',
        true,
      ),
      card(
        'the one-pagers',
        'the takeaway',
        'the one page to put in front of your leadership team.',
        '/the-takeaway.html',
        'var(--princeton-orange)',
        '255, 138, 28',
        true,
      ),
      card(
        'the one-pagers',
        'the one-thing template',
        'the one thing worth trying on monday, and somewhere to write it down.',
        '/one-thing-template.html',
        'var(--school-bus-yellow)',
        '255, 194, 3',
        true,
      ),
      card(
        'the one-pagers',
        'why your hands move',
        'what fidgeting is actually telling you.',
        '/why-your-hands-move.html',
        'var(--pink-mist)',
        '227, 161, 176',
        true,
      ),
    ],
  },
];
