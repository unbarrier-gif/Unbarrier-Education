import { Eyebrow } from '@/components/Eyebrow';
import styles from '../page.module.css';

type Chip =
  | { kind: 'real'; name: string; role?: string }
  | { kind: 'placeholder'; label: string }
  | { kind: 'growing'; label: string };

const CHIPS: Chip[] = [
  { kind: 'real', name: 'Nici Foote', role: 'lead' },
  { kind: 'placeholder', label: '[bench placeholder 02]' },
  { kind: 'placeholder', label: '[bench placeholder 03]' },
  { kind: 'growing', label: '+ growing bench' },
];

export function AccessTeamBench() {
  return (
    <section id="access-team" className={styles.team}>
      <div className={styles.teamInner}>
        <Eyebrow color="var(--spring-green)">
          Not just me · built for scaling
        </Eyebrow>
        <h2 className={styles.h2}>
          Every session delivered by an APLS-trained practitioner.
        </h2>
        <p className={styles.teamPara}>
          I&apos;m in the room for most of it — but unbarrier.access is built
          as a small bench of Apple Professional Learning Specialists, so a
          trust booking ten settings doesn&apos;t bottleneck on one diary.
        </p>
        <p className={styles.teamPara}>
          Same toolkit. Same standards. Same closing goal in every room.
        </p>

        <ul className={styles.benchRow}>
          {CHIPS.map((chip, i) => {
            if (chip.kind === 'real') {
              return (
                <li key={i} className={styles.benchChip}>
                  <span className={styles.aplsBadge}>APLS</span>
                  <span className={styles.benchName}>{chip.name}</span>
                  {chip.role ? (
                    <span className={styles.benchRole}>· {chip.role}</span>
                  ) : null}
                </li>
              );
            }
            if (chip.kind === 'placeholder') {
              return (
                <li
                  key={i}
                  className={`${styles.benchChip} ${styles.benchChipPlaceholder}`}
                >
                  <span className={styles.aplsBadge}>APLS</span>
                  <span className={styles.benchName}>{chip.label}</span>
                </li>
              );
            }
            return (
              <li
                key={i}
                className={`${styles.benchChip} ${styles.benchChipGrowing}`}
              >
                <span className={styles.benchName}>{chip.label}</span>
              </li>
            );
          })}
        </ul>

        <p className={styles.teamFootnote}>
          Trust-wide rollouts are paced over a term, not crammed into a week.
          If you need ten settings done by September, we plan the bench
          first, the day second.
        </p>
      </div>
    </section>
  );
}
