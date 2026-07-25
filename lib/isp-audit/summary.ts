import type { AuditResponse, QuestionSet, ScoreQuestion } from './types';

export type WeakItem = { question: ScoreQuestion; level: 'low' | 'medium'; nextStep: string };

export type SectionSummary = {
  id: string;
  title: string;
  tally: { low: number; medium: number; high: number };
  weakItems: WeakItem[];
};

export function summarizeResponse(questionSet: QuestionSet, response: AuditResponse): SectionSummary[] {
  return questionSet.sections
    .filter((s) => s.scored)
    .map((section) => {
      const scoreQs = section.questions.filter((q): q is ScoreQuestion => q.type === 'score');
      const tally = { low: 0, medium: 0, high: 0 };
      const weakItems: WeakItem[] = [];

      for (const q of scoreQs) {
        const answer = response.answers[q.id];
        if (!answer || answer.type !== 'score') continue;
        tally[answer.value] += 1;
        if (answer.value === 'low' || answer.value === 'medium') {
          const nextStep = q.nextStep[answer.value];
          if (nextStep) weakItems.push({ question: q, level: answer.value, nextStep });
        }
      }

      return { id: section.id, title: section.title, tally, weakItems };
    });
}
