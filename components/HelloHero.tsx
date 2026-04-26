import Image from 'next/image';
import { Glow } from './Glow';
import styles from './HelloHero.module.css';

export function HelloHero() {
  return (
    <header className={styles.hero}>
      <Glow color="var(--spring-green)" top="10%" left="-120px" />
      <Glow color="var(--orchid-mist)" top="28%" left="42%" />

      <p className={styles.wordmark}>unbarrier.me</p>

      <div className={styles.row}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            Inclusion <span aria-hidden="true">&middot;</span> Digital Access{' '}
            <span aria-hidden="true">&middot;</span> Student Voice
          </p>

          <p className={styles.joy}>bring the joy.</p>

          <h1 className={styles.headline}>
            designed for <em className={styles.headlineAccent}>difference.</em>
          </h1>

          <p className={styles.bio}>
            I&rsquo;m Nici. I help schools, neurodivergent humans, and the people
            who love them find clearer ways through. Loop Breakers is where we
            get unstuck together.
          </p>
        </div>

        <Image
          src="/assets/illustrations/hero-bring-the-joy.png"
          alt=""
          width={380}
          height={420}
          priority
          className={styles.spotlight}
        />
      </div>
    </header>
  );
}
