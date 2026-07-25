export type ScoreValue = 'low' | 'medium' | 'high';

export type ScoreQuestion = {
  id: string;
  type: 'score';
  prompt: string;
  /** Shown in the respondent's results + admin heatmap detail panel when this
   *  question is answered 'low' or 'medium'. No entry needed for 'high'. */
  nextStep: Partial<Record<'low' | 'medium', string>>;
};

export type TextQuestion = {
  id: string;
  type: 'text';
  prompt: string;
  /** Featured questions render larger/first in their section (e.g. anchor questions). */
  featured?: boolean;
  /** Optional short guidance shown under the prompt (e.g. suggested format). */
  hint?: string;
};

export type Question = ScoreQuestion | TextQuestion;

export type Section = {
  id: string;
  title: string;
  description?: string;
  /** Sections that feed the heatmap (their score questions become columns). */
  scored: boolean;
  questions: Question[];
};

export type QuestionSet = {
  id: string;
  title: string;
  intro: string;
  estimatedMinutes: number;
  sections: Section[];
};

export type AnswerValue =
  | { type: 'score'; value: ScoreValue }
  | { type: 'text'; value: string };

export type Answers = Record<string, AnswerValue>;

export type AuditResponse = {
  id: string;
  school: string;
  region: string | null;
  submittedAt: string;
  answers: Answers;
};

export function scoreQuestions(questionSet: QuestionSet): ScoreQuestion[] {
  return questionSet.sections
    .filter((s) => s.scored)
    .flatMap((s) => s.questions.filter((q): q is ScoreQuestion => q.type === 'score'));
}

export function textQuestions(questionSet: QuestionSet): TextQuestion[] {
  return questionSet.sections.flatMap((s) =>
    s.questions.filter((q): q is TextQuestion => q.type === 'text'),
  );
}
