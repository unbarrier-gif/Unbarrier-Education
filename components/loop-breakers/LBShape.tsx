import Image from 'next/image';
import { Eyebrow } from '../Eyebrow';
import { SectionBar } from '../SectionBar';
import styles from './LBShape.module.css';

// Live Google Form embed. Responses land in the linked Sheet; Nici
// reviews on Friday and pastes themes into the Notion DB. If the form
// is ever rebuilt, swap this URL only — markup and styles stay.
const GOOGLE_FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScVdyBGdlPQAqLhuyrNt08sYQ9QRV1HU_fNNHoB7No7LbtZ6A/viewform?embedded=true';

export function LBShape() {
  return (
    <section id="shape-it" className={styles.section}>
      <SectionBar color="var(--orchid-mist)" />
      <div className={styles.banner} aria-hidden="true">
        <Image
          src="/assets/banner/loop-breakers-form-banner.png"
          alt=""
          width={3200}
          height={800}
          sizes="(max-width: 760px) 100vw, 760px"
          className={styles.bannerImage}
        />
      </div>
      <div className={styles.card}>
        <Eyebrow color="var(--orchid-mist)">Shape the next session</Eyebrow>
        <h2 className={styles.heading}>What are you stuck on?</h2>
        <p className={styles.body}>
          Loop Breakers topics aren&apos;t picked from a marketing calendar.
          They come from what people actually ask in sessions. Drop yours
          below — if it lands, it shapes a future Tuesday.
        </p>

        <iframe
          src={GOOGLE_FORM_EMBED_URL}
          title="What are you stuck on? — share your loop"
          className={styles.iframe}
          loading="lazy"
          width="100%"
          height={852}
        />

        <p className={styles.note}>
          No newsletter, no funnel. Just Nici reading.
        </p>
      </div>
    </section>
  );
}
