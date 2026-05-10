import type { Metadata } from 'next';
import { APLSBadge } from '@/components/APLSBadge';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { SectionBar } from '@/components/SectionBar';
import styles from './page.module.css';

// /access — strand page for unbarrier.access. Built to PR1 spec
// (Accent System Spec §4 anatomy + Build /access brief). Source draft:
// Notion page 355bbd60-0b3f-8188-aff6-fa38b4ab63a3 (locked 3 May 2026).

export const metadata: Metadata = {
  title: 'unbarrier.access — for schools and trusts',
  description:
    "Accessibility built into the device. Built into the lesson. Help for schools and trusts to turn the accessibility tools they already own into everyday classroom practice.",
  alternates: { canonical: 'https://www.unbarrier.me/access' },
  openGraph: {
    title: 'unbarrier.access — for schools and trusts',
    description:
      "Accessibility built into the device. Built into the lesson. Help for schools and trusts to turn the accessibility tools they already own into everyday classroom practice.",
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
  'mailto:nici@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20hello';

// Closing-CTA mailto carries a body prefill with a school-name
// placeholder, per PR1 spec §1.Section 3.
const ENQUIRY_CTA =
  'mailto:nici@unbarrier.me' +
  '?subject=unbarrier.access%20%E2%80%94%20enquiry' +
  '&body=' +
  encodeURIComponent(
    'School / trust: [your school]\n\nWhat you’re working with:\n\n',
  );

const OBSERVATIONS = [
  {
    n: '01',
    headline: "The tools are already there. The strategy isn't.",
    text: "Most primary schools have iPads. A couple in the corner that don't get used. Or a shared trolley. Or one to one. The kit is there. What's missing is the practice — teachers with iPads but no clear workflow for what to do with them, so the iPad becomes a demo tool, not a teaching one. Speak Selection, colour filters, live captions — they're all already on the device. They're just not being used.",
  },
  {
    n: '02',
    headline: 'TAs are doing work that learners could do themselves.',
    text: "Our TAs have been the missing part of our accessibility training for a long time. They're the ones reading the question aloud, spelling the word, holding the child up through the lesson — and they're exhausted by Friday. None of that work is necessary when the iPad is set up properly. Speak Selection reads the page. Live captions handle the teacher's voice. The TA gets to do the work only a human can do, instead of doing what the device should be doing.",
  },
  {
    n: '03',
    headline: 'SEND-funded devices sit unused.',
    text: "An EHCP names the iPad. The school buys it. The specialist apps get installed. And then the child uses it for ten minutes a week — not because the tool doesn't help, but because no one trained the adults around the child to make it part of the routine. The investment goes in. The accessibility benefit doesn't come out. The child carries on coping the way they were before, just now with an iPad sitting in their tray.",
  },
  {
    n: '04',
    headline: 'The iPad gets put away in the year the child needs it most.',
    text: "The iPad gets seen as a primary device. Children move up through the school and the device gets put away — replaced by a clamshell, a Chromebook, something more grown-up. But the child who needed live captions in Reception still needs them in Year 5. The child whose dyslexia got picked up in Year 2 doesn't grow out of dyslexia. We move them off the tool that was working, in the year they need it most.",
  },
  {
    n: '05',
    headline: "Inspection isn't asking yet, but it will.",
    text: (
      <>
        The white paper this year names accessibility, ordinary available
        provision, and belonging as core. Inspection follows white papers.
        Trust governance follows inspection. The accountability question
        schools used to face was <em>do you have the kit?</em> The next one
        is{' '}
        <em>are you using it for every child the white paper named?</em> —
        and the answer can&apos;t be &ldquo;we bought it.&rdquo; Schools
        that get ahead of this don&apos;t buy more. They use what they
        already have, properly.
      </>
    ),
  },
];

export default function AccessPage() {
  return (
    <>
      <Nav active="access" />
      <main className={styles.main}>
        {/* Hero glow positions per PR1 spec: orange top-right, green
            bottom-left. Cross-strand tonal warmth, Accent Spec Rule 2. */}
        <Glow color="var(--princeton-orange)" right="-100px" top="6%" size={620} opacity={0.1} />
        <Glow color="var(--spring-green)" left="-120px" top="60%" size={460} opacity={0.06} />

        {/* 1. HERO */}
        <header className={styles.hero}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.dot} />
            unbarrier.access · accessibility, in real classrooms
          </p>
          <h1 className={styles.heading}>
            Accessibility built into the device.
            <br />
            <span className={styles.accent}>Built into the lesson.</span>
          </h1>
          <p className={styles.heroBody}>
            I help schools and trusts turn the accessibility tools they&apos;ve
            already paid for — iPads, GoodNotes, Apple&apos;s built-in suite —
            into everyday classroom practice. Not extra software. Not another
            rollout. Just the tools they already own, finally working for the
            children who need them.
          </p>
          <div className={styles.heroCta}>
            <Button href={HERO_CTA} color="var(--princeton-orange)">
              Get the unbarrier.access overview
            </Button>
            <a href="#observations" className={styles.heroSecondary}>
              See what schools tell me →
            </a>
          </div>
          <div className={styles.heroCredit}>
            <APLSBadge width={96} className={styles.heroBadge} />
            <p className={styles.heroSubtext}>
              Apple Professional Learning Specialist · 26 years in classrooms
            </p>
          </div>
        </header>

        {/* 2. OBSERVATIONS — anchor #observations per PR1 smoke #3 */}
        <SectionBar color="var(--princeton-orange)" />
        <section id="observations" className={styles.observations}>
          <div className={styles.observationsHead}>
            <Eyebrow color="var(--princeton-orange)">
              From inside schools
            </Eyebrow>
            <h2 className={styles.h2}>
              Five things schools tell me,{' '}
              <span className={styles.accent}>every time.</span>
            </h2>
          </div>

          <ol className={styles.observationsList}>
            {OBSERVATIONS.map(({ n, headline, text }) => (
              <li key={n} className={styles.observation}>
                <span aria-hidden="true" className={styles.bigNum}>
                  {n}
                </span>
                <p className={styles.observationLabel}>observation {n}</p>
                <h3 className={styles.observationHeadline}>{headline}</h3>
                <p className={styles.observationText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 3. WHERE I'M AT — green band, no orange in this section */}
        <SectionBar color="var(--spring-green)" />
        <section id="where" className={styles.where}>
          <Glow color="var(--spring-green)" left="62%" top="-10%" size={500} opacity={0.06} />
          <div className={styles.whereInner}>
            <Eyebrow color="var(--spring-green)">Who I am</Eyebrow>
            <h2 className={styles.h2}>Where I&apos;m at.</h2>
            <p className={styles.whereParagraph}>
              I work with schools and trusts to turn the accessibility tools
              they already own into everyday classroom practice. Not the whole
              digital lens — that&apos;s being delivered everywhere — but the
              accessibility lens, the bit that&apos;s missing.
            </p>
            <p className={styles.whereParagraph}>
              Sometimes it&apos;s 90 minutes with a whole staff to activate
              the basics. Sometimes a full INSET day with TAs and the SENCO
              redesigning how a child&apos;s iPad is used. Sometimes a
              strategic conversation with digital leadership about what to
              prioritise across a phase, a year group, or a trust.
            </p>
            <ul className={styles.credList}>
              <li>Apple Professional Learning Specialist</li>
              <li>26 years in classrooms</li>
              <li>Accessibility lens — dyslexic and ADHD educator</li>
            </ul>
          </div>
        </section>

        {/* 4. CLOSING CTA — orange, decisive single button */}
        <SectionBar color="var(--princeton-orange)" />
        <section id="bring" className={styles.cta}>
          <Eyebrow color="var(--princeton-orange)">Talk to me</Eyebrow>
          <h2 className={styles.h2}>Bring this to your school.</h2>
          <p className={styles.ctaLede}>
            Tell me about your setup, the children it&apos;s meant to support,
            and where it&apos;s stuck. I&apos;ll tell you what I think will
            move it. If a structured implementation makes sense, we&apos;ll
            talk about shape and cost. If it doesn&apos;t, I&apos;ll point you
            at someone better matched.
          </p>
          <Button href={ENQUIRY_CTA} color="var(--princeton-orange)">
            nici@unbarrier.me
          </Button>
          <p className={styles.ctaSubtext}>
            Real conversation, no forms, no automation. Replies usually within
            two working days.
          </p>
        </section>

        <Footer variant="full" />
      </main>
    </>
  );
}
