import type { CSSProperties } from 'react';
import styles from './ServiceCard.module.css';

type Props = {
  audience: string;
  label: string;
  sub: string;
  desc: string;
  href: string;
  /** CSS colour var/value used for accents on this card. */
  accent: string;
  /** Matching rgb triple for transparent accent backgrounds. */
  accentRgb: string;
  /** Show the "In build" pill. */
  soon?: boolean;
};

export function ServiceCard({
  audience,
  label,
  sub,
  desc,
  href,
  accent,
  accentRgb,
  soon,
}: Props) {
  const style = {
    '--accent': accent,
    '--accent-rgb': accentRgb,
  } as CSSProperties;

  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  const externalProps = isExternal && href.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      className={styles.card}
      style={style}
      data-soon={soon ? 'true' : undefined}
      {...externalProps}
    >
      {soon ? <span className={styles.soonPill}>In build</span> : null}
      <span className={styles.audience}>{audience}</span>
      <span className={styles.label}>{label}</span>
      <span className={styles.sub}>{sub}</span>
      <span className={styles.desc}>{desc}</span>
      <span className={styles.cta}>Find out more →</span>
    </a>
  );
}
