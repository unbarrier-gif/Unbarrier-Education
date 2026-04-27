import Link from 'next/link';
import type { GuestStage } from '@/content/loop-breakers/guests';
import {
  formatSessionDate,
  formatTimeRange,
  type LBSession,
} from '@/content/loop-breakers/sessions';
import styles from './GuestStageHero.module.css';

type Props = {
  guest: GuestStage;
  session?: LBSession;
};

export function GuestStageHero({ guest, session }: Props) {
  return (
    <header
      className={styles.hero}
      style={{ ['--c' as string]: guest.session.accent }}
    >
      <p className={styles.crumbs}>
        <Link href="/loop-breakers" className={styles.crumbLink}>
          loop breakers
        </Link>{' '}
        ·{' '}
        <Link href="/guest-stage" className={styles.crumbLink}>
          guest stage
        </Link>
      </p>
      <span className={styles.eyebrow}>Guest Stage</span>
      <h1 className={styles.title}>{guest.session.title}</h1>
      {guest.session.subtitle ? (
        <p className={styles.subtitle}>{guest.session.subtitle}</p>
      ) : null}
      {session ? (
        <div className={styles.dateBlock}>
          <span className={styles.date}>{formatSessionDate(session.date)}</span>
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>
          <span className={styles.time}>
            {formatTimeRange(session.time, session.durationMin)} {session.tz}
          </span>
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>
          <span className={styles.format}>{guest.session.format}</span>
        </div>
      ) : null}
    </header>
  );
}
