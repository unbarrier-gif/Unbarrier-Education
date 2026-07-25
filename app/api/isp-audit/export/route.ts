import { NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/isp-audit/adminAuth';
import { getAllResponses } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import { buildResponsesCsv } from '@/lib/isp-audit/csv';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const responses = await getAllResponses();
  const csv = buildResponsesCsv(ispAuditQuestionSet, responses);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="isp-audit-responses-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
