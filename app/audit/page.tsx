import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { CredentialStrip } from '@/components/CredentialStrip';
import { ScopeLine } from '@/components/ScopeLine';
import { StrandLockup } from '@/components/Lockup';
import { Footer } from '@/components/Footer';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { Section } from '@/components/Section';
import { BOOKING_URL, BOOKING_LABEL } from '@/lib/booking';
import { PRICE_DISCOVERY_DAY } from '@/lib/pricing';
import {
  READINESS_CHECK_ENABLED,
  READINESS_CHECK_HREF,
  READINESS_CHECK_LABEL,
} from '@/lib/readiness-check';
import styles from '@/app/route-page.module.css';

// /audit — unbarrier.audit, the discovery day.
//
// This route did not exist and returned 404 on the live site. /legal/terms
// already tells people unbarrier offers "audit, access and voice consultancy
// packages described on the site", so the terms page was pointing at a 404.
// A 29 July note recorded this route as "built, needs publishing"; it never
// merged.
//
// Copy is verbatim from the approved page drafts (28 Aug 2026).
//
// GROUNDS (2 Sep 2026). The hero sits on the page; the sections walk the
// ladder 400 → 300 → 500 and the close is the 200 well. "try it first" is
// conditional, so its neighbours are chosen to alternate with it either way.
// One full-strength block: the price line. The three options sit on the
// action panel (green) — they are what happens next.
//
// THE PRIMARY CTA. The approved copy gives this page a primary cta of "take
// the free readiness check". The readiness check is branch E and does not
// exist yet, so the destination sits behind READINESS_CHECK_ENABLED in
// lib/readiness-check.ts and falls back to the booking link. The LABEL falls
// back with it — see PRIMARY_CTA below.

const CANONICAL = 'https://www.unbarrier.me/audit';

// The label and the destination move together. Shipping the approved label
// pointed at the booking link would be the same broken promise as a "book"
// button that opens an email client: the button would say "take the free
// readiness check" and the visitor would land on a calendar.
const PRIMARY_CTA = READINESS_CHECK_ENABLED
  ? { href: READINESS_CHECK_HREF, label: READINESS_CHECK_LABEL, external: false }
  : { href: BOOKING_URL, label: BOOKING_LABEL, external: true };

export const metadata: Metadata = {
  title:
    'unbarrier.audit — a discovery day. find out if what you bought reached the learners | unbarrier.me',
  description:
    'you have already bought what you need. a discovery day is the small, honest first step to find out what is actually landing with learners, and what isn’t. one day. £500. no lock-in.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'unbarrier.audit — you have already bought what you need. let’s find out if it reached the learners.',
    description:
      'a discovery day is the small, honest first step to find out what is actually landing with learners, and what isn’t. one day. £500. no lock-in.',
    url: CANONICAL,
    type: 'website',
    images: [
      {
        // A segment that exports its own `openGraph` does not inherit the
        // file-based card — openGraph is replaced per segment, not merged.
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'unbarrier — designed for difference. did it reach the child?',
      },
    ],
  },
};

// "try it first — the free readiness check". Rendered only when the check
// exists. Every line of it is present tense about a thing a visitor can do
// right now ("five minutes, and you see something useful"), and there is
// currently nothing to send them to — a section selling a product with no
// door is the same shipping blocker as a cta to a 404, so it is gated on the
// same flag rather than shipped as a dead end. Copy is approved and unchanged;
// branch E turns it on with the cta. Flagged for Nici in the PR.
const READINESS_CHECK_POINTS: string[] = [
  'five minutes, and you see something useful before any sign-up wall.',
  'an instant snapshot of where access is reaching learners, and where it isn’t.',
  'a result you can forward to your leadership team — so the person who spots the need can put it in front of the person who holds the budget.',
];

const WHAT_A_DAY_IS: string[] = [
  'a day in your setting, looking at what is really happening for learners, not what the strategy says should be.',
  'time in classrooms, and time with the people who have to set it up on a tuesday.',
  'an honest read across the things that decide whether access reaches a learner: getting in, communicating, working independently, taking part, and whether it holds when the champion isn’t in the room.',
];

const WALK_AWAY_WITH: string[] = [
  'a clear picture of what is landing and what isn’t.',
  'the specific gaps, named, so they can be funded, defended to a governing body, and acted on.',
  'a short, governor-ready summary you can actually use.',
  'a roadmap: what to do next and in what order, whether or not you do any of it with us.',
];

// `lead` is the bolded opening of each option in the source copy.
const THREE_OPTIONS: Array<{ lead: string; body: string }> = [
  {
    lead: 'you take it from here.',
    body: 'the roadmap is yours. plenty of schools have everything they need to act on it themselves. no follow-on required.',
  },
  {
    lead: 'a block of days.',
    body: 'if you want hands-on help with the work — modelling in classrooms, coaching your leads — we scope a block together. priced to the work, in conversation.',
  },
  {
    lead: 'an ongoing partnership.',
    body: 'if this is a year of change and not a one-off, unbarrier.access is the year-long version.',
  },
];

const WHAT_TO_EXPECT: string[] = [
  'what happens on the day, and who we need to see.',
  'how much of your staff’s time it takes. very little.',
  'what you walk away with.',
  `what it costs: ${PRICE_DISCOVERY_DAY}, no lock-in.`,
  'what usually happens next.',
];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'unbarrier.audit — discovery day',
  serviceType: 'Accessibility and digital inclusion discovery day for schools',
  description:
    'a day in your setting finding out whether the technology, the access and the communication you have already bought are reaching the learners they were bought for. you walk away with a picture of what is landing, the specific gaps named, a governor-ready summary and a roadmap.',
  url: CANONICAL,
  provider: {
    '@type': 'Organization',
    name: 'Unbarrier Education Ltd',
    url: 'https://www.unbarrier.me',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'Schools and multi-academy trusts',
  },
  offers: {
    '@type': 'Offer',
    name: 'discovery day',
    price: '500',
    priceCurrency: 'GBP',
    url: CANONICAL,
    availability: 'https://schema.org/InStock',
  },
};

export default function AuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <Nav active="audit" />

      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--pearl-aqua)' } as CSSProperties}
      >
        <Glow color="var(--pearl-aqua)" left="-120px" top="4%" size={620} opacity={0.1} />
        <Glow color="var(--spring-green)" right="-100px" top="44%" size={460} opacity={0.07} />

        <header className={styles.hero}>
          {/* The sub-brand lockup, inlined, in place of the text eyebrow that
              read "unbarrier.audit". Same words, now the aria-label. */}
          <StrandLockup strand="audit" className={styles.lockup} />
          <h1 className={styles.heading}>
            you have already bought what you need.{' '}
            <span className={styles.accent}>
              let&rsquo;s find out if it reached the learners.
            </span>
          </h1>
          <p className={styles.lede}>
            the devices are in. the licences are paid. and the strategy took
            real time to write — senco hours that came out of classrooms, staff
            meetings, a governors&rsquo; paper, a review cycle.
          </p>
          <p className={styles.lede}>
            a discovery day is the small, honest first step to find out what all
            of that is actually landing with learners, and what isn&rsquo;t. one
            day. {PRICE_DISCOVERY_DAY}. no lock-in.
          </p>
          <div className={styles.ctaRow}>
            <Button
              href={PRIMARY_CTA.href}
              color="var(--pearl-aqua)"
              external={PRIMARY_CTA.external}
            >
              {PRIMARY_CTA.label}
            </Button>
          </div>
          <CredentialStrip />
          <ScopeLine />
        </header>

        {READINESS_CHECK_ENABLED && (
          <Section measure="route" ground="second" labelledBy="try-it-first">
            <h2 id="try-it-first" className={styles.sectionHeading}>
              try it first — the free readiness check
            </h2>
            <ul className={styles.list}>
              {READINESS_CHECK_POINTS.map((line) => (
                <li key={line} className={styles.listItem}>
                  {line}
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section measure="route" ground="deep" labelledBy="why-a-day">
          <h2 id="why-a-day" className={styles.sectionEyebrow}>
            why a day
          </h2>
          <p className={styles.statement}>
            the question nobody put on the form.
          </p>
          <p className={styles.body}>
            readiness tools score the organisation: staff confidence, leadership
            vision, infrastructure. all worth knowing. none of them ask whether
            the technology, the access or the communication actually landed with
            the learner it was bought for.
          </p>
          <p className={styles.body}>
            it is not that anyone decided it did not matter. it is that the
            question was never on the form — and a question nobody asks cannot
            be answered, funded, or defended to a governing body. that is where
            a discovery day starts.
          </p>
        </Section>

        <Section measure="route" ground="base" labelledBy="where-it-sits">
          <h2 id="where-it-sits" className={styles.sectionHeading}>
            where a discovery day sits
          </h2>
          <p className={styles.body}>
            a discovery day is <strong className={styles.strong}>notice</strong>{' '}
            — the first step of the ndte cycle every piece of our work runs on.
            notice → design → try → embed. you cannot design a change honestly
            until you know what is actually happening, and almost nobody starts
            there.
          </p>
        </Section>

        <Section measure="route" ground="second" labelledBy="what-a-day-is">
          <h2 id="what-a-day-is" className={styles.sectionHeading}>
            what a discovery day is
          </h2>
          <ul className={styles.list}>
            {WHAT_A_DAY_IS.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
          {/* The page's one full-strength block: the price, as the commitment. */}
          <p className={styles.pull}>
            {PRICE_DISCOVERY_DAY}. one day. that is the whole commitment.
          </p>
        </Section>

        <Section measure="route" ground="deep" labelledBy="walk-away">
          <h2 id="walk-away" className={styles.sectionHeading}>
            what you walk away with
          </h2>
          <ul className={styles.list}>
            {WALK_AWAY_WITH.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
        </Section>

        <Section measure="route" ground="base" labelledBy="three-options">
          <h2 id="three-options" className={styles.sectionHeading}>
            after the day, three honest options
          </h2>
          <ul className={styles.options}>
            {THREE_OPTIONS.map((option) => (
              <li
                key={option.lead}
                className={`${styles.option} ${styles.panelAction}`}
              >
                <p className={styles.optionBody}>
                  <strong className={styles.strong}>{option.lead}</strong>{' '}
                  {option.body}
                </p>
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            the first option is real. it is what makes the other two worth
            trusting.
          </p>
        </Section>

        {/* The approved draft carries a reviewer note under this section:
            "the cross-cutting questions live on the faq". The copy points a
            reader there at exactly this moment, so the section ends with a
            contextual link rather than leaving footer reachability to do the
            work on its own. */}
        <Section measure="route" ground="second" labelledBy="what-to-expect">
          <h2 id="what-to-expect" className={styles.sectionHeading}>
            what to expect
          </h2>
          <ul className={styles.list}>
            {WHAT_TO_EXPECT.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            the cross-cutting questions live on{' '}
            <Link href="/faq" className={styles.inlineLink}>
              the faq
            </Link>
            .
          </p>
        </Section>

        <Section measure="route" ground="deep" labelledBy="who-for">
          <h2 id="who-for" className={styles.sectionHeading}>
            who this is for
          </h2>
          <p className={styles.body}>
            schools, trusts and colleges who have already invested in the tools
            and want to know, honestly, whether it is reaching the learners it
            was bought for. especially where inclusion and send are the point,
            not an afterthought.
          </p>
          {/* 1 Sep 2026. Working with the whole chain is deliberate and it is
              the thesis, not a wider net cast to catch more buyers. The
              approved first paragraph is unchanged apart from "and colleges". */}
          <p className={styles.body}>
            <strong className={styles.strong}>
              and we work with everyone in the chain, on purpose.
            </strong>{' '}
            the teaching assistant who sets it up. the teacher who plans around
            it. the technician who configures it. the leader who signed it off.
          </p>
          <p className={styles.body}>
            a learner is anyone in a learning capacity, so the teaching
            assistant learning a new tool is a learner too. if it only reaches
            the person who bought it, it hasn&rsquo;t reached anyone.
          </p>
        </Section>

        <Section measure="route" ground="well" space="loose" labelledBy="close">
          <h2 id="close" className={styles.closeHeading}>
            tell us what you&rsquo;re working with. if we can help, we&rsquo;ll
            say how. if we can&rsquo;t, we&rsquo;ll point you to someone who
            can.
          </h2>
          {/* Approved copy closes on two ctas: the readiness check and the
              booking link. While the check is off they resolve to the same
              destination, so this renders one button rather than the same link
              twice under two labels. */}
          <div className={styles.ctaRow}>
            {READINESS_CHECK_ENABLED && (
              <Button href={READINESS_CHECK_HREF} color="var(--pearl-aqua)">
                {READINESS_CHECK_LABEL}
              </Button>
            )}
            <Button
              href={BOOKING_URL}
              color={
                READINESS_CHECK_ENABLED ? 'var(--spring-green)' : 'var(--pearl-aqua)'
              }
              external
            >
              {BOOKING_LABEL}
            </Button>
          </div>
        </Section>

        <NewsletterBand route="/audit" weight="standard" />


        <Footer variant="full" />
      </main>
    </>
  );
}
