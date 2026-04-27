'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wordmark } from './Wordmark';
import styles from './Nav.module.css';

// Phase 3 link-swap: audit / access / voice currently anchor-scroll to
// #services; once /audit, /access, /voice routes ship, swap each href to
// the real path. Tracked in _inbound/Task List.html.
const LINKS = [
  { key: 'audit', label: 'audit', href: '/#services' },
  { key: 'access', label: 'access', href: '/#services' },
  { key: 'voice', label: 'voice', href: '/#services' },
  { key: 'blog', label: 'blog', href: '/blog' },
  { key: 'about', label: 'about', href: '/#about' },
] as const;

type LinkKey = (typeof LINKS)[number]['key'];

type Props = {
  /** Highlight a single link as the current page. Default: nothing highlighted. */
  active?: LinkKey;
};

export function Nav({ active }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      data-scrolled={scrolled ? 'true' : 'false'}
    >
      <div className={styles.inner}>
        <Wordmark href="/" size="md" ariaLabel="unbarrier.me — home" />
        <div className={styles.right}>
          <ul className={styles.links}>
            {LINKS.map((link) => {
              const isActive = active === link.key;
              return (
                <li key={link.key} className={styles.linkItem}>
                  <Link
                    href={link.href}
                    className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href="mailto:nici@unbarrier.me"
            className={styles.pill}
          >
            Email Nici
          </a>
        </div>
      </div>
    </nav>
  );
}
