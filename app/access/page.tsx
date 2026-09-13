import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { CredentialStrip } from '@/components/CredentialStrip';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Icon, type IconName } from '@/components/Icon';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Section } from '@/components/Section';
import { SevenQuestions } from '@/components/SevenQuestions';
import { BOOKING_LABEL, BOOKING_URL } from '@/lib/booking';
import {
  PRICE_ACCESS_ADVISORY,
  PRICE_ACCESS_ADVISORY_TERM,
  PRICE_ACCESS_PARTNER,
  PRICE_ACCESS_PARTNER_TERM,
  PRICE_ACCESS_TRUST,
  PRICE_ACCESS_TRUST_EXTRA_SCHOOL,
  PRICE_ACCESS_TRUST_SCHOOLS,
  PRICE_ACCESS_TRUST_TERM,
  PRICE_DISCOVERY_DAY,
} from '@/lib/pricing';
import { SITE_FLAGS } from '@/lib/site-flags';
import styles from '@/app/route-page.module.css';

// /access — unbarrier.access, the partnership year. Stage 3 of the 13 Sep
// 2026 rebuild, recreated block for block from the design handover
// (Site.dc.html → isAccess, c0–c8). The block ids stay on the wrappers.
//
//   c0  hero (orange glow) · primary /book · ghost scrolls to #c5
//   c1  credential band (portrait variant, ground-400)
//   c2  the gap (deep)          · three figures behind SITE_FLAGS.showFigures
//   c3  the seven questions     · the library component, 1 Sep set
//   c4  the method (second)     · notice → design → try → embed · the one .pull
//   c5  what a year costs (deep)· tiers behind SITE_FLAGS.pricing · on every quote
//   c5b partnership with unbarrier (second) · retainer behind SITE_FLAGS.retainerPublic
//   c6  answered up front (base)· what it looks like over time
//   c7  the proof (second)
//   c8  close (well, loose) · newsletter band · footer
//
// PRICES LIVE IN lib/pricing.ts, not inline. One cta per page: book a
// discovery call. The close's ghost points down the ladder to /audit.
//
// THE /ACCESS OVERRIDE (13 Sep 2026, lib/site-flags.ts): the figure rule
// (£500 the only live figure) is lifted for this route. showFigures is ON
// (£900m · 276,890 · not asked, with sources) and pricing is 'two tiers'
// (advisory · partner, in full). Still held: the trust tier ('all tiers')
// and the retainer card (retainerPublic). Both stay flags, not deletions.

const CANONICAL = 'https://www.unbarrier.me/access';

export const metadata: Metadata = {
  title:
    'unbarrier.access — you know what isn’t reaching learners. a partnership year is what happens next | unbarrier.me',
  description:
    'three terms alongside your staff: noticing what is really happening, designing the change with them, modelling it in classrooms, and making it hold after we have gone. one number for a defined outcome. quoted as a year, invoiced by term.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'unbarrier.access — you know what isn’t reaching learners. a partnership year is what happens next.',
    description:
      'three terms alongside your staff. one number for a defined outcome, quoted as a year and invoiced by term.',
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

const THE_GAP: Array<{ figure: string; body: string; source?: string }> = [
  {
    figure: '£900m',
    body: 'annual edtech spend by english schools, with no statutory requirement for any product in it to show measurable educational benefit in advance.',
    source: 'written evidence to a parliamentary committee, april 2026',
  },
  {
    figure: '276,890',
    body: 'usage records from a single trust, analysed in the dfe’s own june 2026 market assessment to tell the difference between products bought and products actually used.',
    source:
      'dfe, assessment of the education technology market in england, june 2026',
  },
  {
    figure: 'not asked',
    body: 'readiness tools score the adults: staff confidence, leadership vision, infrastructure. all worth knowing. none ask whether the technology, the access or the communication landed with the learner it was meant for.',
  },
];

const NDTE: Array<{ lead: string; icon: IconName }> = [
  { lead: 'notice', icon: 'ndte-notice' },
  { lead: 'design', icon: 'ndte-design' },
  { lead: 'try', icon: 'ndte-try' },
  { lead: 'embed', icon: 'ndte-embed' },
];

type Tier = { name: string; price: string; body: string; aside: string };

const ADVISORY: Tier = {
  name: 'advisory',
  price: `${PRICE_ACCESS_ADVISORY} a year · ${PRICE_ACCESS_ADVISORY_TERM} a term`,
  body: 'a monthly strategy call, an async question line, the voice baseline and endline, a termly governor-ready note, and the template library. no on-site time.',
  aside:
    'for the school with more will than budget. it keeps the work moving between visits you can’t yet fund.',
};

const PARTNER: Tier = {
  name: 'partner · single school',
  price: `${PRICE_ACCESS_PARTNER} a year · ${PRICE_ACCESS_PARTNER_TERM} a term`,
  body: 'everything in advisory, plus six on-site half-days of classroom modelling, a whole-staff twilight, coaching for your own leads, and an end-of-year reflection that maps the next one.',
  aside: 'the core offer.',
};

const TRUST: Tier = {
  name: 'trust partner',
  price: `from ${PRICE_ACCESS_TRUST} a year · ${PRICE_ACCESS_TRUST_TERM} a term · ${PRICE_ACCESS_TRUST_SCHOOLS}`,
  body: `a digital-lead cohort programme, trust-level strategy each term, voice across every school with a trust-level view, and twelve pooled on-site half-days. additional schools ${PRICE_ACCESS_TRUST_EXTRA_SCHOOL} each.`,
  aside: 'at six schools that is £3,000 a school. half the single-school price.',
};

const ON_EVERY_QUOTE: string[] = [
  '50% on order, 50% at the midpoint.',
  'uk b2b late payment terms apply.',
  'intellectual property is licensed to you, never assigned.',
  `no free scoping. the ${PRICE_DISCOVERY_DAY} discovery day is the scoping, priced honestly.`,
];

const OVER_TIME: Array<{ term: string; body: string }> = [
  {
    term: 'onboarding',
    body: 'the voice baseline, and the first plan we agree together.',
  },
  {
    term: 'six months',
    body: 'modelling in classrooms, and the first movement you can see.',
  },
  {
    term: 'the end of the year',
    body: 'the endline against the baseline. capacity built in your own leads, so it holds without us in the room.',
  },
  {
    term: 'after that',
    body: 'renewal on evidence, not goodwill. if the numbers didn’t move, that is the conversation we have first.',
  },
];

const PROOF: Array<{ lead: string; body: string; aside: string }> = [
  {
    lead: 'a platform pays for our school training.',
    body: 'goodnotes funds it, so there is no invoice to the school.',
    aside: 'not a testimonial. a commercial fact, and a harder one to fake.',
  },
  {
    lead: 'the accreditation.',
    body: 'apple professional learning specialist, and 26 years in classrooms as a send specialist across uk state and international schools.',
    aside: 'the work is not a career change.',
  },
  {
    lead: 'what we are building right now.',
    body: 'a device and digital inclusion instrument for an international schools group, with a technology partner.',
    aside:
      'in progress, not finished — and we would rather say that than imply otherwise.',
  },
  {
    lead: 'how we name people.',
    body: 'schools and trusts by shape and scale, never by name without written permission asked for at contracting.',
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
  // Priced offers only when the page publishes its tiers (the figure rule).
  ...(SITE_FLAGS.pricing !== 'in conversation'
    ? {
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
      }
    : {}),
};

function TierCard({ tier }: { tier: Tier }) {
  return (
    <li className={styles.tier}>
      <p className={styles.tierHead}>
        <span className={styles.tierName}>{tier.name}</span>
        <span className={styles.tierPrice}>{tier.price}</span>
      </p>
      <p className={styles.tierBody}>{tier.body}</p>
      <p className={styles.tierAside}>{tier.aside}</p>
    </li>
  );
}

export default function AccessPage() {
  const { pricing, retainerPublic, showFigures } = SITE_FLAGS;
  const showPrices = pricing !== 'in conversation';
  const showTrustTier = pricing === 'all tiers';
  const gapCards = showFigures ? THE_GAP : THE_GAP.filter((c) => !c.source);

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
        {/* c0 — hero */}
        <div id="c0" className={styles.heroBand}>
          <Glow color="var(--princeton-orange)" left="-8%" top="0%" size={540} opacity={0.1} />
          <header className={styles.heroInner}>
            <Eyebrow color="var(--princeton-orange)">unbarrier.access</Eyebrow>
            <h1 className={styles.heading}>
              you know what isn&rsquo;t reaching learners. a partnership year
              is what happens next.
            </h1>
            <p className={styles.ledeMuted}>
              three terms alongside your staff: noticing what is really
              happening, designing the change with them, modelling it in
              classrooms, and making it hold after we have gone.
            </p>
            <p className={styles.ledeQuiet}>
              one number for a defined outcome. quoted as a year, invoiced by
              term.
            </p>
            <div className={styles.ctaRow}>
              <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
                {BOOKING_LABEL}
              </Button>
              {/* Scrolls down this page only — not a second destination. */}
              <Button href="#c5" variant="ghost">
                what a year costs →
              </Button>
            </div>
          </header>
        </div>

        {/* c1 — the credential band */}
        <CredentialStrip variant="portrait" id="c1" />

        {/* c2 — the gap */}
        <Section id="c2" measure="route" ground="deep" labelledBy="the-gap">
          <h2 id="the-gap" className={styles.sectionHeading}>
            the spend is real. the question was never on the form.
          </h2>
          <ul className={styles.cardGrid}>
            {gapCards.map((card) => (
              <li key={card.figure} className={styles.card}>
                <p className={styles.cardFigure}>{card.figure}</p>
                <p className={styles.cardBody}>{card.body}</p>
                {card.source && <p className={styles.cardSource}>{card.source}</p>}
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            the spend gets justified by the rollout, and the rollout gets
            justified by the spend. nobody is being careless. the question was
            never on the form &mdash; and a question that isn&rsquo;t asked
            can&rsquo;t be answered, funded, or defended to a governing body.
          </p>
        </Section>

        {/* c3 — the seven questions. The library component; never hand-built. */}
        <div id="c3" className={styles.anchor}>
          <SevenQuestions
            id="seven-q"
            heading="what's missing — the seven questions"
            intro="this is unbarrier.voice, the measurement layer under everything we do. pick any moment in a lesson, and ask all seven of it."
            ground="base"
          />
        </div>

        {/* c4 — the method */}
        <Section id="c4" measure="route" ground="second" labelledBy="method">
          <h2 id="method" className={styles.sectionHeading}>
            notice → design → try → embed.
          </h2>
          <p className={styles.body}>
            a partnership year runs the cycle three times, once a term. notice
            what is really happening, with voice. design the change with your
            team. try it and model it in classrooms. embed it so it holds after
            we have gone &mdash; then notice again, and find out whether it did.
          </p>
          <ul className={styles.iconRow} aria-label="the ndte cycle">
            {NDTE.map((step) => (
              <li key={step.lead} className={styles.iconItem}>
                <Icon name={step.icon} size={26} />
                <strong>{step.lead}</strong>
              </li>
            ))}
          </ul>
          {/* The page's one full-strength block. */}
          <p className={styles.pull}>
            most inclusion work stops at try. embed is where you find out
            whether any of it worked.
          </p>
          <h3 className={`${styles.subHeading} ${styles.loose}`}>how the work runs</h3>
          <p className={styles.body}>
            six parts to every engagement: online scoping · bespoke build ·
            strategy with your team · training · modelling in class · reflection
            and a resource pack.
          </p>
          <p className={styles.body}>
            a day covers two of the six. a partnership covers all six &mdash;
            which is why the work is sold as a year, not a stack of day
            invoices. you get one number for a defined outcome, not an invoice
            that grows every time someone asks a question.
          </p>
        </Section>

        {/* c5 — what a year costs */}
        <Section id="c5" measure="route" ground="deep" labelledBy="cost">
          <Eyebrow color="var(--princeton-orange)">
            quoted as a year · invoiced by term · three terms
          </Eyebrow>
          <h2 id="cost" className={styles.sectionHeading}>
            what a year costs
          </h2>
          {showPrices ? (
            <ul className={styles.tiers}>
              <TierCard tier={ADVISORY} />
              <TierCard tier={PARTNER} />
              {showTrustTier && <TierCard tier={TRUST} />}
            </ul>
          ) : (
            <p className={`${styles.body} ${styles.spaceBelow}`}>
              two tiers: advisory, with no on-site time, and a single-school
              partnership with six half-days of classroom modelling. both are
              quoted as one number for the year and invoiced by term. we will
              tell you the number before you commit to anything.
            </p>
          )}
          <p className={styles.body}>
            <strong className={styles.strong}>edtech companies:</strong> blocks
            are scoped per cohort &mdash;{' '}
            <Link href="/edtech" className={styles.inlineLink}>
              the edtech page
            </Link>{' '}
            says how.{' '}
            <strong className={styles.strong}>trusts and groups:</strong>{' '}
            <a href="#c5b" className={styles.inlineLink}>
              the partnership
            </a>
            , below.
          </p>
          <h3 className={`${styles.subHeading} ${styles.loose}`}>on every quote</h3>
          <ul className={styles.plainList}>
            {ON_EVERY_QUOTE.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Section>

        {/* c5b — trusts and school groups */}
        <Section id="c5b" measure="route" ground="second" labelledBy="groups">
          <Eyebrow color="var(--princeton-orange)">trusts and school groups</Eyebrow>
          <h2 id="groups" className={styles.sectionHeading}>
            partnership with unbarrier
          </h2>
          <div className={`${styles.option} ${styles.panelDeadline}`}>
            <h3 className={`${styles.subHeading} ${styles.accent}`}>what you don&rsquo;t get</h3>
            <p className={styles.optionBody}>
              we&rsquo;re not providing leads. we&rsquo;re not endorsing or
              placing products. we&rsquo;re not a tool you can list in your
              inclusion strategy statement. that&rsquo;s by design.
            </p>
          </div>
          <h3 className={styles.subHeading}>what you do get</h3>
          <p className={styles.body}>
            when we partner with you on your inclusion strategy, we bring three
            things: clarity on what you actually need, evidence of where your
            investment is landing, and the confidence that your procurement
            decisions are sound.
          </p>
          <ol className={styles.cardGrid}>
            <li className={styles.card}>
              <p className={styles.cardNumeral}>01</p>
              <h4 className={styles.cardTitle}>discovery</h4>
              <p className={styles.cardBody}>
                we start by listening. a structured conversation about your
                group &mdash; where you are, what&rsquo;s stretched, where your
                money&rsquo;s going. we analyse what we hear and come back with
                a clear picture: this is what&rsquo;s working, this is
                what&rsquo;s missing, here&rsquo;s what comes next.
              </p>
            </li>
            <li className={styles.card}>
              <p className={styles.cardNumeral}>02</p>
              <h4 className={styles.cardTitle}>professional learning</h4>
              <p className={styles.cardBody}>
                if it fits, we move into your schools. we work with your teams
                on what works &mdash; not in theory, but in the classroom with
                real learners. we&rsquo;re there at the start to set the tone,
                then again six months in to make sure it&rsquo;s held. the work
                is measurable. you&rsquo;ll see the difference.
              </p>
            </li>
            {retainerPublic && (
              <li className={styles.card}>
                <p className={styles.cardNumeral}>03</p>
                <h4 className={styles.cardTitle}>the retainer</h4>
                <p className={styles.cardBody}>
                  after that, we&rsquo;re on tap. when your procurement team has
                  a question, when your leadership needs to validate a decision,
                  when your governors want evidence &mdash; you know who to
                  call. a fixed monthly fee. direct access. no project work
                  bundled in. you know exactly what it costs and what you get.
                </p>
                <p className={styles.cardSource}>priced in the proposal, not on the page.</p>
              </li>
            )}
          </ol>
          <h3 className={styles.subHeading}>why this model works for groups</h3>
          <p className={styles.body}>
            if you&rsquo;re sending technology to multiple schools, managing
            procurement across regions, or making the second round of spend
            land where the first didn&rsquo;t, you need someone who already
            knows your system, knows your schools, and can move quickly.
          </p>
          <p className={styles.body}>
            that&rsquo;s what the {retainerPublic ? 'retainer' : 'partnership'}{' '}
            does. it protects your investment. it tells your procurement team:
            we&rsquo;ve validated this. it tells your schools: there&rsquo;s
            someone who understands what you need. and it tells your board that
            you&rsquo;re spending money in the right way.
          </p>
        </Section>

        {/* c6 — answered up front */}
        <Section id="c6" measure="route" ground="base" labelledBy="upfront">
          <h2 id="upfront" className={styles.sectionHeading}>
            your questions, answered up front
          </h2>
          <p className={styles.body}>
            schools decide before the first conversation. so this page carries
            what you would otherwise have to ask for:
          </p>
          <ul className={`${styles.plainList} ${styles.spaceBelow}`}>
            <li>
              what actually happens across a partnership year &mdash;{' '}
              <a href="#c4" className={styles.inlineLink}>the method</a>.
            </li>
            <li>
              how much of your staff&rsquo;s time it takes &mdash; six
              half-days on site, one twilight, and a monthly call. that is the
              whole ask.
            </li>
            <li>
              what it costs &mdash;{' '}
              <a href="#c5" className={styles.inlineLink}>the tiers</a>, in
              full, before you ask.
            </li>
            <li>
              proof it has worked elsewhere &mdash;{' '}
              <a href="#c7" className={styles.inlineLink}>what stands behind it</a>
              , and what doesn&rsquo;t yet.
            </li>
          </ul>
          <h3 className={styles.subHeading} style={{ marginTop: 0 }}>
            what it looks like over time
          </h3>
          <dl className={styles.stages}>
            {OVER_TIME.map((stage) => (
              <div key={stage.term} className={styles.stage}>
                <dt className={styles.stageTerm}>{stage.term}</dt>
                <dd className={styles.stageBody}>{stage.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* c7 — the proof */}
        <Section id="c7" measure="route" ground="second" labelledBy="proof">
          <h2 id="proof" className={styles.sectionHeading}>
            the partnership year is new. here is what isn&rsquo;t.
          </h2>
          <p className={styles.body}>
            we are not going to show you a testimonial for something nobody has
            bought yet. what follows is what actually stands behind it.
          </p>
          <div className={styles.numbered}>
            {PROOF.map((item) => (
              <p key={item.lead} className={styles.numberedItem}>
                <strong className={styles.leadIn}>{item.lead}</strong>
                {item.body} <span className={styles.mutedText}>{item.aside}</span>
              </p>
            ))}
          </div>
          <p className={`${styles.bodyText} ${styles.spaceAbove}`}>
            <strong>and the thing we would rather you judged us on:</strong>{' '}
            book the discovery day. {PRICE_DISCOVERY_DAY}, one day, no lock-in,
            and you will know inside a fortnight whether we are any good. that
            is a cheaper test than any case study.
          </p>
          <div className={styles.ctaRow}>
            <Button href="/goodnotes" variant="ghost">
              see the goodnotes hub →
            </Button>
          </div>
        </Section>

        {/* c8 — close · subscribe · footer */}
        <div id="c8">
          <Section measure="route" ground="well" space="loose" labelledBy="c-closing">
            <h2 id="c-closing" className={styles.closeHeading}>
              tell us what you&rsquo;re working with.
            </h2>
            <p className={styles.closeLine}>
              if we can help, we&rsquo;ll say how. if we can&rsquo;t,
              we&rsquo;ll point you to someone who can.
            </p>
            <div className={styles.ctaRow}>
              <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
                {BOOKING_LABEL}
              </Button>
              <Button href="/audit" variant="ghost">
                not there yet? → start with a discovery day
              </Button>
            </div>
          </Section>
          <div className={styles.bandWrap}>
            <NewsletterBand
              route="/access"
              weight="standard"
              sub="one email when there is something worth saying. nothing when there isn’t. written for people who don’t have time to read it twice."
            />
          </div>
          <Footer variant="full" />
        </div>
      </main>
    </>
  );
}
