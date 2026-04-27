import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';
import styles from './page.module.css';

export default function LoopNotFound() {
  return (
    <main className={styles.wrap}>
      <Wordmark suffix=".me" size="md" href="https://unbarrier.me" />

      <p className={styles.eyebrow}>loop.unbarrier.me</p>
      <h1 className={styles.heading}>
        this room hasn&rsquo;t been built yet.
      </h1>
      <p className={styles.body}>
        Loop Breakers is being put together this month. While the rest of the
        site lands, head to{' '}
        <Link href="https://unbarrier.me/hello" className={styles.link}>
          unbarrier.me/hello
        </Link>
        .
      </p>
    </main>
  );
}
