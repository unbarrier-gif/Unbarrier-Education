import type { Metadata } from 'next';
import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { Wordmark } from '@/components/Wordmark';
import { HubspotForm } from '@/components/kit/HubspotForm';
import { HeroIceberg } from '@/components/kit/HeroIceberg';
import { Iceberg } from '@/components/kit/Iceberg';
import { Slot } from '@/components/kit/Slot';
import { BOOKING_URL } from '@/lib/booking';
import {
  CHAPTERS,
  FORM_ID,
  GUIDE_TITLE,
  KIT_COPY,
  KIT_COVER,
  KIT_THUMB,
  NEXT_STEP_PERSON,
  NEXT_STEP,
  type Sponsor,
} from '@/lib/kit';
import styles from './page.module.css';

// /inclusive-mainstream — version 2, top half redone in version 4 (26 Oct 2026).
// The page has one job: get a school leader to fill in the form.
//
//   header      wordmark · a button that jumps to the form
//   first screen  straight on the page ground, no scroll on a laptop:
//               left  label · title · the iceberg on its waterline · guide line
//               right white form card · heading + cover thumbnail · HubSpot
//                     form · details line
//   contents    seven dark chapter cards: number · green line with the iceberg
//               on it · name · a sponsor strip in the chapter's tint, with the
//               sponsor's logo (card 01's strip links out, no other does)
//   next step   white card · dark "what you are buying" card holding the seven
//               lenses · a quote from nici · three numbered cards ·
//               send your statement (/book) and get the guide first (#form)
//   footer      the site's own
//
// v4 says the ask once: the "download your copy" block and the "lands in your
// inbox" hero line are gone, the form card is the one light object up here,
// and the hero's iceberg is one inlined object whose band is the hero's rule.
//
// It has its own header instead of <Nav />: a landing page that offers the
// whole site's menu gives the reader seven other jobs.
//
// PHONE (< 768px): the DOM order IS the phone order — label, title, iceberg,
// guide line, then the form card. On a laptop the grid puts the card beside
// them. One source order, so the tab order matches both.
//
// COPY: none of it is written here. Every slot is in lib/kit.ts, with stand-in
// text for amber to write over. The chapter data is there too.
//
// PUBLIC: indexed and in the sitemap since 26 Oct 2026 (Nici's call; the old
// kitPublic flag is deleted).

const CANONICAL = 'https://www.unbarrier.me/inclusive-mainstream';

export const metadata: Metadata = {
  title: `${GUIDE_TITLE} | unbarrier.me`,
  // Held until Nici writes it (lib/kit.ts → metaDescription). A null slot
  // ships no description rather than a made-up one.
  ...(KIT_COPY.metaDescription.text
    ? { description: KIT_COPY.metaDescription.text }
    : {}),
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: GUIDE_TITLE,
    url: CANONICAL,
    type: 'website',
    ...(KIT_COPY.metaDescription.text
      ? { description: KIT_COPY.metaDescription.text }
      : {}),
    images: [
      {
        url: KIT_COVER.src ?? '/opengraph-image.png',
        width: KIT_COVER.width,
        height: KIT_COVER.height,
        alt: KIT_COPY.coverAlt.text ?? GUIDE_TITLE,
      },
    ],
  },
  // The root layout's twitter block names the site, not the guide; override it.
  twitter: {
    card: 'summary_large_image',
    title: GUIDE_TITLE,
    ...(KIT_COPY.metaDescription.text
      ? { description: KIT_COPY.metaDescription.text }
      : {}),
    images: [KIT_COVER.src ?? '/opengraph-image.png'],
  },
};

export default function KitPage() {
  return (
    <>
      <header className={styles.header}>
        <Wordmark size="md" href="/" ariaLabel="unbarrier.me home" />
        {/* Not <Button>: this one is 48px with Outfit type (v4). */}
        <a href={`#${FORM_ID}`} className={styles.headerButton}>
          <Slot copy={KIT_COPY.headerButton} />
        </a>
      </header>

      <main className={styles.main}>
        {/* first screen */}
        <div className={styles.first}>
          <div className={styles.stage}>
            <p className={styles.label}>
              <Slot copy={KIT_COPY.label} />
            </p>
            <h1 className={styles.title}>{GUIDE_TITLE}</h1>
            {/* The iceberg's own waterline band is the hero's rule: it runs the
                width of the title column, the berg towards the right end. */}
            <HeroIceberg className={styles.berg} />
            <p className={`${styles.line} ${styles.guide}`}>
              <Slot copy={KIT_COPY.guideLine} />
            </p>

            <section
              id={FORM_ID}
              aria-labelledby="form-heading"
              className={styles.panel}
            >
              <div className={styles.panelHead}>
                <h2 id="form-heading" className={styles.panelHeading}>
                  <Slot copy={KIT_COPY.formHeading} />
                </h2>
                {/* Empty until a flat cover file lands (KIT_THUMB in lib/kit.ts). */}
                {KIT_THUMB.src ? (
                  <Image
                    src={KIT_THUMB.src}
                    alt={KIT_THUMB.alt}
                    width={KIT_THUMB.width}
                    height={KIT_THUMB.height}
                    className={styles.thumb}
                  />
                ) : null}
              </div>
              <HubspotForm />
              <p className={styles.details}>
                <Slot copy={KIT_COPY.detailsLine} />
              </p>
            </section>
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
                  <SponsorStrip sponsor={chapter.sponsor} partnerLine={chapter.partnerLine} tint={chapter.tint} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* the next step */}
        <section className={styles.next} aria-labelledby="next-heading">
          <div className={styles.nextCard}>
            <p className={styles.nextLabel}>{NEXT_STEP.label}</p>
            <h2 id="next-heading" className={styles.nextHeading}>
              {NEXT_STEP.heading}
            </h2>

            <div className={styles.buying}>
              <p className={styles.buyingLabel}>{NEXT_STEP.buyingLabel}</p>
              <p className={styles.buyingText}>{NEXT_STEP.buying}</p>
              <div className={styles.lensBlock}>
                <p className={styles.lensLine}>{NEXT_STEP.lensesLine}</p>
                <ul className={styles.lenses} role="list">
                  {NEXT_STEP.lenses.map((lens) => (
                    <li key={lens} className={styles.lens}>
                      {lens}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* A quote, so a screen reader hears it as one. The photo and the
                credit are nici's (NEXT_STEP_PERSON); both are placeholders
                until they land. */}
            <blockquote className={styles.quote}>
              {NEXT_STEP_PERSON.photo ? (
                <Image
                  src={NEXT_STEP_PERSON.photo.src}
                  alt={NEXT_STEP_PERSON.photoAlt}
                  width={NEXT_STEP_PERSON.photo.width}
                  height={NEXT_STEP_PERSON.photo.height}
                  className={styles.quotePhoto}
                />
              ) : (
                <span className={styles.quotePhoto} aria-hidden="true">
                  [photo]
                </span>
              )}
              <div className={styles.quoteText}>
                <p className={styles.quoteLine}>{NEXT_STEP.sendLine}</p>
                <footer className={styles.quoteCredit}>
                  <cite>{NEXT_STEP_PERSON.credit}</cite>
                </footer>
              </div>
            </blockquote>

            <div className={styles.desk}>
              <p className={styles.deskLabel}>{NEXT_STEP.getLabel}</p>
              <ol className={styles.deskCards} role="list">
                {NEXT_STEP.get.map((item, i) => (
                  <li key={item} className={styles.deskCard}>
                    <span className={styles.deskNumeral} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
              <p className={styles.notLine}>
                <span className={styles.notLabel}>{NEXT_STEP.notLabel}:</span>{' '}
                {NEXT_STEP.not}
              </p>
              <p className={styles.more}>{NEXT_STEP.more}</p>
            </div>

            <div className={styles.nextActions}>
              {/* One booking link for the whole site (lib/booking.ts). Not a
                  <Button>: that one is dark-ground clothes, and this card is
                  light. Same pill, 56px. */}
              <a href={BOOKING_URL} className={styles.sendButton}>
                {NEXT_STEP.button}
              </a>
              <a href={`#${FORM_ID}`} className={styles.guideButton}>
                {NEXT_STEP.link}
              </a>
            </div>

            <hr className={styles.nextRule} />
            {/* "ask about a clinic" is the link. The handover gives no target, so it
                goes to the same booking route as the button (flagged in the PR). */}
            <p className={styles.clinic}>
              {NEXT_STEP.clinic.replace('ask about a clinic.', '')}
              <a href={BOOKING_URL}>ask about a clinic</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer variant="full" />
    </>
  );
}

// The strip at the foot of a chapter card: the sponsor's logo in the chapter's
// tint, or its name as text until the file is in. Logos are height-matched.
// Only a sponsor with a `link` (card 01) is an <a>. Card 01 also carries one
// line under the logo, inside the strip so it sits on the tint; it is a second
// <a> to the same url, with the same target and rel.
function SponsorStrip({
  sponsor,
  partnerLine,
  tint,
}: {
  sponsor: Sponsor;
  partnerLine: string | null;
  tint: string;
}) {
  const { name, logo, link } = sponsor;

  const mark =
    logo === 'wordmark' ? (
      <Wordmark size="md" inverse />
    ) : logo ? (
      <Image
        src={logo.src}
        alt={name}
        width={logo.width}
        height={logo.height}
        className={styles.sponsorLogo}
        unoptimized={logo.src.endsWith('.svg')}
      />
    ) : (
      <span className={styles.sponsorName}>{name}</span>
    );

  return (
    <div
      className={link && partnerLine ? `${styles.sponsor} ${styles.sponsorStacked}` : styles.sponsor}
      style={{ background: tint }}
    >
      {link ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener"
          className={styles.sponsorLink}
          aria-label={link.label}
        >
          {mark}
        </a>
      ) : (
        mark
      )}
      {link && partnerLine ? (
        <a href={link.href} target="_blank" rel="noopener" className={styles.partnerLine}>
          {partnerLine}
        </a>
      ) : null}
    </div>
  );
}
