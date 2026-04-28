'use client';

import { useCallback, useEffect, useState } from 'react';

// Single source of truth for the high-contrast mode. The class is set on
// <html> by a tiny pre-paint script in app/layout.tsx so there's no FOUC
// on first paint; this hook stays in sync with that class via
// localStorage and the prefers-contrast media query.
//
// Storage key matches the pre-paint script — change one, change both.

export type ContrastMode = 'default' | 'high';

export const CONTRAST_STORAGE_KEY = 'unbarrier:contrast';
export const CONTRAST_HIGH_CLASS = 'contrast-high';

function readInitial(): ContrastMode {
  if (typeof window === 'undefined') return 'default';
  try {
    const stored = window.localStorage.getItem(CONTRAST_STORAGE_KEY);
    if (stored === 'high' || stored === 'default') return stored;
  } catch {
    // Safari private mode etc — fall through to system hint
  }
  if (window.matchMedia?.('(prefers-contrast: more)').matches) return 'high';
  return 'default';
}

export function useContrast(): {
  mode: ContrastMode;
  setMode: (next: ContrastMode) => void;
  toggle: () => void;
  // `true` until the first effect runs after hydration. UI should hide
  // toggle state until then to avoid flashing the wrong icon.
  hydrated: boolean;
} {
  // Server render starts at default. The first client effect reads real
  // state from <html> + localStorage and calls setMode if different.
  const [mode, setModeState] = useState<ContrastMode>('default');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setModeState(readInitial());
    setHydrated(true);

    // React to OS-level contrast pref changes while the page is open.
    const mq = window.matchMedia('(prefers-contrast: more)');
    const onSystemChange = (e: MediaQueryListEvent) => {
      // Only honor system change if the user hasn't expressed a preference.
      const stored = window.localStorage.getItem(CONTRAST_STORAGE_KEY);
      if (stored === 'high' || stored === 'default') return;
      setModeState(e.matches ? 'high' : 'default');
    };
    mq.addEventListener?.('change', onSystemChange);
    return () => mq.removeEventListener?.('change', onSystemChange);
  }, []);

  // Apply class to <html> + persist whenever mode changes after hydration.
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.toggle(CONTRAST_HIGH_CLASS, mode === 'high');
    try {
      window.localStorage.setItem(CONTRAST_STORAGE_KEY, mode);
    } catch {
      // ignore — toggle still works in-page, just won't persist
    }
  }, [mode, hydrated]);

  const setMode = useCallback((next: ContrastMode) => {
    setModeState(next);
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => (prev === 'high' ? 'default' : 'high'));
  }, []);

  return { mode, setMode, toggle, hydrated };
}
