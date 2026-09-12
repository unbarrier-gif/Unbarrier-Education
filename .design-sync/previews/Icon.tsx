import { Icon } from 'unbarrier-education';
import type { CSSProperties } from 'react';

// Icon plus text, always. The four stage icons sit beside their word as the
// home page's ndte options do (app/page.tsx .optionLead); ndte-cycle is the
// display-size glyph beside the statement.

const NDTE = [
  { name: 'ndte-notice', lead: 'notice' },
  { name: 'ndte-design', lead: 'design' },
  { name: 'ndte-try', lead: 'try' },
  { name: 'ndte-embed', lead: 'embed' },
] as const;

const lead: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  color: 'var(--text)',
  margin: 0,
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-body)',
};

const strong: CSSProperties = { color: 'var(--text)', fontWeight: 700 };

/** The five icons at 24px with their words: notice, design, try, embed, and the cycle. One spring-green accent path each. */
export const Set = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignItems: 'center' }}>
    {NDTE.map((step) => (
      <p key={step.name} style={lead}>
        <Icon name={step.name} />
        <strong style={strong}>{step.lead}</strong>
      </p>
    ))}
    <p style={lead}>
      <Icon name="ndte-cycle" size={44} />
      <strong style={strong}>notice → design → try → embed.</strong>
    </p>
  </div>
);

/** ndte-cycle at 24, 32 and 44. Display-size: below ~40px the four stage dots close up, so 44 is what the home page uses. */
export const CycleSizes = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignItems: 'flex-end' }}>
    {[24, 32, 44].map((size) => (
      <p key={size} style={lead}>
        <Icon name="ndte-cycle" size={size} />
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)' }}>{size}px</span>
      </p>
    ))}
  </div>
);
