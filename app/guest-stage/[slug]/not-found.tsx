import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import styles from './page.module.css';

export default function GuestNotFound() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <section className={styles.summary}>
          <h1>That Guest Stage isn&apos;t live.</h1>
          <p>
            Either the slug&apos;s wrong, or the session hasn&apos;t been
            announced yet. See{' '}
            <Link href="/guest-stage">all upcoming Guest Stages</Link> or
            head back to{' '}
            <Link href="/loop-breakers">Loop Breakers</Link>.
          </p>
        </section>
        <Footer variant="full" />
      </main>
    </>
  );
}
