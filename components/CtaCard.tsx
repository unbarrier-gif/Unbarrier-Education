'use client';

import type { CSSProperties } from 'react';
import styles from './CtaCard.module.css';

type CardKey =
  | 'seven_questions'
  | 'belonging_check'
  | 'receipts'
  | 'one_read'
  | 'conversation'
  | 'three_questions';

type Props = {
  /** Plausible event label. Legacy keys get their locked colour from ACCENT. */
  card: CardKey | (string & {});
  title: string;
  meta: string;
  href: string;
  external?: boolean;
  /** Colour override — Notion-driven cards pass their own accent. */
  accent?: string;
  accentRgb?: string;
  /** Thumbnail src. Omit for the tinted fallback tile. */
  image?: string;
  /** Character on the fallback tile. Defaults to the title's first letter. */
  initial?: string;
};

// Colour order is locked: green, pink, aqua, orange, yellow.
const ACCENT: Record<CardKey, string> = {
  seven_questions: 'var(--spring-green)',
  belonging_check: 'var(--orchid-mist)',
  receipts: 'var(--pearl-aqua)',
  one_read: 'var(--princeton-orange)',
  conversation: 'var(--school-bus-yellow)',
  three_questions: 'var(--pink-mist)',
};

const ACCENT_RGB: Record<CardKey, string> = {
  seven_questions: '56, 255, 153',
  belonging_check: '219, 125, 204',
  receipts: '105, 217, 209',
  one_read: '255, 138, 28',
  conversation: '255, 194, 3',
  three_questions: '227, 161, 176',
};

export function CtaCard({
  card,
  title,
  meta,
  href,
  external = true,
  accent,
  accentRgb,
  image,
  initial,
}: Props) {
  function handleClick() {
    if (
      typeof window !== 'undefined' &&
      typeof window.plausible === 'function'
    ) {
      window.plausible('cta_click', { props: { card } });
    }
  }

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const style = {
    '--accent': accent ?? ACCENT[card as CardKey] ?? 'var(--spring-green)',
    '--accent-rgb': accentRgb ?? ACCENT_RGB[card as CardKey] ?? '56, 255, 153',
  } as CSSProperties;

  return (
    <a
      href={href}
      onClick={handleClick}
      className={styles.card}
      data-card={card}
      style={style}
      {...externalProps}
    >
      {/* Decorative: the title next to it already names the destination. */}
      <span className={styles.thumb} aria-hidden="true">
        {image ? (
          <img src={image} alt="" loading="lazy" decoding="async" />
        ) : (
          <span className={styles.initial}>
            {initial ?? title.trim().charAt(0).toUpperCase()}
          </span>
        )}
      </span>

      <span className={styles.body}>
        <span className={styles.title}>
          <span className={styles.arrow} aria-hidden="true">
            &rarr;
          </span>
          {title}
        </span>
        <span className={styles.meta}>{meta}</span>
      </span>
    </a>
  );
}

declare global {
  interface Window {
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string> },
    ) => void;
  }
}
