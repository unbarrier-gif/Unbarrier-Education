import Image from 'next/image';
import Link from 'next/link';
import { APLSBadge } from '@/components/APLSBadge';
import { Eyebrow } from '@/components/Eyebrow';
import { SectionBar } from '@/components/SectionBar';
import bands from './bands.module.css';
import styles from './Band8About.module.css';

export function Band8About() {
  return (
    <>
      <SectionBar color="var(--orchid-mist)" />
      <section id="about" className={`${bands.band} ${styles.band}`}>
        <div className={`${bands.bandInner} ${styles.grid}`}>
          <div className={styles.left}>
            <div className={styles.portraitWrap}>
              <Image
                src="/assets/portraits/nici-portrait.png"
                alt="Nici Foote"
                width={240}
                height={240}
                className={styles.portrait}
              />
            </div>
            <APLSBadge width={150} className={styles.badge} />
          </div>
          <div className={styles.right}>
            <Eyebrow color="var(--orchid-mist)">Who delivers it</Eyebrow>
            <h2 className={bands.h2}>I&apos;m Nici. I&apos;m in the room.</h2>
            <p className={styles.body}>
              Apple Professional Learning Specialist. Inclusion specialist.
              Educator with dyslexia and ADHD. I deliver every workshop myself
              — no associate model, no white-labelled trainer turning up.
            </p>
            <p className={`${styles.body} ${bands.placeholderText}`}>
              [PLACEHOLDER — bio paragraph 2]
              <span className={bands.placeholder}>placeholder</span>
            </p>
            <Link href="/about" className={styles.cta}>
              More about Nici →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
