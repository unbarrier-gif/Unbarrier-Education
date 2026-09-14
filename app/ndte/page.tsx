import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Icon, type IconName } from '@/components/Icon';
import { Nav } from '@/components/Nav';
import { Section } from '@/components/Section';
import { BOOKING_LABEL, BOOKING_URL } from '@/lib/booking';
import styles from '@/app/route-page.module.css';
import ndte from './page.module.css';

// /ndte — the short, sendable explainer of how the work runs. Stage 6 of the
// 13 Sep 2026 rebuild, from Site.dc.html → isNdte (g0–g3). The block ids stay
// on the wrappers so a question back to Nici can name a block.
//
//   g0  hero (spring-green glow) · the four words · the four icons
//   g1  the four steps (second)  · four cards · the page's one .pull
//   g2  one pathway, not three products (deep) · three cards → /audit, /access,
//       /inclusion-strategy
//   g3  close (well, loose) · footer
//
// One cta (book) and the footer. NO newsletter band, on purpose: this is the
// page someone forwards, not a page that sells.
//
// COPY PROVENANCE (site plan, 13 Sep 2026): the four step descriptions are the
// approved home "how the work runs" block; the hero line and the closing are
// from /access c4. g2 ("one pathway") is ASSEMBLED, not approved — there was
// no dedicated /ndte draft in the pack. Nici's read is still owed on g2.
//
// COLOUR: the strand accent is princeton orange (the eyebrow, the buttons,
// the pathway terms) with a spring-green glow, arrows and pull — as the
// prototype has it. Not a strand of its own, so no dot in the nav and no
// nav highlight.

const CANONICAL = 'https://www.unbarrier.me/ndte';

export const metadata: Metadata = {
  title: 'how the work runs — notice → design → try → embed | unbarrier.me',
  description:
    'however you come in, it runs the same way. four words, and you can hold a whole year against them: notice, design, try, embed.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'how the work runs — notice → design → try → embed',
    description:
      'however you come in, it runs the same way. four words, and you can hold a whole year against them.',
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

const WORDS: Array<{ word: string; icon: IconName }> = [
  { word: 'notice', icon: 'ndte-notice' },
  { word: 'design', icon: 'ndte-design' },
  { word: 'try', icon: 'ndte-try' },
  { word: 'embed', icon: 'ndte-embed' },
];

// The four steps — the approved home "how the work runs" copy. `aside` is the
// italic line under each one.
const STEPS: Array<{ word: string; icon: IconName; body: string; aside: string }> = [
  {
    word: 'notice',
    icon: 'ndte-notice',
    body: 'find out what is actually happening for learners, not what the strategy says should be.',
    aside: 'this is where unbarrier.voice does its work.',
  },
  {
    word: 'design',
    icon: 'ndte-design',
    body: 'build the change with your team, not for them. the people who have to run it on a tuesday are in the room when it is designed.',
    aside: 'otherwise it is your plan, not theirs.',
  },
  {
    word: 'try',
    icon: 'ndte-try',
    body: 'model it in real classrooms, with real learners, while your staff watch.',
    aside: 'not a twilight. not a slide deck.',
  },
  {
    word: 'embed',
    icon: 'ndte-embed',
    body: 'make it hold after we have gone.',
    aside:
      'that is the whole test, and it is the step most consultancy skips because it is the one you cannot invoice twice.',
  },
];

// g2 — assembled, not approved (see the docblock).
const PATHWAY: Array<{ term: string; body: string; href: string; label: string }> = [
  {
    term: 'a discovery day',
    body: 'notice. one day in your setting, and a roadmap for what comes next.',
    href: '/audit',
    label: 'unbarrier.audit',
  },
  {
    term: 'a partnership year',
    body: 'the whole cycle, once a term, three terms.',
    href: '/access',
    label: 'unbarrier.access',
  },
  {
    term: 'an inclusion strategy',
    body: 'the cycle on a single term, and a document that says how you will embed it.',
    href: '/inclusion-strategy',
    label: 'inclusion strategy',
  },
];

export default function NdtePage() {
  return (
    <>
      <Nav />
      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--princeton-orange)' } as CSSProperties}
      >
        {/* g0 — hero */}
        <div id="g0" className={styles.heroBand}>
          <Glow color="var(--spring-green)" left="-8%" top="0%" size={540} opacity={0.12} />
          <header className={styles.heroInner}>
            <Eyebrow color="var(--princeton-orange)">how the work runs</Eyebrow>
            <h1 className={styles.heading}>
              notice <span className={ndte.arrow}>→</span> design{' '}
              <span className={ndte.arrow}>→</span> try{' '}
              <span className={ndte.arrow}>→</span> embed.
            </h1>
            <p className={styles.ledeMuted}>
              however you come in, it runs the same way. four words, and you can
              hold a whole year against them.
            </p>
            <ul className={styles.iconRow} aria-label="the ndte cycle">
              {WORDS.map((step) => (
                <li key={step.word} className={styles.iconItem}>
                  {/* Icon plus text — the word carries the meaning. */}
                  <Icon name={step.icon} size={26} />
                  <strong>{step.word}</strong>
                </li>
              ))}
            </ul>
          </header>
        </div>

        {/* g1 — the four steps */}
        <Section id="g1" measure="route" ground="second" labelledBy="the-four">
          <h2 id="the-four" className={styles.sectionHeading}>
            the four steps
          </h2>
          <ol className={ndte.steps}>
            {STEPS.map((step) => (
              <li key={step.word} className={ndte.step}>
                <Icon name={step.icon} size={36} />
                <h3 className={ndte.stepWord}>{step.word}</h3>
                <p className={ndte.stepBody}>{step.body}</p>
                <p className={ndte.stepAside}>{step.aside}</p>
              </li>
            ))}
          </ol>
          {/* The page's one full-strength block. */}
          <p className={`${styles.pull} ${ndte.pullAfter}`}>
            most inclusion work stops at try. embed is where you find out
            whether any of it worked.
          </p>
        </Section>

        {/* g2 — one pathway, not three products */}
        <Section id="g2" measure="route" ground="deep" labelledBy="one-pathway">
          <h2 id="one-pathway" className={styles.sectionHeading}>
            one pathway, not three products.
          </h2>
          <p className={`${styles.body} ${styles.spaceBelow}`}>
            a discovery day is <strong className={styles.strong}>notice</strong>,
            done properly. unbarrier.voice is what makes{' '}
            <strong className={styles.strong}>notice</strong> and{' '}
            <strong className={styles.strong}>embed</strong> measurable instead
            of felt. a partnership year is all four, three terms running &mdash;
            then notice again, and find out whether it did.
          </p>
          <dl className={styles.stages}>
            {PATHWAY.map((item) => (
              <div key={item.term} className={styles.stage}>
                <dt className={styles.stageTerm}>{item.term}</dt>
                <dd className={styles.stageBody}>
                  {item.body}{' '}
                  <Link href={item.href} className={styles.inlineLink}>
                    {item.label}
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* g3 — close · footer */}
        <div id="g3">
          <Section measure="route" ground="well" space="loose" labelledBy="g-closing">
            <h2 id="g-closing" className={styles.closeHeading}>
              tell us what you&rsquo;re working with.
            </h2>
            <p className={`${styles.closeLede} ${styles.spaceBelow}`}>
              if we can help, we&rsquo;ll say how. if we can&rsquo;t, we&rsquo;ll
              point you to someone who can.
            </p>
            <div className={styles.ctaRow}>
              <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
                {BOOKING_LABEL}
              </Button>
              {/* Down the ladder: the discovery day is notice, done properly. */}
              <Button href="/audit" variant="ghost">
                not there yet? → start with a discovery day
              </Button>
            </div>
          </Section>
          <Footer variant="full" />
        </div>
      </main>
    </>
  );
}
