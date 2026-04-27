import type { GuestStage } from '@/content/loop-breakers/guests';
import styles from './GuestBio.module.css';

type Props = {
  guest: GuestStage;
};

export function GuestBio({ guest }: Props) {
  return (
    <section
      className={styles.section}
      style={{ ['--c' as string]: guest.session.accent }}
    >
      <p className={styles.eyebrow}>Your guest host</p>
      <h2 className={styles.name}>{guest.guest.name}</h2>
      <p className={styles.role}>{guest.guest.role}</p>
      <p className={styles.tagline}>{guest.guest.tagline}</p>
      <p className={styles.bio}>{guest.guest.bio}</p>
      {guest.guest.links && Object.keys(guest.guest.links).length > 0 ? (
        <ul className={styles.links}>
          {Object.entries(guest.guest.links).map(([label, href]) => (
            <li key={label} className={styles.linkItem}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {label} →
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
