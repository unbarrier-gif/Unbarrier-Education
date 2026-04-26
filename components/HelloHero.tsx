import Image from 'next/image';
import { Glow } from './Glow';
import { Wordmark } from './Wordmark';
import styles from './HelloHero.module.css';

export function HelloHero() {
  return (
    <header className={styles.hero}>
      <Glow color="var(--spring-green)" top="10%" left="-120px" />
      <Glow color="var(--orchid-mist)" top="28%" left="42%" />

      <div className={styles.wordmarkRow}>
        <Wordmark size="md" />
      </div>

      <div className={styles.row}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            Inclusion <span aria-hidden="true">&middot;</span> Digital Access{' '}
            <span aria-hidden="true">&middot;</span> Student Voice
          </p>

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
          width={4961}
          height={3508}
          priority
          sizes="(min-width: 720px) 380px, 0px"
          className={styles.spotlight}
        />
      </div>
    </header>
  );
}
