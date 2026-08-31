import type { ReactNode } from 'react';
import styles from './Icon.module.css';

// Brand icons, INLINED. Never <img src="….svg"> — an <img> cannot inherit
// `color`, so a currentColor icon renders black on amethyst and vanishes.
// Inlining is also what makes the high-contrast toggle and black-ink print
// work with no second export.
//
// The glyphs below are copied verbatim from public/assets/icons/*.svg, which
// stays the canonical source. Every icon is a 24 × 24 viewBox with a 2.5
// stroke — no exceptions on the grid.
//
// SPRING GREEN LIVES ON ITS OWN PATH, tagged className="accent". The rule that
// themes it and the rule that drops it in high contrast are both in
// app/globals.css. Never merge the accent back into the main path.
//
// ICON PLUS TEXT, ALWAYS. A decorative icon is aria-hidden (the default here).
// An icon carrying meaning on its own is the opposite of dual coding — if one
// is ever genuinely standalone, pass `title` and it becomes a labelled image.

export type IconName =
  | 'ndte-notice'
  | 'ndte-design'
  | 'ndte-try'
  | 'ndte-embed'
  | 'ndte-cycle';

const GLYPHS: Record<IconName, ReactNode> = {
  'ndte-notice': (
    <>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle stroke="#38ff99" className="accent" cx="12" cy="12" r="2.75" />
    </>
  ),
  'ndte-design': (
    <>
      <path d="M4 20.2 5 15.6 16.4 4.2a2.9 2.9 0 0 1 4.1 4.1L9.1 19.7Z" />
      <path stroke="#38ff99" className="accent" d="M15 5.6 19 9.6" />
    </>
  ),
  'ndte-try': (
    <>
      <path d="M9.5 2.8v6.4L4.4 18a2.4 2.4 0 0 0 2.1 3.6h11a2.4 2.4 0 0 0 2.1-3.6l-5.1-8.8V2.8" />
      <path d="M8 2.8h8" />
      <path stroke="#38ff99" className="accent" d="M7.3 14.6h9.4" />
    </>
  ),
  'ndte-embed': (
    <>
      <path stroke="#38ff99" className="accent" d="M12 2.5 2.5 6.75 12 11l9.5-4.25Z" />
      <path d="M2.5 11.6 12 15.85l9.5-4.25" />
      <path d="M2.5 16.35 12 20.6l9.5-4.25" />
    </>
  ),
  'ndte-cycle': (
    <>
      <path d="M16.82 5.12A8.4 8.4 0 1 1 9.83 3.89" />
      <path d="M7.45 6.59 9.83 3.89 6.41 2.73" />
      <path stroke="#38ff99" className="accent" d="M12 12h.02" />
    </>
  ),
};

type Props = {
  name: IconName;
  /** Rendered px. ndte-cycle is display-size — do not take it below ~40. */
  size?: number;
  /** Only for an icon that carries meaning alone. Omit for decorative. */
  title?: string;
};

export function Icon({ name, size = 24, title }: Props) {
  const labelled = Boolean(title);
  return (
    <svg
      className={styles.icon}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      {labelled ? <title>{title}</title> : null}
      {GLYPHS[name]}
    </svg>
  );
}
