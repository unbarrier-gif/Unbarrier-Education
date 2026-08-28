import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { AfterSessionGrid } from '@/components/loop-breakers/sessions/AfterSessionGrid';
import { BecomeLoopBreaker } from '@/components/loop-breakers/sessions/BecomeLoopBreaker';
import { SessionsMenu } from '@/components/loop-breakers/sessions/SessionsMenu';
import { WhoComesCards } from '@/components/loop-breakers/sessions/WhoComesCards';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Upcoming Sessions · Loop Breakers · unbarrier.me',
  description:
    'Every Loop Breakers session in one place. Pick one, tap book, show up. Each card tells you who is hosting, what you will work on, and one next step before you leave.',
  alternates: { canonical: '/loop-breakers/sessions' },
};

export const revalidate = 60;

export default function SessionsPage() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.crumbs}>
            <Link href="/loop-breakers" className={styles.crumbLink}>
              loop breakers
            </Link>{' '}
            · upcoming sessions
          </p>
          <h1 className={styles.heading}>
            Easy to see.
            <br />
            <span className={styles.accent}>Easy to book.</span>
          </h1>
          <p className={styles.lede}>
            Every Loop Breakers session in one place. Pick one, tap book,
            show up. Each card tells you who&apos;s hosting, what you&apos;ll
            work on, and one next step before you leave.
          </p>
        </header>

        <section
          id="sessions"
          aria-label="All sessions"
          className={styles.menuSection}
        >
          <div className={styles.menuInner}>
            <div className={styles.menuHead}>
              <div>
                <p className={styles.menuEyebrow}>
                  Loop Breakers · upcoming sessions
                </p>
                <h2 className={styles.menuHeading}>
                  The menu. Pick your next{' '}
                  <span className={styles.menuAccent}>loop to break.</span>
                </h2>
                <p className={styles.menuLede}>
                  One idea. Ninety minutes. A small group of women who get
                  it. Each session has a different host and a different
                  angle — same container, same promise.
                </p>
              </div>
              <Link href="#become-loop-breaker" className={styles.becomeLink}>
                Become a Loop Breaker →
              </Link>
            </div>
            <div className={styles.divider} />
            <SessionsMenu />
          </div>
        </section>

        <hr className={styles.rule} />
        <WhoComesCards />

        <hr className={styles.rule} />
        <AfterSessionGrid />

        <hr className={styles.rule} />
        <BecomeLoopBreaker />

        <Footer variant="full" />
      </main>
    </>
  );
}
