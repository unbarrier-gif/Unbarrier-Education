'use client';

import type { Question, ScoreValue } from '@/lib/isp-audit/types';
import ScoreRadioGroup from './ScoreRadioGroup';
import styles from './QuestionField.module.css';

export default function QuestionField({
  question,
  value,
  onChangeText,
  onChangeScore,
  error,
  fieldRef,
}: {
  question: Question;
  value: string | ScoreValue | undefined;
  onChangeText: (id: string, value: string) => void;
  onChangeScore: (id: string, value: ScoreValue) => void;
  error?: string;
  fieldRef?: (el: HTMLElement | null) => void;
}) {
  const featured = question.type === 'text' && question.featured;

  return (
    <div
      className={`${styles.field} ${featured ? styles.featured : ''}`}
      ref={(el) => fieldRef?.(el)}
    >
      {question.type === 'text' ? (
        <>
          <label className={styles.label} htmlFor={question.id}>
            {question.prompt}
          </label>
          {question.hint && (
            <p id={`${question.id}-hint`} className={styles.hint}>
              {question.hint}
            </p>
          )}
          <textarea
            id={question.id}
            className={styles.textarea}
            value={(value as string) ?? ''}
            onChange={(e) => onChangeText(question.id, e.target.value)}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={
              [question.hint ? `${question.id}-hint` : null, error ? `${question.id}-error` : null]
                .filter(Boolean)
                .join(' ') || undefined
            }
          />
          {error && (
            <p id={`${question.id}-error`} className={styles.error}>
              {error}
            </p>
          )}
        </>
      ) : (
        <ScoreRadioGroup
          name={question.id}
          legend={question.prompt}
          value={value as ScoreValue | undefined}
          onChange={(v) => onChangeScore(question.id, v)}
          error={error}
          required
        />
      )}
    </div>
  );
}
