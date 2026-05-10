import styles from './ModuleTile.module.css';

// Single bookable module in Band 4 ("The menu — pick your modules").
// Two shapes:
//   - default: <details>/<summary> expand pattern, full body inline.
//     Works without JavaScript (native disclosure).
//   - linkOut: anchor that routes elsewhere (Module 5 → /audits per
//     D03). Carries an "↗ links out" pill so buyers know they're
//     leaving the page.

type LinkOut = { href: string; label?: string };

type Props = {
  number: number;
  title: string;
  duration: string;
  audience: string;
  body: string;
  audienceFor?: string;
  linkOut?: LinkOut;
};

export function ModuleTile({
  number,
  title,
  duration,
  audience,
  body,
  audienceFor,
  linkOut,
}: Props) {
  const meta = (
    <span className={styles.metaRow}>
      <span className={styles.duration}>{duration}</span>
      <span className={styles.audienceTag}>{audience}</span>
    </span>
  );

  if (linkOut) {
    return (
      <li className={styles.tileWrap}>
        <a className={`${styles.tile} ${styles.tileLinkOut}`} href={linkOut.href}>
          <span className={styles.headRow}>
            <span aria-hidden="true" className={styles.number}>
              0{number}
            </span>
            <h3 className={styles.title}>{title}</h3>
            {linkOut.label ? (
              <span className={styles.linkOutPill}>{linkOut.label}</span>
            ) : null}
          </span>
          {meta}
          <p className={styles.body}>{body}</p>
          {audienceFor ? (
            <p className={styles.audienceFor}>
              <strong>For:</strong> {audienceFor}
            </p>
          ) : null}
        </a>
      </li>
    );
  }

  return (
    <li className={styles.tileWrap}>
      <details className={styles.tile}>
        <summary className={styles.summary}>
          <span className={styles.headRow}>
            <span aria-hidden="true" className={styles.number}>
              0{number}
            </span>
            <h3 className={styles.title}>{title}</h3>
            <span aria-hidden="true" className={styles.disclosure} />
          </span>
          {meta}
        </summary>
        <div className={styles.tileBody}>
          <p className={styles.body}>{body}</p>
          {audienceFor ? (
            <p className={styles.audienceFor}>
              <strong>For:</strong> {audienceFor}
            </p>
          ) : null}
        </div>
      </details>
    </li>
  );
}
