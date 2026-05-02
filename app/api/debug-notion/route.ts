// Temporary diagnostic route — fetches the blog database and returns
// a snapshot of property shapes + counts as JSON. Lets us inspect what
// Notion is actually returning when console.warn output is being
// filtered by Vercel. DELETE THIS FILE once the field-mapping is fixed.

import { NextResponse } from 'next/server';
import {
  Client,
  isFullDatabase,
  isFullPage,
} from '@notionhq/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token || token !== process.env.BLOG_PREVIEW_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;
  if (!NOTION_TOKEN || !DATABASE_ID) {
    return NextResponse.json(
      {
        error: 'env vars missing',
        hasToken: !!NOTION_TOKEN,
        hasDatabaseId: !!DATABASE_ID,
      },
      { status: 500 },
    );
  }

  const notion = new Client({ auth: NOTION_TOKEN });

  try {
    const db = await notion.databases.retrieve({ database_id: DATABASE_ID });
    if (!isFullDatabase(db)) {
      return NextResponse.json(
        { error: 'partial database response' },
        { status: 500 },
      );
    }
    const dsId = db.data_sources[0]?.id;
    if (!dsId) {
      return NextResponse.json(
        { error: 'no data source on database', dataSources: db.data_sources },
        { status: 500 },
      );
    }

    const res = await notion.dataSources.query({
      data_source_id: dsId,
      page_size: 5,
    });

    const rowSnapshots = res.results.map((r) => {
      if (!isFullPage(r)) return { isFullPage: false, id: 'partial' };
      const props = r.properties as Record<string, unknown>;
      const shape: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        // Strip volatile/large fields, keep type and any name/value.
        const obj = v as { type?: string; [key: string]: unknown };
        const type = obj?.type;
        const inner = type ? obj[type] : undefined;
        shape[k] = { type, value: inner };
      }
      return { id: r.id, shape };
    });

    return NextResponse.json({
      databaseId: DATABASE_ID,
      dataSourceId: dsId,
      total: res.results.length,
      hasMore: res.has_more,
      rows: rowSnapshots,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: 'query failed',
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      },
      { status: 500 },
    );
  }
}
