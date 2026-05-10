import { Eyebrow } from '@/components/Eyebrow';
import { SectionBar } from '@/components/SectionBar';
import bands from './bands.module.css';
import styles from './Band6Bespoke.module.css';
import { TrackedMailto } from './TrackedMailto';

const BESPOKE_CTA =
  'mailto:nici@unbarrier.me?subject=Bespoke%20workshop%20conversation';

const POINTS = [
  'Trust-wide rollouts across multiple schools',
  'Multi-day programmes with cohort follow-up',
  'Governor-only or trustee-only sessions',
  'Audit-led implementation, scoped from a clinic',
  'Conference keynotes and panel sessions',
];

export function Band6Bespoke() {
  return (
    <>
      <SectionBar color="var(--orchid-mist)" />
      <section id="bespoke" className={`${bands.band} ${styles.band}`}>
        <div className={bands.bandInner}>
          <div className={bands.bandHead}>
            <Eyebrow color="var(--orchid-mist)">Bespoke</Eyebrow>
            <h2 className={bands.h2}>
              Your situation isn&apos;t on the menu.{' '}
              <span className={styles.accent}>That&apos;s fine.</span>
            </h2>
          </div>
          <div className={styles.card}>
            <p className={styles.body}>
              Trust-wide rollouts. Multi-day programmes. Governor-only.
              Audit-led. Conference keynotes. If what you need is shaped
              differently, we shape it together — by email, then by call.
            </p>
            <ul className={styles.list}>
              {POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <TrackedMailto
                href={BESPOKE_CTA}
                event="workshops_bespoke_start"
                color="var(--orchid-mist)"
              >
                Start a bespoke conversation →
              </TrackedMailto>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
