import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { GuestStageCard } from '@/components/guest-stage/GuestStageCard';
import {
  findSessionForGuest,
  liveGuests,
  pastGuests,
} from '@/content/loop-breakers/guests';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Guest Stage · Loop Breakers · unbarrier.me',
  description:
    'Off-cadence Wednesday Loop Breakers sessions led by invited neurodivergent practitioners. One topic, one room, ninety minutes.',
  alternates: { canonical: '/guest-stage' },
};

export const revalidate = 60;

export default function GuestStageIndex() {
  const live = liveGuests();
  const past = pastGuests();

  return (
    <>
      <Nav active="loop-breakers" />
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.crumbs}>
            <Link href="/loop-breakers" className={styles.crumbLink}>
              loop breakers
            </Link>{' '}
            · guest stage
          </p>
          <span className={styles.eyebrow}>Guest Stage</span>
          <h1 className={styles.heading}>
            One topic. One room.
            <br />
            <span className={styles.accent}>Ninety minutes.</span>
          </h1>
          <p className={styles.lede}>
            Off-cadence Wednesdays. Invited neurodivergent practitioners.
            Up to 40 people. Talk plus held Q&amp;A. Sliding-scale
            booking.
          </p>
        </header>

        <section className={styles.list} aria-label="Upcoming Guest Stages">
          {live.length === 0 ? (
            <p className={styles.empty}>
              No Guest Stages on the calendar right now. Check back soon —
              or{' '}
              <a
                href="mailto:hello@unbarrier.me?subject=Guest Stage interest"
                className={styles.mailto}
              >
                ask Nici
              </a>{' '}
              who&apos;s coming next.
            </p>
          ) : (
            live.map((g) => (
              <GuestStageCard
                key={g.slug}
                guest={g}
                session={findSessionForGuest(g)}
              />
            ))
          )}
        </section>

        {past.length > 0 ? (
          <section className={styles.pastSection} aria-label="Past Guest Stages">
            <h2 className={styles.pastHeading}>Past</h2>
            <div className={styles.pastGrid}>
              {past.map((g) => (
                <GuestStageCard
                  key={g.slug}
                  guest={g}
                  session={findSessionForGuest(g)}
                />
              ))}
            </div>
          </section>
        ) : null}

        <Footer variant="full" />
      </main>
    </>
  );
}
