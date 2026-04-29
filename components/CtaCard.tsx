'use client';

import type { CSSProperties } from 'react';
import styles from './CtaCard.module.css';

type CardKey = 'tuesday' | 'guest' | 'coaching' | 'ehcp_fit_call' | 'template';

type Props = {
  card: CardKey;
  title: string;
  meta: string;
  href: string;
  external?: boolean;
};

const ACCENT: Record<CardKey, string> = {
  tuesday: 'var(--spring-green)',
  guest: 'var(--orchid-mist)',
  coaching: 'var(--pearl-aqua)',
  ehcp_fit_call: 'var(--princeton-orange)',
  template: 'var(--school-bus-yellow)',
};

const ACCENT_RGB: Record<CardKey, string> = {
  tuesday: '56, 255, 153',
  guest: '219, 125, 204',
  coaching: '105, 217, 209',
  ehcp_fit_call: '255, 138, 28',
  template: '255, 194, 3',
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
