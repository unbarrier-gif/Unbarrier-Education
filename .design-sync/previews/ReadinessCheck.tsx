import { ReadinessCheck } from 'unbarrier-education';

/** The free readiness check as /readiness-check runs it: the seven-domain scale, then the result and follow-up on the same page. */
export const TheCheck = () => (
  <div style={{ maxWidth: 760 }}>
    <h2 style={{ marginBottom: 12 }}>rate each one as it actually is, not as it should be.</h2>
    <p style={{ opacity: 0.85, marginBottom: 28 }}>
      answer for a setting you know well. if a question doesn’t apply, or you genuinely can’t say, leave it — a
      skipped question is left out of the result rather than counted as a nought.
    </p>
    <ReadinessCheck route="/readiness-check" />
  </div>
);
