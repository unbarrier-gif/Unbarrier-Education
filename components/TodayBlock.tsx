'use client';

import type { CSSProperties } from 'react';
import type { HelloLink } from '@/lib/hello-links';
import styles from './TodayBlock.module.css';

type Props = {
  heading: string;
  links: HelloLink[];
};

/**
 * The "your stuff from today" panel.
 *
 * /hello is the room link — the URL Nici says out loud from a stage. This
 * block is deliberately unlike the standing card list so that, from the back
 * of a room on a phone, the thing she just named is the thing people see
 * first. Rows in the Notion "hello links" database with Group = today land
 * here; when none are ticked the block doesn't render at all.
 */
export function TodayBlock({ heading, links }: Props) {
  function handleClick(slug: string) {
    if (
      typeof window !== 'undefined' &&
      typeof window.plausible === 'function'
    ) {
      window.plausible('cta_click', { props: { card: `today_${slug}` } });
    }
  }

  return (
    <section className={styles.block} aria-labelledby="today-heading">
      <p className={styles.label}>Your stuff from today</p>
      <h2 id="today-heading" className={styles.heading}>
        {heading}
      </h2>

      <ol className={styles.list}>
        {links.map((link, i) => (
          <li key={link.id}>
            <a
              href={link.href}
              className={styles.row}
              onClick={() => handleClick(link.slug)}
              style={{ '--accent': link.accent } as CSSProperties}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <span className={styles.num} aria-hidden="true">
                {i + 1}
              </span>
              <span className={styles.rowText}>{link.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
