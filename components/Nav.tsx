'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ContrastToggle } from './ContrastToggle';
import { Wordmark } from './Wordmark';
import styles from './Nav.module.css';

// Phase 3 link-swap: audit / access still anchor-scroll to #services
// until those routes ship. voice now points at the live /voice holding
// page (partnership invitation, not a full product page). Tracked in
// _inbound/Task List.html.
//
// `dot` marks the sub-brand links — each renders a 6px coloured dot via
// Nav.module.css `.link[data-has-dot='true']::before`, sourced from the
// --dot CSS var set inline below. Plain links (blog/about) omit `dot`.
const LINKS = [
  { key: 'audit', label: 'audit', href: '/#services', dot: 'var(--pearl-aqua)' },
  { key: 'access', label: 'access', href: '/#services', dot: 'var(--princeton-orange)' },
  { key: 'voice', label: 'voice', href: '/voice', dot: 'var(--orchid-mist)' },
  { key: 'loop-breakers', label: 'loop breakers', href: '/loop-breakers', dot: 'var(--school-bus-yellow)' },
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
              const dot = 'dot' in link ? link.dot : undefined;
              return (
                <li key={link.key} className={styles.linkItem}>
                  <Link
                    href={link.href}
                    className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                    style={dot ? ({ '--dot': dot } as CSSProperties) : undefined}
                    data-has-dot={dot ? 'true' : undefined}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ContrastToggle variant="nav" />
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
