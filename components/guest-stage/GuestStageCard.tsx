import Link from 'next/link';
import type { GuestStage } from '@/content/loop-breakers/guests';
import { formatSessionDate, type LBSession } from '@/content/loop-breakers/sessions';
import styles from './GuestStageCard.module.css';

type Props = {
  guest: GuestStage;
  /** Resolved session for this guest. May be undefined if sessionSlug stale. */
  session?: LBSession;
};

export function GuestStageCard({ guest, session }: Props) {
  return (
    <Link
      href={`/guest-stage/${guest.slug}`}
      className={styles.card}
      style={{ ['--c' as string]: guest.session.accent }}
    >
      <span aria-hidden="true" className={styles.rail} />
      <p className={styles.eyebrow}>Guest Stage</p>
      <h3 className={styles.title}>{guest.session.title}</h3>
      {guest.session.subtitle ? (
        <p className={styles.subtitle}>{guest.session.subtitle}</p>
      ) : null}
      <div className={styles.meta}>
        <span className={styles.host}>with {guest.guest.name}</span>
        <span className={styles.dot} aria-hidden="true">
          ·
        </span>
        <span className={styles.role}>{guest.guest.role}</span>
      </div>
      {session ? (
        <div className={styles.dateRow}>
          <span className={styles.date}>{formatSessionDate(session.date)}</span>
          <span className={styles.time}>
            {session.time} {session.tz}
          </span>
        </div>
      ) : null}
      <span className={styles.cta}>Read more →</span>
    </Link>
  );
}
