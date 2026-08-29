import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CredentialStrip } from '@/components/CredentialStrip';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { SectionBar } from '@/components/SectionBar';
import { SevenQuestions } from '@/components/SevenQuestions';
import { BOOKING_URL, BOOKING_LABEL } from '@/lib/booking';
import styles from '@/app/route-page.module.css';

// ⛔ /voice — BUILT, NOT PUBLISHED.
//
// Legal has not signed off the retention period or the two-purpose privacy
// notice. Unlinked and noindex is not a nice-to-have, it is the condition of
// this route existing at all. All of the following are load-bearing and must
// stay true until legal signs off:
//
//   * noindex, nofollow in the metadata below.
//   * NOT in the nav (components/Nav.tsx), NOT in the footer
//     (components/Footer.tsx), NOT in the sitemap (app/sitemap.ts).
//   * NO link to it from any other page. /access and /edtech both mention
//     "unbarrier.voice" in body copy — those mentions are TEXT and must not
//     become links. components/Services.tsx on the home page used to link here
//     and no longer does.
//
// WHEN LEGAL SIGNS OFF, four things come back together: the robots block
// below, the nav entry, the footer entry, and the sitemap entry. Grep
// "/voice" before assuming you have found them all.
//
// The hero line keeps "the child" rather than "learners". It is one of the two
// deliberate exceptions to the site-wide vocabulary rule — the instrument's
// founding claim, and it is what makes the line land. Everything else on this
// page says learners.

const CANONICAL = 'https://www.unbarrier.me/voice';

export const metadata: Metadata = {
  title: 'unbarrier.voice — the audit that starts with the child',
  description:
    'unbarrier.voice measures the one thing readiness tools skip: whether the technology, the access and the communication actually reach the learner they were bought for.',
  alternates: { canonical: CANONICAL },
  // ⛔ DO NOT REMOVE without legal sign-off on the retention period and the
  // two-purpose privacy notice. See the header comment above.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const TWO_WAYS: Array<{ lead: string; body: string; aside: string }> = [
  {
    lead: 'delivered',
    body: 'nici in the room. an apple professional learning specialist watching what a survey cannot see: the workaround a learner has invented, the setting nobody turned on, the moment an adult steps in three seconds too early. learner data captured alongside it.',
    aside:
      'very few people can put an accessibility specialist in your classrooms for a day. that is where the value sits.',
  },
  {
    lead: 'the tool',
    body: 'self-serve. your own staff and learners complete it, and the picture builds itself. scalable across a trust, and it runs without anyone from unbarrier in the building.',
    aside: 'the backbone.',
  },
];

const WHAT_YOU_GET_BACK: string[] = [
  'a one-page picture of where access is reaching learners, and where it isn’t.',
  'the gaps named, in language a governor understands, so the spend can be defended and the next step funded.',
  'a baseline you can measure again later, so “impact” stops being a word and becomes a number you can stand behind.',
];

const TWO_CONSENTS: string[] = [
  'your result is yours. the school’s own picture, for the school.',
  'separately, and only if you opt in, an anonymised layer builds sector-level insight into what is reaching learners and what isn’t, across settings.',
  'these are two different things, so they take two different consents. bundling them would make neither one valid.',
];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'unbarrier.voice',
  serviceType:
    'Learner-side accessibility measurement instrument for schools and trusts',
  description:
    'a device-agnostic instrument that measures whether the technology, the access and the communication in a setting actually reach the learner they were bought for, built on the learner’s own experience. available delivered, in classrooms, with a self-serve tool in development.',
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

export default function VoicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <Nav />

      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--orchid-mist)' } as CSSProperties}
      >
        <Glow color="var(--orchid-mist)" left="-120px" top="4%" size={620} opacity={0.1} />
        <Glow color="var(--spring-green)" right="-100px" top="46%" size={460} opacity={0.07} />

        <header className={styles.hero}>
          <Eyebrow color="var(--orchid-mist)">unbarrier.voice</Eyebrow>
          {/* "the child", not "learners" — deliberate, and the only place on
              this page it appears. The instrument's founding claim. */}
          <h1 className={styles.heading}>
            the audit that starts with the child and{' '}
            <span className={styles.accent}>works backwards.</span>
          </h1>
          <p className={styles.lede}>
            every readiness tool scores the organisation. unbarrier.voice
            measures the one thing they skip: whether the technology, the access
            and the communication actually reach the learner they were bought
            for. device-agnostic. built on the learner&rsquo;s own experience.
            it is the measurement layer under everything unbarrier does.
          </p>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--orchid-mist)" external>
              {BOOKING_LABEL}
            </Button>
          </div>
          <CredentialStrip />
        </header>

        <SectionBar color="var(--orchid-mist)" />

        {/* Deliberately identical to the block on /access — same component. */}
        <SevenQuestions
          id="seven-questions"
          heading="seven questions, asked from the learner’s side"
        />

        <section className={styles.section} aria-labelledby="two-ways">
          <h2 id="two-ways" className={styles.sectionHeading}>
            two ways to run it
          </h2>
          <ul className={styles.options}>
            {TWO_WAYS.map((way) => (
              <li key={way.lead} className={styles.option}>
                <p className={styles.optionBody}>
                  <strong className={styles.strong}>{way.lead}</strong> —{' '}
                  {way.body}
                </p>
                <p className={styles.aside}>{way.aside}</p>
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            most schools use both: the tool for breadth, a delivered visit for
            depth.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="what-you-get">
          <h2 id="what-you-get" className={styles.sectionHeading}>
            what you get back
          </h2>
          <ul className={styles.list}>
            {WHAT_YOU_GET_BACK.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
          {/* Three image slots are still outstanding: the one-page report, the
              exported pdf, and the across-schools admin view. Nothing is
              rendered for them — an empty frame or a placeholder image would
              be a promise we cannot currently keep on the one page whose whole
              argument is not performing certainty. */}
        </section>

        <section className={styles.section} aria-labelledby="two-consents">
          <h2 id="two-consents" className={styles.sectionHeading}>
            two purposes, two consents. never bundled.
          </h2>
          <ul className={styles.list}>
            {TWO_CONSENTS.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            that isn&rsquo;t a legal footnote. it is the whole point of an
            instrument built to be trusted.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="the-layer">
          <h2 id="the-layer" className={styles.sectionHeading}>
            the layer under the work
          </h2>
          <p className={styles.body}>
            in the ndte cycle — notice → design → try → embed — voice is what
            makes <strong className={styles.strong}>notice</strong> and{' '}
            <strong className={styles.strong}>embed</strong> into measurements
            rather than impressions. it is the same instrument at both ends,
            which is the only reason the difference between them means anything.
          </p>
          <p className={styles.body}>
            unbarrier.voice is what unbarrier.audit and unbarrier.access both
            run on. a discovery day uses it to find the gaps. a partnership year
            uses it to prove the movement between the start and the end. same
            seven questions, every time.
          </p>
        </section>

        <SectionBar color="var(--orchid-mist)" />

        <section className={styles.close} aria-labelledby="available-now">
          <h2 id="available-now" className={styles.closeHeading}>
            delivered is available now. the tool is being built with the first
            schools who want it.
          </h2>
          <p className={styles.lede}>
            <strong className={styles.strong}>
              you can have the delivered version today.
            </strong>{' '}
            nici in your classrooms, observing what a survey cannot see, with
            learner data captured alongside it. that needs no software and it is
            the part with the most value in it.
          </p>
          <p className={styles.lede}>
            <strong className={styles.strong}>
              the self-serve tool is being built with its first schools, not for
              them.
            </strong>{' '}
            we are looking for three founding cohorts. research runs this autumn
            and feeds directly into what the instrument asks and how it reports
            — so the schools who join now shape it around a real setting rather
            than an imagined one.
          </p>
          <p className={styles.lede}>
            if that is you, tell us about your setting and we&rsquo;ll keep you
            in the loop as it takes shape. no date promised, and nothing to pay.
          </p>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--orchid-mist)" external>
              {BOOKING_LABEL}
            </Button>
          </div>
        </section>

        <Footer variant="full" />
      </main>
    </>
  );
}
