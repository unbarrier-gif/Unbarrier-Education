import { NextResponse } from 'next/server';
import { z } from 'zod';
import { insertResponse } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import { allQuestions } from '@/lib/isp-audit/types';

export const runtime = 'nodejs';

const answersSchema = z.object({
  scores: z.record(z.string(), z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])),
  notes: z.record(z.string(), z.string().max(5000)),
  catalogue: z.array(z.string()).max(3),
});

const schema = z.object({
  school: z.string().trim().min(1).max(300),
  region: z.string().max(300).nullable(),
  respondentName: z.string().max(300).nullable(),
  respondentRole: z.string().max(300).nullable(),
  answers: answersSchema,
  honeypot: z.string().optional(),
});

const knownQuestionIds = new Set(allQuestions(ispAuditQuestionSet).map((q) => q.id));
const knownDomainIds = new Set(ispAuditQuestionSet.domains.map((d) => d.id));
const knownCatalogueOptions = new Set(ispAuditQuestionSet.catalogueOptions);

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

  // The client already enforces which ids/options are valid, but the API is
  // the actual boundary — drop anything that isn't a known question, domain,
  // or catalogue option.
  const scores = Object.fromEntries(
    Object.entries(parsed.data.answers.scores).filter(([id]) => knownQuestionIds.has(id)),
  );
  const notes = Object.fromEntries(
    Object.entries(parsed.data.answers.notes).filter(([id]) => knownDomainIds.has(id)),
  );
  const catalogue = parsed.data.answers.catalogue.filter((opt) => knownCatalogueOptions.has(opt)).slice(0, 3);

  const { id } = await insertResponse({
    school: parsed.data.school,
    region: parsed.data.region?.trim() || null,
    respondentName: parsed.data.respondentName?.trim() || null,
    respondentRole: parsed.data.respondentRole?.trim() || null,
    answers: { scores, notes, catalogue },
  });

  return NextResponse.json({ ok: true, id });
}
