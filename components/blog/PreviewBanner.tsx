import styles from './PreviewBanner.module.css';

export function PreviewBanner() {
  return (
    <div className={styles.banner} role="status">
      <span className={styles.dot} aria-hidden="true" />
      <strong className={styles.label}>Preview</strong>
      <span className={styles.text}>
        Draft post — not visible to the public.
      </span>
    </div>
  );
}
