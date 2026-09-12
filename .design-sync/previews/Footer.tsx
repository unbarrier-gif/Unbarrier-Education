import { Footer } from 'unbarrier-education';

/** The simple footer: the company line, privacy, terms, the year. Shown in a 720px page column, as a small page would hold it. */
export const Simple = () => (
  <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 var(--space-5)' }}>
    <Footer variant="simple" />
  </div>
);

/** The full footer: the strapline lockup (its one home), the three link groups, the contrast toggle. Every route ends on it. */
export const Full = () => <Footer variant="full" />;
