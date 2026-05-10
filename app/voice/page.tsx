import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { SectionBar } from '@/components/SectionBar';
import styles from './page.module.css';

// Holding page for unbarrier.voice. Stays small, honest, and a clear signal
// to EdTech firms that Nici is in this work and they can come and talk.
// Replaced wholesale with the full named version once the partnership
// conversation with the EdTech team is complete and case-study permission
// is granted. See _inbound/voice/voice-holding-notes.md for what is
// deliberately NOT on this page and why.

export const metadata: Metadata = {
  title: 'unbarrier.voice — for EdTech companies',
  description:
    "I help EdTech teams build products people actually use, understand, and benefit from. The bit between a product launch and a child who's actually using it.",
  alternates: { canonical: '/voice' },
  openGraph: {
    title: 'unbarrier.voice — for EdTech companies',
    description:
      "I help EdTech teams build products people actually use, understand, and benefit from.",
    url: 'https://unbarrier.me/voice',
    type: 'website',
  },
};

const CTA_EMAIL =
  'mailto:nici@unbarrier.me?subject=unbarrier.voice%20%E2%80%94%20hello';

const HERO_CTA =
  'mailto:nici@unbarrier.me?subject=unbarrier.voice%20%E2%80%94%20partnership%20conversation';

const OBSERVATIONS = [
  {
    n: '01',
    text: "Teachers want to be 99.8% confident in a tool before they use it. Most products are designed for the 5% who'll fiddle until it works. The other 95% open it, get stuck, and go back to whatever they were doing before.",
  },
  {
    n: '02',
    text: "The current generation arriving into reception are less ready for school than any I've taught. Less language, less regulation, less stamina. Products designed for the child you imagined three years ago aren't the children turning up next September.",
  },
  {
    n: '03',
    text: 'In early years, there is almost no accessible data for the students themselves. We collect data about them, in clipboards and tally charts. We rarely give them data they can see, hold, and use to talk about their own day.',
  },
  {
    n: '04',
    text: "By the time we notice a child has crashed out, it's too late. Most products tell you what happened after it happened. The useful data is the friction in the moment — the cognitive load, the dignity moment, the small disengagement no analytics dashboard captures.",
  },
  {
    n: '05',
    text: 'Children need the pattern before they need the variation. Most tools default to choice and randomisation because it looks engaging on a demo. In a real classroom, choice without pattern is overwhelm. The pattern is the bit that helps them learn.',
  },
];

export default function VoicePage() {
  return (
    <>
      <Nav active="voice" />
      <main className={styles.main}>
        <Glow color="var(--orchid-mist)" left="-120px" top="6%" size={620} opacity={0.1} />
        <Glow color="var(--spring-green)" right="-100px" top="40%" size={460} opacity={0.07} />

        {/* 1. HERO — eyebrow with bullet dot, two-tone H1, lede, CTA, credibility
            subtext. Mirrors /access hero structure. CTA is /voice-specific
            (orchid, partnership-conversation mailto) and the credibility line
            names the EdTech-relevant credentials only. */}
        <header className={styles.hero}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.dot} />
            unbarrier.voice · partnership invitation
          </p>
          <h1 className={styles.heading}>
            Students are
            <br />
            <span className={styles.accent}>our why.</span>
          </h1>
          <p className={styles.heroBody}>
            I help you build products people actually use, understand, trust,
            and benefit from.
          </p>
          <div className={styles.heroCtaRow}>
            <Button href={HERO_CTA} color="var(--orchid-mist)">
              Start a partnership conversation
            </Button>
            <a href="/#about" className={styles.heroFormLink}>
              About Nici →
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

        {/* 2. WHAT I SEE */}
        <SectionBar color="var(--orchid-mist)" />
        <section id="voice-what-i-see" className={styles.observations}>
          <div className={styles.observationsHead}>
            <Eyebrow color="var(--orchid-mist)">What I see, again and again</Eyebrow>
            <h2 className={styles.h2}>
              The bit between a product launch
              <br />
              and a child who&apos;s{' '}
              <span className={styles.accent}>actually using it</span>.
            </h2>
            <p className={styles.observationsLede}>
              Five things I notice every time I&apos;m in a classroom watching what
              children do with EdTech, or in a product room watching what adults
              assume children do.
            </p>
          </div>

          <ol className={styles.observationsList}>
            {OBSERVATIONS.map(({ n, text }) => (
              <li key={n} className={styles.observation}>
                <span aria-hidden="true" className={styles.bigNum}>
                  {n}
                </span>
                <p className={styles.observationLabel}>observation {n}</p>
                <p className={styles.observationText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 3. WHERE I'M AT */}
        <SectionBar color="var(--spring-green)" />
        <section id="voice-where" className={styles.where}>
          <Glow color="var(--spring-green)" left="62%" top="-10%" size={500} opacity={0.06} />
          <div className={styles.whereInner}>
            <Eyebrow color="var(--spring-green)">Where I&apos;m at</Eyebrow>
            <h2 className={styles.h2}>I&apos;m shaping this slowly, on purpose.</h2>
            <p className={styles.whereParagraph}>
              unbarrier.voice is the work I&apos;m building next, drawing on what I&apos;ve
              learned across years of classroom practice and inside EdTech product
              rooms. I&apos;m not ready to put the full offer in front of the world yet —
              the people I&apos;ve worked with deserve to hear about it from me first.
            </p>
            <p className={styles.whereParagraph}>
              What I can say: it sits between learners and product teams, on
              purpose. It&apos;s structured pupil intelligence — not feedback, not
              focus groups, not workshops, not audits. Closer to the kind of
              user research a serious product team would commission, designed
              for the audience that actually uses your product.
            </p>
            <p className={styles.whereParagraph}>
              If any of that is what your team has been quietly missing —
              email me. Early conversations shape this work, and I&apos;d rather
              build it with the people who need it than guess at what they need.
            </p>
          </div>
        </section>

        {/* 4. CTA */}
        <SectionBar color="var(--orchid-mist)" />
        <section className={styles.cta}>
          <Eyebrow color="var(--orchid-mist)">If any of this lands</Eyebrow>
          <h2 className={styles.h2}>Tell me what you&apos;re building.</h2>
          <p className={styles.ctaLede}>
            A short email is plenty. The product, where you&apos;re up to, what&apos;s on
            your mind. I&apos;ll listen properly before I say anything useful.
          </p>
          <Button href={CTA_EMAIL} color="var(--orchid-mist)">nici@unbarrier.me →</Button>
        </section>

        <Footer variant="full" />
      </main>
    </>
  );
}
