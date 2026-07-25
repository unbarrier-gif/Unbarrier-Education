import { NextResponse } from 'next/server';
import { z } from 'zod';
import { insertResponse } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import { scoreQuestions } from '@/lib/isp-audit/types';

export const runtime = 'nodejs';

const answerSchema = z.union([
  z.object({ type: z.literal('score'), value: z.enum(['low', 'medium', 'high']) }),
  z.object({ type: z.literal('text'), value: z.string().max(5000) }),
]);

const schema = z.object({
  school: z.string().trim().min(1).max(300),
  region: z.string().max(300).nullable(),
  answers: z.record(z.string(), answerSchema),
  honeypot: z.string().optional(),
});

const requiredIds = new Set(scoreQuestions(ispAuditQuestionSet).map((q) => q.id));
const knownIds = new Set(
  ispAuditQuestionSet.sections.flatMap((s) => s.questions.map((q) => q.id)),
);

export async function POST(req: Request) {
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

  // Honeypot trip — pretend success without writing anything.
  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true, id: '00000000-0000-0000-0000-000000000000' });
  }

  // Drop anything that isn't a known question id, and confirm every required
  // scored question is present — the client already enforces this, but the
  // API is the actual boundary.
  const answers = Object.fromEntries(
    Object.entries(parsed.data.answers).filter(([id]) => knownIds.has(id)),
  );
  const missingRequired = [...requiredIds].some((id) => !answers[id]);
  if (missingRequired) {
    return NextResponse.json({ ok: false, error: 'missing-required' }, { status: 400 });
  }

  const { id } = await insertResponse({
    school: parsed.data.school,
    region: parsed.data.region?.trim() || null,
    answers,
  });

  return NextResponse.json({ ok: true, id });
}
