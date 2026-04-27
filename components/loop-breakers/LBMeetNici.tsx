import Image from 'next/image';
import { SectionBar } from '../SectionBar';
import styles from './LBMeetNici.module.css';

const PARAGRAPHS = [
  "Diagnosed dyslexic at 10, ADHD and dyscalculia at 20, still looping. These are the sessions I wish I'd had.",
  "I built Loop Breakers because I needed it. I know what it's like to have the idea, do the work, get close — and then quietly shelve it because you're terrified no one will show up.",
  "I'm a facilitator, a woman with ADHD, and someone who has been brave for a very long time. I'm not here to coach you. I'm here to sit with you while you do the thing.",
];

export function LBMeetNici() {
  return (
    <>
      <SectionBar color="var(--orchid-mist)" />
      <section id="meet-nici" className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.portraitWrap}>
            <span aria-hidden="true" className={styles.halo} />
            <Image
              src="/assets/nici-portrait.png"
              alt="Nici Foote"
              width={460}
              height={460}
              className={styles.portrait}
              sizes="(max-width: 768px) 70vw, 420px"
            />
          </div>
          <div className={styles.copy}>
            <span className={styles.pill}>Your facilitator</span>
            <h2 className={styles.heading}>Hi, I&apos;m Nici.</h2>
            {PARAGRAPHS.map((p, i) => (
              <p key={i} className={styles.body}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
