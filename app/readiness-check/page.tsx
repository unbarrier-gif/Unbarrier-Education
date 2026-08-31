import type { Metadata } from 'next';
import { CredentialStrip } from '@/components/CredentialStrip';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { ReadinessCheck } from '@/components/readiness-check/ReadinessCheck';
import { READINESS_QUESTION_COUNT } from '@/lib/readiness-check/questions';
import styles from './page.module.css';

// Copy from the approved page drafts (28 Aug 2026), /audit → "try it first —
// the free readiness check". The promise there is the one constraint on this
// whole page: "five minutes, and you see something useful BEFORE any sign-up
// wall". There is no wall in this route, deferred or otherwise.

const CANONICAL = '/readiness-check';

export const metadata: Metadata = {
  title: 'the free readiness check · unbarrier',
  description:
    'nine questions, five minutes, and a result on screen straight away. an honest snapshot of where access is reaching learners in your setting, and where it isn’t.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'the free readiness check · unbarrier',
    description:
      'nine questions, five minutes, and a result on screen straight away. no sign-up wall.',
    url: CANONICAL,
    type: 'website',
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

export default function ReadinessCheckPage() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <Glow color="var(--pearl-aqua)" left="-120px" top="4%" size={620} opacity={0.09} />

        <header className={styles.hero}>
          <Eyebrow color="var(--pearl-aqua)">free · no sign-up</Eyebrow>
          <h1 className={styles.heading}>
            the readiness check.
          </h1>
          <p className={styles.lede}>
            {READINESS_QUESTION_COUNT} questions, about five minutes, and your
            result appears on this page as soon as you ask for it. there is
            nothing to sign up to and nothing to pay.
          </p>
          <ul className={styles.promises}>
            <li>an honest snapshot of where access is reaching learners, and where it isn’t.</li>
            <li>something you can forward upwards — so the person who spots the need can put it in front of the person who holds the budget.</li>
            <li>the same seven questions every piece of our work runs on.</li>
          </ul>
          <CredentialStrip />
        </header>

        <section className={styles.section} aria-labelledby="the-check">
          <h2 id="the-check" className={styles.sectionHeading}>
            rate each one as it actually is, not as it should be.
          </h2>
          <p className={styles.body}>
            answer for a setting you know well. if a question doesn’t apply, or
            you genuinely can’t say, leave it — a skipped question is left out
            of the result rather than counted as a nought.
          </p>
          <ReadinessCheck route={CANONICAL} />
        </section>

        <NewsletterBand route={CANONICAL} weight="standard" />
        <Footer variant="full" />
      </main>
    </>
  );
}
