import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { CtaCard } from '@/components/CtaCard';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Section } from '@/components/Section';
import { SevenQuestions } from '@/components/SevenQuestions';
import { BOOKING_LABEL, BOOKING_URL } from '@/lib/booking';
import { READINESS_CHECK_HREF } from '@/lib/readiness-check';
import { SITE_FLAGS } from '@/lib/site-flags';
import styles from '@/app/route-page.module.css';
import voice from './page.module.css';

// /voice — unbarrier.voice, the measurement layer. Stage 4 of the 13 Sep 2026
// rebuild, from Voice.dc.html with showPlan=false (the plan block is an
// internal review panel and is never public). The block ids stay on the
// wrappers.
//
//   v0  hero (orchid glow) · primary /book · ghost → the seven-questions one-pager
//   v1  the layer under the work (ground-400)
//   v2  the seven questions (second) — the library component, 1 Sep set · the one-pager card under it
//   v4  what a baseline is (base)
//   v4b what you get back (second) — three cards; report images when present
//   v5  two purposes, two consents (base)
//   v7  close (well, loose) · newsletter band · footer
//
// LEGAL HOLD ON THE INSTRUMENT (handover, 13 Sep 2026, binding): do not sell
// it. The prototype's v3 ("delivered / the tool" split) and v6 ("founding
// cohorts") are NOT built. The page closes on "we agree how you will know it
// worked, and when we will check."
//
// "the child" in the h1 is deliberate and the only place on this page it
// appears — the instrument's founding claim. Everything below says learners.
//
// The route is indexed and in the nav while SITE_FLAGS.voicePublic is on
// (legal hold on publishing the route lifted 14 Sep 2026). The hold on
// SELLING the instrument above is separate and still stands.

const CANONICAL = 'https://www.unbarrier.me/voice';

export const metadata: Metadata = {
  title: 'unbarrier.voice — the audit that starts with the child',
  description:
    'every readiness tool scores the organisation. unbarrier.voice measures the one thing they skip: whether the technology, the access and the communication actually reach the learner they were bought for.',
  alternates: { canonical: CANONICAL },
  robots: SITE_FLAGS.voicePublic
    ? undefined
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: 'unbarrier.voice — the audit that starts with the child and works backwards.',
    description:
      'device-agnostic. built on the learner’s own experience. the measurement layer under everything we do.',
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

const LAYER: Array<{ dot: string; name: string; body: React.ReactNode }> = [
  {
    dot: 'var(--pearl-aqua)',
    name: 'unbarrier.audit',
    body: 'a discovery day uses it to find the gaps.',
  },
  {
    dot: 'var(--princeton-orange)',
    name: 'unbarrier.access',
    body: 'a partnership year uses it to prove the movement between the start and the end.',
  },
  {
    dot: 'var(--orchid-mist)',
    name: 'unbarrier.voice',
    body: (
      <>
        same seven questions, every time. it makes <em>notice</em> and{' '}
        <em>embed</em> into measurements rather than impressions.
      </>
    ),
  },
];

// Three report pages. When a real anonymised page lands at the path, it
// renders; until then the card carries the numeral alone. The report images
// have been outstanding since 5 Aug — they are Nici's, not the developer's.
const WHAT_YOU_GET_BACK = [
  {
    n: '01',
    title: 'a one-page picture',
    body: 'where access is reaching learners, and where it isn’t.',
    image: '/assets/voice/report-01.png',
  },
  {
    n: '02',
    title: 'the gaps, named',
    body: 'in language a governor understands, so the spend can be defended and the next step funded.',
    image: '/assets/voice/report-02.png',
  },
  {
    n: '03',
    title: 'a number you can measure again',
    body: 'a baseline to return to, so “impact” becomes a number you can stand behind.',
    image: '/assets/voice/report-03.png',
  },
];

const CONSENTS = [
  {
    lead: 'your result is yours',
    body: 'the school’s own picture, for the school.',
  },
  {
    lead: 'separately, and only if you opt in',
    body: 'an anonymised layer builds sector-level insight into what is reaching learners and what isn’t, across settings.',
  },
  {
    lead: 'two different things',
    body: 'so they take two different consents. bundling them would make neither one valid.',
  },
];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'unbarrier.voice',
  serviceType:
    'Learner-side accessibility measurement instrument for schools and trusts',
  description:
    'a device-agnostic instrument that measures whether the technology, the access and the communication in a setting actually reach the learner they were bought for, built on the learner’s own experience. the measurement layer a discovery day and a partnership year both run on.',
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
};

function reportImageExists(src: string): boolean {
  try {
    return existsSync(join(process.cwd(), 'public', src));
  } catch {
    return false;
  }
}

export default function VoicePage() {
  const anyReport = WHAT_YOU_GET_BACK.some((c) => reportImageExists(c.image));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <Nav active={SITE_FLAGS.voicePublic ? 'voice' : undefined} />

      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--orchid-mist)' } as CSSProperties}
      >
        {/* v0 — hero */}
        <div id="v0" className={styles.heroBand}>
          <Glow color="var(--orchid-mist)" left="-8%" top="0%" size={540} opacity={0.12} />
          <header className={styles.heroInner}>
            <Eyebrow color="var(--orchid-mist)">unbarrier.voice</Eyebrow>
            <h1 className={styles.heading}>
              the audit that starts with the child and works backwards.
            </h1>
            <p className={styles.ledeMuted}>
              every readiness tool scores the organisation. unbarrier.voice
              measures the one thing they skip: whether the technology, the
              access and the communication actually reach the learner they were
              bought for.
            </p>
            <p className={styles.ledeQuiet}>
              device-agnostic. built on the learner&rsquo;s own experience. it
              is the measurement layer under everything we do.
            </p>
            <div className={styles.ctaRow}>
              <Button href={BOOKING_URL} color="var(--orchid-mist)" external>
                {BOOKING_LABEL}
              </Button>
              {/* The one-pager is a static file in public/, so it goes out
                  as a plain <a>, never through next/link. */}
              <Button href="/the-takeaway.html" variant="ghost" external>
                the seven questions, on one page →
              </Button>
            </div>
          </header>
        </div>

        {/* v1 — the layer under the work */}
        <div id="v1" className={voice.layer}>
          <div className={voice.layerInner}>
            <p className={voice.layerStatement}>
              one pathway, not three products. voice is the layer the other two
              run on.
            </p>
            <div className={voice.layerList}>
              {LAYER.map((item) => (
                <p key={item.name} className={voice.layerItem}>
                  <span
                    className={voice.dot}
                    style={{ background: item.dot }}
                    aria-hidden="true"
                  />
                  <span>
                    <strong className={styles.strong}>{item.name}</strong> &mdash;{' '}
                    {item.body}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* v2 — the seven questions. Identical to /access c3: the same component. */}
        <div id="v2" className={styles.anchor}>
          <SevenQuestions
            id="seven-q"
            heading="what it asks — the seven questions"
            intro="asked from the learner's side. pick any moment in a lesson, and ask all seven of it. that is the whole method. it needs no software, and it is the part with the most value in it."
            ground="second"
          />
          {/* The route out of the block: the seven questions on one page.
              Same ground, pulled up under the list (.paperCardUnder). */}
          <Section measure="route" ground="second" labelledBy="seven-q-paper">
            <div className={styles.paperCardUnder}>
              <Eyebrow color="var(--orchid-mist)">
                <span id="seven-q-paper">take the seven questions with you</span>
              </Eyebrow>
              <CtaCard
                card="seven_questions_paper"
                title="the seven questions"
                meta="the instrument, on one page. take it into your next planning meeting."
                detail="a4 · one side · free, no email"
                href="/the-takeaway.html"
                external
                accent="var(--orchid-mist)"
                accentRgb="219, 125, 204"
              />
            </div>
          </Section>
        </div>

        {/* v4 — what a baseline is */}
        <Section id="v4" measure="route" ground="base" labelledBy="baseline">
          <h2 id="baseline" className={styles.sectionHeading}>
            what a baseline is
          </h2>
          <div className={voice.twoCol}>
            <div>
              <p className={voice.strongLine}>
                where you are now, scored against the seven questions. a
                starting number, not a verdict.
              </p>
              <p className={styles.body}>
                it is a baseline you can measure again later, so
                &ldquo;impact&rdquo; stops being a word and becomes a number you
                can stand behind.
              </p>
            </div>
            <p className={styles.body}>
              in the cycle every piece of our work runs on &mdash; notice →
              design → try → embed &mdash; voice is what makes notice and embed
              into measurements rather than impressions. it is the same
              instrument at both ends, which is the only reason the difference
              between them means anything.
            </p>
          </div>
        </Section>

        {/* v4b — what you get back */}
        <Section id="v4b" measure="route" ground="second" labelledBy="back">
          <Eyebrow color="var(--orchid-mist)">after the baseline</Eyebrow>
          <h2 id="back" className={styles.sectionHeading}>
            what you get back
          </h2>
          <ol className={voice.reports}>
            {WHAT_YOU_GET_BACK.map((card) => (
              <li key={card.n} className={voice.reportCard}>
                {reportImageExists(card.image) && (
                  <div className={voice.reportImage}>
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={800}
                      height={600}
                      className={voice.reportImg}
                    />
                  </div>
                )}
                <p className={voice.reportNumeral}>{card.n}</p>
                <p className={voice.reportTitle}>{card.title}</p>
                <p className={styles.cardBody}>{card.body}</p>
              </li>
            ))}
          </ol>
          {anyReport && (
            <p className={styles.cardSource}>
              report pages shown are illustrative &mdash; sample data, not a real
              school.
            </p>
          )}
        </Section>

        {/* v5 — two purposes, two consents */}
        <Section id="v5" measure="route" ground="base" labelledBy="consents">
          <h2 id="consents" className={styles.sectionHeading}>
            two purposes, two consents. never bundled.
          </h2>
          <div className={voice.consents}>
            {CONSENTS.map((c) => (
              <div key={c.lead} className={voice.consent}>
                <p className={voice.consentLead}>{c.lead}</p>
                <p className={styles.cardBody}>{c.body}</p>
              </div>
            ))}
          </div>
          <p className={`${styles.body} ${styles.spaceAbove}`}>
            that isn&rsquo;t a legal footnote. it is the whole point of an
            instrument built to be trusted.
          </p>
        </Section>

        {/* v7 — close · subscribe · footer */}
        <div id="v7">
          <Section measure="route" ground="well" space="loose" labelledBy="v-closing">
            <h2 id="v-closing" className={styles.closeHeading}>
              we agree how you will know it worked, and when we will check.
            </h2>
            <p className={styles.closeLine}>
              that movement is your evidence. tell us what you&rsquo;re working
              with. if we can help, we&rsquo;ll say how. if we can&rsquo;t,
              we&rsquo;ll point you to someone who can.
            </p>
            <div className={styles.ctaRow}>
              <Button href={BOOKING_URL} color="var(--orchid-mist)" external>
                {BOOKING_LABEL}
              </Button>
              <Button href={READINESS_CHECK_HREF} variant="ghost">
                not there yet? → take the free readiness check
              </Button>
            </div>
          </Section>
          <div className={styles.bandWrap}>
            <NewsletterBand
              route="/voice"
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
