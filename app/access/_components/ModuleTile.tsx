import styles from './ModuleTile.module.css';

// Single bookable module in Band 4 ("The menu — pick your modules").
// All four tiles (M2/M3/M4/M5) use the same <details>/<summary> expand
// pattern — collapsed by default, plus/minus indicator, no-JS fallback
// via native <details>. Per D42 (10 May 2026), M5 no longer renders as
// a whole-tile anchor — it expands like the others, with the routing
// affordance moved inside the expanded body as a small CTA link.
//
// linkOut: when present, an in-body CTA is rendered after the body
// copy. Use linkOut.label to set the CTA text (e.g. "See full audit
// clinic details →"). The .linkOutPill CSS class is preserved on the
// component module for future restoration once /audits ships (D41
// hold).

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
          <span className={styles.metaRow}>
            <span className={styles.duration}>{duration}</span>
            <span className={styles.audienceTag}>{audience}</span>
          </span>
        </summary>
        <div className={styles.tileBody}>
          <p className={styles.body}>{body}</p>
          {audienceFor ? (
            <p className={styles.audienceFor}>
              <strong>For:</strong> {audienceFor}
            </p>
          ) : null}
          {linkOut?.label ? (
            <a className={styles.linkOutCta} href={linkOut.href}>
              {linkOut.label}
            </a>
          ) : null}
        </div>
      </details>
    </li>
  );
}
