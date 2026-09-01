import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CredentialStrip } from '@/components/CredentialStrip';
import { ScopeLine } from '@/components/ScopeLine';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { SectionBar } from '@/components/SectionBar';
import { SevenQuestions } from '@/components/SevenQuestions';
import { BOOKING_URL, BOOKING_LABEL } from '@/lib/booking';
import {
  PRICE_ACCESS_ADVISORY,
  PRICE_ACCESS_ADVISORY_TERM,
  PRICE_ACCESS_PARTNER,
  PRICE_ACCESS_PARTNER_TERM,
  PRICE_DISCOVERY_DAY,
  TRUST_TIER_SCOPING,
} from '@/lib/pricing';
import styles from '@/app/route-page.module.css';

// /access — unbarrier.access, the partnership year. Replaces the May 2026
// holding page (five observations, the module menu, the INSET-day builder and
// the APLS bench, all now removed) with the approved copy.
//
// Copy verbatim from the approved page drafts (28 Aug 2026), with three
// rulings applied — each one recorded at its call site below:
//   1. the trust tier is named but not priced (THE_TIERS)
//   2. the "276,890" card is replaced (THE_GAP — it cited a figure that is not
//      in the report it credited)
//   3. the "£900m" card is removed entirely (see THE_GAP)
//
// PRICES LIVE IN lib/pricing.ts, not inline. These numbers get quoted back at
// us for years; a change should be a one-line diff and `grep PRICE_` should
// find every surface that shows one.
//
// "unbarrier.voice" appears in body copy on this page. It stays TEXT — /voice
// is unlinked and noindex pending legal sign-off. See app/voice/page.tsx.

const CANONICAL = 'https://www.unbarrier.me/access';

export const metadata: Metadata = {
  title:
    'unbarrier.access — a partnership year. everyone audits digital maturity; nobody audits whether it reaches the learner | unbarrier.me',
  description:
    'a partnership year is what happens after you know. three terms alongside your staff: noticing what is really happening, designing the change with them, modelling it in classrooms, and making it hold after we have gone.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'unbarrier.access — everyone audits digital maturity. nobody audits whether it reaches the learner.',
    description:
      'a partnership year is what happens after you know. three terms alongside your staff. one number for a defined outcome, quoted as a year and invoiced by term.',
    url: CANONICAL,
    type: 'website',
    images: [
      {
        url: '/assets/og-hello.png',
        width: 1200,
        height: 630,
        alt: 'Unbarrier — designed for difference.',
      },
    ],
  },
};

// ── the gap ──────────────────────────────────────────────────────────────
//
// TWO CARDS, NOT THREE. Both changes are corrections, not edits:
//
// REPLACED. The approved draft's second card read "276,890 — usage records
// from a single trust, analysed in the dfe's own june 2026 market assessment".
// That figure is NOT in that report. Verified against the published PDF on
// 29 Aug 2026: the report contains no six-digit sample size at all. The card
// below replaces it and is verified exact against the DfE Technology in
// Schools Survey 2024 to 2025 (published November 2025).
//
// BOTH FIGURES IN THE REPLACEMENT ARE MEASURED ON TEACHERS, NOT SCHOOLS, AND
// ON TWO DIFFERENT TEACHER POPULATIONS. "34% to 60%" is the proportion of
// PRIMARY TEACHERS who said assistive technology was available in their
// school. "41%" is the proportion of TEACHERS AS A WHOLE who could say it was
// completely or mostly fit for purpose. The body states the two populations
// separately on purpose — they are not the same denominator and collapsing
// them into one sentence would invent a claim the survey does not make. Do not
// rewrite either as "of schools" — that is a different population again, and a
// different claim.
//
// THE HEADLINE IS A WORD, NOT A FIGURE, and that is deliberate (29 Aug 2026).
// It used to read "34% → 60%". Both numbers came out of the headline and into
// the body:
//
//   * "60%" is Nici's own framing on the home page — "i call them the 60% in
//     the middle" — and it is explicitly NOT a statistic. There is no published
//     figure behind it, which is exactly why that line was rephrased to own it
//     as hers. A sourced 60% in large type one page away undoes that: a reader
//     who has seen both reads the home page number as data.
//   * "41%" collides too. The home page uses 41% for an unrelated figure — the
//     proportion of school leaders with any monitoring mechanism in 2023.
//     Two different 41%s in headline type across two pages is a trap.
//
// "nearly doubled" also came out. 34 to 60 is not a doubling, and on a page
// that sells evidence an overstated number is the whole problem in miniature.
//
// The headline is now a word, matching the "adults" card beside it. The
// figures are all still here, in the body, with their populations named.
//
// REMOVED. The draft's first card read "£900m — annual edtech spend by english
// schools… (written evidence to a parliamentary committee, april 2026)". The
// figure traces to an EEF guidance report from 2019 and was presented as 2026
// parliamentary evidence. A stale number is a shipping blocker on a page that
// sells evidence, so the card is gone rather than reworded. The section is
// designed to work as two cards plus the closing paragraph — do not add a
// third to balance the layout.
const THE_GAP: Array<{ figure: string; body: string; source?: string }> = [
  {
    figure: 'availability',
    body: 'between 2023 and 2025 the proportion of primary teachers with assistive technology available in their school rose from 34% to 60%. across teachers as a whole, 41% could say it was completely or mostly fit for purpose. availability got counted. whether it reached a learner did not.',
    source:
      'dfe, technology in schools survey 2024 to 2025, published november 2025',
  },
  {
    figure: 'adults',
    body: 'staff confidence, leadership vision, infrastructure maturity. all worth knowing. none of them ask whether the technology, the access or the communication landed with the learner it was meant for.',
  },
];

const SIX_PARTS =
  'online scoping · bespoke build · strategy with your team · training · modelling in class · reflection and a resource pack.';

// ── the tiers ────────────────────────────────────────────────────────────
//
// THE TRUST TIER IS NAMED, NOT PRICED. The approved draft carried "trust
// partner — from £18,000 / year (£6,000 a term, up to six schools)… additional
// schools £2,000 each". The 27 Aug brief is the more recent ruling and says
// the trust route is "named, not offered — do not put it on the same page as
// the two numbers above, or it becomes a third option and nobody chooses".
//
// NAMED IS THE LOAD-BEARING HALF of "named, not offered". The route has to be
// findable — a trust lead arriving from the home chooser needs to see
// something for them — so it keeps a description. What comes off is every
// figure and every piece of scope that only meant anything against the price
// it was scoped against: "from £18,000 / year", "up to six schools",
// "additional schools £2,000 each", "twelve pooled on-site half-days".
// Do not reintroduce a number or a count here without lifting the hold.
//
// "edtech partner — no public price" stays exactly as approved.
const TIERS: Array<{
  name: string;
  price: string;
  body: string;
  aside?: string;
}> = [
  {
    name: 'advisory',
    price: `${PRICE_ACCESS_ADVISORY} / year (${PRICE_ACCESS_ADVISORY_TERM} a term)`,
    body: 'monthly strategy call, an async question line, the voice baseline and endline, a termly governor-ready note, and the template library. no on-site time.',
    aside:
      'for the school that says it has no budget. this proves that is a spending decision, not a shortage.',
  },
  {
    name: 'partner · single school',
    price: `${PRICE_ACCESS_PARTNER} / year (${PRICE_ACCESS_PARTNER_TERM} a term)`,
    body: 'everything in advisory, plus six on-site half-days of classroom modelling, a whole-staff twilight, coaching for your own leads, and an end-of-year reflection that maps the next one.',
    aside: 'the core offer.',
  },
  {
    name: 'trust partner',
    price: TRUST_TIER_SCOPING,
    body: 'several settings, one picture across all of them, and a trust-level view.',
  },
  {
    name: 'edtech partner',
    price: 'no public price',
    body: 'blocks are scoped per cohort.',
    aside:
      'different buyer, different budget — and a conversation, not a menu.',
  },
];

const STANDARD_TERMS: string[] = [
  'training is priced per session, not pro-rata by the hour.',
  'audiences scale the price. the included headcount is named on every quote.',
  '50% on order, 50% at the midpoint.',
  'uk b2b late payment terms apply.',
  'intellectual property is licensed to you, never assigned.',
  `no free scoping. the ${PRICE_DISCOVERY_DAY} discovery day is the scoping, priced honestly.`,
];

// "in full" was deleted from the cost line below (Nici, 29 Aug 2026). It was
// true when every tier carried a number; after the trust-tier hold above it
// was not, and a false claim about pricing on the page that sells the pricing
// is the one place it cannot sit. Removal of a false statement, not a rewrite.
// The same deletion was made to the matching line on /faq.
const ANSWERED_UP_FRONT: string[] = [
  'what actually happens across a partnership year.',
  'how much of your staff’s time it takes.',
  'what is delivered, term by term.',
  'what it costs — the tiers above, before you ask.',
  'proof it has worked elsewhere.',
];

const OVER_TIME: Array<{ lead: string; body: string }> = [
  {
    lead: 'onboarding',
    body: 'the voice baseline, and the first plan we agree together.',
  },
  {
    lead: 'six months',
    body: 'modelling in classrooms, and the first movement you can see.',
  },
  {
    lead: 'two years',
    body: 'capacity built in your own leads. it holds without us in the room.',
  },
  {
    lead: 'five years',
    body: 'embedded practice, measured change, and renewal on evidence rather than goodwill.',
  },
];

const PROOF: Array<{ lead: string; body: string; aside: string }> = [
  {
    lead: 'a platform pays for our school training',
    body: 'goodnotes funds it, so there is no invoice to the school.',
    aside: 'not a testimonial. a commercial fact, and a harder one to fake.',
  },
  {
    lead: 'the accreditation',
    body: 'apple professional learning specialist, and 26 years in classrooms as a send specialist across uk state and international schools.',
    aside: 'the work is not a career change.',
  },
  {
    lead: 'what we are building right now',
    body: 'a device and digital inclusion instrument for an international schools group, with a technology partner.',
    aside:
      'in progress, not finished — and we would rather say that than imply otherwise.',
  },
  {
    lead: 'how we name people',
    body: 'schools and trusts by shape and scale, never by name without written permission asked for at contracting rather than afterwards.',
    aside:
      'if we would not name you without asking, we will not name anyone else to you either.',
  },
];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'unbarrier.access — partnership year',
  serviceType:
    'Accessibility and digital inclusion partnership for schools and trusts',
  description:
    'three terms alongside your staff: noticing what is really happening for learners, designing the change with your team, modelling it in classrooms, and making it hold after we have gone. one number for a defined outcome, quoted as a year and invoiced by term.',
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
  // Only the two published tiers appear in the schema. The trust route is
  // named on the page but deliberately unpriced, so it has no Offer here —
  // structured data must not carry a number the page refuses to show.
  offers: [
    {
      '@type': 'Offer',
      name: 'advisory',
      price: '2250',
      priceCurrency: 'GBP',
      url: CANONICAL,
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'partner · single school',
      price: '6000',
      priceCurrency: 'GBP',
      url: CANONICAL,
      availability: 'https://schema.org/InStock',
    },
  ],
};

export default function AccessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <Nav active="access" />

      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--princeton-orange)' } as CSSProperties}
      >
        <Glow color="var(--princeton-orange)" left="-120px" top="4%" size={620} opacity={0.1} />
        <Glow color="var(--spring-green)" right="-100px" top="46%" size={460} opacity={0.07} />

        <header className={styles.hero}>
          <Eyebrow color="var(--princeton-orange)">unbarrier.access</Eyebrow>
          <h1 className={styles.heading}>
            everyone audits digital maturity.{' '}
            <span className={styles.accent}>
              nobody audits whether it reaches the learner.
            </span>
          </h1>
          <p className={styles.lede}>
            a partnership year is what happens after you know. three terms
            alongside your staff: noticing what is really happening, designing
            the change with them, modelling it in classrooms, and making it hold
            after we have gone.
          </p>
          <p className={styles.lede}>
            one number for a defined outcome. quoted as a year, invoiced by
            term.
          </p>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
              {BOOKING_LABEL}
            </Button>
          </div>
          <CredentialStrip />
          <ScopeLine />
        </header>

        <SectionBar color="var(--princeton-orange)" />

        <section className={styles.section} aria-labelledby="the-gap">
          <h2 id="the-gap" className={styles.sectionHeading}>
            the gap
          </h2>
          <ul className={styles.cards}>
            {THE_GAP.map((card) => (
              <li key={card.figure} className={styles.card}>
                <p className={styles.cardFigure}>{card.figure}</p>
                <p className={styles.cardBody}>{card.body}</p>
                {card.source && (
                  <p className={styles.cardSource}>({card.source})</p>
                )}
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            the spend gets justified by the rollout, and the rollout gets
            justified by the spend. nobody is being careless. it is simply that
            the question was never on the form, and a question that isn&rsquo;t
            asked can&rsquo;t be answered, funded, or defended to a governing
            body.
          </p>
        </section>

        {/* The seven questions. Shared component — the same block renders on
            /voice, and it is deliberately identical. */}
        <SevenQuestions
          id="seven-questions"
          heading="what’s missing — the seven questions"
        />

        <section className={styles.section} aria-labelledby="the-method">
          <h2 id="the-method" className={styles.sectionEyebrow}>
            the method — the ndte cycle
          </h2>
          <p className={styles.statement}>notice → design → try → embed.</p>
          <p className={styles.body}>
            a partnership year runs the cycle three times, once a term. notice
            what is really happening, with voice. design the change with your
            team. try it and model it in classrooms. embed it so it holds after
            we have gone — then notice again, and find out whether it did.
          </p>
          <p className={styles.body}>
            that last part is the difference between a partnership and a stack
            of training days. most inclusion work stops at <em>try</em>, because{' '}
            <em>embed</em> is where you find out whether any of it worked.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="how-it-runs">
          <h2 id="how-it-runs" className={styles.sectionHeading}>
            how the work runs
          </h2>
          <p className={styles.body}>six parts to every engagement: {SIX_PARTS}</p>
          <p className={styles.body}>
            a day covers two of the six. a partnership covers all six — which is
            why the work is sold as a year, not a stack of day invoices. you get
            one number for a defined outcome, not an invoice that grows every
            time someone asks a question.
          </p>
        </section>

        {/* 1 Sep 2026. Sits directly after "how the work runs" because it is
            part of how the work runs, not a widening of who we will sell to.
            The argument is the thesis: a tool can be bought well and set up
            well and still not reach the learner, because one person in the
            chain was never asked. */}
        <section className={styles.section} aria-labelledby="who-is-in-the-room">
          <h2 id="who-is-in-the-room" className={styles.sectionHeading}>
            who is in the room
          </h2>
          <p className={styles.body}>
            a partnership year works with everyone the tool has to pass
            through, not only the people who chose it. teaching assistants,
            teachers, senco and inclusion leads, senior leaders, technicians.
          </p>
          <p className={styles.body}>
            that is deliberate, and it is the thesis. something can be bought
            well, configured well, and still not reach the learner, because one
            person in that chain was never asked.
          </p>
          <p className={styles.body}>
            a learner is anyone in a learning capacity. the teaching assistant
            learning a new tool is a learner too.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="what-a-year-costs">
          <h2 id="what-a-year-costs" className={styles.sectionHeading}>
            what a year costs
          </h2>
          <ul className={styles.tiers}>
            {TIERS.map((tier) => (
              <li key={tier.name} className={styles.tier}>
                <p className={styles.tierHead}>
                  <span className={styles.tierName}>{tier.name}</span>
                  <span className={styles.tierPrice}>{tier.price}</span>
                </p>
                <p className={styles.tierBody}>{tier.body}</p>
                {tier.aside && <p className={styles.tierAside}>{tier.aside}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="standard-terms">
          <h2 id="standard-terms" className={styles.sectionHeading}>
            standard terms — on every quote
          </h2>
          <ul className={styles.list}>
            {STANDARD_TERMS.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="answered-up-front">
          <h2 id="answered-up-front" className={styles.sectionHeading}>
            your questions, answered up front
          </h2>
          <ul className={styles.list}>
            {ANSWERED_UP_FRONT.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
          {/* "download: what a partnership year looks like (pdf)" was approved
              on 28 Aug but has not been written. No button here: a download
              button for a file that does not exist is a 404 wearing a cta, and
              a disabled button still advertises something we cannot supply.
              When the pdf lands, add the button back here. */}
        </section>

        <section className={styles.section} aria-labelledby="over-time">
          <h2 id="over-time" className={styles.sectionHeading}>
            what it looks like over time
          </h2>
          <ul className={styles.options}>
            {OVER_TIME.map((stage) => (
              <li key={stage.lead} className={styles.option}>
                <p className={styles.optionBody}>
                  <strong className={styles.strong}>{stage.lead}</strong> —{' '}
                  {stage.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="the-proof">
          <h2 id="the-proof" className={styles.sectionEyebrow}>
            the proof — written for an offer that is new
          </h2>
          <p className={styles.statement}>
            the partnership year is new. here is what isn&rsquo;t.
          </p>
          <p className={styles.body}>
            we are not going to show you a testimonial for something nobody has
            bought yet. what follows is what actually stands behind it.
          </p>
          <ul className={styles.options}>
            {PROOF.map((item) => (
              <li key={item.lead} className={styles.option}>
                <p className={styles.optionBody}>
                  <strong className={styles.strong}>{item.lead}</strong> —{' '}
                  {item.body}
                </p>
                <p className={styles.aside}>{item.aside}</p>
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            <strong className={styles.strong}>
              and the thing we would rather you judged us on:
            </strong>{' '}
            book the discovery day. {PRICE_DISCOVERY_DAY}, one day, no lock-in,
            and you will know inside a week whether we are any good. that is a
            cheaper test than any case study.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="goodnotes">
          <h2 id="goodnotes" className={styles.sectionHeading}>
            the goodnotes proof, in full
          </h2>
          <p className={styles.body}>
            <strong className={styles.strong}>
              goodnotes funds our training for schools.
            </strong>{' '}
            not a testimonial, not a logo on a slide — a platform paying for the
            delivery, so there is no invoice to the school. the full
            implementation hub is public, and it runs on the same notice →
            design → try → embed cycle as everything else here.
          </p>
          <div className={styles.ctaRow}>
            <Button href="/goodnotes" variant="ghost">
              see the goodnotes hub →
            </Button>
          </div>
        </section>

        <SectionBar color="var(--princeton-orange)" />

        <section className={styles.close} aria-labelledby="close">
          <h2 id="close" className={styles.closeHeading}>
            tell us what you&rsquo;re working with. if we can help, we&rsquo;ll
            say how. if we can&rsquo;t, we&rsquo;ll point you to someone who
            can.
          </h2>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
              {BOOKING_LABEL}
            </Button>
          </div>
        </section>

        <NewsletterBand route="/access" weight="standard" />


        <Footer variant="full" />
      </main>
    </>
  );
}
