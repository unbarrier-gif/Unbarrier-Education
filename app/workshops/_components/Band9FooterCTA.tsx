import { Eyebrow } from '@/components/Eyebrow';
import { SectionBar } from '@/components/SectionBar';
import bands from './bands.module.css';
import styles from './Band9FooterCTA.module.css';
import { TrackedMailto } from './TrackedMailto';

const FOOTER_CTA =
  'mailto:nici@unbarrier.me?subject=September%20INSET';

export function Band9FooterCTA() {
  return (
    <>
      <SectionBar color="var(--spring-green)" />
      <section className={`${bands.band} ${styles.band}`}>
        <div className={`${bands.bandInner} ${styles.inner}`}>
          <Eyebrow color="var(--spring-green)">Time-sensitive</Eyebrow>
          <h2 className={styles.h2}>
            Talk to us about{' '}
            <span className={styles.accent}>September INSET.</span>
          </h2>
          <p className={styles.body}>
            Tell us what&apos;s happening. We&apos;ll tell you if we can help,
            or point you towards someone who can. No forms, no funnels.
          </p>
          <TrackedMailto
            href={FOOTER_CTA}
            event="workshops_footer_email"
            color="var(--spring-green)"
          >
            nici@unbarrier.me →
          </TrackedMailto>
        </div>
      </section>
    </>
  );
}
