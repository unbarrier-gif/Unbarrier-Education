'use client';

import styles from './CatalogueChips.module.css';

const MAX = 3;

export default function CatalogueChips({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const atMax = selected.length >= MAX;

  function toggle(opt: string) {
    if (selected.includes(opt)) {
      onChange(selected.filter((o) => o !== opt));
    } else if (!atMax) {
      onChange([...selected, opt]);
    }
  }

  return (
    <fieldset className={styles.wrap}>
      <legend className={styles.legend}>Device catalogue preference</legend>
      <p className={styles.hint}>
        If your school could choose from an approved catalogue of devices — not locked to one vendor — what matters
        most? Pick up to {MAX}.
      </p>
      <div className={styles.chips}>
        {options.map((opt) => {
          const checked = selected.includes(opt);
          const disabled = !checked && atMax;
          return (
            <label key={opt} className={styles.chip} data-disabled={disabled ? 'true' : undefined}>
              <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(opt)} />
              {opt}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
