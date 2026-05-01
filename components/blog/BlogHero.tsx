import type { CSSProperties } from 'react';
import { Glow } from '@/components/Glow';
import { SHAPE_KEYS, SHAPES } from '@/lib/blog-shapes';
import styles from './BlogHero.module.css';

export function BlogHero() {
  return (
    <header className={styles.hero}>
      <Glow color="var(--spring-green)" left="-10%" top="10%" size={560} opacity={0.09} />
      <Glow color="var(--orchid-mist)" right="-10%" top="-10%" size={500} opacity={0.08} />

      <div className={styles.inner}>
        <p className={styles.eyebrow}>Notes from Nici</p>
        <h1 className={styles.heading}>
          The unbarrier blog.<br />
          <span className={styles.headingMuted}>Said out loud, then typed down.</span>
        </h1>
        <p className={styles.lede}>
          Short thoughts, honest ones, full-length arguments, and stories from
          other people in this world. Writing is hard when you&rsquo;re dyslexic.
          I still do it &mdash; with voice notes, AI, and a lot of rereading.
        </p>

        <div className={styles.legend}>
          {SHAPE_KEYS.map((key) => {
            const s = SHAPES[key];
            return (
              <div
                key={key}
                className={styles.legendCell}
                style={{ '--c': s.color } as CSSProperties}
              >
                <div className={styles.legendLabel}>
                  <span className={styles.legendDot} aria-hidden="true" />
                  <span>{s.name}</span>
                </div>
                <p className={styles.legendBlurb}>{s.blurb}</p>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
