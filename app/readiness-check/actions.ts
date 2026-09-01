'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { CONSENT_WORDING, consentSource } from '@/lib/consent';
import { addSubscriber } from '@/lib/mailerlite';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { readinessQuestionSet } from '@/lib/readiness-check/questions';
import { recordAnonymousResult } from '@/lib/readiness-check/store';
import { sendReadinessCheckResult } from '@/lib/resend';
import type {
  RespondentRole,
  SettingType,
  SizeBand,
} from '@/lib/readiness-check/store';
import type { ScoreValue } from '@/lib/isp-audit/types';

// WHAT HAPPENS AFTER THE RESULT — three offers, none of them a gate.
//
// The result is already on screen before this action can be called. Nothing
// here can withhold it, and there is no code path in which a submission is
// required to see it. That is the test of whether the split is real: TICKING
// NONE OF THE THREE STILL GETS THEM THEIR RESULT.
//
// The three are genuinely separate purposes:
//   1. send me my result   → one email, address used and not retained
//   2. help build the picture → an anonymous row, no identifier at all
//   3. notice (the newsletter) → the only one that keeps an address
//
// Bundling any two of these would make neither consent valid. They are read
// independently below and share nothing but the form they arrived on.

export type FinishState =
  | { status: 'idle' }
  | { status: 'ok'; sent: boolean; contributed: boolean; subscribed: boolean }
  | { status: 'error'; message: string };

const scoreValue = z.union([
  z.literal(0), z.literal(1), z.literal(2),
  z.literal(3), z.literal(4), z.literal(5),
]);

const schema = z
  .object({
    scores: z.record(z.string(), scoreValue),
    email: z.string().email().optional().or(z.literal('')),
    sendResult: z.boolean(),
    research: z.boolean(),
    newsletter: z.boolean(),
    settingType: z.string().optional(),
    sizeBand: z.string().optional(),
    respondentRole: z.string().optional(),
    honeypot: z.string().max(0),
  })
  // An address is required only by the two options that need one. Someone who
  // ticks nothing, or only the research box, is never asked for one.
  .refine((v) => !(v.sendResult || v.newsletter) || !!v.email, {
    message: 'we need an email address to send that to.',
  })
  .refine(
    (v) => !v.research || (!!v.settingType && !!v.sizeBand && !!v.respondentRole),
    { message: 'tell us the setting type, size and your role so the row is usable.' },
  );

const FAILURE = 'we couldn’t do that just then. it’s us, not you.';

export async function finishAction(
  route: string,
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
    email: String(formData.get('email') ?? ''),
    sendResult: formData.get('sendResult') === 'yes',
    research: formData.get('research') === 'yes',
    newsletter: formData.get('newsletter') === 'yes',
    settingType: String(formData.get('settingType') ?? '') || undefined,
    sizeBand: String(formData.get('sizeBand') ?? '') || undefined,
    respondentRole: String(formData.get('respondentRole') ?? '') || undefined,
    honeypot: String(formData.get('website') ?? ''),
  });

  if (!parsed.success) {
    if (String(formData.get('website') ?? '').length > 0) {
      // Honeypot tripped. Fake success so bots learn nothing.
      return { status: 'ok', sent: false, contributed: false, subscribed: false };
    }
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? FAILURE,
    };
  }

  const v = parsed.data;

  // ── 2 · the anonymous row ────────────────────────────────────────────────
  // Deliberately first, and deliberately independent: it is the only one of
  // the three that works with no address at all, and a failure here must not
  // stop the other two.
  let contributed = false;
  if (v.research) {
    contributed = await recordAnonymousResult({
      settingType: v.settingType as SettingType,
      sizeBand: v.sizeBand as SizeBand,
      respondentRole: v.respondentRole as RespondentRole,
      scores: v.scores,
    });
  }

  // ── 1 · send me my result ────────────────────────────────────────────────
  // The address is used for this one send and is not written anywhere. If the
  // person also ticked notice, THAT is what keeps it — a different purpose,
  // with its own consent record.
  let sent = false;
  if (v.sendResult && v.email) {
    const res = await sendReadinessCheckResult(v.email, renderResultEmail(v.scores));
    sent = res.ok;
  }

  // ── 3 · notice ───────────────────────────────────────────────────────────
  let subscribed = false;
  if (v.newsletter && v.email) {
    try {
      // The IP is part of the consent RECORD — proof of when and where the
      // tick happened. It is not, and must never be, part of the anonymous
      // research row above.
      const res = await addSubscriber(v.email, {
        wording: CONSENT_WORDING,
        source: consentSource(route),
        ip,
      });
      subscribed = res.ok;
    } catch (err) {
      console.error('[readiness-check] subscribe failed', err);
    }
  }

  return { status: 'ok', sent, contributed, subscribed };
}

/**
 * The result, as plain text, rendered from the SAME scores the screen showed.
 * Deliberately dumb and deliberately here: if the email were rendered inside
 * the mail helper it could drift away from the on-screen result, and the whole
 * promise of "send this to me" is that it is the thing they just read.
 */
function renderResultEmail(scores: Record<string, ScoreValue>): string {
  const rows = readinessQuestionSet.domains.map((d) => {
    const answered = d.questions
      .map((q) => scores[q.id])
      .filter((v): v is ScoreValue => v !== undefined);
    if (answered.length === 0) return `${d.name}: not answered`;
    const mean =
      answered.reduce<number>((a, b) => a + b, 0) / answered.length;
    return `${d.name}: ${Math.round(mean * 20)} / 100`;
  });

  return [
    'your readiness check',
    '',
    'this is what you saw on screen. it is a five-minute snapshot from one',
    'person on one day, not a finding about your setting — that is what a',
    'discovery day is for. forward it to whoever holds the budget.',
    '',
    ...rows,
    '',
    'the seven questions, and what a discovery day adds to them:',
    'https://www.unbarrier.me/audit',
    '',
    'unbarrier education ltd (company no. 16603630)',
  ].join('\n');
}
