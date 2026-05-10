import type { CSSProperties } from 'react';
import Image from 'next/image';
import styles from './ServiceCard.module.css';

type Badge = { src: string; alt: string; width: number; height: number };

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
  /** Override the default "Find out more →" CTA label. */
  cta?: string;
  /** Optional credential badge rendered at the start of the sub strip.
   *  Per D47 — replaces text-based credential abbreviations (e.g.
   *  "Apple PLS") which Apple's marketing rules don't permit. */
  badge?: Badge;
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
  cta = 'Find out more →',
  badge,
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
      <span className={styles.sub}>
        {badge ? (
          <Image
            src={badge.src}
            alt={badge.alt}
            width={badge.width}
            height={badge.height}
            className={styles.badge}
          />
        ) : null}
        {sub}
      </span>
      <span className={styles.desc}>{desc}</span>
      <span className={styles.cta}>{cta}</span>
    </a>
  );
}
