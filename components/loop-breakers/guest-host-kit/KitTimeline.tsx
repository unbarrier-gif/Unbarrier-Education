import type { ReactNode } from 'react';
import styles from './KitTimeline.module.css';

type Row = {
  when: string;
  what: ReactNode;
};

export function KitTimeline({ rows }: { rows: Row[] }) {
  return (
    <div className={styles.timeline}>
      {rows.map((r) => (
        <div key={r.when} className={styles.row}>
          <span className={styles.when}>{r.when}</span>
          <span className={styles.what}>{r.what}</span>
        </div>
      ))}
    </div>
  );
}
