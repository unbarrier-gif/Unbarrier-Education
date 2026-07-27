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
    // A <div role="group"> rather than <fieldset>/<legend>: a legend renders on
    // the card's top border and reads as "floating above" the card. This keeps
    // the heading inside the card while preserving group semantics.
    <div className={styles.wrap} role="group" aria-labelledby="catalogue-heading">
      <h2 id="catalogue-heading" className={styles.legend}>
        Device catalogue preference
      </h2>
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
    </div>
  );
}
