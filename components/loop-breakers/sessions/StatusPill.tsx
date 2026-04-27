import type { SessionStatus } from '@/content/loop-breakers/sessions';
import styles from './StatusPill.module.css';

type Props = {
  status: SessionStatus;
  seatsLeft: number;
};

const LABELS: Record<SessionStatus, (seatsLeft: number) => string> = {
  open: (seats) => `${seats} seats left`,
  soon: () => 'Booking soon',
  waitlist: () => 'Waitlist only',
  full: () => 'Full',
  past: () => 'Past session',
};

export function StatusPill({ status, seatsLeft }: Props) {
  return (
    <span className={styles.pill} data-status={status}>
      {LABELS[status](seatsLeft)}
    </span>
  );
}
