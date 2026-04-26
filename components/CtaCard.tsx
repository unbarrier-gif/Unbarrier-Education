'use client';

import styles from './CtaCard.module.css';

type Props = {
  card: 'tuesday' | 'guest' | 'coaching' | 'schools';
  title: string;
  meta: string;
  href: string;
  external?: boolean;
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

  return (
    <a
      href={href}
      onClick={handleClick}
      className={styles.card}
      data-card={card}
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
