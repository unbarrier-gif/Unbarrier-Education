import { SevenQuestions } from 'unbarrier-education';

// Each route page sets --route-accent on <main>; the section takes its colour
// from it. Princeton orange on /access, orchid mist on /voice.

/** As on /access: orange accent, on the second ground. */
export const Access = () => (
  <div style={{ '--route-accent': 'var(--princeton-orange)' } as React.CSSProperties}>
    <SevenQuestions
      id="seven-questions"
      heading="what’s missing — the seven questions"
      ground="second"
    />
  </div>
);

/** As on /voice: orchid-mist accent, on the page ground. */
export const Voice = () => (
  <div style={{ '--route-accent': 'var(--orchid-mist)' } as React.CSSProperties}>
    <SevenQuestions
      id="seven-questions"
      heading="seven questions, asked from the learner’s side"
      ground="base"
    />
  </div>
);
