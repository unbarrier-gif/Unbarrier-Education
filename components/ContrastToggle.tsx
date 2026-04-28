'use client';

import { useContrast } from '@/lib/useContrast';
import styles from './ContrastToggle.module.css';

type Variant = 'nav' | 'footer';

type Props = {
  variant?: Variant;
};

// Lucide-style "Contrast" icon — circle half-filled. Inlined as SVG so we
// don't ship lucide-react for one glyph. currentColor keeps it themeable.
function ContrastIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M12 21a9 9 0 0 0 0-18Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ContrastToggle({ variant = 'nav' }: Props) {
  const { mode, toggle, hydrated } = useContrast();
  const on = mode === 'high';

  return (
    <button
      type="button"
      className={`${styles.btn} ${variant === 'footer' ? styles.footer : styles.nav}`}
      data-on={on ? 'true' : undefined}
      // Keep the rendered state stable until hydration so server HTML and
      // first client paint match — `aria-pressed` flips silently after.
      aria-pressed={hydrated ? on : false}
      aria-label={on ? 'Switch to default contrast' : 'Switch to high contrast'}
      onClick={toggle}
    >
      <ContrastIcon />
      <span className={styles.label}>high contrast</span>
    </button>
  );
}
