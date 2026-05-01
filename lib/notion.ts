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

export const getAllPublishedPosts = cache(async (): Promise<Post[]> => {
  const dsId = await getDataSourceId();
  if (!notion || !dsId) return [];
  try {
    const res = await notion.dataSources.query({
      data_source_id: dsId,
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ property: 'Date', direction: 'descending' }],
      page_size: 100,
    });
    const posts: Post[] = [];
    for (const r of res.results) {
      if (!isFullPage(r)) continue;
      const post = pageToPost(r);
      if (post) posts.push(post);
    }
    return posts;
  } catch (err) {
    console.error('[notion] query data source failed', err);
    return [];
  }
});

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const all = await getAllPublishedPosts();
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
  const shape = getSelectName(props.Shape);
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
// sensible empty default rather than throwing in render.
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
