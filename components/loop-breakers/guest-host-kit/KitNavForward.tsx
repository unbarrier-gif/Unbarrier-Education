import Link from 'next/link';
import type { LetterMeta } from '@/content/loop-breakers/guest-letters';
import styles from './KitNavForward.module.css';

type Props = {
  letters: LetterMeta[];
};

export function KitNavForward({ letters }: Props) {
  if (letters.length === 0) return null;
  return (
    <div className={styles.row}>
      {letters.map((l) => (
        <Link
          key={l.slug}
          href={`/loop-breakers/guest-host-kit/${l.slug}`}
          className={styles.card}
        >
          <small className={styles.label}>Tailored for →</small>
          <span className={styles.name}>{l.guestName}</span>
        </Link>
      ))}
    </div>
  );
}
