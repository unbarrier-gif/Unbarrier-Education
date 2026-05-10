import { Glow } from '@/components/Glow';
import { SectionBar } from '@/components/SectionBar';
import bands from './bands.module.css';
import styles from './Band3Module1.module.css';
import { TrackedMailto } from './TrackedMailto';

const BOOK_CTA =
  'mailto:nici@unbarrier.me?subject=Module%201%20enquiry';

const SPECS = [
  { label: 'Length', value: '90 minutes' },
  { label: 'Audience', value: 'Whole staff' },
  { label: 'Format', value: 'Hands-on · bring your iPad' },
  { label: 'Closes with', value: 'One tool, one learner, one week' },
];

export function Band3Module1() {
  return (
    <>
      <SectionBar color="var(--princeton-orange)" />
      <section className={`${bands.band} ${styles.band}`}>
        <Glow
          color="var(--princeton-orange)"
          right="-80px"
          top="20%"
          size={500}
          opacity={0.12}
        />
        <div className={`${bands.bandInner} ${styles.grid}`}>
          <div className={styles.copy}>
            <p className={styles.pill}>
              <span aria-hidden="true" className={styles.dot} />
              Hero workshop · Module 01
            </p>
            <h2 className={styles.h2}>
              Accessibility on iPad:{' '}
              <span className={styles.accent}>the essentials.</span>
            </h2>
            <p className={styles.body}>
              The one most schools start with. A walk through the iPad&apos;s
              built-in accessibility tools in classroom context, hands-on time
              to try them, and a simple closing goal: one tool, one learner,
              one week.
            </p>
            <dl className={styles.specs}>
              {SPECS.map(({ label, value }) => (
                <div key={label} className={styles.specRow}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.ctaRow}>
              <TrackedMailto
                href={BOOK_CTA}
                event="workshops_module1_book"
                color="var(--princeton-orange)"
              >
                Book Module 1 →
              </TrackedMailto>
              <a href="#inset" className={styles.secondary}>
                Or build a full day →
              </a>
            </div>
          </div>
          {/* Visual placeholder until /illustrations/planet-orange.png lands. */}
          <div aria-hidden="true" className={styles.planet}>
            <div className={styles.planetOrb} />
          </div>
        </div>
      </section>
    </>
  );
}
