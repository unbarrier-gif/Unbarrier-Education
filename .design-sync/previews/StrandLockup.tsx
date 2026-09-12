import { StrandLockup } from 'unbarrier-education';

// The inline SVG has no intrinsic width; the pages size it at 44px tall
// (app/route-page.module.css .lockup). Here it sits in a 360px column.

/** unbarrier.audit — the full stop spring green, the strand name pearl-aqua, as the /audit hero opens. */
export const Audit = () => (
  <div style={{ width: 360, color: 'var(--text)' }}>
    <StrandLockup strand="audit" />
  </div>
);

/** unbarrier.access — the strand name in princeton-orange, as the /access hero opens. */
export const Access = () => (
  <div style={{ width: 360, color: 'var(--text)' }}>
    <StrandLockup strand="access" />
  </div>
);
