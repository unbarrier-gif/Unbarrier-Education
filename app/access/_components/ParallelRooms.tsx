import styles from './ParallelRooms.module.css';

// Per D35 (10 May 2026): pill component reserved for the 13:00 leadership
// row in the Band 5 worked-example day. Signals capacity-building (two
// trainers, two cohorts, twice the throughput in one window) — the
// differentiator that justifies the INSET / bespoke pricing tier. Do
// NOT reuse on the 11:00 TA · HLTA row, which uses plain inline
// "· parallel session" text — that row signals concurrency, not
// capacity-building, and using the same pill on both rows would flatten
// the visual hierarchy between concurrency and the unique selling point.
//
// Visual treatment matches the existing .pillMost ("MOST BOOKED") badge
// on Route 2 — pill shape, heading-font caps, accent-on-strand.

type Props = {
  label?: string;
  tone?: 'orange' | 'yellow';
};

export function ParallelRooms({
  label = 'two specialists · two rooms',
  tone = 'orange',
}: Props) {
  return (
    <span className={`${styles.pill} ${styles[tone]}`}>
      <span aria-hidden="true" className={styles.glyph}>
        <span className={styles.room} />
        <span className={styles.room} />
      </span>
      {label}
    </span>
  );
}
