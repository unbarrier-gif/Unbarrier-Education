'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { recordAnonymousResult } from '@/lib/readiness-check/store';
import type {
  RespondentRole,
  SettingType,
  SizeBand,
} from '@/lib/readiness-check/store';
import type { ScoreValue } from '@/lib/isp-audit/types';

// WHAT HAPPENS AFTER THE RESULT — one offer, and it is not a gate.
//
// The result is already on screen before this action can be called. Nothing
// here can withhold it, and there is no code path in which a submission is
// required to see it. That is the test of whether the split is real: TICKING
// NOTHING STILL GETS THEM THEIR RESULT.
//
// The one thing left to offer is the anonymous row — help build the picture.
// No address is collected on this route any more.
//
// REMOVED 10 SEP 2026, PENDING A REBUILD: "send this to me" and the notice
// opt-in, and with them the email field. The opt-in showed one consent
// wording on screen and wrote a different string (CONSENT_WORDING) to
// MailerLite, so the stored record was not what the person read. Removed,
// not hidden; it is rebuilt properly on a later branch. The newsletter has its
// own page at /notice. Do not reintroduce an email field here without that
// rebuild.

export type FinishState =
  | { status: 'idle' }
  | { status: 'ok'; contributed: boolean }
  | { status: 'error'; message: string };

const scoreValue = z.union([
  z.literal(0), z.literal(1), z.literal(2),
  z.literal(3), z.literal(4), z.literal(5),
]);

const schema = z
  .object({
    scores: z.record(z.string(), scoreValue),
    research: z.boolean(),
    settingType: z.string().optional(),
    sizeBand: z.string().optional(),
    respondentRole: z.string().optional(),
    honeypot: z.string().max(0),
  })
  .refine(
    (v) => !v.research || (!!v.settingType && !!v.sizeBand && !!v.respondentRole),
    { message: 'tell us the setting type, size and your role so the row is usable.' },
  );

const FAILURE = 'we couldn’t do that just then. it’s us, not you.';

export async function finishAction(
  _route: string,
  _prev: FinishState,
  formData: FormData,
): Promise<FinishState> {
  // The IP is used for rate limiting and is never stored anywhere, least of
  // all on a research row.
  const ip = clientIp(headers());
  if (!rateLimit(ip).ok) {
    return { status: 'error', message: 'that’s a few too many tries. give it an hour.' };
  }

  let scores: Record<string, ScoreValue>;
  try {
    scores = JSON.parse(String(formData.get('scores') ?? '{}'));
  } catch {
    return { status: 'error', message: FAILURE };
  }

  const parsed = schema.safeParse({
    scores,
    research: formData.get('research') === 'yes',
    settingType: String(formData.get('settingType') ?? '') || undefined,
    sizeBand: String(formData.get('sizeBand') ?? '') || undefined,
    respondentRole: String(formData.get('respondentRole') ?? '') || undefined,
    honeypot: String(formData.get('website') ?? ''),
  });

  if (!parsed.success) {
    if (String(formData.get('website') ?? '').length > 0) {
      // Honeypot tripped. Fake success so bots learn nothing.
      return { status: 'ok', contributed: false };
    }
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? FAILURE,
    };
  }

  const v = parsed.data;

  // ── the anonymous row ────────────────────────────────────────────────────
  // The only thing this action does now. It works with no address at all: a
  // row is the nine answers, the setting type, the size band, the role and
  // the date, and nothing that could be traced back to a person.
  let contributed = false;
  if (v.research) {
    contributed = await recordAnonymousResult({
      settingType: v.settingType as SettingType,
      sizeBand: v.sizeBand as SizeBand,
      respondentRole: v.respondentRole as RespondentRole,
      scores: v.scores,
    });
  }

  return { status: 'ok', contributed };
}
