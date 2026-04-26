import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <Wordmark size="md" />
      <h1 className={styles.heading}>this loop doesn&rsquo;t exist.</h1>
      <p className={styles.body}>
        The page you&rsquo;re after isn&rsquo;t here &mdash; might be a typo, might be a flyer
        from before we shipped this.
      </p>
      <Link href="/hello" className={styles.cta}>
        &larr; back to /hello
      </Link>
    </main>
  );
}
