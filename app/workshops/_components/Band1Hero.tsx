import Image from 'next/image';
import { APLSBadge } from '@/components/APLSBadge';
import { Eyebrow } from '@/components/Eyebrow';
import { Glow } from '@/components/Glow';
import bands from './bands.module.css';
import styles from './Band1Hero.module.css';
import { TrackedMailto } from './TrackedMailto';

const HERO_CTA =
  'mailto:nici@unbarrier.me?subject=Workshop%20enquiry';

export function Band1Hero() {
  return (
    <header id="top" className={`${bands.band} ${styles.hero}`}>
      <Glow color="var(--princeton-orange)" right="-120px" top="6%" size={520} opacity={0.1} />
      <Glow color="var(--spring-green)" left="-100px" top="60%" size={420} opacity={0.06} />
      <div className={`${bands.bandInner} ${styles.grid}`}>
        <div className={styles.copy}>
          <Eyebrow color="var(--princeton-orange)">Workshops · INSET · CPD</Eyebrow>
          <h1 className={styles.h1}>
            Accessibility training that schools can{' '}
            <span className={styles.accent}>actually book.</span>
          </h1>
          <p className={`${styles.sub} ${bands.placeholderText}`}>
            [PLACEHOLDER — sub-headline TBD]
            <span className={bands.placeholder}>placeholder</span>
          </p>
          <div className={styles.ctaRow}>
            <TrackedMailto
              href={HERO_CTA}
              event="workshops_hero_email"
              color="var(--spring-green)"
            >
              Email Nici →
            </TrackedMailto>
            <a href="#how-to-book" className={styles.secondary}>
              See how to book →
            </a>
          </div>
          <div className={styles.attribution}>
            <span className={styles.portraitWrap}>
              <Image
                src="/assets/portraits/nici-portrait.png"
                alt="Nici Foote"
                width={36}
                height={36}
                className={styles.portrait}
              />
            </span>
            <span className={styles.attrText}>
              Delivered by <strong>Nici Foote</strong>
              <span className={styles.attrSub}>
                Apple Professional Learning Specialist · Accessibility Champion
              </span>
            </span>
          </div>
        </div>
        <div className={styles.badgeCol}>
          <APLSBadge width={300} className={styles.heroBadge} />
        </div>
      </div>
    </header>
  );
}
