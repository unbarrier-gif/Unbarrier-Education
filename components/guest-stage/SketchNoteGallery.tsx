import type { SketchNoteExample } from '@/content/loop-breakers/guests';
import styles from './SketchNoteGallery.module.css';

type Props = {
  items: SketchNoteExample[];
  accent: string;
};

export function SketchNoteGallery({ items, accent }: Props) {
  if (items.length === 0) return null;

  return (
    <section
      className={styles.section}
      style={{ ['--c' as string]: accent }}
      aria-labelledby="sketchnote-gallery-heading"
    >
      <p className={styles.eyebrow}>What sketch-noting looks like</p>
      <h2 id="sketchnote-gallery-heading" className={styles.heading}>
        Pages from Nicki&apos;s journal
      </h2>
      <p className={styles.intro}>
        Real spreads from a working week — not polished portfolio pieces.
        This is what the practice looks like in motion.
      </p>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.src} className={styles.cell}>
            {/* SVGs are large vector files, so a plain <img> with lazy
                loading keeps the LCP clean and lets the browser decode
                them off the main thread. next/image would convert and
                re-compress, which we don't want for line-art. */}
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
