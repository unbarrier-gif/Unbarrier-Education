import type { ScoreValue } from '@/lib/isp-audit/types';

// THE READINESS CHECK — the public config of the audit engine.
//
// Built on the seven questions (rewritten 1 Sep 2026, approved page drafts):
// provision · access · design · capability · belonging · trust · evidence.
// The plan says "the seven questions, eight to ten of them", so this is nine:
// one statement each, plus a second on ACCESS and a second on EVIDENCE.
//   7 + 1 + 1 = 9
// Those two carry the most weight in the approved /audit copy — "where access
// is reaching learners, and where it isn't", and "if it cannot be shown, it
// cannot be funded, defended, or done again" — and neither fits in one line.
//
// COPY RULES THIS FILE IS WRITTEN TO:
//  - "learners", never students or pupils. The two approved exceptions to that
//    rule ("did it reach the child?" and unbarrier.voice's founding line) are
//    named, and this is not one of them. The seven DEFINITIONS on /access are
//    Nici's own words and say "the child" — they are deliberately not restated
//    here rather than quietly reworded.
//  - Never imply a school has been careless. Every statement below describes a
//    state of affairs, not a failure of anybody's. Name the gap, never the
//    neglect.
//  - Lowercase. Website channel.

export const READINESS_QUESTION_SET_ID = 'readiness-check-v1';

/** Bumped when a prompt's MEANING changes, never for a typo. Written to every
 *  stored row so a wording revision cannot quietly make old rows
 *  incomparable — the thing that ruins a longitudinal dataset. */
export const READINESS_SCHEMA_VERSION = 1;

export type ReadinessQuestionId =
  | 'provision-0'
  | 'access-0'
  | 'access-1'
  | 'design-0'
  | 'capability-0'
  | 'belonging-0'
  | 'trust-0'
  | 'evidence-0'
  | 'evidence-1';

export type ReadinessQuestion = { id: ReadinessQuestionId; prompt: string };
export type ReadinessDomain = {
  id: string;
  name: string;
  questions: ReadinessQuestion[];
};
export type ReadinessQuestionSet = {
  id: string;
  title: string;
  estimatedMinutes: number;
  domains: ReadinessDomain[];
};

// Typed rather than `as const`: `as const` narrows each domain's questions to
// its own tuple, and a flatMap across seven different tuple types has no
// common element type to land on.
export const readinessQuestionSet: ReadinessQuestionSet = {
  id: READINESS_QUESTION_SET_ID,
  title: 'the readiness check',
  estimatedMinutes: 5,
  domains: [
    {
      id: 'provision',
      name: 'provision',
      questions: [
        {
          id: 'provision-0',
          prompt:
            'the tools a learner needs are in the room, charged and working when the lesson starts.',
        },
      ],
    },
    {
      id: 'access',
      name: 'access',
      questions: [
        {
          id: 'access-0',
          prompt:
            'a learner can get into their tools on their own, without an adult beside them.',
        },
        {
          id: 'access-1',
          prompt:
            'the support features are switched on and set up for the learners who need them, not just available.',
        },
      ],
    },
    {
      id: 'design',
      name: 'design',
      questions: [
        {
          id: 'design-0',
          prompt:
            'materials are built with more than one way in, before anyone has to ask for an adjustment.',
        },
      ],
    },
    {
      id: 'capability',
      name: 'capability',
      questions: [
        {
          id: 'capability-0',
          prompt:
            'staff can set it up on a tuesday, and it holds when the person who champions it is away.',
        },
      ],
    },
    {
      id: 'belonging',
      name: 'belonging',
      questions: [
        {
          id: 'belonging-0',
          prompt:
            'learners take part without being asked, and can get back in when something goes wrong.',
        },
      ],
    },
    {
      id: 'trust',
      name: 'trust',
      questions: [
        {
          id: 'trust-0',
          prompt:
            'learners, families and staff believe it will work when it matters, and that their data is safe.',
        },
      ],
    },
    {
      id: 'evidence',
      name: 'evidence',
      questions: [
        {
          id: 'evidence-0',
          prompt:
            'you can show a parent or a governor what actually changed, without reaching for the word “engagement”.',
        },
        {
          id: 'evidence-1',
          prompt:
            'you could measure the same thing again next year and know whether it moved.',
        },
      ],
    },
  ],
};

/** The 0–5 scale, labelled. Same range as the ISP engine so the maths is
 *  shared rather than reimplemented. 0 is a real answer, not a missing one. */
export const SCALE: ReadonlyArray<{ value: ScoreValue; label: string }> = [
  { value: 0, label: 'not in place at all' },
  { value: 1, label: 'barely' },
  { value: 2, label: 'in places' },
  { value: 3, label: 'about half the time' },
  { value: 4, label: 'mostly' },
  { value: 5, label: 'fully in place and working' },
];

export const READINESS_QUESTION_COUNT = readinessQuestionSet.domains.reduce(
  (n, d) => n + d.questions.length,
  0,
);
