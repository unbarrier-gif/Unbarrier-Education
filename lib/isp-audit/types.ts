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
};

/** 0 = doesn't exist at all ... 5 = fully in place and working well. */
export type ScoreValue = 0 | 1 | 2 | 3 | 4 | 5;

export type Answers = {
  /** questionId -> 0-5 */
  scores: Record<string, ScoreValue>;
  /** domainId -> free text, optional, excluded from scoring */
  notes: Record<string, string>;
  /** up to 3 catalogue option labels */
  catalogue: string[];
};

export type AuditResponse = {
  id: string;
  school: string;
  region: string | null;
  respondentName: string | null;
  respondentRole: string | null;
  submittedAt: string;
  answers: Answers;
};

export function allQuestions(questionSet: QuestionSet): DomainQuestion[] {
  return questionSet.domains.flatMap((d) => d.questions);
}
