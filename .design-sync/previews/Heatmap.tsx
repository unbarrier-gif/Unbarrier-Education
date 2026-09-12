import { Heatmap, IspAuditLayout } from 'unbarrier-education';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import type { AuditResponse, ScoreValue } from '@/lib/isp-audit/types';

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

function response(
  id: string,
  school: string,
  region: string,
  submittedAt: string,
  pattern: Record<string, ScoreValue[]>,
  extra: Partial<AuditResponse['answers']> = {},
): AuditResponse {
  return {
    id,
    school,
    region,
    respondentName: null,
    respondentRole: null,
    respondentEmail: null,
    submittedAt,
    answers: {
      scores: scoresFor(pattern),
      cantAnswer: [],
      notes: {},
      catalogue: [],
      platform: null,
      ...extra,
    },
  };
}

const responses: AuditResponse[] = [
  // Strong hardware, weak pedagogy and governance -> pedagogy-led discovery.
  response('r-reach', 'Reach British School', 'Middle East', '2026-09-08T14:12:31Z', {
    pedagogy: [2, 1, 2, 2, 1],
    impact: [2, 2, 3, 2, 2, 2],
    device: [5, 4, 5, 4, 4, 5],
    environment: [4, 5, 4],
    leadership: [2, 1, 2, 1, 2],
    community: [2, 3],
    'eal-neurodiversity': [3, 2, 3, 3, 2],
  }, {
    notes: { pedagogy: 'Confidence varies hugely by department — science and languages are well ahead of the rest.' },
    catalogue: ['Accessibility features', 'Local repair & support'],
    platform: 'Apple / iPad',
  }),
  // Solid pedagogy, thin infrastructure -> infrastructure & procurement.
  response('r-newton', 'Newton College', 'South America', '2026-09-09T09:47:05Z', {
    pedagogy: [4, 4, 3, 4, 4],
    impact: [3, 4, 3, 3, 4, 3],
    device: [2, 1, 2, 2, 1, 2],
    environment: [1, 2, 2],
    leadership: [4, 3, 4, 4, 3],
    community: [4, 3],
    'eal-neurodiversity': [3, 4, 3, 3, 4],
  }, {
    notes: { environment: 'Charging trolleys only cover half the classrooms; Wi-Fi drops in the sports hall block.' },
    catalogue: ['Durability / build quality', 'Upfront cost', 'Local repair & support'],
    platform: 'Chromebook',
  }),
  // Middling everywhere -> full discovery workshop.
  response('r-tenby', 'Tenby Setia EcoHill', 'Malaysia', '2026-09-10T03:20:18Z', {
    pedagogy: [3, 3, 4, 3, 3],
    impact: [3, 3, 3, 4, 3, 3],
    device: [3, 4, 3, 3, 4, 3],
    environment: [3, 4, 3],
    leadership: [4, 3, 3, 4, 3],
    community: [3, 4],
    'eal-neurodiversity': [4, 3, 3, 4, 3],
  }, {
    catalogue: ['Software / ecosystem fit with what we already teach'],
    platform: 'Mixed / more than one platform',
  }),
  // A part-complete submission: only the teaching-side domains answered, so
  // hardware has no signal yet -> not enough answered.
  response('r-mosaic', 'Ecole Mosaic', 'Europe', '2026-09-11T16:03:44Z', {
    pedagogy: [3, 4, 3, 3, 4],
    impact: [2, 3, 3, 2, 3, 2],
    community: [4, 4],
  }, {
    platform: 'Windows',
  }),
];

/** The school-by-school grid on the admin dashboard: legend, estate-wide summary, route filter, one row per response. */
export const FourSchools = () => (
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
        <h2 style={{ color: 'var(--ia-accent)', fontSize: '1.15rem', margin: '0 0 4px' }}>School-by-school detail</h2>
        <p style={{ color: 'var(--ia-fg-muted)', fontSize: '0.92rem', margin: '0 0 var(--ia-space-4)' }}>
          The full picture, if you want it — otherwise the summary above is enough.
        </p>
        <Heatmap questionSet={ispAuditQuestionSet} responses={responses} />
      </div>
    </div>
  </IspAuditLayout>
);
