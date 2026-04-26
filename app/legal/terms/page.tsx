import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms · Unbarrier',
  description:
    'Terms for Unbarrier — full text by 6 May 2026 (legal review in progress).',
};

export default function TermsPage() {
  return (
    <main className={styles.wrap}>
      <Wordmark size="md" />
      <h1 className={styles.heading}>Terms &mdash; coming soon.</h1>
      <p className={styles.body}>
        Full text by 6 May 2026 (legal review in progress). Questions in the
        meantime: <a href="mailto:hello@unbarrier.me">hello@unbarrier.me</a>.
      </p>
      <Link href="/hello" className={styles.back}>
        &larr; back to /hello
      </Link>
    </main>
  );
}
