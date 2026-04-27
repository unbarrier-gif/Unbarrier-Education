import styles from './LBTestimonial.module.css';

export function LBTestimonial() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <figure className={styles.figure}>
          <p className={styles.quote}>
            &ldquo;I stopped circling the thing. Ninety minutes, a room of
            women who got it, and I left with the one next step I&apos;d been
            avoiding for months. It&apos;s unlike anything I&apos;ve done.&rdquo;
          </p>
          <figcaption className={styles.caption}>
            — Gemma · Loop Breakers participant
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
