'use client';

import type { CSSProperties, ReactNode } from 'react';
import buttonStyles from '@/components/Button.module.css';

type Props = {
  href: string;
  event: string;
  color?: string;
  children: ReactNode;
};

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

/**
 * Mailto CTA that fires a Plausible custom event before the browser
 * follows the mailto: link. Mirrors the visual API of <Button> so it
 * drops in alongside other primary buttons on the workshops page.
 */
export function TrackedMailto({ href, event, color, children }: Props) {
  const style: CSSProperties | undefined = color
    ? ({ '--btn-color': color } as CSSProperties)
    : undefined;

  return (
    <a
      href={href}
      className={`${buttonStyles.btn} ${buttonStyles.primary}`}
      style={style}
      onClick={() => {
        if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
          window.plausible(event);
        }
      }}
    >
      {children}
    </a>
  );
}
