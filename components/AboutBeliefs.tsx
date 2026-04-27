import { Button } from './Button';
import { Eyebrow } from './Eyebrow';
import { SectionBar } from './SectionBar';
import styles from './AboutBeliefs.module.css';

const BELIEFS = [
  'Belonging and psychological safety come before any tool, curriculum, or strategy. You can’t learn until you feel safe and seen.',
  'The barrier is never the child. The system needs to flex around the student — not the other way round.',
  'Student voice is the anchor. Forget what looks good for the adults. What are we solving for the student?',
  "Buying a device for a SEND student without a strategy isn’t inclusion. It’s a tick-box.",
  "Behaviour is communication. The right question is ‘What is this telling us?’ — not ‘How do we stop it?’",
  'If you design well for the students who struggle most, you make things better for everyone.',
];

export function AboutBeliefs() {
  return (
    <>
      <SectionBar color="var(--orchid-mist)" />
      <section id="about" className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.col}>
            {/* TODO: replace NF placeholder with real Nici Foote portrait once
                supplied. Tracked in _inbound/Task List.html. */}
            <div
              className={styles.portraitPlaceholder}
              role="img"
              aria-label="Portrait placeholder for Nici Foote — actual photo coming soon"
            >
              <span aria-hidden="true">NF</span>
            </div>

            <Eyebrow color="var(--orchid-mist)">About Nici</Eyebrow>
            <h2 className={styles.heading}>
              I design learning so people can{' '}
              <span className={styles.accent}>
                access it, belong, and thrive
              </span>{' '}
              — not just cope.
            </h2>
            <p className={styles.body}>
              I&apos;m a woman with dyslexia and ADHD who has spent years in
              education watching the system fail the students it was supposed
              to serve — particularly the ones who don&apos;t fit neatly into
              any category.
            </p>
            <p className={styles.body}>
              I&apos;m not here to give you a glossy report and disappear.
              I&apos;m here to sit with you, figure out what&apos;s actually
              getting in the way, and help you do something real about it.
            </p>
            <Button href="mailto:nici@unbarrier.me?subject=about" color="var(--orchid-mist)">
              More about Nici →
            </Button>
          </div>

          <div className={styles.col}>
            <Eyebrow color="var(--orchid-mist)">What I believe</Eyebrow>
            <p className={styles.beliefsLede}>
              Straight from my own recordings. No polish.
            </p>
            <ul className={styles.beliefsList}>
              {BELIEFS.map((b) => (
                <li key={b} className={styles.belief}>
                  <span aria-hidden="true" className={styles.arrow}>
                    →
                  </span>
                  <span className={styles.beliefText}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
