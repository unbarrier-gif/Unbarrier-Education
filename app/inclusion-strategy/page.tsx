import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CredentialStrip } from '@/components/CredentialStrip';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { BOOKING_URL, BOOKING_LABEL } from '@/lib/booking';
import styles from './page.module.css';

// /inclusion-strategy — the one page on the site with revenue attached to a
// date. Schools receiving Inclusive Mainstream Funding must publish an
// inclusion strategy by 31 December 2026, and a page published in late
// November ranks in January.
//
// Copy is verbatim from the approved page drafts (28 Aug 2026). Three lines
// on this page are load-bearing and must not be paraphrased:
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
// QUESTIONS. Always "questions", never "domains". The 5/6/7 conflict was never
// three counts of one thing — it was two frameworks sharing a word. "Domains"
// belongs exclusively to the six domains of inclusion, which is a separate
// framework. This page said "the seven domains"; it now says "the seven
// questions", in the body copy and in the FAQPage schema. Nothing is
// renumbered — see components/SevenQuestions.tsx for the seven.
//
// There is deliberately NO week count anywhere on this page. A hardcoded
// countdown is right on the day it ships and wrong every day after, and a
// stale countdown on a deadline page is worse than no countdown at all. The
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

// The three steps of the guided co-write. `aside` carries the italic line
// that follows each one in the source copy.
const STEPS: Array<{ n: string; title: string; body: string; aside: string }> = [
  {
    n: '1',
    title: 'a readiness check',
    body: 'what is actually reaching learners in your setting now, across the seven questions.',
    aside: 'you cannot write an honest strategy from an impression.',
  },
  {
    n: '2',
    title: 'modelling in classrooms',
    body: 'we work alongside your staff in real lessons, so the strategy describes practice that exists rather than practice you hope for.',
    aside: 'this is the part that makes the document survive its first term.',
  },
  {
    n: '3',
    title: 'a guided writing session',
    body: 'your leadership team in a room, writing it, with us asking the questions and holding the structure.',
    aside: 'you leave with the document. the words are yours.',
  },
];

const WHO_FOR: string[] = [
  'schools with inclusive mainstream funding and a document to publish by 31 december.',
  'trusts who have realised they cannot do this once and copy it across.',
  'senco and inclusion leads who know what the strategy should say and have no time to write it.',
];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'inclusion strategy support',
  serviceType: 'Inclusion strategy development for schools',
  description:
    'guided co-write support for schools that must publish an inclusion strategy by 31 december 2026 under inclusive mainstream funding. a readiness check, modelling in classrooms, and a guided writing session with your leadership team.',
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
// the approved copy verbatim — only the question phrasing is schema-side, so
// the visible page carries no copy that was not reviewed.
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
    a: 'a readiness check — what is actually reaching learners in your setting now, across the seven questions. modelling in classrooms — we work alongside your staff in real lessons, so the strategy describes practice that exists rather than practice you hope for. a guided writing session — your leadership team in a room, writing it, with us asking the questions and holding the structure.',
  },
  {
    q: 'is this a one-off document?',
    a: 'the requirement is to publish an updated inclusion strategy statement annually, and one of the four things it must contain is a review of the previous academic year. so december is not the finish line. it is the first one. whatever you write this term, you will be reporting against it next october — which is worth knowing before you write something you cannot evidence.',
  },
  {
    q: 'what does it cost?',
    a: 'a discovery day is £500, and it is the honest first step. you get three things from it: a picture of what is reaching learners now, the specific gaps named in language a governor accepts, and a roadmap for the strategy you have to publish. what comes after that is scoped to your setting and costed as one number for a defined outcome. we will tell you what it is before you commit to anything.',
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

      <main className={styles.main}>
        <Glow
          color="var(--princeton-orange)"
          left="-120px"
          top="4%"
          size={620}
          opacity={0.1}
        />
        <Glow
          color="var(--spring-green)"
          right="-100px"
          top="42%"
          size={460}
          opacity={0.07}
        />

        <header className={styles.hero}>
          <Eyebrow color="var(--princeton-orange)">
            for schools with inclusive mainstream funding
          </Eyebrow>
          <h1 className={styles.heading}>
            your inclusion strategy has to be published by 31 december. and it
            has to be <span className={styles.accent}>yours.</span>
          </h1>
          <p className={styles.lede}>
            we help schools write it — guided, not done for you. you finish the
            term with a document your staff recognise, because your staff wrote
            it.
          </p>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
              {BOOKING_LABEL}
            </Button>
          </div>
          <CredentialStrip />
        </header>

        <section className={styles.section} aria-labelledby="not-noticed">
          <h2 id="not-noticed" className={styles.sectionEyebrow}>
            the thing most people have not noticed yet
          </h2>
          {/* Load-bearing. The earlier draft said "your trust cannot write this
              one for you", which overstates the requirement — nothing forbids a
              trust from helping. What the guidance requires is per-school
              publication, and this is the version that survives a trust lead
              pushing back on it. */}
          <p className={styles.statement}>
            every school has to publish its own, on its own website.
          </p>
          <p className={styles.body}>
            not one strategy authored centrally and issued across the group.
            each school publishes its own document, on its own site.
          </p>
          <p className={styles.body}>
            for a trust that is a scheduling problem: several schools, each
            needing to author something real, in one term. the trust may hold
            the budget, but the document has to come from the building it
            describes. for a single school it is simpler and harder — there is
            nobody to inherit it from.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="what-we-do">
          <h2 id="what-we-do" className={styles.sectionHeading}>
            what we actually do — guided co-write
          </h2>
          <p className={styles.body}>
            we don&rsquo;t write your strategy. a strategy written by a
            consultant reads like a consultant wrote it, and every member of
            staff can tell within a paragraph.
          </p>
          {/* Direct quote from the published guidance — do not paraphrase. */}
          <p className={styles.body}>
            <strong className={styles.strong}>
              the guidance agrees with us.
            </strong>{' '}
            it says developing the strategy &ldquo;should be a shared
            responsibility across your whole leadership team&rdquo;. it does not
            mention engaging anyone to write it for you. so the model is the
            school owning the words and a specialist asking the questions.
          </p>

          <ol className={styles.steps}>
            {STEPS.map((step) => (
              <li key={step.n} className={styles.step}>
                <p className={styles.stepTitle}>
                  <span className={styles.stepNum} aria-hidden="true">
                    {step.n} ·
                  </span>{' '}
                  {step.title}
                </p>
                <p className={styles.stepBody}>{step.body}</p>
                <p className={styles.stepAside}>{step.aside}</p>
              </li>
            ))}
          </ol>

          <p className={styles.body}>
            it is the ndte cycle on a single term: notice, design, try, and a
            document that says how you will embed it.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="not-one-off">
          <h2 id="not-one-off" className={styles.sectionHeading}>
            it is not a one-off document
          </h2>
          <p className={styles.body}>
            the requirement is to publish an updated inclusion strategy
            statement <strong className={styles.strong}>annually</strong>, and
            one of the four things it must contain is a review of the previous
            academic year.
          </p>
          <p className={styles.body}>
            so december is not the finish line. it is the first one. whatever
            you write this term, you will be reporting against it next october —
            which is worth knowing before you write something you cannot
            evidence.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="what-it-costs">
          <h2 id="what-it-costs" className={styles.sectionHeading}>
            what it costs
          </h2>
          <p className={styles.body}>
            <strong className={styles.strong}>a discovery day is £500</strong>,
            and it is the honest first step. you get three things from it: a
            picture of what is reaching learners now, the specific gaps named in
            language a governor accepts, and a roadmap for the strategy you have
            to publish.
          </p>
          <p className={styles.body}>
            what comes after that is scoped to your setting and costed as one
            number for a defined outcome. we will tell you what it is before you
            commit to anything.
          </p>
          {/* Load-bearing. We name the principle and leave the eligibility
              decision with the school. Unbarrier cannot declare a third party's
              spend eligible, and the fund's "pre-existing activity" exclusion
              could bite a school that already buys accessibility training. */}
          <p className={styles.funding}>
            <strong className={styles.strong}>on funding:</strong> schools fund
            this from their inclusive mainstream fund allocation under principle
            7 — inclusive environments with continuous improvements to
            accessibility.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="who-for">
          <h2 id="who-for" className={styles.sectionHeading}>
            who this is for
          </h2>
          <ul className={styles.list}>
            {WHO_FOR.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.close} aria-labelledby="close">
          <h2 id="close" className={styles.closeHeading}>
            tell us what you&rsquo;re working with and we will tell you honestly
            whether we can help in the time.
          </h2>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
              {BOOKING_LABEL}
            </Button>
          </div>
        </section>

        <NewsletterBand route="/inclusion-strategy" weight="standard" />


        <Footer variant="full" />
      </main>
    </>
  );
}
