import { Eyebrow } from '@/components/Eyebrow';
import styles from '../page.module.css';

type Row = {
  time: string;
  audience: string;
  audienceColor: string;
  body: string;
  parallel?: boolean;
};

const ROWS: Row[] = [
  {
    time: '08:45 — 09:00',
    audience: 'Arrival',
    audienceColor: 'var(--text-subtle)',
    body: 'Coffee & set up',
  },
  {
    time: '09:00 — 10:30',
    audience: 'Whole staff',
    audienceColor: 'var(--princeton-orange)',
    body: 'Module 01 — Accessibility on iPad: the essentials',
  },
  {
    time: '10:45 — 12:15',
    audience: 'TA breakout',
    audienceColor: 'var(--pearl-aqua)',
    body: 'Module 02 — for Teaching Assistants',
    parallel: true,
  },
  {
    time: '10:45 — 12:15',
    audience: 'Leadership',
    audienceColor: 'var(--princeton-orange)',
    body: 'Module 03 — Strategic inclusion',
    parallel: true,
  },
  {
    time: '13:00 — 14:00',
    audience: 'Stakeholder',
    audienceColor: 'var(--orchid-mist)',
    body: 'Module 04 — Parents, governors, trustees',
  },
  {
    time: '14:15 — 15:30',
    audience: 'Whole staff',
    audienceColor: 'var(--spring-green)',
    body: 'Whole-staff close — commitments wall',
  },
];

export function AccessInsetExample() {
  return (
    <section id="access-inset-example" className={styles.timelineSection}>
      <div className={styles.timelineHead}>
        <Eyebrow color="var(--school-bus-yellow)">Pick and mix</Eyebrow>
        <h2 className={styles.h2}>What a day looks like.</h2>
        <p className={styles.timelineSubLine}>
          Yours won&apos;t look identical — that&apos;s the point. Different
          audiences, different priorities, same shape.
        </p>
        <div className={styles.timelinePillRow}>
          <span className={styles.pillYellow}>
            Worked example · one INSET day
          </span>
          <span className={styles.timelineMeta}>
            6 sessions · 1 day · whatever the size of your setting
          </span>
        </div>
      </div>

      <ol className={styles.timelinePanel}>
        {ROWS.map((row, i) => (
          <li
            key={i}
            className={`${styles.timelineRow} ${row.parallel ? styles.timelineRowParallel : ''}`}
          >
            <span className={styles.timelineTime}>{row.time}</span>
            <div className={styles.timelineBody}>
              <span
                className={styles.timelineAudience}
                style={{ color: row.audienceColor }}
              >
                {row.audience}
                {row.parallel ? (
                  <span className={styles.timelineParallelTag}>
                    {' '}
                    · parallel
                  </span>
                ) : null}
              </span>
              <span className={styles.timelineModule}>{row.body}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
