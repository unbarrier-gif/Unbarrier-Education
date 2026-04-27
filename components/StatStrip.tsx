import { SectionBar } from './SectionBar';
import styles from './StatStrip.module.css';

const STATS = [
  {
    figure: '60%',
    line: "Of learners don't fit the current system neatly — and are mostly invisible to it.",
  },
  {
    figure: '1 question',
    line: 'Anchors every piece of work: what are we solving for the student?',
  },
  {
    figure: '0 jargon',
    line: "No fluff, no tick-boxes, no reports that don't change anything in real classrooms.",
  },
];

export function StatStrip() {
  return (
    <>
      <SectionBar color="var(--spring-green)" />
      <div className={styles.wrap}>
        <div className={styles.inner}>
          {STATS.map((s) => (
            <div key={s.figure} className={styles.cell}>
              <p className={styles.figure}>{s.figure}</p>
              <p className={styles.line}>{s.line}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
