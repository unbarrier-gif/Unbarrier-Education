import type { ReactNode } from 'react';
import styles from './Section.module.css';

// The full-bleed section wrapper `decisions & rules` specified and the repo
// never had. Home ran six identical <section className={styles.section}>, so
// the only thing marking a section change was a hairline. This gives each
// section a ground. Since 2 Sep 2026 the ground is the ONLY thing that marks
// a section change: drawn edges came off the whole site (see README,
// "Section grounds and the contrast floor").
//
// GROUNDS ARE CONTRAST-BOUND, NOT FREE.
// --text-faint sits at exactly 4.51:1 on --amethyst, i.e. on the AA floor.
// Any ground lighter than amethyst pushes it under. Measured, over
// --amethyst-deep #150520 with the 0.50 text token:
//   pearl-aqua  6% 4.58  ·  8% 4.54  ·  10% 4.48 FAILS
// So `tint` is pearl-aqua at 8% and there is no headroom above it. If a
// fourth ground is ever wanted, measure it first — do not eyeball it, and do
// not lower the text tokens to make one fit.
export type SectionGround = 'base' | 'deep' | 'tint';

type Props = {
  children: ReactNode;
  /** Which ground this section sits on. Default `base` (--bg). */
  ground?: SectionGround;
  id?: string;
  /** id of the heading that names this section. */
  labelledBy?: string;
};

export function Section({ children, ground = 'base', id, labelledBy }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${styles.section} ${styles[ground]}`}
    >
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
