import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { Wordmark } from '@/components/Wordmark';
import { HubspotForm } from '@/components/kit/HubspotForm';
import { Iceberg } from '@/components/kit/Iceberg';
import { Slot } from '@/components/kit/Slot';
import { BOOKING_URL } from '@/lib/booking';
import {
  CHAPTERS,
  FORM_ID,
  GUIDE_TITLE,
  ICEBERG_ALT,
  KIT_COPY,
  KIT_COVER,
} from '@/lib/kit';
import { SITE_FLAGS } from '@/lib/site-flags';
import styles from './page.module.css';

// /inclusive-mainstream — version 2, from the "kit landing page v2" design.
// The page has one job: get a school leader to fill in the form.
//
//   header      wordmark · a button that jumps to the form
//   first screen  straight on the page ground, no scroll on a laptop:
//               left  label · title · guide line · after-sign-up line · cover
//               right lilac panel · form heading · HubSpot form · details line
//   contents    seven dark chapter cards: number · green line with the iceberg
//               on it · name · a sponsor strip in the chapter's tint
//   next step   dark card · the call and the clinic · book · back to the form
//   footer      the site's own
//
// It has its own header instead of <Nav />: a landing page that offers the
// whole site's menu gives the reader seven other jobs.
//
// PHONE (< 768px): the DOM order IS the phone order — title, guide line, the
// form, then the after-sign-up line and the cover. On a laptop the grid areas
// put the form beside them. One source order, so the tab order matches both.
//
// COPY: none of it is written here. Every slot is in lib/kit.ts, with stand-in
// text for amber to write over. The chapter data is there too.
//
// STILL NOINDEX: SITE_FLAGS.kitPublic is off until Nici says it can go
// public, and the sitemap keeps it out.

const CANONICAL = 'https://www.unbarrier.me/inclusive-mainstream';

export const metadata: Metadata = {
  title: `${GUIDE_TITLE} | unbarrier.me`,
  // Held until Nici writes it (lib/kit.ts → metaDescription). A null slot
  // ships no description rather than a made-up one.
  ...(KIT_COPY.metaDescription.text
    ? { description: KIT_COPY.metaDescription.text }
    : {}),
  alternates: { canonical: CANONICAL },
  robots: SITE_FLAGS.kitPublic
    ? undefined
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: GUIDE_TITLE,
    url: CANONICAL,
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'unbarrier — designed for difference. did it reach the child?',
      },
    ],
  },
};

export default function KitPage() {
  return (
    <>
      <header className={styles.header}>
        <Wordmark size="md" href="/" ariaLabel="unbarrier.me home" />
        <Button href={`#${FORM_ID}`}>
          <Slot copy={KIT_COPY.headerButton} />
        </Button>
      </header>

      <main className={styles.main}>
        {/* first screen */}
        <div className={styles.first}>
          <div className={styles.stage}>
            <p className={styles.label}>
              <Slot copy={KIT_COPY.label} />
            </p>
            <h1 className={styles.title}>{GUIDE_TITLE}</h1>
            {/* The green line under the title, across the title column. The
                iceberg's waterline sits on it: the tip above, the rest below. */}
            <div className={styles.rule}>
              <Iceberg className={styles.berg} alt={ICEBERG_ALT} />
            </div>
            <p className={`${styles.line} ${styles.guide}`}>
              <Slot copy={KIT_COPY.guideLine} />
            </p>

            <section
              id={FORM_ID}
              aria-labelledby="form-heading"
              className={styles.panel}
            >
              <h2 id="form-heading" className={styles.panelHeading}>
                <Slot copy={KIT_COPY.formHeading} />
              </h2>
              <HubspotForm />
              <p className={styles.details}>
                <Slot copy={KIT_COPY.detailsLine} />
              </p>
            </section>

            <p className={`${styles.line} ${styles.after}`}>
              <Slot copy={KIT_COPY.afterLine} />
            </p>
            <div className={styles.cover}>
              {KIT_COVER.src ? (
                <Image
                  src={KIT_COVER.src}
                  alt={KIT_COPY.coverAlt.text ?? ''}
                  width={KIT_COVER.width}
                  height={KIT_COVER.height}
                  className={styles.coverImage}
                />
              ) : (
                <p className={styles.coverBox} aria-hidden="true">
                  [guide cover · amber to supply]
                </p>
              )}
            </div>
          </div>
        </div>

        {/* contents */}
        <section className={styles.band} aria-labelledby="contents-heading">
          <div className={styles.contents}>
            <h2 id="contents-heading" className={styles.sectionHeading}>
              <Slot copy={KIT_COPY.contentsHeading} />
            </h2>
            <ol className={styles.chapters} role="list">
              {CHAPTERS.map((chapter) => (
                <li key={chapter.n} className={styles.chapter}>
                  <span className={styles.numeral} aria-hidden="true">
                    {chapter.n}
                  </span>
                  {/* 3px green line across the card; the iceberg (decorative)
                      sits on it by its waterline. */}
                  <div className={styles.chapterRule}>
                    <Iceberg className={styles.chapterBerg} />
                  </div>
                  <h3 className={styles.chapterTitle}>
                    <Slot copy={chapter.title} />
                  </h3>
                  <p className={styles.sponsor} style={{ background: chapter.tint }}>
                    <Slot copy={chapter.sponsor} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* the next step */}
        <section className={styles.next} aria-labelledby="next-heading">
          <div className={styles.nextCard}>
            <h2 id="next-heading" className={styles.nextHeading}>
              <Slot copy={KIT_COPY.nextHeading} />
            </h2>
            <p className={styles.nextBody}>
              <Slot copy={KIT_COPY.nextBody} />
            </p>
            <div className={styles.nextActions}>
              <Button href={BOOKING_URL} external>
                <Slot copy={KIT_COPY.bookingButton} />
              </Button>
              <Button href={`#${FORM_ID}`} variant="ghost">
                <Slot copy={KIT_COPY.backToForm} />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="full" />
    </>
  );
}
