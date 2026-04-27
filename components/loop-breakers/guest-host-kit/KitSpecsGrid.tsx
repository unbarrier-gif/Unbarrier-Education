import styles from './KitSpecsGrid.module.css';

type Row = {
  k: string;
  v: string;
};

export function KitSpecsGrid({ rows }: { rows: Row[] }) {
  return (
    <dl className={styles.specs}>
      {rows.map((r) => (
        <div key={r.k} className={styles.kv}>
          <dt className={styles.k}>{r.k}</dt>
          <dd className={styles.v}>{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}
