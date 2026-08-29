import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CredentialStrip } from '@/components/CredentialStrip';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { SectionBar } from '@/components/SectionBar';
import { BOOKING_URL, BOOKING_LABEL } from '@/lib/booking';
import styles from '@/app/route-page.module.css';

// /edtech — new route, approved 28 Aug 2026. Its own page rather than a
// section on /access: "i'm an edtech company" is one of the five routes in the
// home chooser (branch D) and it had no destination.
//
// Copy verbatim from the approved page drafts.
//
// THE CREDENTIAL STRIP APPEARS TWICE IN THE SOURCE DRAFT — once as the
// sitewide strip and once inline under the hero cta. It renders once here, via
// the component. The duplicated body line is dropped.
//
// "unbarrier.voice" appears in body copy below. It stays TEXT. /voice cannot
// publish until legal signs off the retention period and the two-purpose
// privacy notice, and being unlinked is the condition of the route existing at
// all — see app/voice/page.tsx.
//
// /edtech is not one of the three strands, so it takes no strand colour.
// spring-green is the site's default action colour; borrowing pearl-aqua,
// princeton-orange or orchid-mist here would imply this page belongs to audit,
// access or voice.

const CANONICAL = 'https://www.unbarrier.me/edtech';

export const metadata: Metadata = {
  title:
    'for edtech companies — does your product reach the learners you built it for? | unbarrier.me',
  description:
    'we check whether your product reaches the learners you built it for — and we help it land in the schools that buy it. classroom research, implementation design, and an inclusive design review.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'for edtech companies — we check whether your product reaches the learners you built it for',
    description:
      'classroom research from the learner’s side, implementation design for the schools that buy you, and an honest review of what you are claiming.',
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

const WORRIES: Array<{ lead: string; body: string }> = [
  {
    lead: 'a school buys it, and nothing changes.',
    body: 'the licences are active. usage looks fine. and at renewal nobody can say what it did.',
  },
  {
    lead: 'a senco says it does not work for our learners',
    body: '— and you have no answer, because nobody has ever watched a learner use it in a real lesson.',
  },
  {
    lead: 'your accessibility claims have never been tested by anyone outside the building.',
    body: 'vpats and conformance statements describe the product. they do not describe what happens on a tuesday in year 4.',
  },
];

const WHAT_WE_DO: Array<{ lead: string; body: string; aside: string }> = [
  {
    lead: 'find out if it reaches them',
    body: 'unbarrier.voice, run on your product in real classrooms. seven questions, asked from the learner’s side.',
    aside: 'you get what a survey cannot tell you: what a learner actually does with it when nobody is helping.',
  },
  {
    lead: 'make it land',
    body: 'implementation design for the schools that buy you. onboarding, modelling in classrooms, and the training that decides whether it is still in use next summer.',
    aside: 'this is the part your customer success team cannot do, because it needs someone who has taught.',
  },
  {
    lead: 'tell you the truth about the product',
    body: 'an inclusive design and positioning review. what works, what does not, and what you are claiming that you cannot yet stand behind.',
    aside: 'said to you first, and privately.',
  },
];

const IN_PRACTICE: string[] = [
  'we work with the schools, not on your behalf.',
  'findings go to the school first. you see your own product’s data, not the school’s whole picture.',
  'materials are licensed to you for the campaign or the programme, never assigned.',
  'if we find something that does not work, you hear it before anyone else does.',
];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'unbarrier for edtech',
  serviceType: 'Inclusive design research and implementation for education technology',
  description:
    'classroom research on whether an edtech product reaches the learners it was built for, implementation design for the schools that buy it, and an inclusive design and positioning review.',
  url: CANONICAL,
  provider: {
    '@type': 'Organization',
    name: 'Unbarrier Education Ltd',
    url: 'https://www.unbarrier.me',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  audience: {
    '@type': 'BusinessAudience',
    name: 'Education technology companies',
  },
};

export default function EdtechPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <Nav active="edtech" />

      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--spring-green)' } as CSSProperties}
      >
        <Glow color="var(--spring-green)" left="-120px" top="4%" size={620} opacity={0.1} />
        <Glow color="var(--pearl-aqua)" right="-100px" top="44%" size={460} opacity={0.07} />

        <header className={styles.hero}>
          <Eyebrow color="var(--spring-green)">for edtech companies</Eyebrow>
          <h1 className={styles.heading}>
            we check whether your product reaches the learners you built it for
            —{' '}
            <span className={styles.accent}>
              and we help it land in the schools that buy it.
            </span>
          </h1>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--spring-green)" external>
              {BOOKING_LABEL}
            </Button>
          </div>
          {/* The source draft repeats the credential line inline here. It is
              the strip, so it renders once, as the component. */}
          <CredentialStrip />
        </header>

        <SectionBar color="var(--spring-green)" />

        <section className={styles.section} aria-labelledby="worries">
          <h2 id="worries" className={styles.sectionHeading}>
            what you are actually worried about
          </h2>
          <ul className={styles.options}>
            {WORRIES.map((worry) => (
              <li key={worry.lead} className={styles.option}>
                <p className={styles.optionBody}>
                  <strong className={styles.strong}>{worry.lead}</strong>{' '}
                  {worry.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="what-we-do">
          <h2 id="what-we-do" className={styles.sectionHeading}>
            what we do
          </h2>
          <ul className={styles.options}>
            {WHAT_WE_DO.map((item) => (
              <li key={item.lead} className={styles.option}>
                <p className={styles.optionBody}>
                  <strong className={styles.strong}>{item.lead}</strong> —{' '}
                  {item.body}
                </p>
                <p className={styles.aside}>{item.aside}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="the-boundary">
          <h2 id="the-boundary" className={styles.sectionEyebrow}>
            the boundary, and it is the reason to hire us
          </h2>
          <p className={styles.statement}>we will never recommend you.</p>
          <p className={styles.body}>
            we will not name you inside a document we author for a school. we do
            not take commission on a licence sale. if we help a school write its
            inclusion strategy, your product does not appear in it because you
            paid us.
          </p>
          <p className={styles.body}>
            that sounds like a limit. it is the whole asset.{' '}
            <strong className={styles.strong}>
              the reason a school listens to us about your product is that we
              are not selling it
            </strong>{' '}
            — and the moment that stops being true, everything we could do for
            you stops being worth anything.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="in-practice">
          <h2 id="in-practice" className={styles.sectionHeading}>
            what it looks like in practice
          </h2>
          <ul className={styles.list}>
            {IN_PRACTICE.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="proof">
          <h2 id="proof" className={styles.sectionHeading}>
            proof
          </h2>
          <p className={styles.body}>
            <strong className={styles.strong}>
              goodnotes funds our training for schools.
            </strong>{' '}
            no invoice to the school. a platform paying for its own product to
            land well is not a testimonial — it is a commercial decision someone
            made twice.
          </p>
          <div className={styles.ctaRow}>
            <Button href="/goodnotes" variant="ghost">
              see the goodnotes hub →
            </Button>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="what-it-costs">
          <h2 id="what-it-costs" className={styles.sectionHeading}>
            what it costs
          </h2>
          <p className={styles.body}>
            scoped to the work, and quoted as one number for a defined outcome.
            some of it is per school, some of it is a programme across a cohort
            — it depends what you are trying to find out and how many settings
            you are trying to reach.
          </p>
          <p className={styles.body}>
            <strong className={styles.strong}>
              we will tell you the number before you commit to anything
            </strong>
            , and there is no charge for the conversation that gets us there.
          </p>
        </section>

        <SectionBar color="var(--spring-green)" />

        <section className={styles.close} aria-labelledby="close">
          <h2 id="close" className={styles.closeHeading}>
            tell us what you&rsquo;re working with. if we can help, we&rsquo;ll
            say how. if we can&rsquo;t, we&rsquo;ll point you to someone who
            can.
          </h2>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--spring-green)" external>
              {BOOKING_LABEL}
            </Button>
          </div>
        </section>

        <NewsletterBand route="/edtech" weight="standard" />


        <Footer variant="full" />
      </main>
    </>
  );
}
