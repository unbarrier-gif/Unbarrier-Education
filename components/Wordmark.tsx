import type { CSSProperties } from 'react';
import Link from 'next/link';
import styles from './Wordmark.module.css';

type Suffix = '.me' | '.audit' | '.access' | '.voice' | '.hub';
type Size = 'sm' | 'md' | 'lg' | 'xl';

const SIZES: Record<Size, number> = { sm: 16, md: 22, lg: 34, xl: 56 };

const DOT_COLOR: Record<Suffix, string> = {
  '.me': 'var(--spring-green)',
  '.audit': 'var(--pearl-aqua)',
  '.access': 'var(--princeton-orange)',
  '.voice': 'var(--orchid-mist)',
  '.hub': 'var(--school-bus-yellow)',
};

type Props = {
  suffix?: Suffix;
  size?: Size;
  inverse?: boolean;
  href?: string;
  ariaLabel?: string;
};

export function Wordmark({
  suffix = '.me',
  size = 'md',
  inverse = false,
  href,
  ariaLabel,
}: Props) {
  const fontSize = SIZES[size];
  const textColor = inverse ? 'var(--amethyst)' : 'var(--text)';
  const dotColor = DOT_COLOR[suffix];

  // Split the suffix: "." + "me"
  const dot = suffix[0];
  const suffixLetters = suffix.slice(1);

  const style: CSSProperties = {
    fontSize,
    color: textColor,
  };

  const inner = (
    <span className={styles.wordmark} style={style}>
      unbarrier
      <span style={{ color: dotColor }}>{dot}</span>
      {suffixLetters}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={styles.link}
        aria-label={ariaLabel ?? `unbarrier${suffix}`}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
