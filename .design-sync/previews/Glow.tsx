import { Glow } from 'unbarrier-education';

// Glow is an absolutely positioned blurred orb; it needs a positioned,
// clipped parent. This is the home hero's pair (app/page.tsx): spring green
// top-left, orchid mist right.

/** Two ambient orbs behind the home hero's opening line. Opacity is low by design; high contrast zeroes it. */
export const HomeHero = () => (
  <div style={{ position: 'relative', height: 320, overflow: 'hidden', padding: 'var(--space-8) var(--space-6)' }}>
    <Glow color="var(--spring-green)" left="-120px" top="-40px" size={420} opacity={0.22} />
    <Glow color="var(--orchid-mist)" right="-100px" top="40px" size={360} opacity={0.18} />
    <h1
      style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: 'var(--fs-h2)',
        lineHeight: 1.1,
        letterSpacing: 'var(--ls-tight)',
        color: 'var(--text)',
        maxWidth: '18ch',
        margin: 0,
      }}
    >
      nobody audits whether the tech reached the child.
    </h1>
  </div>
);

/** A strand page's pair: the strand colour leads, spring green answers. /audit uses pearl-aqua. */
export const StrandPage = () => (
  <div style={{ position: 'relative', height: 320, overflow: 'hidden', padding: 'var(--space-8) var(--space-6)' }}>
    <Glow color="var(--pearl-aqua)" left="-120px" top="-40px" size={420} opacity={0.22} />
    <Glow color="var(--spring-green)" right="-100px" top="60px" size={320} opacity={0.16} />
    <h1
      style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: 'var(--fs-h2)',
        lineHeight: 1.1,
        letterSpacing: 'var(--ls-tight)',
        color: 'var(--text)',
        maxWidth: '18ch',
        margin: 0,
      }}
    >
      you have already bought what you need.
    </h1>
  </div>
);
