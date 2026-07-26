'use client';

import styles from './PlatformSelect.module.css';

export default function PlatformSelect({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  return (
    <fieldset className={styles.wrap}>
      <legend className={styles.legend}>Which platform(s) does this school actually use?</legend>
      <p className={styles.hint}>Not scored — this just helps match the right resources to your setup.</p>
      <div className={styles.chips}>
        {options.map((opt) => (
          <label key={opt} className={styles.chip}>
            <input
              type="radio"
              name="ia-platform"
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
