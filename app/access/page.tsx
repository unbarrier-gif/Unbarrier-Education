import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { SectionBar } from '@/components/SectionBar';
import { AccessRoutes } from './_components/AccessRoutes';
import { AccessInsetExample } from './_components/AccessInsetExample';
import { AccessTeamBench } from './_components/AccessTeamBench';
import styles from './page.module.css';

// Holding page for unbarrier.access. Modelled on /voice's holding-page
// pattern: small, honest, real voice. Replaces the /#services anchor for
// the access strand. Upgrades to the full version (five named routes +
// £650 day rate) once pricing is pressure-tested with a real client and
// BETT/Apple credibility is earned with permission. Source draft: Notion
// page 355bbd60-0b3f-8188-aff6-fa38b4ab63a3 (locked 3 May 2026).

export const metadata: Metadata = {
  title: 'unbarrier.access — for schools and trusts',
  description:
    "I help schools and trusts turn the accessibility tools they've already paid for — iPads, GoodNotes, Apple's built-in suite — into everyday classroom practice.",
  alternates: { canonical: 'https://www.unbarrier.me/access' },
  openGraph: {
    title: 'unbarrier.access — for schools and trusts',
    description:
      "Turn the accessibility tools your school already owns into everyday classroom practice. Not extra software — the tools you already own, finally working for the children who need them.",
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
  'mailto:hello@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20hello';
const ENQUIRY_CTA =
  'mailto:hello@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20enquiry';
const ENQUIRY_FORM = '/workshops#enquire';

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
        <Glow color="var(--princeton-orange)" left="-120px" top="6%" size={620} opacity={0.1} />
        <Glow color="var(--spring-green)" right="-100px" top="40%" size={460} opacity={0.07} />

        {/* 1. HERO — eyebrow with bullet dot, two-line H1, body, CTA, subtext.
            Hero CTA is /access-specific — the schools/trusts audience expects
            a clear next step above the fold; /voice's audience (EdTech firms)
            self-selects on the read-through and CTAs at the bottom. */}
        <header className={styles.hero}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.dot} />
            For schools and trusts.
          </p>
          <h1 className={styles.heading}>
            Most schools already own the tools.
            <br />
            Few use them consistently.
          </h1>
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
            <Button
              href={ENQUIRY_FORM}
              variant="ghost"
              color="var(--princeton-orange)"
            >
              Fill the enquiry form →
            </Button>
          </div>
          <p className={styles.heroCtaHint}>
            Email if you want a conversation. Form if you&apos;ve got dates and
            headcount.
          </p>
          <p className={styles.heroSubtext}>
            Apple Professional Learning Specialist. 26 years in classrooms.
            Dyslexic and ADHD educator.
          </p>
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
        <section className={styles.cta}>
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
              hello@unbarrier.me
            </Button>
            <Button
              href={ENQUIRY_FORM}
              variant="ghost"
              color="var(--princeton-orange)"
            >
              Fill the enquiry form →
            </Button>
          </div>
          <p className={styles.ctaHint}>
            Email if you want a conversation. Form if you&apos;ve got dates and
            headcount.
          </p>
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
