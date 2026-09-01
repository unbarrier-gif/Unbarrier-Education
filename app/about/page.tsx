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

// /about — the one page that stays first person. Everywhere else on the site
// is "we"; this is the person behind the we.
//
// Copy verbatim from the approved page drafts (28 Aug 2026).
//
// TWO THINGS THAT ARE DELIBERATE AND LOOK LIKE MISTAKES:
//
//  1. The "what we do" and "what we don't do" sections say "we", on a page the
//     brief describes as first person throughout. That is how the approved
//     copy reads and it is not an oversight on our part — the hero, "how we
//     work" and "credentials" are all "i", and those two lists describe the
//     business rather than the person. Flagged for Nici rather than silently
//     rewritten into "i".
//
//  2. The "open" list at the end of the approved draft — miee, collaborators,
//     speaking, photo — is NOT page copy. It is a decision list for Nici. None
//     of it is rendered here and none of it should be added.

const CANONICAL = 'https://www.unbarrier.me/about';

export const metadata: Metadata = {
  title:
    'about nici foote — 26 years in classrooms, and one question underneath all of it | unbarrier.me',
  description:
    'i’m nici foote. inclusion specialist, apple professional learning specialist, and a dyslexic, adhd and dyscalculic educator. 26 years teaching, most of it in send, across uk state and international schools.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'about nici foote — 26 years in classrooms. one question underneath all of it: who is still being left out?',
    description:
      'inclusion specialist, apple professional learning specialist, and a dyslexic, adhd and dyscalculic educator.',
    url: CANONICAL,
    type: 'profile',
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

const WHAT_WE_DO: string[] = [
  'we find out whether the technology, the access and the communication in a school actually reach the learners they were bought for.',
  'we work with leadership teams to change what happens in classrooms, and to show that it changed.',
  'we advise edtech companies on whether their product works for the learners it says it serves.',
];

const WHAT_WE_DONT_DO: string[] = [
  'we don’t sell devices, licences or badges.',
  'we don’t write a report and leave.',
  'we don’t do saviour work. the barrier is never the learner.',
  'we don’t take work we’re not right for. if that’s the answer, you’ll get it in the first email.',
];

const CREDENTIALS: Array<{ lead?: string; body: string }> = [
  {
    lead: 'apple professional learning specialist.',
    body: 'the accreditation most schools and trusts find me through.',
  },
  { body: '26 years in classrooms, send specialist, uk state and international.' },
  { body: 'founder of unbarrier education ltd.' },
];

// Person schema, carrying the APLS credential — that accreditation is the main
// route to market and the reason most schools and trusts find Nici at all, so
// it is the one thing this block exists to state in machine-readable form.
const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nici Foote',
  url: CANONICAL,
  jobTitle: 'Inclusion specialist',
  description:
    'inclusion specialist, apple professional learning specialist, and a dyslexic, adhd and dyscalculic educator. 26 years teaching, most of it in send, across uk state and international schools.',
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Apple Professional Learning Specialist',
    credentialCategory: 'Professional accreditation',
    recognizedBy: { '@type': 'Organization', name: 'Apple' },
  },
  knowsAbout: [
    'special educational needs and disabilities',
    'assistive technology in schools',
    'accessibility in education',
    'digital inclusion',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Unbarrier Education Ltd',
    url: 'https://www.unbarrier.me',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />

      <Nav active="about" />

      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--orchid-mist)' } as CSSProperties}
      >
        <Glow color="var(--orchid-mist)" left="-120px" top="4%" size={620} opacity={0.1} />
        <Glow color="var(--spring-green)" right="-100px" top="44%" size={460} opacity={0.07} />

        <header className={styles.hero}>
          <Eyebrow color="var(--orchid-mist)">about</Eyebrow>
          <h1 className={styles.heading}>
            26 years in classrooms. one question underneath all of it:{' '}
            <span className={styles.accent}>who is still being left out?</span>
          </h1>
          <p className={styles.lede}>
            i&rsquo;m nici foote. inclusion specialist, apple professional
            learning specialist, and a dyslexic, adhd and dyscalculic educator.
            i spent 26 years teaching, most of it in send, across uk state and
            international schools. i now build the things i needed and never had
            — for the learners i taught, for the teachers i worked alongside,
            and for the products i wished worked properly.
          </p>
          <p className={styles.lede}>
            unbarrier is me, for now. it won&rsquo;t always be, and it
            isn&rsquo;t built to stay that way.
          </p>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--orchid-mist)" external>
              {BOOKING_LABEL}
            </Button>
          </div>
          <CredentialStrip />
        </header>

        <SectionBar color="var(--orchid-mist)" />

        <section className={styles.section} aria-labelledby="what-we-do">
          <h2 id="what-we-do" className={styles.sectionHeading}>
            what we do
          </h2>
          <ul className={styles.list}>
            {WHAT_WE_DO.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="what-we-dont-do">
          <h2 id="what-we-dont-do" className={styles.sectionHeading}>
            what we don&rsquo;t do
          </h2>
          <ul className={styles.list}>
            {WHAT_WE_DONT_DO.map((line) => (
              <li key={line} className={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
        </section>

        {/*
          ⚠️ TODO — "why this work". THE ONLY SECTION OF THIS SITE THAT IS NOT
          WRITTEN, AND THE ONE PEOPLE WILL ACTUALLY READ.

          MISSING: 60 seconds of Nici on Plaud saying why she does this work,
          shaped into four sentences. Owner: Nici. Outstanding since 28 Aug
          2026.

          DO NOT WRITE THIS SECTION. Do not paraphrase the rest of the page
          into it, do not generate a plausible version, and do not reinstate
          the heading with filler underneath. It is deliberately absent rather
          than empty: a visitor sees "what we don't do" run straight into "how
          we work" with no gap, no heading and no placeholder text, which is
          why nothing is rendered here at all.

          WHEN THE RECORDING LANDS: add a <section> here with an h2 reading
          "why this work" and the four sentences, and delete this comment.
        */}

        <section className={styles.section} aria-labelledby="how-we-work">
          <h2 id="how-we-work" className={styles.sectionHeading}>
            how we work
          </h2>
          <p className={styles.body}>
            i am dyslexic, adhd and dyscalculic. that is not a disclosure at the
            bottom of the page, it is the method. i design for the person at the
            back of the room because i have been the person at the back of the
            room.
          </p>
          <p className={styles.body}>
            in practice: plain language, short sections, high contrast, and one
            decision at a time. if you need something in a different format,
            ask. it isn&rsquo;t a favour.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="credentials">
          <h2 id="credentials" className={styles.sectionHeading}>
            credentials
          </h2>
          <ul className={styles.list}>
            {CREDENTIALS.map((item) => (
              <li key={item.body} className={styles.listItem}>
                {item.lead && (
                  <>
                    <strong className={styles.strong}>{item.lead}</strong>{' '}
                  </>
                )}
                {item.body}
              </li>
            ))}
          </ul>
        </section>

        <NewsletterBand route="/about" weight="standard" />


        <Footer variant="full" />
      </main>
    </>
  );
}
