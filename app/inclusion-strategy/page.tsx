import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CredentialStrip } from '@/components/CredentialStrip';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Icon, type IconName } from '@/components/Icon';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Section } from '@/components/Section';
import { BOOKING_LABEL, BOOKING_URL } from '@/lib/booking';
import { PRICE_DISCOVERY_DAY } from '@/lib/pricing';
import { READINESS_CHECK_HREF } from '@/lib/readiness-check';
import { SITE_FLAGS } from '@/lib/site-flags';
import styles from '@/app/route-page.module.css';

// /inclusion-strategy — the one page on the site with revenue attached to a
// date. Schools receiving Inclusive Mainstream Funding must publish an
// inclusion strategy by 31 December 2026, and a page published in late
// November ranks in January.
//
// Stage 7 of the 13 Sep 2026 rebuild: the page moved onto the ground ladder,
// block for block from the design handover (Site.dc.html → isInclusionStrategy,
// d0–d7). The block ids stay on the wrappers. Copy is the approved 28 Aug
// draft as the handover carried it, with the changes listed below.
//
//   d0  hero (orange glow) · primary /book · ghost scrolls to #d5
//   d1  the scope band — no identity block on this page (handover rule)
//   d2  every school publishes its own (second)
//   d3  the guided co-write (deep) · three steps on panels · the ndte icons
//   d4  not a one-off (base) · the page's one .pull
//   d5  what it costs (second) · the discovery day card · funding line (flag)
//   d6  who this is for (deep)
//   d7  close (well, loose) · ghost behind showGhostCta · newsletter · footer
//
// CHANGES FROM THE 28 AUG COPY, CARRIED FROM THE HANDOVER (so Nici can
// revert any of them):
//  1. Step 01 is "a discovery day", not "a readiness check". The site plan's
//     settled decision: discovery = /audit, the paid notice step. The step's
//     own line ("one day in your setting") describes the day, not the free
//     five-minute check. The FAQ schema answer says the same.
//  2. The hero gains a ghost ("what it costs →") that scrolls to d5. Still
//     one cta per page: the ghost is not a second destination.
//  3. The close gains a ghost to the readiness check, behind
//     SITE_FLAGS.showGhostCta (the "sideways" route — Nici's yes/no pending).
//     The prototype pointed it at /audit; the label promises the check, so
//     it links the check (label and destination move together — see
//     lib/readiness-check.ts).
//  4. The identity block came off (d1 is the scope band) — the handover rule
//     that it appears on home and /about only.
//
// Three lines on this page are load-bearing and must not be paraphrased:
//
//  1. The funding line names principle 7 and stops there. Unbarrier cannot
//     declare a third party's spend eligible, and the fund's "pre-existing
//     activity" exclusion could bite a school that already buys accessibility
//     training. Naming the principle and leaving the decision with the school
//     is the whole point of the wording.
//  2. "every school has to publish its own, on its own website." — NOT "your
//     trust cannot write this one for you", which overstates: nothing forbids
//     a trust from helping, what is required is per-school publication.
//  3. The "shared responsibility across your whole leadership team" quote is
//     a direct quote from the published guidance. Do not paraphrase it.
//
// VOCABULARY RULING (Nici, 29 Aug 2026): unbarrier.voice runs on seven
// QUESTIONS. Always "questions", never "domains".
//
// There is deliberately NO week count anywhere on this page. A hardcoded
// countdown is right on the day it ships and wrong every day after. The
// fixed statutory date does that work instead, and never goes out of date.

const CANONICAL = 'https://www.unbarrier.me/inclusion-strategy';

// Both search terms are load-bearing: "inclusion strategy" is what a SENCO
// types, "inclusive mainstream fund" is what a business manager types.
export const metadata: Metadata = {
  title:
    'inclusion strategy support — for schools with an inclusive mainstream fund allocation | unbarrier.me',
  description:
    'every school with an inclusive mainstream fund allocation has to publish its own inclusion strategy by 31 december 2026. we help your leadership team write it — guided, not done for you.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'inclusion strategy support — for schools with an inclusive mainstream fund allocation',
    description:
      'every school with an inclusive mainstream fund allocation has to publish its own inclusion strategy by 31 december 2026. we help your leadership team write it — guided, not done for you.',
    url: CANONICAL,
    type: 'website',
  },
};

const NDTE: Array<{ lead: string; icon: IconName }> = [
  { lead: 'notice', icon: 'ndte-notice' },
  { lead: 'design', icon: 'ndte-design' },
  { lead: 'try', icon: 'ndte-try' },
  { lead: 'embed', icon: 'ndte-embed' },
];

// The three steps of the guided co-write. `aside` carries the italic line
// that follows each one in the source copy.
const STEPS: Array<{ n: string; title: string; body: string; aside: string }> = [
  {
    n: '01',
    title: 'a discovery day',
    body: 'one day in your setting: what is actually reaching learners now, across the seven questions.',
    aside: 'you cannot write an honest strategy from an impression.',
  },
  {
    n: '02',
    title: 'modelling in classrooms',
    body: 'we work alongside your staff in real lessons, so the strategy describes practice that exists rather than practice you hope for.',
    aside: 'this is the part that makes the document survive its first term.',
  },
  {
    n: '03',
    title: 'a guided writing session',
    body: 'your leadership team in a room, writing it, with us asking the questions and holding the structure.',
    aside: 'you leave with the document. the words are yours.',
  },
];

const WHO_FOR: Array<{ term: string; body: string }> = [
  {
    term: 'schools',
    body: 'with inclusive mainstream funding and a document to publish by 31 december.',
  },
  {
    term: 'trusts',
    body: 'who have realised they cannot do this once and copy it across.',
  },
  {
    term: 'senco and inclusion leads',
    body: 'who know what the strategy should say and have no time to write it.',
  },
];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'inclusion strategy support',
  serviceType: 'Inclusion strategy development for schools',
  description:
    'guided co-write support for schools that must publish an inclusion strategy by 31 december 2026 under inclusive mainstream funding. a discovery day, modelling in classrooms, and a guided writing session with your leadership team.',
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
  // The discovery day is the only price on this page, and the only price in
  // the schema. Everything after it is scoped per setting and quoted privately.
  offers: {
    '@type': 'Offer',
    name: 'discovery day',
    price: '500',
    priceCurrency: 'GBP',
    url: CANONICAL,
    availability: 'https://schema.org/InStock',
  },
};

// FAQPage built from the questions this page already answers. The answers are
// the page copy verbatim — only the question phrasing is schema-side, so the
// visible page carries no copy that was not reviewed.
const FAQ: Array<{ q: string; a: string }> = [
  {
    q: 'does every school have to publish its own inclusion strategy?',
    a: 'every school has to publish its own, on its own website. not one strategy authored centrally and issued across the group. each school publishes its own document, on its own site.',
  },
  {
    q: 'do you write the strategy for us?',
    a: "we don't write your strategy. a strategy written by a consultant reads like a consultant wrote it, and every member of staff can tell within a paragraph. the guidance agrees with us. it says developing the strategy “should be a shared responsibility across your whole leadership team”. it does not mention engaging anyone to write it for you. so the model is the school owning the words and a specialist asking the questions.",
  },
  {
    q: 'what does the support actually involve?',
    a: 'a discovery day — one day in your setting: what is actually reaching learners now, across the seven questions. modelling in classrooms — we work alongside your staff in real lessons, so the strategy describes practice that exists rather than practice you hope for. a guided writing session — your leadership team in a room, writing it, with us asking the questions and holding the structure.',
  },
  {
    q: 'is this a one-off document?',
    a: 'the requirement is to publish an updated inclusion strategy statement annually, and one of the four things it must contain is a review of the previous academic year. december is not the finish line. it is the first one. whatever you write this term, you will be reporting against it next october — which is worth knowing before you write something you cannot evidence.',
  },
  {
    q: 'what does it cost?',
    a: `a discovery day is ${PRICE_DISCOVERY_DAY} — one day, no lock-in. the honest first step. you get three things from it: a picture of what is reaching learners now, the specific gaps named in language a governor accepts, and a roadmap for the strategy you have to publish. what comes after that is scoped to your setting and costed as one number for a defined outcome. we will tell you what it is before you commit to anything.`,
  },
  {
    q: 'how do schools fund this?',
    a: 'schools fund this from their inclusive mainstream fund allocation under principle 7 — inclusive environments with continuous improvements to accessibility.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function InclusionStrategyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <Nav active="inclusion-strategy" />

      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--princeton-orange)' } as CSSProperties}
      >
        {/* d0 — hero */}
        <div id="d0" className={styles.heroBand}>
          <Glow color="var(--princeton-orange)" left="-8%" top="0%" size={540} opacity={0.1} />
          <header className={styles.heroInner}>
            <Eyebrow color="var(--princeton-orange)">
              for schools with inclusive mainstream funding
            </Eyebrow>
            <h1 className={styles.heading}>
              your inclusion strategy has to be published by 31 december. and it
              has to be yours.
            </h1>
            <p className={styles.ledeMuted}>
              we help schools write it &mdash; guided, not done for you. you
              finish the term with a document your staff recognise, because
              your staff wrote it.
            </p>
            <div className={styles.ctaRow}>
              <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
                {BOOKING_LABEL}
              </Button>
              {/* Scrolls down this page only — not a second destination. */}
              <Button href="#d5" variant="ghost">
                what it costs →
              </Button>
            </div>
          </header>
        </div>

        {/* d1 — the scope band */}
        <CredentialStrip variant="scope" id="d1" />

        {/* d2 — every school publishes its own */}
        <Section id="d2" measure="route" ground="second" labelledBy="per-school">
          <Eyebrow color="var(--princeton-orange)">
            the thing most people have not noticed yet
          </Eyebrow>
          {/* Load-bearing. The earlier draft said "your trust cannot write this
              one for you", which overstates the requirement — nothing forbids a
              trust from helping. What the guidance requires is per-school
              publication, and this is the version that survives a trust lead
              pushing back on it. */}
          <h2 id="per-school" className={styles.sectionHeading}>
            every school has to publish its own, on its own website.
          </h2>
          <p className={styles.body}>
            not one strategy authored centrally and issued across the group.
            each school publishes its own document, on its own site.
          </p>
          <p className={styles.body}>
            for a trust that is a scheduling problem: several schools, each
            needing to author something real, in one term. the trust may hold
            the budget, but the document has to come from the building it
            describes. for a single school it is simpler and harder &mdash;
            there is nobody to inherit it from.
          </p>
        </Section>

        {/* d3 — the guided co-write */}
        <Section id="d3" measure="route" ground="deep" labelledBy="co-write">
          <h2 id="co-write" className={styles.sectionHeading}>
            what we actually do &mdash; a guided co-write.
          </h2>
          <p className={styles.body}>
            we don&rsquo;t write your strategy. a strategy written by a
            consultant reads like a consultant wrote it, and every member of
            staff can tell within a paragraph.
          </p>
          {/* Direct quote from the published guidance — do not paraphrase. */}
          <p className={`${styles.body} ${styles.spaceBelow}`}>
            <strong className={styles.strong}>the guidance agrees with us.</strong>{' '}
            it says developing the strategy &ldquo;should be a shared
            responsibility across your whole leadership team&rdquo;. it does not
            mention engaging anyone to write it for you. so the model is the
            school owning the words and a specialist asking the questions.
          </p>
          <ol className={styles.questions}>
            {STEPS.map((step) => (
              <li key={step.n} className={styles.question}>
                <p className={styles.questionTerm}>
                  <span aria-hidden="true">{step.n}&nbsp;&nbsp;</span>
                  {step.title}
                </p>
                <p className={styles.questionBody}>
                  {step.body} <em>{step.aside}</em>
                </p>
              </li>
            ))}
          </ol>
          <p className={`${styles.body} ${styles.spaceAbove}`}>
            it is the ndte cycle on a single term: notice, design, try, and a
            document that says how you will embed it.
          </p>
          <ul className={styles.iconRow} aria-label="the ndte cycle">
            {NDTE.map((step) => (
              <li key={step.lead} className={styles.iconItem}>
                {/* Icon plus text — the word carries the meaning. */}
                <Icon name={step.icon} size={26} />
                <strong>{step.lead}</strong>
              </li>
            ))}
          </ul>
        </Section>

        {/* d4 — not a one-off */}
        <Section id="d4" measure="route" ground="base" labelledBy="annual">
          <h2 id="annual" className={styles.sectionHeading}>
            it is not a one-off document.
          </h2>
          <p className={`${styles.body} ${styles.spaceBelow}`}>
            the requirement is to publish an updated inclusion strategy
            statement <strong className={styles.strong}>annually</strong>, and
            one of the four things it must contain is a review of the previous
            academic year.
          </p>
          {/* The page's one full-strength block. */}
          <p className={`${styles.pull} ${styles.spaceBelow}`}>
            december is not the finish line. it is the first one.
          </p>
          <p className={`${styles.body} ${styles.spaceAbove}`}>
            whatever you write this term, you will be reporting against it next
            october &mdash; which is worth knowing before you write something
            you cannot evidence.
          </p>
        </Section>

        {/* d5 — what it costs */}
        <Section id="d5" measure="route" ground="second" labelledBy="is-cost">
          <h2 id="is-cost" className={styles.sectionHeading}>
            what it costs
          </h2>
          <ul className={styles.tiers}>
            <li className={styles.tier}>
              <div className={styles.tierHead}>
                <span className={styles.tierName}>a discovery day</span>
                <span className={styles.tierPrice}>
                  {PRICE_DISCOVERY_DAY} · one day · no lock-in
                </span>
              </div>
              <p className={styles.tierBody}>
                the honest first step. you get three things from it: a picture
                of what is reaching learners now, the specific gaps named in
                language a governor accepts, and a roadmap for the strategy you
                have to publish.
              </p>
            </li>
          </ul>
          <p className={styles.body}>
            what comes after that is scoped to your setting and costed as one
            number for a defined outcome. we will tell you what it is before you
            commit to anything.
          </p>
          {/* Load-bearing. We name the principle and leave the eligibility
              decision with the school. Unbarrier cannot declare a third party's
              spend eligible, and the fund's "pre-existing activity" exclusion
              could bite a school that already buys accessibility training. */}
          {SITE_FLAGS.showFundingLine && (
            <p className={styles.body}>
              <strong className={styles.strong}>on funding:</strong> schools fund
              this from their inclusive mainstream fund allocation under
              principle 7 &mdash; inclusive environments with continuous
              improvements to accessibility.
            </p>
          )}
        </Section>

        {/* d6 — who this is for */}
        <Section id="d6" measure="route" ground="deep" labelledBy="who-for">
          <h2 id="who-for" className={styles.sectionHeading}>
            who this is for
          </h2>
          <dl className={styles.stages}>
            {WHO_FOR.map((item) => (
              <div key={item.term} className={styles.stage}>
                <dt className={styles.stageTerm}>{item.term}</dt>
                <dd className={styles.stageBody}>{item.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* d7 — close · subscribe · footer */}
        <div id="d7">
          <Section measure="route" ground="well" space="loose" labelledBy="d-closing">
            <h2 id="d-closing" className={`${styles.closeHeading} ${styles.spaceBelow}`}>
              tell us what you&rsquo;re working with and we will tell you
              honestly whether we can help in the time.
            </h2>
            <div className={styles.ctaRow}>
              <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
                {BOOKING_LABEL}
              </Button>
              {SITE_FLAGS.showGhostCta && (
                <Button href={READINESS_CHECK_HREF} variant="ghost">
                  not ready to talk? → check your readiness first
                </Button>
              )}
            </div>
          </Section>
          <div className={styles.bandWrap}>
            <NewsletterBand route="/inclusion-strategy" weight="standard" />
          </div>
          <Footer variant="full" />
        </div>
      </main>
    </>
  );
}
