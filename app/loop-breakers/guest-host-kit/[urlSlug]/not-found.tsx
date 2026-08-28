import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import styles from './page.module.css';

export default function LetterNotFound() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <article style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 2rem' }}>
          <h1>That letter isn&apos;t live.</h1>
          <p>
            Back to the{' '}
            <Link href="/loop-breakers/guest-host-kit">Guest Host Kit</Link>.
          </p>
        </article>
        <Footer variant="full" />
      </main>
    </>
  );
}
