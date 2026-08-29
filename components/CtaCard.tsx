'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
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

// THE THUMBNAIL HOST GUARD.
//
// This card's image URL is typed into Notion by hand, so it can be any host.
// next/image throws at render time on a host that isn't in next.config.js's
// remotePatterns — which on /hello means a 500 in front of a live audience
// holding phones, caused by pasting a link. That is the one failure this page
// cannot have.
//
// So: known host -> optimised <Image>. Anything else -> the tinted initial
// tile, which is the same fallback an empty Image field already gets. A
// mistyped host costs a thumbnail, never the page.
//
// Keep this list in step with `images.remotePatterns` in next.config.js.
const OPTIMISABLE_HOSTS = [
  'prod-files-secure.s3.us-west-2.amazonaws.com',
  's3.us-west-2.amazonaws.com',
  'images.unsplash.com',
];

function canOptimise(src?: string): boolean {
  if (!src) return false;
  // Same-origin paths are always fine.
  if (src.startsWith('/')) return true;
  try {
    return OPTIMISABLE_HOSTS.includes(new URL(src).hostname);
  } catch {
    return false;
  }
}

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
        {canOptimise(image) ? (
          <Image src={image!} alt="" width={56} height={56} />
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
