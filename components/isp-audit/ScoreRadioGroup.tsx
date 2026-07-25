'use client';

import type { ScoreValue } from '@/lib/isp-audit/types';
import styles from './ScoreRadioGroup.module.css';

const OPTIONS: { value: ScoreValue; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export default function ScoreRadioGroup({
  name,
  legend,
  value,
  onChange,
  error,
  required,
}: {
  name: string;
  legend: string;
  value: ScoreValue | undefined;
  onChange: (value: ScoreValue) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        {legend}
        {required && <span className={styles.requiredNote}> (required)</span>}
      </legend>
      <div className={styles.options}>
        {OPTIONS.map((opt) => (
          <label key={opt.value} className={styles.option} data-level={opt.value}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              aria-describedby={error ? `${name}-error` : undefined}
              aria-required={required ? 'true' : undefined}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
