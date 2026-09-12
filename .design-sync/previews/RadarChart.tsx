import { IspAuditLayout, RadarChart } from 'unbarrier-education';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import { domainScores } from '@/lib/isp-audit/summary';
import type { ScoreValue } from '@/lib/isp-audit/types';

// Build a scores map by cycling a per-domain pattern of 0–5 values over that
// domain's questions; a domain left out stays unanswered.
function scoresFor(pattern: Record<string, ScoreValue[]>): Record<string, ScoreValue> {
  const out: Record<string, ScoreValue> = {};
  for (const d of ispAuditQuestionSet.domains) {
    const vals = pattern[d.id];
    if (!vals) continue;
    d.questions.forEach((q, i) => {
      out[q.id] = vals[i % vals.length];
    });
  }
  return out;
}

const Frame = ({ heading, sub, children }: { heading: string; sub: string; children: React.ReactNode }) => (
  <IspAuditLayout>
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'var(--ia-space-6) var(--ia-space-4) var(--ia-space-8)' }}>
      <div
        style={{
          background: 'var(--ia-bg-alt)',
          border: '1px solid var(--ia-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--ia-card-shadow)',
          padding: 'var(--ia-space-5)',
        }}
      >
        <h2 style={{ color: 'var(--ia-accent)', fontSize: '1.15rem', margin: '0 0 4px' }}>{heading}</h2>
        <p style={{ color: 'var(--ia-fg-muted)', fontSize: '0.92rem', margin: '0 0 var(--ia-space-4)' }}>{sub}</p>
        {children}
      </div>
    </div>
  </IspAuditLayout>
);

// Pedagogy ~44, impact ~57, device ~87, environment ~80, leadership ~36,
// community ~60, EAL/neurodiversity ~72.
const estate = domainScores(
  ispAuditQuestionSet,
  {
    scores: scoresFor({
      pedagogy: [2, 2, 3, 2, 2],
      impact: [3, 3, 2, 3, 3, 3],
      device: [4, 5, 4, 5, 4, 4],
      environment: [4, 4, 4],
      leadership: [2, 1, 2, 2, 2],
      community: [3, 3],
      'eal-neurodiversity': [4, 3, 4, 4, 3],
    }),
  },
);

/** All seven domains rated: hardware strong, governance and teacher confidence weak. */
export const SevenDomains = () => (
  <Frame heading="Estate readiness by domain" sub="Domain averages across every response, 0–100.">
    <RadarChart scores={estate} title="Estate readiness by domain" />
  </Frame>
);

const partial = domainScores(
  ispAuditQuestionSet,
  {
    scores: scoresFor({
      pedagogy: [4, 4, 3, 4, 3],
      impact: [3, 4, 3, 3, 4, 3],
      device: [2, 1, 2, 2, 1, 2],
      environment: [2, 3, 2],
      leadership: [3, 4, 3, 3, 4],
    }),
  },
);

/** One respondent's part-complete submission: two domains untouched sit at the centre as hollow rings, not as zeros. */
export const TwoUnanswered = () => (
  <Frame heading="Reach British School — readiness by domain" sub="One submission, 8 September 2026. Domains nobody has rated yet are shown at the centre, not as a low score.">
    <RadarChart scores={partial} title="Reach British School — readiness by domain" />
  </Frame>
);
