import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';
import styles from './page.module.css';

export default function LoopHome() {
  return (
    <main className={styles.wrap}>
      <Wordmark suffix=".me" size="md" href="https://unbarrier.me" />

      <p className={styles.eyebrow}>loop.unbarrier.me</p>
      <h1 className={styles.heading}>
        Loop Breakers &mdash; <em className={styles.accent}>landing soon.</em>
      </h1>
      <p className={styles.body}>
        The Tuesday rooms, Wednesday Guest Stage, and Accessible Coaching all
        live here. Right now we&rsquo;re building. In the meantime,{' '}
        <Link href="https://unbarrier.me/hello" className={styles.link}>
          unbarrier.me/hello
        </Link>{' '}
        carries the next sessions and a way to say hi.
      </p>

      <p className={styles.footer}>
        unbarrier.me &middot; Unbarrier Education Ltd &middot;
        Co.&nbsp;No.&nbsp;16603630
      </p>
    </main>
  );
}
