import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'unbarrier.voice — students are the why',
  description:
    "I help you build products people actually use, understand, trust, and benefit from. A holding page for unbarrier.voice — looking for EdTech partners to build it with.",
  alternates: { canonical: '/voice' },
  openGraph: {
    title: 'unbarrier.voice — students are the why',
    description:
      "Pupil voice as the input to the product, not the output. Looking for EdTech partners to build it with.",
    url: 'https://unbarrier.me/voice',
    type: 'website',
  },
};

// Holding page — the unbarrier.voice product isn't built yet. This route
// exists to capture inbound EdTech interest, tell the case-study story
// (Cosmo unnamed pending permission), and invite partnership not vendor
// engagements. Voice rule for this strand per Phase 3 §01: warm, honest,
// "this is what we hear when we listen". Audience is locked to EdTech
// (CPO / Head of Product / Customer Success Lead).
//
// TODO: when Cosmo permission lands, swap "an EdTech team" → "Cosmo" in
// the lede paragraph below, optionally pull one direct quote.

const SECONDARY_CTA_HREF =
  'https://tidycal.com/nici/unbarriervoice-discovery-call';
const PRIMARY_CTA_HREF =
  'mailto:nici@unbarrier.me?subject=unbarrier.voice%20—%20partnership';

export default function VoicePage() {
  return (
    <>
      <Nav active="voice" />
      <main className={styles.main}>
        <Glow color="var(--orchid-mist)" left="-120px" top="6%" size={620} opacity={0.1} />
        <Glow color="var(--spring-green)" right="-100px" top="40%" size={460} opacity={0.07} />

        <header className={styles.hero}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.dot} />
            unbarrier.voice — partnership invitation
          </p>
          <h1 className={styles.heading}>
            Students are <span className={styles.accent}>the why.</span>
          </h1>
          <p className={styles.lede}>
            I help you build products people actually use, understand, trust,
            and benefit from.
          </p>
        </header>

        <article className={styles.body}>
          <p>
            I spent six months inside an EdTech team&apos;s MVP design — sat
            in the room while a small product squad worked out what their
            learners were going to live with for the next three years. We
            mapped what the learners did with the product, not what they
            said about it. The team kept the brain. The students never got
            the room.
          </p>

          <p>
            That&apos;s the work I want to keep doing. Pupil voice as the{' '}
            <em>input</em> to the system, not the output. Not focus groups.
            Not consultations. Not workshops or CPD or audits-for-schools.
            Structured learner intelligence — qualitative and quantitative
            — that EdTech can act on, fund, and reuse.
          </p>

          <p>
            Reading the room of education is hard. The DfE keeps pushing
            pupil voice. Schools want it. The Chartered College Evidence
            Board expects it. Trial windows have got shorter. Renewal
            decisions get made faster. And in most EdTech, customer success
            has no feedback loop from the people the product is actually
            for.
          </p>

          <p>
            I&apos;m building <strong>unbarrier.voice</strong> for that
            gap. Four blocks: data, translation, leverage, roadmap. One
            engine. Not modules. The line that matters when it works:
          </p>

          <blockquote className={styles.pullQuote}>
            <p>
              &ldquo;This feature exists because pupils told us X — when we
              changed it, usage increased.&rdquo;
            </p>
          </blockquote>

          <p>
            Right now this is a holding page. The product isn&apos;t built
            yet. I&apos;m looking for EdTech partners to build it with —
            companies who already get that pupil voice can&apos;t be a
            workshop. Students are the why. Getting this right matters
            more than getting it fast.
          </p>

          <p>
            If that&apos;s you — Head of Product, CPO, Customer Success
            Lead, someone whose roadmap genuinely turns on whether learners
            stay — let&apos;s talk.
          </p>
        </article>

        <section className={styles.ctas} aria-label="Get in touch">
          <a href={PRIMARY_CTA_HREF} className={styles.ctaPrimary}>
            Email Nici <span aria-hidden="true">→</span>
          </a>
          <a
            href={SECONDARY_CTA_HREF}
            className={styles.ctaGhost}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a 25-min discovery call <span aria-hidden="true">→</span>
          </a>
        </section>

        <Footer variant="full" />
      </main>
    </>
  );
}
