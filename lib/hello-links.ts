// Notion-backed cards for /hello.
//
// The page is the room link — the URL Nici says out loud from a stage.
// What's on it changes per event, so the cards live in a Notion database
// she can edit from her phone. No deploy, no admin screen.
//
// Required env vars (local .env.local + Vercel Preview and Production):
//   NOTION_TOKEN              — the existing internal-integration secret
//   NOTION_HELLO_DATABASE_ID  — the "hello links" database id (32 hex chars)
//
// The integration must be shared into the database in Notion, same as the
// blog one, or every query 404s.
//
// Schema expected on the Notion database:
//   Title    (title)
//   Meta     (rich_text)
//   URL      (url)          relative ("/goodnotes") or absolute
//   Group    (select)       "from today's session" | "the question sets" |
//                            "the one-pagers"
//                            legacy, still valid: "today" | "for schools" |
//                            "for you" | "read and talk"
//   Order    (number)       low first, within the group
//   Show     (checkbox)     unticked rows never render
//   Image    (url)          card thumbnail; empty falls back to a tinted tile
//   Accent   (select)       "green" | "aqua" | "orchid" | "yellow" | "orange" | "pink mist"
//   New tab  (checkbox)
//
// If the env vars are missing or Notion is unreachable, callers fall back to
// the hardcoded cards in app/hello/page.tsx — /hello must never render empty.

import { Client, isFullPage } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client';
import { cache } from 'react';

const TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_HELLO_DATABASE_ID;

const notion = TOKEN ? new Client({ auth: TOKEN }) : null;

// GROUPS ARE ADDITIVE. The approved /hello copy names three groups — from
// today's session, the question sets, the one-pagers. The live Notion database
// is already populated against the ORIGINAL four values, and renaming a select
// option in Notion does not retag the rows: it would empty the live page the
// moment this deployed.
//
// So the original four stay valid and keep rendering, and the three approved
// ones are added alongside. Nici retags rows at her own pace, or never, and
// nothing breaks either way. Display order is the order below.
//
// When every row has been retagged, delete the four legacy entries here and
// their headings below — and only then.
export const HELLO_GROUPS = [
  'today',
  "from today's session",
  'the question sets',
  'the one-pagers',
  'for schools',
  'for you',
  'read and talk',
] as const;

export type HelloGroup = (typeof HELLO_GROUPS)[number];

/** Group heading shown above each block. "today" is deliberately event-neutral. */
// Lowercase, per the site-wide copy rule. The old Title Case headings were
// from before that rule reached /hello.
export const GROUP_HEADING: Record<HelloGroup, string> = {
  today: 'from today’s session',
  "from today's session": 'from today’s session',
  'the question sets': 'the question sets',
  'the one-pagers': 'the one-pagers',
  'for schools': 'for schools',
  'for you': 'for you',
  'read and talk': 'read and talk',
};

const ACCENT_TOKEN: Record<string, string> = {
  green: 'var(--spring-green)',
  aqua: 'var(--pearl-aqua)',
  orchid: 'var(--orchid-mist)',
  yellow: 'var(--school-bus-yellow)',
  orange: 'var(--princeton-orange)',
  'pink mist': 'var(--pink-mist)',
};

const ACCENT_RGB: Record<string, string> = {
  green: '56, 255, 153',
  aqua: '105, 217, 209',
  orchid: '219, 125, 204',
  yellow: '255, 194, 3',
  orange: '255, 138, 28',
  'pink mist': '227, 161, 176',
};

export type HelloLink = {
  id: string;
  title: string;
  meta: string;
  href: string;
  group: HelloGroup;
  order: number;
  accent: string;
  accentRgb: string;
  external: boolean;
  /** Card thumbnail. Empty string means "render the tinted fallback tile". */
  image: string;
  /** First character of the title, shown on the fallback tile. */
  initial: string;
  /** Stable-ish key for the Plausible cta_click event. */
  slug: string;
};

function plainText(prop: unknown): string {
  const rich = (prop as { rich_text?: { plain_text: string }[] })?.rich_text;
  if (Array.isArray(rich))
    return rich
      .map((r) => r.plain_text)
      .join('')
      .trim();
  const title = (prop as { title?: { plain_text: string }[] })?.title;
  if (Array.isArray(title))
    return title
      .map((r) => r.plain_text)
      .join('')
      .trim();
  return '';
}

function selectName(prop: unknown): string {
  return (prop as { select?: { name?: string } })?.select?.name?.trim() ?? '';
}

function checkbox(prop: unknown): boolean {
  return (prop as { checkbox?: boolean })?.checkbox === true;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);
}

function isGroup(v: string): v is HelloGroup {
  return (HELLO_GROUPS as readonly string[]).includes(v);
}

function toLink(page: PageObjectResponse): HelloLink | null {
  const props = page.properties as Record<string, unknown>;

  const title = plainText(props.Title);
  const href = (props.URL as { url?: string | null })?.url?.trim() ?? '';
  const group = selectName(props.Group);

  // A card with no title, no destination, or no group can't be rendered.
  if (!title || !href || !isGroup(group)) return null;
  if (!checkbox(props.Show)) return null;

  const accentKey = selectName(props.Accent) || 'green';

  return {
    id: page.id,
    title,
    meta: plainText(props.Meta),
    href,
    group,
    order: (props.Order as { number?: number | null })?.number ?? 999,
    accent: ACCENT_TOKEN[accentKey] ?? ACCENT_TOKEN.green,
    accentRgb: ACCENT_RGB[accentKey] ?? ACCENT_RGB.green,
    external: checkbox(props['New tab']),
    image: (props.Image as { url?: string | null })?.url?.trim() ?? '',
    initial: title.trim().charAt(0).toUpperCase(),
    slug: slugify(title),
  };
}

/**
 * Every live card, grouped and ordered. Returns null — not an empty array —
 * when Notion isn't configured or the query fails, so the caller can tell
 * "not wired up" apart from "wired up, nothing ticked" and fall back.
 */
export const getHelloLinks = cache(async (): Promise<HelloLink[] | null> => {
  if (!notion || !DATABASE_ID) return null;

  try {
    const db = await notion.databases.retrieve({ database_id: DATABASE_ID });
    const dataSourceId = (db as { data_sources?: { id: string }[] })
      .data_sources?.[0]?.id;
    if (!dataSourceId) return null;

    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100,
    });

    const links = res.results
      .filter(isFullPage)
      .map(toLink)
      .filter((l): l is HelloLink => l !== null)
      .sort((a, b) => a.order - b.order);

    // Nothing ticked is a valid state, but it would render an empty page —
    // treat it as "fall back" rather than shipping a blank /hello.
    return links.length > 0 ? links : null;
  } catch {
    return null;
  }
});

/** The two group values that render as the "today" panel rather than cards. */
export const TODAY_GROUPS: readonly HelloGroup[] = [
  'today',
  "from today's session",
];

export function isTodayGroup(g: HelloGroup): boolean {
  return TODAY_GROUPS.includes(g);
}

/** Groups that actually have cards, in the fixed display order. */
export function groupLinks(
  links: HelloLink[],
): { group: HelloGroup; heading: string; links: HelloLink[] }[] {
  return HELLO_GROUPS.map((group) => ({
    group,
    heading: GROUP_HEADING[group],
    links: links.filter((l) => l.group === group),
  })).filter((g) => g.links.length > 0);
}
