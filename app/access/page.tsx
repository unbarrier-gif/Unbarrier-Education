import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { SectionBar } from '@/components/SectionBar';
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
  'mailto:nici@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20hello';
const ENQUIRY_CTA =
  'mailto:nici@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20enquiry';

const OBSERVATIONS = [
  {
    n: '01',
    headline: "The tools are already there. The strategy isn't.",
    text: "A whole-school iPad rollout, three years in, and accessibility features are still toggled on inconsistently. Some classrooms use Speak Selection. Others don't know it exists. The variation is the problem, not the tech.",
  },
  {
    n: '02',
    headline: 'TAs are doing work that learners could do themselves.',
    text: 'The TA reads the question aloud. The TA spells the word. The TA is exhausted by Friday. None of that is necessary if the iPad is set up properly. The over-reliance on adult mediation is the most common pattern I see — and the most fixable.',
  },
  {
    n: '03',
    headline: 'SEND-funded devices sit at 30% utilisation.',
    text: "EHCP-mandated iPads, expensive specialist apps, and the child uses them for ten minutes a week. Not because they don't help. Because no one trained the staff around the child to embed the tool into routine.",
  },
  {
    n: '04',
    headline: 'Staff confidence has a phase gap.',
    text: 'Reception staff are often more comfortable with the basics than Year 5 staff. Year 6 prep eats accessibility time. By Year 4, the child who needed scaffolded reading in Reception has lost three years of practice with the tool that would have helped them.',
  },
  {
    n: '05',
    headline: "Inspection isn't asking yet, but it will.",
    text: "DfE Digital and Technology Standards. SEND review pressure. Trust governance. The accountability is moving toward whether the existing tools are being used — not whether you've bought enough of them. The schools that get ahead of this aren't doing more. They're doing what they already have, properly.",
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
            For schools and trusts
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
          <div className={styles.heroCta}>
            <Button href={HERO_CTA} color="var(--princeton-orange)">
              Tell me what you&apos;re working with →
            </Button>
          </div>
          <p className={styles.heroSubtext}>
            Apple Professional Learning Specialist. 26 years in classrooms.
            Dyslexic and ADHD educator.
          </p>
        </header>

        {/* 2. WHAT I SEE — Cherry Bomb on "The implementation isn't." matches
            the brand mapping for the access strand's accent moment. */}
        <SectionBar color="var(--princeton-orange)" />
        <section id="access-what-i-see" className={styles.observations}>
          <div className={styles.observationsHead}>
            <Eyebrow color="var(--princeton-orange)">
              Five things I see in schools that have already invested
            </Eyebrow>
            <h2 className={styles.h2}>
              The investment is in.{' '}
              <span className={styles.cherry}>The implementation isn&apos;t.</span>
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
            <Eyebrow color="var(--spring-green)">Where I&apos;m at</Eyebrow>
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
              I don&apos;t sell software. I don&apos;t run a one-size-fits-all
              CPD package. I look at what you&apos;ve already invested in, the
              children it was meant to help, and the gap between the two.
              Then I build the route to close it.
            </p>
            <p className={styles.whereParagraph}>
              If you&apos;re a school or trust with iPads in classrooms and a
              sense that the accessibility return on that investment
              isn&apos;t where it should be — that&apos;s where this
              conversation starts.
            </p>
          </div>
        </section>

        {/* 4. CTA */}
        <SectionBar color="var(--princeton-orange)" />
        <section className={styles.cta}>
          <Eyebrow color="var(--princeton-orange)">
            Tell me what you&apos;re working with
          </Eyebrow>
          <h2 className={styles.h2}>Email me.</h2>
          <p className={styles.ctaLede}>
            Tell me about your setup, the children it&apos;s meant to support,
            and where it&apos;s stuck. I&apos;ll tell you what I think will
            move it. If a structured implementation makes sense, we&apos;ll
            talk about shape and cost. If it doesn&apos;t, I&apos;ll point you
            at someone better matched.
          </p>
          <Button href={ENQUIRY_CTA} color="var(--princeton-orange)">
            nici@unbarrier.me →
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
