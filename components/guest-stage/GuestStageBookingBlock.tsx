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
          <p className={styles.eyebrow}>Book your seat</p>
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
        {session ? (
          <a
            href={session.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Book this Guest Stage →
          </a>
        ) : (
          <p className={styles.unavailable}>
            Booking link not yet live. Drop a line to{' '}
            <a
              className={styles.mailto}
              href="mailto:hello@unbarrier.me?subject=Guest Stage interest"
            >
              hello@unbarrier.me
            </a>{' '}
            to be notified.
          </p>
        )}
        <p className={styles.note}>
          Payment via Stripe at booking. Free reschedule up to 24h before.
        </p>
        <p className={styles.accessNote}>
          Need a £5 access seat? Email{' '}
          <a
            className={styles.mailto}
            href="mailto:nici@unbarrier.me?subject=Access%20seat%20-%20Guest%20Stage"
          >
            nici@unbarrier.me
          </a>{' '}
          — quietly, no questions.
        </p>
      </div>
    </section>
  );
}
