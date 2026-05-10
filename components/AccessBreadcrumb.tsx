import Link from 'next/link';
import styles from './AccessBreadcrumb.module.css';

type Props = {
  /** Current page label, e.g. "workshops". */
  page: string;
};

/**
 * Strand-page breadcrumb chip — orange dot + unbarrier.access link
 * + chevron + current page name. Sits under the nav. Hidden on mobile
 * per Workshops Page Spec §04.
 */
export function AccessBreadcrumb({ page }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={styles.wrap}>
      <span aria-hidden="true" className={styles.dot} />
      <Link href="/access" className={styles.link}>
        unbarrier.access
      </Link>
      <span aria-hidden="true" className={styles.sep}>›</span>
      <span className={styles.current} aria-current="page">
        {page}
      </span>
    </nav>
  );
}
