import Link from 'next/link';
import type { GuestStage } from '@/content/loop-breakers/guests';
import {
  formatSessionDate,
  formatTimeRange,
  type LBSession,
} from '@/content/loop-breakers/sessions';
import styles from './GuestStageBookingBlock.module.css';

type Props = {
  guest: GuestStage;
  session?: LBSession;
};

export function GuestStageBookingBlock({ guest, session }: Props) {
  return (
    <section
      className={styles.section}
      style={{ ['--c' as string]: guest.session.accent }}
    >
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <p className={styles.eyebrow}>booking paused</p>
          {session ? (
            <p className={styles.priceLine}>
              <span className={styles.price}>
                {session.price.currency}
                {session.price.amount}
              </span>
              <span className={styles.priceSub}>
                {' '}· One seat ·{' '}
                {session.durationMin} minutes with{' '}
                {guest.guest.name.split(' ')[0]}
              </span>
            </p>
          ) : null}
        </div>
        {session ? (
          <p className={styles.summary}>
            <strong>{formatSessionDate(session.date)}</strong>
            {' · '}
            {formatTimeRange(session.time, session.durationMin)} {session.tz}
            {' · '}
            {session.seatsLeft} of {session.seats} seats left
          </p>
        ) : null}
        <p className={styles.unavailable}>
          loop breakers is paused, so there is nothing to book at the moment.{' '}
          <Link className={styles.mailto} href="/loop-breakers">
            what&rsquo;s happening
          </Link>
          {' '}— or say hello at{' '}
          <a
            className={styles.mailto}
            href="mailto:hello@unbarrier.me?subject=Guest Stage interest"
          >
            hello@unbarrier.me
          </a>
          .
        </p>
      </div>
    </section>
  );
}
