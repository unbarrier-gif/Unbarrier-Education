import { Eyebrow } from 'unbarrier-education';

/** The default eyebrow: spring green via --action, Outfit, uppercase, tracked. The home chooser's. */
export const Default = () => <Eyebrow>where to start</Eyebrow>;

/** A strand page's eyebrow takes its strand colour: orchid mist for voice, pearl-aqua for the readiness check, orange for inclusion strategy. */
export const StrandColours = () => (
  <div>
    <Eyebrow color="var(--orchid-mist)">unbarrier.voice</Eyebrow>
    <Eyebrow color="var(--pearl-aqua)">free · no sign-up</Eyebrow>
    <Eyebrow color="var(--princeton-orange)">for schools with inclusive mainstream funding</Eyebrow>
  </div>
);

/** As a span, inline in running text rather than its own paragraph. */
export const AsSpan = () => (
  <p style={{ margin: 0, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
    <Eyebrow as="span">faq</Eyebrow> — the things people ask before they get in touch.
  </p>
);
