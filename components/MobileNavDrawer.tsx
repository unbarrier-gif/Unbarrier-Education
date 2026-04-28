'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ContrastToggle } from './ContrastToggle';
import styles from './MobileNavDrawer.module.css';

type NavLink = {
  key: string;
  label: string;
  href: string;
  dot?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  links: readonly NavLink[];
  activeKey?: string;
};

export function MobileNavDrawer({ open, onClose, links, activeKey }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={styles.backdrop}
        data-open={open ? 'true' : 'false'}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id="mobile-nav-drawer"
        className={styles.panel}
        data-open={open ? 'true' : 'false'}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <ul className={styles.list}>
          {links.map((link, idx) => {
            const isActive = activeKey === link.key;
            return (
              <li key={link.key} className={styles.item}>
                <Link
                  ref={idx === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                  style={link.dot ? ({ '--dot': link.dot } as CSSProperties) : undefined}
                  data-has-dot={link.dot ? 'true' : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.cta}>
          <ContrastToggle variant="nav" />
          <a
            href="mailto:nici@unbarrier.me"
            className={styles.pill}
            tabIndex={open ? 0 : -1}
            onClick={onClose}
          >
            Email Nici
          </a>
        </div>
      </div>
    </>
  );
}
