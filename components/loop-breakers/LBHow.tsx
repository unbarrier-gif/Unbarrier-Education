import { Eyebrow } from '../Eyebrow';
import { SectionBar } from '../SectionBar';
import styles from './LBHow.module.css';

type Step = {
  n: string;
  t: string;
  d: string;
  highlight?: boolean;
};

const STEPS: Step[] = [
  { n: '01', t: 'Bring one idea', d: "The one you've been circling too long. Half-formed is fine." },
  { n: '02', t: 'Make it smaller', d: "Until it's actually launchable. Until the next step is visible." },
  { n: '03', t: 'Work it through', d: 'Small group. Real conversation. Other neurodivergent brains in the room.' },
  { n: '04', t: 'Leave with one step', d: 'Not a list. One thing. Moving.', highlight: true },
];

export function LBHow() {
  return (
    <>
      <SectionBar color="var(--school-bus-yellow)" />
      <section id="how-it-works" className={styles.section}>
        <div className={styles.inner}>
          <Eyebrow color="var(--school-bus-yellow)">How it works</Eyebrow>
          <h2 className={styles.heading}>Here&apos;s what happens.</h2>
          <div className={styles.grid}>
            {STEPS.map((s) => (
              <div
                key={s.n}
                className={styles.card}
                data-highlight={s.highlight ? 'true' : undefined}
              >
                <span aria-hidden="true" className={styles.bigNum}>
                  {s.n}
                </span>
                <p className={styles.stepLabel}>step {s.n}</p>
                <h4 className={styles.stepTitle}>{s.t}</h4>
                <p className={styles.stepDesc}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
