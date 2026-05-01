// Notion API client for the blog.
//
// Database lives in Notion; the site reads it via @notionhq/client v5
// (data-source API, default Notion-Version 2025-09-03). A database has
// one or more data sources — for our schema there's exactly one. We
// retrieve the database once per render to discover the data source id,
// then query it. React.cache() dedupes within a single render so calls
// from layout/metadata/page don't refetch.
//
// Required env vars (set both locally in .env.local and on Vercel for
// Preview + Production):
//   NOTION_TOKEN              — internal-integration secret
//   NOTION_BLOG_DATABASE_ID   — the blog database id (32 hex chars)
//
// Schema expected on the Notion database:
//   Title        (title)
//   Slug         (rich_text)
//   Shape        (select)            options match Shape in blog-shapes.ts
//   Excerpt      (rich_text)
//   Date         (date)
//   Reading min  (number)
//   Status       (select)            "Draft" | "Published"
//   Featured     (checkbox)
//   Cover        (files & media, optional)

import {
  Client,
  isFullBlock,
  isFullDatabase,
  isFullPage,
} from '@notionhq/client';
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client';
import { cache } from 'react';
import { isShape, type Shape } from './blog-shapes';

const TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;

const notion = TOKEN ? new Client({ auth: TOKEN }) : null;

export type Post = {
  id: string;
  slug: string;
  title: string;
  shape: Shape;
  excerpt: string;
  /** ISO date string (YYYY-MM-DD or full ISO). Format at render time. */
  date: string | null;
  readingMin: number | null;
  featured: boolean;
  coverUrl: string | null;
  /** Raw value of the Notion Status property — usually 'Draft' | 'Published'. */
  status: string;
};

/** A block plus any nested children we recursively fetched. */
export type BlockNode = BlockObjectResponse & {
  __children?: BlockNode[];
};

const getDataSourceId = cache(async (): Promise<string | null> => {
  if (!notion || !DATABASE_ID) return null;
  try {
    const db = await notion.databases.retrieve({ database_id: DATABASE_ID });
    if (!isFullDatabase(db)) return null;
    return db.data_sources[0]?.id ?? null;
  } catch (err) {
    console.error('[notion] retrieve database failed', err);
    return null;
  }
});

// Fetch every page in the data source, mapped to Post (no status
// filter at the API layer). Notion silently auto-uses its `status`
// property type for any field literally named "Status", which means
// our previous `select: { equals: 'Published' }` filter never matched
// and quietly returned zero rows. Filtering in code lets either
// `select` or `status` field types work without forcing the user to
// rebuild their schema.
const fetchAllPosts = cache(async (): Promise<Post[]> => {
  const dsId = await getDataSourceId();
  if (!notion || !dsId) return [];
  try {
    const res = await notion.dataSources.query({
      data_source_id: dsId,
      sorts: [{ property: 'Date', direction: 'descending' }],
      page_size: 100,
    });
    const posts: Post[] = [];
    let rejected = 0;
    const debugRows: unknown[] = [];
    for (const r of res.results) {
      if (!isFullPage(r)) {
        rejected++;
        continue;
      }
      // Diagnostic: dump the property-type signature of the first
      // returned row so we can see what Notion is actually giving us.
      if (debugRows.length === 0) {
        const props = r.properties as Record<string, { type?: string }>;
        debugRows.push(
          Object.fromEntries(
            Object.entries(props).map(([k, v]) => [k, v?.type ?? 'unknown']),
          ),
        );
      }
      const post = pageToPost(r);
      if (post) posts.push(post);
      else rejected++;
    }
    console.info('[notion] fetchAllPosts', {
      total: res.results.length,
      kept: posts.length,
      rejected,
      sampleStatuses: posts.slice(0, 3).map((p) => p.status),
      sampleSlugs: posts.slice(0, 3).map((p) => p.slug),
      firstRowPropertyTypes: debugRows[0],
    });
    return posts;
  } catch (err) {
    console.error('[notion] query data source failed', err);
    return [];
  }
});

export const getAllPublishedPosts = cache(async (): Promise<Post[]> => {
  const all = await fetchAllPosts();
  return all.filter((p) => p.status === 'Published');
});

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const all = await getAllPublishedPosts();
    return all.find((p) => p.slug === slug) ?? null;
  },
);

/**
 * Fetch a single post by slug ignoring its `Status`. Used only by
 * the draft-preview path on /blog/[slug] — gated behind
 * BLOG_PREVIEW_SECRET.
 */
export const getPostBySlugAnyStatus = cache(
  async (slug: string): Promise<Post | null> => {
    if (!slug) return null;
    const all = await fetchAllPosts();
    return all.find((p) => p.slug === slug) ?? null;
  },
);

export const getPostBlocks = cache(
  async (pageId: string): Promise<BlockNode[]> => {
    if (!notion) return [];
    try {
      return await collectBlockChildren(pageId);
    } catch (err) {
      console.error('[notion] fetch blocks failed', err);
      return [];
    }
  },
);

async function collectBlockChildren(blockId: string): Promise<BlockNode[]> {
  if (!notion) return [];
  const out: BlockNode[] = [];
  let cursor: string | undefined;
  while (true) {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    for (const b of res.results) {
      if (!isFullBlock(b)) continue;
      const node: BlockNode = b;
      if (b.has_children) {
        node.__children = await collectBlockChildren(b.id);
      }
      out.push(node);
    }
    if (!res.has_more) break;
    cursor = res.next_cursor ?? undefined;
  }
  return out;
}

function pageToPost(p: PageObjectResponse): Post | null {
  const props = p.properties;
  const title = pickPlainText(getTitle(props.Title));
  if (!title) return null;
  const slugRaw = pickPlainText(getRichText(props.Slug));
  const slug = slugRaw.trim() || slugify(title);
  if (!slug) return null;
  const shape = getSelectOrStatusName(props.Shape);
  if (!isShape(shape)) return null;
  return {
    id: p.id,
    slug,
    title,
    shape,
    excerpt: pickPlainText(getRichText(props.Excerpt)),
    date: getDateStart(props.Date),
    readingMin: getNumber(props['Reading min']),
    featured: getCheckbox(props.Featured),
    coverUrl: getCoverUrl(p),
    status: getSelectOrStatusName(props.Status) ?? '',
  };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[‘’“”']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Notion's PageObjectResponse['properties'] is a record whose values
// are huge property-type unions. The official narrowing path is verbose
// and not the source of truth (that's the Notion schema). These pickers
// stay defensive: if the schema name or type ever drifts, they return a
// sensible empty default rather than throwing in render. The `any` is
// scoped to this alias and used only inside the pickers below.
type AnyProp = any;

function getTitle(p: AnyProp): RichTextItemResponse[] {
  return p && p.type === 'title' ? p.title : [];
}
function getRichText(p: AnyProp): RichTextItemResponse[] {
  return p && p.type === 'rich_text' ? p.rich_text : [];
}
function getSelectName(p: AnyProp): string | null {
  return p && p.type === 'select' && p.select ? p.select.name : null;
}
// Notion auto-creates a Status-type property for any field literally
// named "Status", and similarly some users may pick Status type for
// Shape. Read the value regardless of which select-like type Notion
// settled on.
function getSelectOrStatusName(p: AnyProp): string | null {
  if (!p) return null;
  if (p.type === 'select' && p.select) return p.select.name;
  if (p.type === 'status' && p.status) return p.status.name;
  return null;
}
function getDateStart(p: AnyProp): string | null {
  return p && p.type === 'date' && p.date ? p.date.start : null;
}
function getNumber(p: AnyProp): number | null {
  return p && p.type === 'number' ? p.number : null;
}
function getCheckbox(p: AnyProp): boolean {
  return !!(p && p.type === 'checkbox' && p.checkbox);
}
function getCoverUrl(p: PageObjectResponse): string | null {
  if (!p.cover) return null;
  return p.cover.type === 'external' ? p.cover.external.url : p.cover.file.url;
}

export function pickPlainText(rt: RichTextItemResponse[]): string {
  return rt.map((r) => r.plain_text).join('');
}
