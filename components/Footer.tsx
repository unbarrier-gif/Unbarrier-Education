import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.line}>
          unbarrier.me &middot; Unbarrier Education Ltd &middot; Registered in
          England &amp; Wales (Co.&nbsp;No.&nbsp;16603630)
        </p>
        <p className={styles.links}>
          <Link href="/legal/privacy" className={styles.link}>
            privacy
          </Link>
          <span aria-hidden="true" className={styles.dot}>&middot;</span>
          <Link href="/legal/terms" className={styles.link}>
            terms
          </Link>
          <span aria-hidden="true" className={styles.dot}>&middot;</span>
          <span className={styles.copyright}>&copy; 2026</span>
        </p>
      </div>
    </footer>
  );
}
