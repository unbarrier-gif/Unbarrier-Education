import Image from 'next/image';
import { Eyebrow } from '@/components/Eyebrow';
import styles from '../page.module.css';

type ModuleChip = { label: string; shared?: boolean };

type Facilitator = {
  name: string;
  surnameTbc?: string;
  role: string;
  credentialPrefix: string;
  credentialTbc?: string;
  portrait?: { src: string; alt: string };
  initials?: string;
  modules: ModuleChip[];
};

const NICI: Facilitator = {
  name: 'Nici Foote',
  role: 'Lead facilitator',
  credentialPrefix: '26 yrs in classrooms · dyslexic + ADHD educator',
  portrait: {
    src: '/assets/portraits/nici-portrait.png',
    alt: 'Nici Foote — lead facilitator',
  },
  modules: [
    { label: 'Module 01' },
    { label: 'Module 02' },
    { label: 'Module 04 — either of us', shared: true },
  ],
};

const BEN: Facilitator = {
  name: 'Ben',
  surnameTbc: '[surname tbc]',
  role: 'Leadership & infrastructure',
  credentialPrefix: '',
  credentialTbc: '[credential line tbc]',
  initials: 'B',
  modules: [
    { label: 'Module 03' },
    { label: 'Parallel sessions' },
    { label: 'Module 04 — either of us', shared: true },
  ],
};

function FacilitatorCard({ f }: { f: Facilitator }) {
  return (
    <article className={styles.facilitatorCard}>
      {f.portrait ? (
        <div className={styles.portraitCircle}>
          <Image
            src={f.portrait.src}
            alt={f.portrait.alt}
            width={220}
            height={220}
            sizes="110px"
          />
        </div>
      ) : (
        <div
          className={styles.portraitPlaceholder}
          aria-label={`Portrait for ${f.name} pending`}
        >
          <span aria-hidden="true">{f.initials ?? '?'}</span>
        </div>
      )}

      <h3 className={styles.facilitatorName}>
        {f.name}
        {f.surnameTbc ? (
          <>
            {' '}
            <span className={styles.placeholderText}>{f.surnameTbc}</span>
          </>
        ) : null}
      </h3>
      <p className={styles.facilitatorRole}>{f.role}</p>

      <p className={styles.credentialLine}>
        <span className={styles.aplsBadge}>APLS</span>
        {f.credentialPrefix ? <> · {f.credentialPrefix}</> : null}
        {f.credentialTbc ? (
          <>
            {' '}
            · <span className={styles.placeholderText}>{f.credentialTbc}</span>
          </>
        ) : null}
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
          Right now that&apos;s me and Ben.
        </p>
        <p className={styles.teamPara}>
          Same toolkit. Same standards. Same closing goal in every room.
        </p>

        <div className={styles.facilitatorRow}>
          <FacilitatorCard f={NICI} />
          <FacilitatorCard f={BEN} />
        </div>

        <p className={styles.teamFootnote}>
          Two facilitators means two cohorts can run in parallel rooms on the
          same INSET day — leadership in one room, TAs in another. No single
          trainer offers that.
        </p>
      </div>
    </section>
  );
}
