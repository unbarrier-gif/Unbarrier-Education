'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ContrastToggle } from './ContrastToggle';
import { MobileNavDrawer } from './MobileNavDrawer';
import { Wordmark } from './Wordmark';
import { isInclusionStrategyPromoActive } from '@/lib/inclusion-strategy-promo';
import styles from './Nav.module.css';

// The audit item pointed at `/#services`, an anchor on the home page, because
// /audit did not exist and returned 404. It exists now, so the nav points at
// the route rather than scrolling someone to a card about it.
//
// ⛔ /voice IS DELIBERATELY ABSENT and must stay absent until legal signs off
// the retention period and the two-purpose privacy notice. Unlinked is the
// condition of that route existing at all — see app/voice/page.tsx.
// /faq is reachable from the footer rather than here; six items is what fits.
//
// `dot` marks the sub-brand links — each renders a 6px coloured dot via
// Nav.module.css `.link[data-has-dot='true']::before`, sourced from the
// --dot CSS var set inline below. Plain links (blog/about) omit `dot`.
const LINKS = [
  // TEMPORARY until 31 Dec 2026 — gated below on
  // isInclusionStrategyPromoActive(). See lib/inclusion-strategy-promo.ts.
  { key: 'inclusion-strategy', label: 'inclusion strategy', href: '/inclusion-strategy' },
  // The services group. audit and access are strands and carry their canonical
  // dot colours; edtech is a route, not a strand, so it has no dot.
  { key: 'audit', label: 'audit', href: '/audit', dot: 'var(--pearl-aqua)' },
  { key: 'access', label: 'access', href: '/access', dot: 'var(--princeton-orange)' },
  { key: 'edtech', label: 'edtech', href: '/edtech' },
  { key: 'blog', label: 'blog', href: '/blog' },
  // /about is a route now, so this points at it rather than anchor-scrolling
  // to the beliefs section on the home page.
  { key: 'about', label: 'about', href: '/about' },
] as const;

type LinkKey = (typeof LINKS)[number]['key'];

// The inclusion-strategy entry is a dated promotion, not a permanent nav item.
// Filtering here (rather than at each render site) keeps the desktop list and
// the mobile drawer in step. Remove the entry from LINKS above and this
// filter together in January — grep INCLUSION_STRATEGY_PROMO_RETIRE_AFTER.
const VISIBLE_LINKS = LINKS.filter(
  (link) =>
    link.key !== 'inclusion-strategy' || isInclusionStrategyPromoActive(),
);

type Props = {
  /** Highlight a single link as the current page. Default: nothing highlighted. */
  active?: LinkKey;
};

// Inline SVG (matches the ContrastIcon pattern) — three bars that morph
// into an X via rotation + opacity. currentColor + the global reduced-
// motion rule keep the transition gentle when the user opts out.
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line
        x1="4"
        y1={open ? 12 : 7}
        x2="20"
        y2={open ? 12 : 7}
        style={{
          transition: 'transform 200ms ease',
          transform: open ? 'rotate(45deg)' : 'none',
          transformOrigin: '12px 12px',
        }}
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        style={{ transition: 'opacity 150ms ease', opacity: open ? 0 : 1 }}
      />
      <line
        x1="4"
        y1={open ? 12 : 17}
        x2="20"
        y2={open ? 12 : 17}
        style={{
          transition: 'transform 200ms ease',
          transform: open ? 'rotate(-45deg)' : 'none',
          transformOrigin: '12px 12px',
        }}
      />
    </svg>
  );
}

export function Nav({ active }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Restore focus to the hamburger when the drawer closes — covers ESC
  // and backdrop-click. Clicking the hamburger itself keeps focus naturally.
  useEffect(() => {
    if (wasOpenRef.current && !drawerOpen) {
      hamburgerRef.current?.focus();
    }
    wasOpenRef.current = drawerOpen;
  }, [drawerOpen]);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      data-scrolled={scrolled ? 'true' : 'false'}
    >
      <div className={styles.inner}>
        <Wordmark href="/" size="md" ariaLabel="unbarrier.me — home" />
        <div className={styles.right}>
          <ul className={styles.links}>
            {VISIBLE_LINKS.map((link) => {
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
          <span className={styles.contrastWrap}>
            <ContrastToggle variant="nav" />
          </span>
          <a
            href="mailto:nici@unbarrier.me"
            className={styles.pill}
          >
            Email Nici
          </a>
          <button
            ref={hamburgerRef}
            type="button"
            className={styles.hamburger}
            aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <HamburgerIcon open={drawerOpen} />
          </button>
        </div>
      </div>
      <MobileNavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={VISIBLE_LINKS}
        activeKey={active}
      />
    </nav>
  );
}
