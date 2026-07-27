import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isAdminAuthed } from '@/lib/isp-audit/adminAuth';
import { deleteResponse } from '@/lib/isp-audit/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({ id: z.string().uuid() });

// Admin-only: remove a single response (e.g. to clear test data). Gated by the
// same session check as the dashboard and CSV export.
export async function POST(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const deleted = await deleteResponse(parsed.data.id);
  if (!deleted) {
    return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
