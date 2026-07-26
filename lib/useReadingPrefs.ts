'use client';

import { useCallback, useEffect, useState } from 'react';

// Text size + letter/word spacing preferences. Merged up from the
// ISP-audit-only ReadingControls so the same preference follows the reader
// across the whole site instead of resetting on every page.
//
// Applied as data attributes on <html>, matching the .contrast-high pattern
// in lib/useContrast.ts. A pre-paint script in app/layout.tsx sets the same
// attributes before first paint so there's no flash of unscaled text.
// Storage keys are duplicated in that script — change one, change both.

export type TextSize = 'sm' | 'md' | 'lg';

export const TEXT_SIZE_KEY = 'unbarrier:text-size';
export const SPACING_KEY = 'unbarrier:spacing';

export const SIZE_ORDER: TextSize[] = ['sm', 'md', 'lg'];
export const SIZE_LABEL: Record<TextSize, string> = {
  sm: '87%',
  md: '100%',
  lg: '125%',
};

export function useReadingPrefs(): {
  textSize: TextSize;
  extraSpacing: boolean;
  hydrated: boolean;
  stepSize: (direction: -1 | 1) => void;
  toggleSpacing: () => void;
} {
  const [textSize, setTextSize] = useState<TextSize>('md');
  const [extraSpacing, setExtraSpacing] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(TEXT_SIZE_KEY);
      if (stored === 'sm' || stored === 'md' || stored === 'lg') {
        setTextSize(stored);
      }
      setExtraSpacing(window.localStorage.getItem(SPACING_KEY) === 'true');
    } catch {
      // Safari private mode / storage disabled — start from defaults.
    }
    setHydrated(true);
  }, []);

  // Write through to <html> + storage on every change after hydration.
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;

    if (textSize === 'md') root.removeAttribute('data-text-size');
    else root.setAttribute('data-text-size', textSize);

    if (extraSpacing) root.setAttribute('data-spacing', 'true');
    else root.removeAttribute('data-spacing');

    try {
      window.localStorage.setItem(TEXT_SIZE_KEY, textSize);
      window.localStorage.setItem(SPACING_KEY, String(extraSpacing));
    } catch {
      // ignore — still works in-page, just won't persist
    }
  }, [textSize, extraSpacing, hydrated]);

  const stepSize = useCallback((direction: -1 | 1) => {
    setTextSize((prev) => {
      const next = SIZE_ORDER.indexOf(prev) + direction;
      return SIZE_ORDER[Math.min(SIZE_ORDER.length - 1, Math.max(0, next))];
    });
  }, []);

  const toggleSpacing = useCallback(() => setExtraSpacing((v) => !v), []);

  return { textSize, extraSpacing, hydrated, stepSize, toggleSpacing };
}
