// The readiness-check RESULT — the read that replaced the engine's default
// screen on 13 Sep 2026 (PLAN - readiness check.md). Pure functions, no
// React, no database, so the copy-as-text output and the on-screen read come
// from one place and cannot drift.
//
// SCORING IS THE ENGINE'S, 1:1. mean × 20 per dimension; bands at the same
// 65 / 50 cut-offs as lib/isp-audit/summary scoreBand, renamed to learner
// language. Skipped questions are left out, never counted as nought. "i don't
// know" is scored as unanswered and REPORTED separately, as a finding.
//
// NO OVERALL SCORE. NO RADAR. NO NUMBERS SHOWN. The band word only.

import type { ScoreValue } from '@/lib/isp-audit/types';
import { readinessQuestionSet, type ReadinessDomain } from './questions';

/** The seventh option on every question. Scored as unanswered. */
export const DONT_KNOW = 'dk' as const;
export type Answer = ScoreValue | typeof DONT_KNOW;
export type Answers = Record<string, Answer>;

/** 0 reaching · 1 patchy · 2 not reaching (the engine's high · medium · low). */
export type BandIndex = 0 | 1 | 2;

export const BAND_WORDS: Record<'learner' | 'engine', readonly [string, string, string]> = {
  learner: ['reaching', 'patchy', 'not reaching'],
  engine: ['high', 'medium', 'low'],
};

export type DimensionRead = {
  id: string;
  name: string;
  /** mean × 20, 0–100. Internal only: never rendered. */
  score: number;
  answered: number;
  dontKnow: number;
  /** null when nothing in the dimension was rated. */
  band: BandIndex | null;
};

export type Result = {
  per: DimensionRead[];
  /** Lowest-scoring rated dimension: "start here". */
  weakest: DimensionRead | null;
  /** Highest-scoring rated dimension, when it differs from the weakest. */
  strongest: DimensionRead | null;
  /** Dimensions where every answer was "i don't know". A finding, not a gap. */
  unknown: DimensionRead[];
};

/** Same thresholds as the engine's scoreBand, renamed. */
export function bandFor(score: number): BandIndex {
  if (score >= 65) return 0;
  if (score >= 50) return 1;
  return 2;
}

function readDimension(d: ReadinessDomain, answers: Answers): DimensionRead {
  let sum = 0;
  let n = 0;
  let dk = 0;
  for (const q of d.questions) {
    const v = answers[q.id];
    if (v === DONT_KNOW) dk += 1;
    else if (v !== undefined) {
      sum += v;
      n += 1;
    }
  }
  const score = n ? Math.round((sum / n) * 20) : 0;
  return {
    id: d.id,
    name: d.name,
    score,
    answered: n,
    dontKnow: dk,
    band: n ? bandFor(score) : null,
  };
}

export function computeResult(answers: Answers): Result {
  const per = readinessQuestionSet.domains.map((d) => readDimension(d, answers));
  const rated = per.filter((d) => d.answered > 0);
  const weakest = rated.length
    ? [...rated].sort((a, b) => a.score - b.score)[0]
    : null;
  const strongestCandidate =
    rated.length > 1 ? [...rated].sort((a, b) => b.score - a.score)[0] : null;
  const strongest =
    strongestCandidate && weakest && strongestCandidate.id !== weakest.id
      ? strongestCandidate
      : null;
  const unknown = per.filter((d) => d.answered === 0 && d.dontKnow > 0);
  return { per, weakest, strongest, unknown };
}

/** The scores the sector layer stores: rated answers only, 0–5. */
export function ratedScores(answers: Answers): Record<string, ScoreValue> {
  const out: Record<string, ScoreValue> = {};
  for (const [id, v] of Object.entries(answers)) {
    if (v !== DONT_KNOW) out[id] = v;
  }
  return out;
}

// The "start here" reads — one per dimension. New copy, 13 Sep 2026, written
// to name the gap, never the neglect. Nici's read is pending; edit here only.
export const START: Record<string, { lead: string; sentence: string }> = {
  provision: {
    lead: 'the thing that was bought is not reliably in the room when the lesson starts.',
    sentence:
      'before anything else is bought, find out where it is at nine o’clock: charged, working, and with the learner it was bought for.',
  },
  access: {
    lead: 'learners are not yet getting into their tools without an adult beside them.',
    sentence:
      'the support features exist. the work is switching them on for the learners who need them, and teaching each learner to open their own door.',
  },
  design: {
    lead: 'materials are built one way and adjusted afterwards.',
    sentence:
      'the lever is upstream: more than one way in, built before anyone has to ask. it is the only lever left where the law cannot reach.',
  },
  capability: {
    lead: 'it works when one person is in the building.',
    sentence:
      'the next step is making it hold across teachers, subjects and rooms on an ordinary tuesday, with the champion away.',
  },
  belonging: {
    lead: 'learners are present but not yet choosing to take part.',
    sentence:
      'access without belonging is attendance. the work is what happens when something goes wrong, and whether the learner gets back in.',
  },
  trust: {
    lead: 'learners, families or staff do not yet believe it will work when it matters.',
    sentence:
      'a tool that fails twice in front of a class is not opened again. trust is rebuilt in small, kept promises, not in another rollout.',
  },
  evidence: {
    lead: 'what changed cannot yet be shown without the word “engagement”.',
    sentence:
      'agree now what you will measure and how, so that next year you can say whether it moved.',
  },
};

/** The word shown for a dimension, or the reason there isn't one. */
export function bandWord(d: DimensionRead, words: readonly [string, string, string]): string {
  if (d.band === null) return d.dontKnow ? 'couldn’t say' : 'not answered';
  return words[d.band];
}

/** "a, b and c" */
export function listNames(ds: DimensionRead[]): string {
  return ds
    .map((d) => d.name)
    .join(', ')
    .replace(/, ([^,]*)$/, ' and $1');
}

export const ONE_SEAT_WIDE =
  'one person has answered. the learner, the ta, the teacher, the it lead and the person who signed the order have not. the picture is one seat wide until they do.';

/**
 * The result as plain sentences — the forward-upwards path while the email
 * step is off. No numbers. Paste it into an email to whoever holds the budget.
 */
export function plainText(
  answers: Answers,
  words: readonly [string, string, string],
): string {
  const { per, weakest, unknown } = computeResult(answers);
  const lines: string[] = [
    'the readiness check — unbarrier.me/readiness-check',
    'one person’s read on one day. not a finding about the school.',
    '',
  ];
  for (const d of per) lines.push(`${d.name}: ${bandWord(d, words)}`);
  if (weakest) {
    const s = START[weakest.id];
    lines.push('', `start here: ${weakest.name}. ${s.lead} ${s.sentence}`);
  }
  if (unknown.length) {
    lines.push(
      '',
      `couldn’t say for ${unknown.map((d) => d.name).join(', ')}. that is a finding: nobody in the room can currently tell whether it is in place.`,
    );
  }
  lines.push(
    '',
    'one person has answered. the learner, the ta, the teacher, the it lead and the person who signed the order have not.',
  );
  return lines.join('\n');
}
