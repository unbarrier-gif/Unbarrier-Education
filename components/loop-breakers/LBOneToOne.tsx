import { Eyebrow } from '../Eyebrow';
import { SectionBar } from '../SectionBar';
import { TIDYCAL } from '@/content/loop-breakers/sessions';
import styles from './LBOneToOne.module.css';

export function LBOneToOne() {
  return (
    <>
      <SectionBar color="var(--orchid-mist)" />
      <section id="one-to-one" className={styles.section}>
        <div className={styles.inner}>
          <Eyebrow color="var(--orchid-mist)">Going deeper · 1:1</Eyebrow>
          <h2 className={styles.heading}>
            Accessible coaching ·{' '}
            <span className={styles.accent}>monthly</span>
          </h2>
          <p className={styles.lede}>
            Sustained 1:1 with Nici. Two sessions a week, plus WhatsApp voice
            or text in between. For neurodivergent people who are spiralling,
            or who need help to land — and then someone to hold the space.
          </p>

          <ul className={styles.facts}>
            <li>1-hour sessions · twice weekly</li>
            <li>Monthly subscription · approval required</li>
            <li>3–5 clients max, ever</li>
            <li>Not advertised — application only</li>
          </ul>

          <a
            className={styles.cta}
            href={TIDYCAL.oneToOne}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply for a 1:1 slot <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
