import { Eyebrow } from '../Eyebrow';
import { SectionBar } from '../SectionBar';
import styles from './LBProblem.module.css';

const ITEMS = [
  'You can see the big picture — but struggle to pin it down.',
  'You rewrite instead of publish.',
  'You overthink pricing, positioning, the launch post.',
  "You know you're capable — but it's not translating into income.",
];

export function LBProblem() {
  return (
    <>
      <SectionBar color="var(--school-bus-yellow)" />
      <section id="sound-familiar" className={styles.section}>
        <div className={styles.inner}>
          <Eyebrow color="var(--school-bus-yellow)">Sound familiar?</Eyebrow>
          <h2 className={styles.heading}>
            You plan. You start. You refine.{' '}
            <span className={styles.accent}>You stall.</span>
          </h2>
          <ul className={styles.list}>
            {ITEMS.map((item) => (
              <li key={item} className={styles.item}>
                <span aria-hidden="true" className={styles.arrow}>
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            You don&apos;t have a productivity problem. You have a{' '}
            <b className={styles.bodyStrong}>witness problem</b>. The loop
            breaks when someone else sees it.
          </p>
        </div>
      </section>
    </>
  );
}
