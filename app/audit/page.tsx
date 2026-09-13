import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CtaCard } from '@/components/CtaCard';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Section } from '@/components/Section';
import { BOOKING_URL } from '@/lib/booking';
import {
  DISCOVERY_DAY_PDF,
  DISCOVERY_DAY_PLANNER_PDF,
  DISCOVERY_DAY_SEND_PDF,
} from '@/lib/documents';
import { PRICE_DISCOVERY_DAY } from '@/lib/pricing';
import { READINESS_CHECK_HREF, READINESS_CHECK_LABEL } from '@/lib/readiness-check';
import styles from '@/app/route-page.module.css';

// /audit — unbarrier.audit, the discovery day. Stage 2 of the 13 Sep 2026
// rebuild, recreated block for block from the design handover (Site.dc.html →
// isAudit, a0–a3). The block ids stay on the wrappers.
//
//   a0  hero (pearl-aqua glow) · eyebrow · h1 · lede · primary + ghost
//   a1  what actually happens (second)  · three numbered lines · three paper cards
//   a2  the pointer block (deep)        · what the check is — explain, don't sell
//   a3  close (well, loose)             · readiness check primary + book ghost
//
// The embedded readiness-check engine came OFF this page on 13 Sep — a2 is a
// pointer, not the check. Do not re-embed it.
//
// The discovery day is the paid "notice" step inside unbarrier.audit; there is
// no separate route. The three papers a1 links (the explainer for mainstream,
// the same for SEND settings, and the planner for the person hosting us) are
// printable A4 docs served as pdfs at stable urls (lib/documents.ts). The
// cards are CtaCards in pearl aqua — the audit strand colour, not the locked
// accent ladder — and their `card` values are the Plausible event labels.
// The £500 day price is the decided price for this route — the one live
// figure on the site (lib/site-flags.ts) — visible in a3 and in the
// structured data below.
//
// 13 Sep 2026, second pass (handoff "paper cards + readiness section
// rewrite"): the buried pdf link became the three cards; a2 explains the
// check instead of selling it and carries no cta of its own; a3 picks up the
// thread and carries the one cta.
//
// One cta per page + the subscribe block: the readiness check, then the
// newsletter band between the close and the footer (Nici, 13 Sep 2026 — the
// prototype left the band off this page by mistake).

const CANONICAL = 'https://www.unbarrier.me/audit';

export const metadata: Metadata = {
  title:
    'unbarrier.audit — a day in your school, and the receipts to take to your board | unbarrier.me',
  description:
    'we start with the learner, not the licence list. we watch a lesson, we ask seven questions of everyone in the chain, and we hand you a written picture of where the thing you bought stops reaching the child.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'unbarrier.audit — a day in your school, and the receipts to take to your board.',
    description:
      'we watch a lesson, we ask seven questions of everyone in the chain, and we hand you a written picture of where the thing you bought stops reaching the child.',
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

const WHAT_HAPPENS: string[] = [
  'one day on site. lessons, not meetings. we sit where the learner sits.',
  'the seven questions, asked of the child, the ta, the teacher, the it lead and the person who signed the order. all five, or it isn’t an audit.',
  'a written baseline inside two weeks — what reached the child, what didn’t, and the three things to change before you spend anything else.',
];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'unbarrier.audit — discovery day',
  serviceType: 'Accessibility and digital inclusion discovery day for schools',
  description:
    'a day in your setting finding out whether the technology, the access and the communication you have already bought are reaching the learners they were bought for. a written baseline inside two weeks: what reached the child, what didn’t, and the three things to change before you spend anything else.',
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
        {/* a0 — hero */}
        <div id="a0" className={styles.heroBand}>
          <Glow color="var(--pearl-aqua)" left="-8%" top="0%" size={540} opacity={0.1} />
          <header className={styles.heroInner}>
            <Eyebrow color="var(--pearl-aqua)">unbarrier.audit</Eyebrow>
            <h1 className={styles.heading}>
              a day in your school, and the receipts to take to your board.
            </h1>
            <p className={styles.ledeMuted}>
              we start with the learner, not the licence list. we watch a
              lesson, we ask seven questions of everyone in the chain, and we
              hand you a written picture of where the thing you bought stops
              reaching the child. it names the break. it doesn&rsquo;t flatter
              anybody.
            </p>
            <div className={styles.ctaRow}>
              <Button href={READINESS_CHECK_HREF} color="var(--pearl-aqua)">
                {READINESS_CHECK_LABEL}
              </Button>
              <Button href="/" variant="ghost">
                ← back to the start
              </Button>
            </div>
          </header>
        </div>

        {/* a1 — what actually happens */}
        <Section id="a1" measure="route" ground="second" labelledBy="what-happens">
          <h2 id="what-happens" className={styles.sectionHeading}>
            what actually happens, and what it costs you.
          </h2>
          <ol className={styles.numbered}>
            {WHAT_HAPPENS.map((line, i) => (
              <li key={line} className={styles.numberedItem}>
                <strong className={styles.numLead}>
                  {String(i + 1).padStart(2, '0')}
                </strong>
                {line}
              </li>
            ))}
          </ol>
          <p className={styles.small}>
            the cost to you: one day of access, and the discomfort of hearing
            it. most of what we find was free to fix.
          </p>
          <div className={styles.paperCards}>
            <Eyebrow color="var(--pearl-aqua)">on paper, for the leadership meeting</Eyebrow>
            <CtaCard
              card="discovery_day_paper"
              title="the discovery day — what it is and why"
              meta="two sides, sourced, no price on it. print it and take it in."
              detail="a4 · two sides · mainstream setting"
              href={DISCOVERY_DAY_PDF}
              external={false}
              accent="var(--pearl-aqua)"
              accentRgb="105, 217, 209"
              initial="¶"
            />
            <CtaCard
              card="discovery_day_paper_send"
              title="the discovery day — for SEND settings"
              meta="the same two sides, written for special schools and specialist provision."
              detail="a4 · two sides · SEND setting"
              href={DISCOVERY_DAY_SEND_PDF}
              external={false}
              accent="var(--pearl-aqua)"
              accentRgb="105, 217, 209"
              initial="¶"
            />
            <CtaCard
              card="discovery_day_planner"
              title="planning your day"
              meta="what to have ready, who we need to see, and how the day runs hour by hour."
              detail="a4 · one side · for the person hosting us"
              href={DISCOVERY_DAY_PLANNER_PDF}
              external={false}
              accent="var(--pearl-aqua)"
              accentRgb="105, 217, 209"
              initial="→"
            />
          </div>
        </Section>

        {/* a2 — the pointer block. A pointer, not the check, and no cta of its
            own: it explains the smaller version, and a3 carries the button. */}
        <Section id="a2" measure="route" ground="deep" labelledBy="rc-heading">
          <Eyebrow color="var(--pearl-aqua)">free · five minutes · no email needed</Eyebrow>
          <h2 id="rc-heading" className={styles.sectionHeading}>
            not sure the day is worth having? there&rsquo;s a smaller version.
          </h2>
          <p className={`${styles.body} ${styles.bodyNarrow}`}>
            the readiness check is the same seven questions, asked of one
            person, about one thing you already bought. it scores nothing about
            you and everything about the chain.
          </p>
          <p className={`${styles.body} ${styles.bodyNarrow}`}>
            no number at the end &mdash; three words per question, and the one
            to start with. a result you can forward upwards. if it comes back
            clean, you don&rsquo;t need the day. if it doesn&rsquo;t,
            you&rsquo;ll know which day to book.
          </p>
        </Section>

        {/* a3 — close */}
        <div id="a3">
          <Section measure="route" ground="well" space="loose" labelledBy="a-closing">
            <h2 id="a-closing" className={styles.closeHeading}>
              so start with the five minutes. the day comes after, if
              it&rsquo;s needed.
            </h2>
            <p className={styles.closeLede}>
              free, no email, and nothing to sit through. if you already know
              the answer, skip it and book the day.
            </p>
            <p className={styles.closeLine}>
              the discovery day is {PRICE_DISCOVERY_DAY}. one day, no lock-in.
            </p>
            <div className={styles.ctaRow}>
              <Button href={READINESS_CHECK_HREF} color="var(--pearl-aqua)">
                {READINESS_CHECK_LABEL}
              </Button>
              <Button href={BOOKING_URL} variant="ghost" external>
                already know? → book a discovery call
              </Button>
            </div>
          </Section>
          <div className={styles.bandWrap}>
            <NewsletterBand
              route="/audit"
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
