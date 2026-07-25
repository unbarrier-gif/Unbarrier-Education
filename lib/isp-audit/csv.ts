import type { AuditResponse, QuestionSet } from './types';
import { allQuestions } from './types';
import { domainScores, routeRecommendation, ROUTE_LABEL } from './summary';

function escapeCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function buildResponsesCsv(questionSet: QuestionSet, responses: AuditResponse[]): string {
  const questions = allQuestions(questionSet);
  const domainIds = questionSet.domains.map((d) => d.id);

  const header = [
    'submitted_at',
    'school',
    'region',
    'respondent_name',
    'respondent_role',
    ...questions.map((q) => q.id),
    ...domainIds.map((id) => `domain_${id}_score`),
    'route',
    'catalogue_priorities',
    ...domainIds.map((id) => `notes_${id}`),
  ];

  const lines = [header.map(escapeCell).join(',')];

  for (const r of responses) {
    const scores = domainScores(questionSet, r.answers);
    const route = routeRecommendation(scores);

    const row = [
      r.submittedAt,
      r.school,
      r.region ?? '',
      r.respondentName ?? '',
      r.respondentRole ?? '',
      ...questions.map((q) => {
        const v = r.answers.scores[q.id];
        return v === undefined ? '' : String(v);
      }),
      ...scores.map((s) => String(s.score)),
      ROUTE_LABEL[route.route],
      r.answers.catalogue.join('; '),
      ...domainIds.map((id) => r.answers.notes[id] ?? ''),
    ];
    lines.push(row.map(escapeCell).join(','));
  }

  return lines.join('\r\n');
}
