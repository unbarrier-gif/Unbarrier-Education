import { Eyebrow } from '@/components/Eyebrow';
import { SectionBar } from '@/components/SectionBar';
import bands from './bands.module.css';
import styles from './Band5InsetDay.module.css';
import { TrackedMailto } from './TrackedMailto';

const PLAN_CTA =
  'mailto:nici@unbarrier.me?subject=Plan%20our%20INSET%20day';

const DAY = [
  {
    time: '08:30',
    label: 'Set-up',
    tag: 'On-site',
    body: 'Room check, kit out, badges. We arrive an hour ahead.',
    accent: 'var(--text-faint)',
  },
  {
    time: '09:00',
    label: 'Module 01 · whole staff',
    tag: 'Hero workshop',
    body: 'Accessibility on iPad — the essentials. 90 minutes, hands-on.',
    accent: 'var(--princeton-orange)',
  },
  {
    time: '10:45',
    label: 'Module 02 · TAs + HLTAs',
    tag: 'Parallel',
    body: 'TA-specific session while leadership joins Module 03 next door.',
    accent: 'var(--pearl-aqua)',
  },
  {
    time: '12:30',
    label: 'Lunch + drop-in clinic',
    tag: 'Optional',
    body: '1:1 questions, classroom screenshots, set-up help.',
    accent: 'var(--spring-green)',
  },
  {
    time: '13:30',
    label: 'Module 03 · SLT + SENCOs',
    tag: 'Strategic',
    body: 'Built-in accessibility as ordinarily available provision.',
    accent: 'var(--princeton-orange)',
  },
  {
    time: '15:00',
    label: 'Module 04 · governors + parents',
    tag: 'Stakeholder',
    body: 'Twilight session translating provision for families and trustees.',
    accent: 'var(--orchid-mist)',
  },
];

export function Band5InsetDay() {
  return (
    <>
      <SectionBar color="var(--school-bus-yellow)" />
      <section id="inset" className={`${bands.band} ${styles.band}`}>
        <div className={bands.bandInner}>
          <div className={bands.bandHead}>
            <Eyebrow color="var(--school-bus-yellow)">Pick and mix</Eyebrow>
            <h2 className={bands.h2}>Build your INSET day.</h2>
            <p className={bands.lede}>
              You pick the modules and the audiences. We bring everything.
              You provide the room and the staff.
            </p>
            <p className={styles.caveat}>
              Below: a worked example of a typical day. Yours won&apos;t look
              identical — that&apos;s the point.
            </p>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.headPill}>
                Worked example · one INSET day
              </span>
              <span className={styles.headMeta}>
                6 modules · 1 day · ~120 staff
              </span>
            </div>
            <ol className={styles.timeline}>
              {DAY.map((row) => (
                <li
                  key={row.time}
                  className={styles.row}
                  style={{ '--accent': row.accent } as React.CSSProperties}
                >
                  <span className={styles.time}>{row.time}</span>
                  <div className={styles.rowBody}>
                    <p className={styles.rowHeader}>
                      <span className={styles.rowLabel}>{row.label}</span>
                      <span className={styles.rowTag}>{row.tag}</span>
                    </p>
                    <p className={styles.rowText}>{row.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.ctaRow}>
            <p className={styles.ctaLine}>
              Want this shape, with your audiences?
            </p>
            <TrackedMailto
              href={PLAN_CTA}
              event="workshops_inset_plan"
              color="var(--school-bus-yellow)"
            >
              Plan your INSET →
            </TrackedMailto>
          </div>
        </div>
      </section>
    </>
  );
}
