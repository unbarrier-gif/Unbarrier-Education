import Image from 'next/image';
import { Eyebrow } from '@/components/Eyebrow';
import styles from '../page.module.css';

type ModuleChip = { label: string; shared?: boolean };

type Facilitator = {
  name: string;
  role: string;
  credentialPrefix: string;
  portrait: { src: string; alt: string };
  modules: ModuleChip[];
};

const NICI: Facilitator = {
  name: 'Nici Foote',
  role: 'Lead facilitator',
  credentialPrefix: '26 yrs in classrooms · dyslexic + ADHD educator',
  portrait: {
    src: '/assets/portraits/nici-facing-profile-hero.png',
    alt: 'Nici Foote — lead facilitator',
  },
  modules: [
    { label: 'Module 01' },
    { label: 'Module 02' },
    { label: 'Module 04' },
  ],
};

function FacilitatorCard({ f }: { f: Facilitator }) {
  return (
    <article className={styles.facilitatorCard}>
      <div className={styles.portraitCircle}>
        <Image
          src={f.portrait.src}
          alt={f.portrait.alt}
          width={280}
          height={280}
          sizes="140px"
        />
      </div>

      <div className={styles.facilitatorBody}>
        <h3 className={styles.facilitatorName}>{f.name}</h3>
        <p className={styles.facilitatorRole}>{f.role}</p>

        <p className={styles.credentialLine}>
          <span className={styles.aplsBadge}>APLS</span>
          {f.credentialPrefix ? <> · {f.credentialPrefix}</> : null}
        </p>

        <ul className={styles.moduleChips}>
          {f.modules.map((m, i) => (
            <li
              key={i}
              className={`${styles.moduleChip} ${m.shared ? styles.moduleChipShared : ''}`}
            >
              {m.label}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function AccessTeamBench() {
  return (
    <section id="access-team" className={styles.team}>
      <div className={styles.teamInner}>
        <Eyebrow color="var(--spring-green)">Who&apos;s in the room</Eyebrow>
        <h2 className={styles.h2}>The work scales. The standard doesn&apos;t.</h2>
        <p className={styles.teamPara}>
          unbarrier.me is building a small team of specialist facilitators.
          Same toolkit. Same standards. Same closing goal in every room.
        </p>

        <div className={styles.facilitatorRow}>
          <FacilitatorCard f={NICI} />
        </div>
      </div>
    </section>
  );
}
