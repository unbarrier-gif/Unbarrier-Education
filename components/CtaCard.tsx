'use client';

import type { CSSProperties } from 'react';
import styles from './CtaCard.module.css';

type CardKey =
  | 'seven_questions'
  | 'belonging_check'
  | 'receipts'
  | 'one_read'
  | 'conversation';

type Props = {
  card: CardKey;
  title: string;
  meta: string;
  href: string;
  external?: boolean;
};

// Colour order is locked: green, pink, aqua, orange, yellow.
const ACCENT: Record<CardKey, string> = {
  seven_questions: 'var(--spring-green)',
  belonging_check: 'var(--orchid-mist)',
  receipts: 'var(--pearl-aqua)',
  one_read: 'var(--princeton-orange)',
  conversation: 'var(--school-bus-yellow)',
};

const ACCENT_RGB: Record<CardKey, string> = {
  seven_questions: '56, 255, 153',
  belonging_check: '219, 125, 204',
  receipts: '105, 217, 209',
  one_read: '255, 138, 28',
  conversation: '255, 194, 3',
};

export function CtaCard({ card, title, meta, href, external = true }: Props) {
  function handleClick() {
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible('cta_click', { props: { card } });
    }
  }

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const style = {
    '--accent': ACCENT[card],
    '--accent-rgb': ACCENT_RGB[card],
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
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}
