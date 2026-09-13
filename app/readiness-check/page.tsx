import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { ReadinessCheck } from '@/components/readiness-check/ReadinessCheck';
import styles from './page.module.css';

// /readiness-check — its own route, its own nav and footer (Nav active="audit":
// the check is the audit strand's free rung). Stage 2 of the 13 Sep 2026
// rebuild, from Readiness Check.dc.html. The hero is rc0; everything after it
// is the ReadinessCheck component (rc1–rc4).
//
// No newsletter band on this page (handover, 13 Sep). No credential strip:
// the prototype goes hero → questions.

const CANONICAL = '/readiness-check';

export const metadata: Metadata = {
  title: 'the free readiness check · unbarrier',
  description:
    'nine questions, five minutes, no email needed. one person’s read on one day of where access is reaching learners in your setting, and where it isn’t — with the one place to start.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'the free readiness check · unbarrier',
    description:
      'nine questions, five minutes, no email needed. three words per question, and the one to start with.',
    url: CANONICAL,
    type: 'website',
    images: [
      {
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
      <Nav active="audit" />
      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--pearl-aqua)' } as CSSProperties}
      >
        {/* rc0 — hero */}
        <div id="rc0" className={styles.hero}>
          <Glow color="var(--pearl-aqua)" left="-8%" top="0%" size={540} opacity={0.1} />
          <header className={styles.heroInner}>
            <Eyebrow color="var(--pearl-aqua)">
              the readiness check · free · five minutes · no email needed
            </Eyebrow>
            <h1 className={styles.heading}>
              you can see what isn&rsquo;t working.{' '}
              <span className={styles.accent}>you don&rsquo;t hold the budget.</span>{' '}
              start here.
            </h1>
            <p className={styles.lede}>
              this is not a finding about your school. it is one person&rsquo;s
              read on one day, and we would rather say that than let you carry
              it into a meeting as though it were.
            </p>
          </header>
        </div>

        <ReadinessCheck route={CANONICAL} />

        <Footer variant="full" />
      </main>
    </>
  );
}
