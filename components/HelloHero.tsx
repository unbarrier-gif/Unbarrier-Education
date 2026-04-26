import Image from 'next/image';
import styles from './HelloHero.module.css';

export function HelloHero() {
  return (
    <header className={styles.hero}>
      <p className={styles.wordmark}>unbarrier.me</p>

      <div className={styles.row}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>designed for difference.</h1>
          <p className={styles.bio}>
            I&rsquo;m Nici. I help schools, neurodivergent humans, and the people
            who love them find clearer ways through. Loop Breakers is where we
            get unstuck together.
          </p>
        </div>

        <Image
          src="/assets/nici-portrait.png"
          alt="Nici Foote"
          width={88}
          height={88}
          priority
          className={styles.portrait}
        />
      </div>
    </header>
  );
}
