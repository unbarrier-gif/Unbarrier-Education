import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { SectionBar } from '@/components/SectionBar';
import { AccessRoutes } from './_components/AccessRoutes';
import { AccessInsetExample } from './_components/AccessInsetExample';
import { AccessSkipNav } from './_components/AccessSkipNav';
import { AccessTeamBench } from './_components/AccessTeamBench';
import styles from './page.module.css';

// Holding page for unbarrier.access. Modelled on /voice's holding-page
// pattern: small, honest, real voice. Replaces the /#services anchor for
// the access strand. Upgrades to the full version (five named routes +
// £650 day rate) once pricing is pressure-tested with a real client and
// BETT/Apple credibility is earned with permission. Source draft: Notion
// page 355bbd60-0b3f-8188-aff6-fa38b4ab63a3 (locked 3 May 2026).
// Section 2 observations (D22) and SEO additions (D24, D25) shipped per
// project page 35bbbd60-0b3f-804a-a1d3-c580bc563fbb (10 May 2026).

export const metadata: Metadata = {
  title:
    'Most schools already own the tools. Few use them consistently. | unbarrier.me',
  description:
    'Five things we see in primary schools that have already invested in iPad. Accessibility, ordinarily available provision, and what landing the investment actually looks like.',
  alternates: { canonical: 'https://www.unbarrier.me/access' },
  openGraph: {
    title:
      'Most schools already own the tools. Few use them consistently. | unbarrier.me',
    description:
      'Five things we see in primary schools that have already invested in iPad. Accessibility, ordinarily available provision, and what landing the investment actually looks like.',
    url: 'https://www.unbarrier.me/access',
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

const HERO_CTA =
  'mailto:access@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20hello';
const ENQUIRY_CTA =
  'mailto:access@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20enquiry';
const ENQUIRY_FORM = '/workshops#enquire';

// Five observations — final copy locked per D22 (10 May 2026), with
// vocabulary aligned to the canonical wiki per D23 ("ordinarily available
// provision", "belonging"). For obs 05, `body` carries the JSX with <em>
// emphasis; `text` is the plain string used for FAQPage schema (D25).
const OBSERVATIONS: Array<{
  n: string;
  headline: string;
  text: string;
  body?: React.ReactNode;
}> = [
  {
    n: '01',
    headline: "The tools are there. The strategy isn't.",
    text:
      "Most primary schools already have iPads — the kit is in the building, in varying configurations and at varying levels of deployment. What's missing is the practice. Teachers have devices but no defined workflow, so the iPad becomes a presentation surface rather than a teaching tool. Reader View. Speak Selection. Colour filters. Live captions. The Accessibility Assistant. Already on the device. Not yet in the lesson.",
  },
  {
    n: '02',
    headline: 'TAs are doing work the device is built to do.',
    text:
      "Reading the question aloud. Spelling the word out. Sitting beside the child to hold the lesson together. None of this is necessary when the iPad is configured properly — and TAs receive almost no training on the tools that would change that. Speak Selection reads the page. Live Listen carries the teacher's voice straight to the child. Sound Recognition flags the bell, the alarm, the name being called. The TA is freed to do the work only a human can do.",
  },
  {
    n: '03',
    headline: 'Access tools only work when everyone uses them.',
    text:
      "A device is funded through SEND provision and issued to a single child. The features are powerful. The configuration is right. But in practice, the iPad gets used for Times Tables Rock Stars, the same as everyone else's — not for the access features it was funded for. Even where the access tools are switched on, the same problem appears in another form. When one child is the only one in the room using Speak Selection, dictation, or live captions, the tool stops being access and starts being a marker of difference. Accessibility features work when they are part of how the whole class operates — not when they single out the child they were meant to support. The investment goes in. The benefit doesn't come out, because the routine around it was never built. This is the difference between targeted provision and ordinarily available provision. Targeted support is named in the plan. Ordinarily available provision is what happens in the room every day, for every child, by default.",
  },
  {
    n: '04',
    headline: 'The iPad is withdrawn in the year the child needs it most.',
    text:
      "iPad is often framed as a primary-phase device. As children move through the school, it gets put away — seen as something to be replaced by something more 'grown-up'. But the child who needed live captions in Reception still needs them in Year 5. Dyslexia identified in Year 2 doesn't resolve itself by Year 6. Removing a working tool at the point of greatest demand is a withdrawal of provision, not a developmental step. The same risk sits at secondary transition, where the device that worked in Year 6 is replaced by something the child has never used, in the term they need stability most.",
  },
  {
    n: '05',
    headline: "Inspection isn't asking yet. It will.",
    text:
      "This year's white paper, Every Child Achieving and Thriving, names accessibility, ordinarily available provision, and belonging as core to the inclusion agenda. Inspection follows white papers. Trust governance follows inspection. The accountability question is shifting from do you have the kit? to are you using it for every child the white paper named? — and \"we bought it\" is not an answer. Schools that get ahead of this don't buy more. They use what they already have, properly.",
    body: (
      <>
        This year&apos;s white paper,{' '}
        <em>Every Child Achieving and Thriving</em>, names accessibility,
        ordinarily available provision, and belonging as core to the
        inclusion agenda. Inspection follows white papers. Trust governance
        follows inspection. The accountability question is shifting from{' '}
        <em>do you have the kit?</em> to{' '}
        <em>are you using it for every child the white paper named?</em>{' '}
        — and &ldquo;we bought it&rdquo; is not an answer. Schools that get
        ahead of this don&apos;t buy more. They use what they already have,
        properly.
      </>
    ),
  },
];

// Article schema (D25a). Headline mirrors the H1; description mirrors the
// page metadata description.
const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Most schools already own the tools. Few use them consistently.',
  description:
    'Five things we see in primary schools that have already invested in iPad. From unbarrier.me, accessibility and digital inclusion consultancy.',
  author: {
    '@type': 'Person',
    name: 'Nici Foote',
    url: 'https://www.unbarrier.me/about',
  },
  publisher: {
    '@type': 'Organization',
    name: 'unbarrier.me',
    url: 'https://www.unbarrier.me',
  },
  about: [
    { '@type': 'Thing', name: 'Special Educational Needs' },
    { '@type': 'Thing', name: 'Accessibility in education' },
    { '@type': 'Thing', name: 'iPad in primary schools' },
    { '@type': 'Thing', name: 'Ordinarily available provision' },
  ],
};

// FAQPage schema (D25b). Generated dynamically from OBSERVATIONS so the
// schema stays in sync if the copy changes — each observation H3 becomes
// a Question and its plain-text body becomes the Answer.
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: OBSERVATIONS.map((obs) => ({
    '@type': 'Question',
    name: obs.headline,
    acceptedAnswer: {
      '@type': 'Answer',
      text: obs.text,
    },
  })),
};

export default function AccessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Nav active="access" />
      <main className={styles.main}>
        <Glow color="var(--princeton-orange)" left="-120px" top="6%" size={620} opacity={0.1} />
        <Glow color="var(--spring-green)" right="-100px" top="40%" size={460} opacity={0.07} />

        {/* 1. HERO — eyebrow with bullet dot, two-line H1, body, CTA, subtext.
            Hero CTA is /access-specific — the schools/trusts audience expects
            a clear next step above the fold; /voice's audience (EdTech firms)
            self-selects on the read-through and CTAs at the bottom. */}
        <header className={styles.hero}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.dot} />
            unbarrier.access · accessibility, in real classrooms
          </p>
          <h1 className={styles.heading}>
            Most schools already own the tools.
            <br />
            <span className={styles.headingAccent}>
              Few use them consistently.
            </span>
          </h1>

          {/* Skip-nav sits directly under the H1 so heads scanning see
              decisions before the body copy. Goes sticky once it scrolls
              past the top of the viewport. */}
          <AccessSkipNav />

          <p className={styles.heroBody}>
            I help schools and trusts turn the accessibility tools they&apos;ve
            already paid for — iPads, GoodNotes, Apple&apos;s built-in suite —
            into everyday classroom practice. Not extra software. Not another
            rollout. Just the tools they already own, finally working for the
            children who need them.
          </p>
          <div className={styles.heroCtaRow}>
            <Button href={HERO_CTA} color="var(--princeton-orange)">
              Email Nici →
            </Button>
            <a href={ENQUIRY_FORM} className={styles.heroFormLink}>
              Fill the enquiry form →
            </a>
          </div>
          <div className={styles.heroSubtext}>
            <Image
              src="/assets/apls-badge.svg"
              alt="Apple Professional Learning Specialist"
              width={307}
              height={68}
              className={styles.aplsLockup}
              priority
            />
            <p className={styles.heroSubtextLine}>
              Apple Professional Learning Specialist · 26 years in classrooms
            </p>
          </div>
        </header>

        {/* 2. WHAT I SEE — orange accent on "The implementation isn't." stays
            in the same heading font (Outfit) for typographic consistency. */}
        <SectionBar color="var(--princeton-orange)" />
        <section id="access-what-i-see" className={styles.observations}>
          <div className={styles.observationsHead}>
            <Eyebrow color="var(--princeton-orange)">
              Five things I see in schools that have already invested.
            </Eyebrow>
            <h2 className={styles.h2}>
              The investment is in.{' '}
              <span className={styles.accent}>The implementation isn&apos;t.</span>
            </h2>
          </div>

          <ol className={styles.observationsList}>
            {OBSERVATIONS.map(({ n, headline, text, body }) => (
              <li key={n} className={styles.observation}>
                <span aria-hidden="true" className={styles.bigNum}>
                  {n}
                </span>
                <p className={styles.observationLabel}>observation {n}</p>
                <h3 className={styles.observationHeadline}>{headline}</h3>
                <p className={styles.observationText}>{body ?? text}</p>
              </li>
            ))}
          </ol>

          {/* D27 closing CTA — light single-button block routing to the
              workshop enquiry form. Frames as natural next step for a
              school that recognises itself in the five observations.
              Anchor target /workshops#enquire is added by the /workshops
              build (decision log D26 ships both in the same PR). */}
          <div className={styles.observationsCta}>
            <p className={styles.observationsCtaCopy}>
              Recognise your school in any of these? Tell us where it&apos;s
              stuck.
            </p>
            <Button href={ENQUIRY_FORM} color="var(--princeton-orange)">
              Workshop enquiries
            </Button>
          </div>
        </section>

        {/* 3. WHAT I DO */}
        <SectionBar color="var(--spring-green)" />
        <section id="access-what-i-do" className={styles.where}>
          <Glow color="var(--spring-green)" left="62%" top="-10%" size={500} opacity={0.06} />
          <div className={styles.whereInner}>
            <Eyebrow color="var(--spring-green)">Where I&apos;m at.</Eyebrow>
            <p className={styles.whereLede}>
              Accessibility tools for everybody — not just SEN kids.
              We&apos;ve all been customising for ourselves for years. Now we
              make that visible to children.
            </p>
            <h2 className={styles.h2}>
              I help schools turn what they own into what works.
            </h2>
            <p className={styles.whereParagraph}>
              The work happens in different shapes depending on what a school
              needs.
            </p>
            <p className={styles.whereParagraph}>
              Sometimes it&apos;s a focused 90 minutes with the whole staff to
              activate the basics and shift the routines that are costing the
              most. Sometimes it&apos;s a full day, working with TAs and the
              SENCO together to redesign how a child&apos;s iPad is used.
              Sometimes it&apos;s a strategic conversation with digital
              leadership about what to prioritise across a trust, a phase, or
              a year group.
            </p>
            <p className={styles.whereParagraph}>
              I come in with an accessibility lens, not the whole digital
              lens. The whole digital lens is being delivered everywhere.
              The accessibility lens is the bit that&apos;s missing — the
              bit that turns the device from a demo tool into a teaching
              tool, and the device from a teaching tool into a learning
              tool the child can actually use.
            </p>
            <p className={styles.whereParagraph}>
              If you&apos;re a school or trust with iPads in classrooms and a
              sense that the accessibility return on that investment
              isn&apos;t where it should be — that&apos;s where this
              conversation starts.
            </p>
          </div>
        </section>

        {/* 4. THREE ROUTES — pick & mix (NEW · /access v2) */}
        <SectionBar color="var(--princeton-orange)" />
        <AccessRoutes />

        {/* 5. WORKED-EXAMPLE INSET DAY (NEW · /access v2) */}
        <SectionBar color="var(--school-bus-yellow)" />
        <AccessInsetExample />

        {/* 6. NOT JUST ME — APLS bench (NEW · /access v2) */}
        <SectionBar color="var(--spring-green)" />
        <AccessTeamBench />

        {/* 7. CTA */}
        <SectionBar color="var(--princeton-orange)" />
        <section id="access-ask" className={styles.cta}>
          <Eyebrow color="var(--princeton-orange)">
            Tell me what you&apos;re working with.
          </Eyebrow>
          <h2 className={styles.h2}>Email me.</h2>
          <p className={styles.ctaLede}>
            Tell me about your setup, the children it&apos;s meant to support,
            and where it&apos;s stuck. I&apos;ll tell you what I think will
            move it. If a structured implementation makes sense, we&apos;ll
            talk about shape and cost. If it doesn&apos;t, I&apos;ll point you
            at someone better matched.
          </p>
          <div className={styles.ctaRow}>
            <Button href={ENQUIRY_CTA} color="var(--princeton-orange)">
              access@unbarrier.me
            </Button>
            <a href={ENQUIRY_FORM} className={styles.heroFormLink}>
              Fill the enquiry form →
            </a>
          </div>
          <p className={styles.ctaSubtext}>
            Real conversation. I reply personally — usually within two working
            days.
          </p>
        </section>

        <Footer variant="full" />
      </main>
    </>
  );
}
