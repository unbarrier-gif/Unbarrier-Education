import { Eyebrow } from '@/components/Eyebrow';
import styles from '../page.module.css';

type Row = {
  time: string;
  audience: string;
  audienceColor: string;
  facilitator?: 'Nici' | 'Ben';
  body: string;
  parallel?: string;
};

const ROWS: Row[] = [
  {
    time: '08:45 — 09:00',
    audience: 'Arrival',
    audienceColor: 'var(--text-subtle)',
    body: 'Coffee & set up · SLT 1:1s',
  },
  {
    time: '09:00 — 10:30',
    audience: 'Whole staff',
    audienceColor: 'var(--princeton-orange)',
    facilitator: 'Nici',
    body: 'Module 01 — Essentials',
  },
  {
    time: '11:00 — 12:00',
    audience: 'TA breakout',
    audienceColor: 'var(--pearl-aqua)',
    facilitator: 'Nici',
    body: 'Module 02 — TAs · HLTAs',
    parallel: 'parallel',
  },
  {
    time: '13:00 — 14:30',
    audience: 'Leadership',
    audienceColor: 'var(--princeton-orange)',
    facilitator: 'Ben',
    body: 'Module 03 — SLT · SENCOs',
    parallel: 'parallel rooms ×2',
  },
  {
    time: '15:00 — 15:30',
    audience: 'Debrief',
    audienceColor: 'var(--text-subtle)',
    body: 'SLT feedback',
  },
  {
    time: '15:45 — 17:00',
    audience: 'Whole staff',
    audienceColor: 'var(--spring-green)',
    body: 'Close + commitments wall',
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
        {ROWS.map((row, i) => {
          const isParallel = Boolean(row.parallel);
          return (
            <li
              key={i}
              className={`${styles.timelineRow} ${isParallel ? styles.timelineRowParallel : ''}`}
            >
              <span className={styles.timelineTime}>{row.time}</span>
              <div className={styles.timelineBody}>
                <span
                  className={styles.timelineAudience}
                  style={{ color: row.audienceColor }}
                >
                  {row.audience}
                  {row.facilitator ? (
                    <span className={styles.timelineFacilitator}>
                      {' '}
                      · {row.facilitator}
                    </span>
                  ) : null}
                  {isParallel ? (
                    <span className={styles.timelineParallelTag}>
                      {' '}
                      · {row.parallel}
                    </span>
                  ) : null}
                </span>
                <span className={styles.timelineModule}>{row.body}</span>
              </div>
            </li>
          );
        })}
      </ol>

      <p className={styles.timelineCaveat}>
        Module 04 (parents, governors, trustees) typically runs as an evening
        session — not shown on this day.
      </p>
    </section>
  );
}
