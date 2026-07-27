import { NextResponse } from 'next/server';
import { z } from 'zod';
import { insertResponse } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import { allQuestions } from '@/lib/isp-audit/types';

export const runtime = 'nodejs';

const answersSchema = z.object({
  scores: z.record(z.string(), z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])),
  cantAnswer: z.array(z.string()),
  notes: z.record(z.string(), z.string().max(5000)),
  catalogue: z.array(z.string()).max(3),
  platform: z.string().max(300).nullable(),
});

const knownQuestionIds = new Set(allQuestions(ispAuditQuestionSet).map((q) => q.id));
const knownDomainIds = new Set(ispAuditQuestionSet.domains.map((d) => d.id));
const knownCatalogueOptions = new Set(ispAuditQuestionSet.catalogueOptions);
const knownPlatformOptions = new Set(ispAuditQuestionSet.platformOptions);

// Name/role are required; school/region are optional free text (with
// autocomplete suggestions, never restricted to a closed list — self-
// described region/school in the respondent's own words is useful data in
// itself, decisions log 25 July 2026).
const schema = z.object({
  school: z.string().trim().max(300),
  region: z.string().trim().max(300).nullable(),
  respondentName: z.string().trim().min(1).max(300),
  respondentRole: z.string().trim().min(1).max(300),
  // Email is now collected so we can send results and follow up (legitimate
  // interest — see /isp-audit/privacy). Required, and must look like an email.
  respondentEmail: z.string().trim().min(1).max(300).email(),
  answers: answersSchema,
  honeypot: z.string().optional(),
});

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
  const cantAnswer = parsed.data.answers.cantAnswer.filter((id) => knownQuestionIds.has(id));
  const notes = Object.fromEntries(
    Object.entries(parsed.data.answers.notes).filter(([id]) => knownDomainIds.has(id)),
  );
  const catalogue = parsed.data.answers.catalogue.filter((opt) => knownCatalogueOptions.has(opt)).slice(0, 3);
  const platform =
    parsed.data.answers.platform && knownPlatformOptions.has(parsed.data.answers.platform)
      ? parsed.data.answers.platform
      : null;

  // Same floor as the client: block an accidental empty submission, but
  // never require full completion — multiple people often split a
  // submission by domain.
  if (Object.keys(scores).length === 0) {
    return NextResponse.json({ ok: false, error: 'no-answers' }, { status: 400 });
  }

  const { id } = await insertResponse({
    school: parsed.data.school,
    region: parsed.data.region,
    respondentName: parsed.data.respondentName,
    respondentRole: parsed.data.respondentRole,
    respondentEmail: parsed.data.respondentEmail,
    answers: { scores, cantAnswer, notes, catalogue, platform },
  });

  return NextResponse.json({ ok: true, id });
}
