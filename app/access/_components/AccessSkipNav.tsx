'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../page.module.css';

type Item = {
  label: string;
  targetId: string;
  dotColor: string;
};

const ITEMS: Item[] = [
  { label: 'What', targetId: 'access-routes',         dotColor: 'var(--princeton-orange)' },
  { label: 'How',  targetId: 'access-inset-example',  dotColor: 'var(--school-bus-yellow)' },
  { label: 'Who',  targetId: 'access-team',           dotColor: 'var(--spring-green)' },
  { label: 'Ask',  targetId: 'access-ask',            dotColor: 'var(--princeton-orange)' },
];

// Quick-link destinations that live outside this page's own sections —
// currently just the GoodNotes one-pager handout. Kept as a list so more
// resources can be added without changing the dropdown markup.
const RESOURCES = [
  {
    label: 'GoodNotes training one-pager',
    href: '/goodnotes-training',
  },
];

export function AccessSkipNav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const ratiosRef = useRef<Map<string, number>>(new Map());
  const menuRef = useRef<HTMLLIElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const targets = ITEMS
      .map(({ targetId }) => document.getElementById(targetId))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const ratios = ratiosRef.current;
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestId = id;
            bestRatio = ratio;
          }
        }
        setActiveId(bestRatio > 0 ? bestId : null);
      },
      {
        // Account for the fixed Nav (~64px) + the strip itself (~52px) so a
        // section is "active" only once it's clearly past the chrome.
        rootMargin: '-120px 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (typeof window.history?.replaceState === 'function') {
      window.history.replaceState(null, '', `#${targetId}`);
    }
  };

  return (
    <nav aria-label="Jump to section" className={styles.skipNav}>
      <ul className={styles.skipNavInner}>
        {ITEMS.map(({ label, targetId, dotColor }) => {
          const isActive = activeId === targetId;
          return (
            <li key={targetId} className={styles.skipNavItem}>
              <a
                href={`#${targetId}`}
                onClick={(e) => handleClick(e, targetId)}
                className={`${styles.skipNavBtn} ${isActive ? styles.skipNavBtnActive : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  aria-hidden="true"
                  className={styles.skipNavDot}
                  style={{ background: dotColor }}
                />
                {label} →
              </a>
            </li>
          );
        })}
        <li className={styles.skipNavItem} ref={menuRef} style={{ position: 'relative' }}>
          <button
            ref={menuBtnRef}
            type="button"
            className={styles.skipNavBtn}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            Resources
            <span aria-hidden="true" className={styles.skipNavCaret} data-open={menuOpen}>
              ▾
            </span>
          </button>
          {menuOpen && (
            <ul role="menu" className={styles.skipNavMenu}>
              {RESOURCES.map(({ label, href }) => (
                <li key={href} role="none">
                  <a
                    role="menuitem"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.skipNavMenuLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
