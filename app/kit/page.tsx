import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { Section } from '@/components/Section';
import { KitForm } from '@/components/kit/KitForm';
import { PRINCIPLES, SPONSOR_LINE, kitSource } from '@/lib/kit';
import { BOOKING_URL } from '@/lib/booking';
import { SITE_FLAGS } from '@/lib/site-flags';
import styles from '@/app/route-page.module.css';
import kit from './page.module.css';

// /kit — the seven free guides to the inclusion strategy, one per principle.
// Stage 8 of the 13 Sep 2026 rebuild, from Site.dc.html → isKit (k0–k8). The
// block ids stay on the wrappers so a question back to Nici can name one.
//
//   k0  hero (orange glow) · one button, scrolls to the form
//   k1  three things to know (ground-400) · three cards · the page's one
//       full-strength block ("2026 has no previous year") · the quote
//   k2  what the kit is (second)
//   k3  the contents (deep) — seven rows in build order, ready / this term,
//       the sponsor states, the disclosure line
//   k4  get the guides (base) — the form, once (Nici, 13 Sep: one cta per
//       page; the spec's second form at the foot is gone)
//   k5  who this is for (second)
//   k6  who wrote them (deep)
//   k7  reading them (base)
//   k8  close (well, loose) · footer
//
// NO NEWSLETTER BAND: the consent box in the form is the notice route on
// this page. One cta: the form. The close's primary is the call; its ghost
// points back up to the form.
//
// COPY: the Notion "kit landing page — spec + copy draft" (5 Sep 2026) and
// the 8 Sep amendment pass, applied near-verbatim. Changes carried from the
// handover, for Nici to keep or revert: "i" → "we" in the paddy-rule
// sentence (site rule); the scope line has its own block (k5); the
// disclosure sentence under the contents (not in the spec); the "who wrote
// them" lines and the ghost label are the handover's.
//
// THE FIGURE RULE holds: "31 dec", "2026", "step 1" and "yearly" are dates
// and counts, not figures. No price, no statistic on this page.
//
// GO-LIVE (SITE_FLAGS.kitPublic, off): the privacy notice does not yet name
// the guides and there is no /accessibility statement. Until both exist the
// route is noindex and out of the sitemap, like /voice. The k7 "full
// statement →" link is not rendered until that page exists — a dead link
// beats nothing only on a page nobody has been sent to.

const CANONICAL = 'https://www.unbarrier.me/kit';

export const metadata: Metadata = {
  title: 'the kit — seven free guides to your inclusion strategy | unbarrier.me',
  description:
    'your inclusion strategy is due on 31 december. seven guides for writing one that still holds up a year after you publish it. england, mainstream.',
  alternates: { canonical: CANONICAL },
  robots: SITE_FLAGS.kitPublic
    ? undefined
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: 'the kit — seven free guides to your inclusion strategy',
    description:
      'seven guides for writing an inclusion strategy that still holds up a year after you publish it.',
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

const KNOW: Array<{ figure: string; title: string; body: string }> = [
  {
    figure: '31 dec',
    title: 'the deadline',
    body: 'every mainstream school in england publishes an inclusion strategy by then.',
  },
  {
    figure: 'step 1',
    title: 'a cohort-level barrier audit',
    body: 'most schools have never been asked to do one and have no instrument for it.',
  },
  {
    figure: 'yearly',
    title: 'not a one-off',
    body: 'you republish every academic year with a review of the last one. what you write this december is the baseline every future review is measured against.',
  },
];

const GIVES: string[] = [
  'what the guidance actually asks for, in plain language',
  'what a good version looks like, and what an off-guidance one looks like',
  'one activity you can run this term, with a baseline that can fail',
];

type Props = {
  searchParams?: { from?: string | string[] };
};

export default function KitPage({ searchParams }: Props) {
  const source = kitSource(searchParams?.from);

  return (
    <>
      <Nav />
      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--princeton-orange)' } as CSSProperties}
      >
        {/* k0 — hero */}
        <div id="k0" className={styles.heroBand}>
          <Glow color="var(--princeton-orange)" left="-8%" top="0%" size={540} opacity={0.1} />
          <header className={styles.heroInner}>
            <Eyebrow color="var(--princeton-orange)">
              the kit · seven free guides · england, mainstream
            </Eyebrow>
            <h1 className={styles.heading}>
              your inclusion strategy is due on 31 december
            </h1>
            <p className={styles.ledeMuted}>
              seven guides for writing one that still holds up a year after you
              publish it.
            </p>
            <div className={styles.ctaRow}>
              {/* Scrolls down this page to the form — the one cta. */}
              <Button href="#k4" color="var(--princeton-orange)">
                get the guides →
              </Button>
            </div>
          </header>
        </div>

        {/* k1 — three things to know before you start */}
        <div id="k1" className={kit.knowBand}>
          <div className={kit.knowInner}>
            <h2 className={styles.sectionHeading}>
              three things to know before you start
            </h2>
            <ol className={kit.know}>
              {KNOW.map((item) => (
                <li key={item.figure} className={kit.knowCard}>
                  <p className={kit.knowFigure}>{item.figure}</p>
                  <p className={kit.knowTitle}>{item.title}</p>
                  <p className={kit.knowBody}>{item.body}</p>
                </li>
              ))}
            </ol>
            {/* The page's one full-strength block. */}
            <div className={kit.setsTheLine}>
              <p className={kit.setsTheLineYear}>2026</p>
              <p className={kit.setsTheLineText}>
                has no previous year. this document sets the line.
              </p>
            </div>
            <blockquote className={kit.quote}>
              this is demand management wearing an inclusion coat. the
              universal-offer logic is right, but the driver is the deficit,
              not the child. you already knew that. the guides are written for
              people who know that.
            </blockquote>
          </div>
        </div>

        {/* k2 — what the kit is */}
        <Section id="k2" measure="route" ground="second" labelledBy="what-kit">
          <h2 id="what-kit" className={styles.sectionHeading}>
            what the kit is
          </h2>
          <p className={`${styles.body} ${styles.spaceBelow}`}>
            seven guides, one per principle. each one gives you three things:
          </p>
          <ol className={kit.gives}>
            {GIVES.map((line, i) => (
              <li key={line} className={kit.givesRow}>
                <span className={kit.givesNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className={styles.optionBody}>{line}</p>
              </li>
            ))}
          </ol>
          <p className={styles.bodyText}>
            <strong>no template to fill in. no tool to buy. no badge at the end.</strong>
          </p>
        </Section>

        {/* k3 — the contents */}
        <Section id="k3" measure="route" ground="deep" labelledBy="contents">
          <h2 id="contents" className={styles.sectionHeading}>
            the contents
          </h2>
          <p className={`${styles.body} ${styles.spaceBelow}`}>
            two are ready now. five follow this term, in build order. you get
            each one the day it lands.
          </p>
          <ol className={kit.contents}>
            {PRINCIPLES.map((p) => (
              <li key={p.n} className={kit.row}>
                <span className={kit.rowNum} aria-hidden="true">
                  {p.n}
                </span>
                <div className={kit.rowBody}>
                  <div className={kit.rowHead}>
                    <p className={kit.rowTitle}>
                      principle {p.num} · {p.name}
                    </p>
                    {p.ready ? (
                      <span className={kit.pill}>ready now</span>
                    ) : (
                      <span className={kit.soon}>this term</span>
                    )}
                  </div>
                  {p.sponsor !== 'none' && (
                    <p className={kit.sponsor}>
                      <span>{SPONSOR_LINE[p.sponsor]}</span>
                      {p.sponsor === 'paid' && (
                        // The sponsor's logo goes here, as supplied, once one
                        // has paid. Decorative until then.
                        <span className={kit.logoSlot} aria-hidden="true" />
                      )}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {/* Not in the spec — the handover's line. Nici to approve or cut. */}
          <p className={kit.disclosure}>
            principle names are the conditions of grant wording. a
            sponsor&rsquo;s name against a principle means they paid for that
            guide to be free. it does not mean they wrote it, and it does not
            mean we recommend them.
          </p>
        </Section>

        {/* k4 — get the guides */}
        <Section id="k4" measure="route" ground="base" labelledBy="get-guides">
          <h2 id="get-guides" className={styles.sectionHeading}>
            get the guides
          </h2>
          <p className={`${styles.body} ${styles.spaceBelow}`}>
            the two that are ready go to your inbox now. the other five follow
            as they land.
          </p>
          <KitForm source={source} />
        </Section>

        {/* k5 — who this is for */}
        <Section id="k5" measure="route" ground="second" labelledBy="scope">
          <h2 id="scope" className={styles.sectionHeading}>
            who this is for
          </h2>
          <p className={styles.body}>
            <strong className={styles.strong}>england, mainstream.</strong>{' '}
            wales runs the aln act, and specialist settings have a different
            job. if that&rsquo;s you, the guides will still read, but the
            deadline and the duty are not yours.
          </p>
        </Section>

        {/* k6 — who wrote them */}
        <Section id="k6" measure="route" ground="deep" labelledBy="who-wrote">
          <h2 id="who-wrote" className={styles.sectionHeading}>
            who wrote them
          </h2>
          <div className={kit.who}>
            {/* Decorative — the line beside it names her. */}
            <Image
              src="/assets/nici-avatar.png"
              alt=""
              aria-hidden="true"
              width={120}
              height={120}
              className={kit.portrait}
            />
            <div className={kit.whoText}>
              <p className={kit.whoLine}>
                nici, unbarrier&rsquo;s founder. 26 years in classrooms &mdash;
                qts, send, uk state and international.
              </p>
              <p className={kit.whoLine}>
                the guides say what we would say in your staffroom. they are not
                a sales document, and nothing in them needs us to be in the
                room.
              </p>
            </div>
          </div>
        </Section>

        {/* k7 — reading them */}
        <Section id="k7" measure="route" ground="base" labelledBy="k-access">
          <h2 id="k-access" className={styles.sectionHeading}>
            reading them
          </h2>
          {/* "full statement →" is added here when /accessibility exists —
              see the go-live note in the docblock. */}
          <p className={styles.body}>
            these guides are tagged, screen-reader tested, and written to be
            read. if you need a different format, ask and you&rsquo;ll get one.
          </p>
        </Section>

        {/* k8 — close · footer */}
        <div id="k8">
          <Section measure="route" ground="well" space="loose" labelledBy="k-closing">
            <h2 id="k-closing" className={styles.closeHeading}>
              the next step
            </h2>
            <p className={`${styles.closeLede} ${styles.spaceBelow}`}>
              the guide is free. a 45-minute call is free. the moment we open
              your strategy, it&rsquo;s a discovery day.
            </p>
            <div className={styles.ctaRow}>
              <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
                book 45 minutes →
              </Button>
              <Button href="#k4" variant="ghost">
                not yet — get the guides first ↑
              </Button>
            </div>
          </Section>
          <Footer variant="full" />
        </div>
      </main>
    </>
  );
}
