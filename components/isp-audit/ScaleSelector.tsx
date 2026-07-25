'use client';

import type { ScoreValue } from '@/lib/isp-audit/types';
import styles from './ScaleSelector.module.css';

const OPTIONS: ScoreValue[] = [0, 1, 2, 3, 4, 5];

export default function ScaleSelector({
  name,
  legend,
  value,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  value: ScoreValue | undefined;
  onChange: (value: ScoreValue) => void;
  error?: string;
}) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>
        {OPTIONS.map((opt) => (
          <label key={opt} className={styles.option}>
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            {opt}
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
