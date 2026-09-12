import { Mark } from 'unbarrier-education';

/** The monochrome mark on its own. fill: currentColor, so it takes the text colour of whatever it sits in. */
export const Cream = () => (
  <div style={{ width: 120, color: 'var(--text)' }}>
    <Mark />
  </div>
);
