import type { AuditResponse, QuestionSet } from './types';
import { scoreQuestions, textQuestions } from './types';

function escapeCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function buildResponsesCsv(questionSet: QuestionSet, responses: AuditResponse[]): string {
  const scored = scoreQuestions(questionSet);
  const text = textQuestions(questionSet);

  const header = [
    'submitted_at',
    'school',
    'region',
    ...scored.map((q) => q.id),
    ...text.map((q) => q.id),
  ];

  const lines = [header.map(escapeCell).join(',')];

  for (const r of responses) {
    const row = [
      r.submittedAt,
      r.school,
      r.region ?? '',
      ...scored.map((q) => {
        const a = r.answers[q.id];
        return a && a.type === 'score' ? a.value : '';
      }),
      ...text.map((q) => {
        const a = r.answers[q.id];
        return a && a.type === 'text' ? a.value : '';
      }),
    ];
    lines.push(row.map(escapeCell).join(','));
  }

  return lines.join('\r\n');
}
