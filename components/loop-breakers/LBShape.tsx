import { Eyebrow } from '../Eyebrow';
import { SectionBar } from '../SectionBar';
import styles from './LBShape.module.css';

// Placeholder iframe src. PR 4 swaps in the live Google Form URL:
// https://docs.google.com/forms/d/e/1FAIpQLScVdyBGdlPQAqLhuyrNt08sYQ9QRV1HU_fNNHoB7No7LbtZ6A/viewform?embedded=true
const GOOGLE_FORM_EMBED_URL = '';

export function LBShape() {
  return (
    <section id="shape-it" className={styles.section}>
      <SectionBar color="var(--orchid-mist)" />
      <div className={styles.card}>
        <Eyebrow color="var(--orchid-mist)">Shape the next session</Eyebrow>
        <h2 className={styles.heading}>What are you stuck on?</h2>
        <p className={styles.body}>
          Loop Breakers topics aren&apos;t picked from a marketing calendar.
          They come from what people actually ask in sessions. Drop yours
          below — if it lands, it shapes a future Tuesday.
        </p>

        {GOOGLE_FORM_EMBED_URL ? (
          <iframe
            src={GOOGLE_FORM_EMBED_URL}
            title="What are you stuck on? — share your loop"
            className={styles.iframe}
            loading="lazy"
            width="100%"
            height={852}
          />
        ) : (
          <div className={styles.placeholder} role="status">
            <p className={styles.placeholderTitle}>Form coming.</p>
            <p className={styles.placeholderBody}>
              In the meantime, drop a line to{' '}
              <a
                href="mailto:hello@unbarrier.me?subject=What I'm stuck on"
                className={styles.placeholderLink}
              >
                hello@unbarrier.me
              </a>{' '}
              — Nici reads every one.
            </p>
          </div>
        )}

        <p className={styles.note}>
          No newsletter, no funnel. Just Nici reading.
        </p>
      </div>
    </section>
  );
}
