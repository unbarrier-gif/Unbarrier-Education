import styles from './PostFooter.module.css';

export function PostFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.line}>
            Written by <strong>Nici Foote</strong>. Typed with support — voice
            notes, AI, and a lot of rereading.
          </p>
          <p className={styles.tag}>
            If this hit a nerve, send it to one person.
          </p>
        </div>
        <a href="mailto:nici@unbarrier.me" className={styles.cta}>
          Email Nici
        </a>
      </div>
    </footer>
  );
}
