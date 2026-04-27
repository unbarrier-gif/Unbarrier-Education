import type { GuestStage } from '@/content/loop-breakers/guests';
import styles from './WhatYoullLeaveWith.module.css';

type Props = {
  guest: GuestStage;
};

export function WhatYoullLeaveWith({ guest }: Props) {
  return (
    <section
      className={styles.section}
      style={{ ['--c' as string]: guest.session.accent }}
    >
      <p className={styles.eyebrow}>What you&apos;ll leave with</p>
      <ul className={styles.list}>
        {guest.session.youllLeaveWith.map((item) => (
          <li key={item} className={styles.item}>
            <span aria-hidden="true" className={styles.bullet}>
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {guest.session.whoForExtra ? (
        <p className={styles.whoFor}>{guest.session.whoForExtra}</p>
      ) : null}
    </section>
  );
}
