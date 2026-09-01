export type DomainQuestion = {
  id: string;
  prompt: string;
};

export type Domain = {
  id: string;
  name: string;
  /** Which role is best placed to answer this domain — shown to the respondent. */
  bestFor: string;
  questions: DomainQuestion[];
};

export type QuestionSet = {
  id: string;
  title: string;
  intro: string;
  estimatedMinutes: number;
  domains: Domain[];
  catalogueOptions: string[];
  /** Options for the device-domain platform question — single choice. */
  platformOptions: string[];
  /** Autocomplete suggestions for the region field — the field itself stays
   *  free text, this is a helper, not a closed list. Self-described region
   *  in the respondent's own words is useful data in its own right. */
  regionSuggestions: string[];
  /** Autocomplete suggestions for the school field — the field itself stays
   *  free text, this is a helper, not a closed list. */
  schoolSuggestions: string[];
};

/** 0 = doesn't exist at all ... 5 = fully in place and working well. */
export type ScoreValue = 0 | 1 | 2 | 3 | 4 | 5;

export type Answers = {
  /** questionId -> 0-5 */
  scores: Record<string, ScoreValue>;
  /** questionIds the respondent explicitly marked "can't answer this" —
   *  distinct from just not having gotten to it yet. Excluded from scoring
   *  either way, but this is what lets routing/results say "not enough
   *  answered yet" instead of reading a genuine skip as a false 0. */
  cantAnswer: string[];
  /** domainId -> free text, optional, excluded from scoring */
  notes: Record<string, string>;
  /** up to 3 catalogue option labels */
  catalogue: string[];
  /** which device platform(s) the school actually uses — one of
   *  QuestionSet.platformOptions, or null if not answered. Metadata only,
   *  excluded from scoring: "which platform" has no good/bad direction the
   *  way the rated questions do. */
  platform: string | null;
};

/**
 * THE SHARED SCORING SHAPE.
 *
 * `domainScores` only ever reads domain ids, names and question ids. Typing it
 * against the full `QuestionSet` forced any other caller to invent ISP-only
 * fields — catalogue options, platform options, school suggestions — that mean
 * nothing to it. The readiness check (`lib/readiness-check/`) is that other
 * caller: it shares the ENGINE, deliberately, and shares no data whatsoever.
 *
 * `QuestionSet` and `Answers` still satisfy these, so nothing about the ISP
 * tool changes. This widens a parameter type; it does not touch any logic.
 */
export type ScorableSet = {
  domains: ReadonlyArray<{
    id: string;
    name: string;
    questions: ReadonlyArray<{ id: string }>;
  }>;
};

export type ScorableAnswers = {
  scores: Readonly<Record<string, ScoreValue>>;
};

export type AuditResponse = {
  id: string;
  school: string;
  region: string | null;
  respondentName: string | null;
  respondentRole: string | null;
  respondentEmail: string | null;
  submittedAt: string;
  answers: Answers;
};

export function allQuestions(questionSet: QuestionSet): DomainQuestion[] {
  return questionSet.domains.flatMap((d) => d.questions);
}
