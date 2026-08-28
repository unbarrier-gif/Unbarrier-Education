import styles from './HelloHero.module.css';

export function HelloHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.brand}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.brandText}>unbarrier.me</span>
      </div>

      <h1 className={styles.headline}>
        designed for <em className={styles.headlineAccent}>difference.</em>
      </h1>

      <p className={styles.bio}>
        I&rsquo;m Nici. I help schools, neurodivergent humans, and the people
        who love them find clearer ways through.
      </p>
    </header>
  );
}
