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
    'respondent_email',
    ...questions.map((q) => q.id),
    ...domainIds.map((id) => `domain_${id}_score`),
    'route',
    'platform',
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
      r.respondentEmail ?? '',
      ...questions.map((q) => {
        const v = r.answers.scores[q.id];
        if (v !== undefined) return String(v);
        return r.answers.cantAnswer.includes(q.id) ? 'N/A' : '';
      }),
      // Blank (not "0") when nobody's answered anything in the domain yet —
      // a real 0 is a real answer, no answers isn't the same thing.
      ...scores.map((s) => (s.answered > 0 ? String(s.score) : '')),
      ROUTE_LABEL[route.route],
      r.answers.platform ?? '',
      r.answers.catalogue.join('; '),
      ...domainIds.map((id) => r.answers.notes[id] ?? ''),
    ];
    lines.push(row.map(escapeCell).join(','));
  }

  return lines.join('\r\n');
}
