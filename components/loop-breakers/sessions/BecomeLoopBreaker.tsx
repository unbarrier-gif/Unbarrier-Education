import { Button } from '../../Button';
import { Eyebrow } from '../../Eyebrow';
import styles from './BecomeLoopBreaker.module.css';

export function BecomeLoopBreaker() {
  return (
    <section id="become-loop-breaker" className={styles.section}>
      <div className={styles.card}>
        <Eyebrow color="var(--spring-green)">Identity, not transaction</Eyebrow>
        <h2 className={styles.heading}>
          Stop buying coaching.
          <br />
          <span className={styles.accent}>Become a Loop Breaker.</span>
        </h2>
        <p className={styles.body}>
          A Loop Breaker is someone who has decided that circling the same
          idea is the problem — and that doing{' '}
          <b className={styles.bodyStrong}>one thing, properly</b>, with a
          room of people who get it, is the answer.
        </p>
        <p className={styles.bodyMuted}>
          Book any session. Show up. You&apos;re one of us now.
        </p>
        <div className={styles.row}>
          <Button href="#sessions" color="var(--spring-green)">
            See the menu →
          </Button>
          <Button
            href="mailto:hello@unbarrier.me?subject=Guest host enquiry"
            variant="ghost"
          >
            Host a session →
          </Button>
        </div>
      </div>
    </section>
  );
}
