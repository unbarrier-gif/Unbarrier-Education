import { Wordmark } from 'unbarrier-education';

/** The nav wordmark: unbarrier, a coloured dot, the suffix letters. */
export const Nav = () => <Wordmark href="/" size="md" ariaLabel="unbarrier.me — home" />;

/** Each sub-brand's suffix carries its strand colour on the dot. */
export const Strands = () => (
  <div style={{ display: 'grid', gap: 18 }}>
    <Wordmark suffix=".me" size="lg" />
    <Wordmark suffix=".audit" size="lg" />
    <Wordmark suffix=".access" size="lg" />
    <Wordmark suffix=".voice" size="lg" />
    <Wordmark suffix=".hub" size="lg" />
  </div>
);

/** Four sizes: sm 16 · md 22 · lg 34 · xl 56. */
export const Sizes = () => (
  <div style={{ display: 'grid', gap: 18, alignItems: 'baseline' }}>
    <Wordmark size="sm" />
    <Wordmark size="md" />
    <Wordmark size="lg" />
    <Wordmark size="xl" />
  </div>
);

/** Inverse on a white surface, as the ISP audit thank-you page uses it. */
export const Inverse = () => (
  <div style={{ background: '#ffffff', padding: 24, borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
    <Wordmark suffix=".me" size="md" inverse />
  </div>
);
