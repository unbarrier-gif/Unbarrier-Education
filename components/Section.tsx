import type { ReactNode } from 'react';
import styles from './Section.module.css';

// The full-bleed section wrapper `decisions & rules` specified and the repo
// never had. Home ran six identical <section className={styles.section}>, so
// the only thing marking a section change was a hairline. This gives each
// section a ground. Since 2 Sep 2026 the ground is the ONLY thing that marks
// a section change: drawn edges came off the whole site (see README,
// "Section grounds and the contrast floor").
//
// GROUNDS ARE NEW WORLD BLUE ONLY (ruled 2 Sep 2026). The ladder in
// app/globals.css: 500 the page · 400 a second room · 300 footers, bands and
// wells · 200 the deepest well. Shade comes from depth; colour comes from
// what sits on top. Route pages alternate 500 → 400 → 300 and close on 200.
//
//   base    500  --ground-500  (--bg)
//   second  400  --ground-400
//   deep    300  --ground-300  (--bg-alt)
//   well    200  --ground-200
//   tint    SUPERSEDED. pearl-aqua 8% over --amethyst-deep, still the third
//           ground on home. Every tinted ground is vetoed; nothing new uses
//           it, and home comes off it in its own branch.
//
// GROUNDS ARE CONTRAST-BOUND, NOT FREE. --text-faint sits at exactly the AA
// floor on --amethyst, so any ground LIGHTER than amethyst pushes it under —
// that is why the ladder only goes down. Measured, over --amethyst-deep
// #150520 with the 0.50 text token: pearl-aqua 6% 4.58 · 8% 4.54 · 10% 4.48
// FAILS. If a new ground is ever wanted, measure it first — do not eyeball
// it, and do not lower the text tokens to make one fit.
export type SectionGround = 'base' | 'second' | 'deep' | 'well' | 'tint';

// Home reads at 900px; the route pages (app/route-page.module.css) at 820px.
// The ground is full-bleed either way — the measure is only the text column.
export type SectionMeasure = 'home' | 'route';

type Props = {
  children: ReactNode;
  /** Which ground this section sits on. Default `base` (--bg). */
  ground?: SectionGround;
  id?: string;
  /** id of the heading that names this section. */
  labelledBy?: string;
  /** Text-column width. Default `home` (900px); route pages pass `route`. */
  measure?: SectionMeasure;
  /** Vertical padding. `loose` is the closing band's extra air. */
  space?: 'default' | 'loose';
};

export function Section({
  children,
  ground = 'base',
  id,
  labelledBy,
  measure = 'home',
  space = 'default',
}: Props) {
  const inner = [
    styles.inner,
    measure === 'route' ? styles.route : '',
    space === 'loose' ? styles.loose : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${styles.section} ${styles[ground]}`}
    >
      <div className={inner}>{children}</div>
    </section>
  );
}
