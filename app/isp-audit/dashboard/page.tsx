import type { Metadata } from 'next';
import { isAdminAuthed } from '@/lib/isp-audit/adminAuth';
import { getAllResponses } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import {
  estateReadinessByDomain,
  estateOverall,
  routeCounts,
  catalogueCounts,
  scoreBand,
  ROUTE_LABEL,
  type Route,
} from '@/lib/isp-audit/summary';
import Heatmap from '@/components/isp-audit/Heatmap';
import RadarChart from '@/components/isp-audit/RadarChart';
import AdminLoginForm from '@/components/isp-audit/AdminLoginForm';
import ResponseManager, { type ManageRow } from '@/components/isp-audit/ResponseManager';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ISP Compass — dashboard',
};

export const dynamic = 'force-dynamic';

// Fixed plain-language reading of a weak score in each domain — shown beside
// the number so a low area explains itself.
const ATTENTION_NOTE: Record<string, string> = {
  pedagogy:
    "teachers aren't yet confident using devices to teach — a training/purpose gap, not more hardware.",
  impact: "devices aren't yet everyday practice, or the impact isn't being evidenced.",
  device: 'gaps in MDM, setup or lifecycle — the device/infrastructure basics.',
  environment: "charging, Wi-Fi or storage aren't ready for 1:1.",
  leadership: 'ownership, budget or consultation is unclear — a governance conversation.',
  community:
    "staff and families aren't comfortable with how change is introduced — a trust gap, not hardware.",
  'eal-neurodiversity':
    "assistive and language-support features exist but aren't switched on or used — the biggest inclusion win.",
};

// Always show these three routes, in this order, even at a count of zero.
const ROUTE_CARDS: { route: Route; blurb: string }[] = [
  { route: 'pedagogy', blurb: 'teaching gap, not hardware — go here first' },
  { route: 'procurement', blurb: 'pedagogy solid, device gap' },
  { route: 'both', blurb: 'both need attention' },
];

export default async function DashboardPage() {
  if (!isAdminAuthed()) {
    return (
      <main>
        <AdminLoginForm />
      </main>
    );
  }

  const responses = await getAllResponses();

  const estate = estateReadinessByDomain(ispAuditQuestionSet, responses);
  const attention = [...estate].filter((d) => d.answered > 0).sort((a, b) => a.score - b.score);
  const routes = routeCounts(ispAuditQuestionSet, responses);
  const overall = estateOverall(ispAuditQuestionSet, responses);
  const catalogue = catalogueCounts(responses);
  const catalogueMax = catalogue.length > 0 ? catalogue[0].count : 1;
  const regionsCovered = new Set(
    responses.map((r) => r.region?.trim()).filter((x): x is string => Boolean(x)),
  ).size;

  const manageRows: ManageRow[] = responses.map((r) => ({
    id: r.id,
    label: `${r.school || 'Response'}${r.region ? `, ${r.region}` : ''}`,
    meta: [
      new Date(r.submittedAt).toLocaleString('en-GB'),
      r.respondentName && r.respondentRole ? `${r.respondentName} (${r.respondentRole})` : r.respondentName,
      r.respondentEmail,
    ]
      .filter(Boolean)
      .join(' · '),
  }));

  return (
    <main className={styles.wrap}>
      <div className={styles.adminHero}>
        <h1 className={styles.adminHeroTitle}>Admin dashboard</h1>
        <p className={styles.adminHeroText}>
          Live view — updates automatically as schools respond. This is what Jonathan sees behind the
          passcode.
        </p>
      </div>

      <div className={styles.header}>
        <p className={styles.count}>
          {responses.length} {responses.length === 1 ? 'response' : 'responses'} so far
        </p>
        {responses.length > 0 && (
          <a className={styles.exportLink} href="/api/isp-audit/export">
            Download CSV
          </a>
        )}
      </div>

      {responses.length === 0 ? (
        <p className={styles.empty}>No responses yet — share the audit link with schools to get started.</p>
      ) : (
        <>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statBig}>{responses.length}</div>
              <div className={styles.statLab}>responses</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statBig}>{regionsCovered}</div>
              <div className={styles.statLab}>regions covered</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statBig}>{overall}</div>
              <div className={styles.statLab}>avg readiness / 100</div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Where attention is needed</h2>
            <p className={styles.cardSub}>
              The weakest areas across everyone who&rsquo;s responded — read top to bottom.
            </p>
            {attention.map((d) => {
              const band = scoreBand(d.score);
              return (
                <div key={d.id} className={styles.attn}>
                  <span className={styles.dot} data-band={band} />
                  <div className={styles.attnBody}>
                    <div className={styles.attnName}>{d.name}</div>
                    {ATTENTION_NOTE[d.id] && <div className={styles.attnNote}>{ATTENTION_NOTE[d.id]}</div>}
                  </div>
                  <span className={styles.attnScore} data-band={band}>
                    {d.score}
                  </span>
                </div>
              );
            })}
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>What each school needs next</h2>
            <p className={styles.cardSub}>
              Every response routed to the conversation it actually needs — before any spend.
            </p>
            <div className={styles.routes}>
              {ROUTE_CARDS.map(({ route, blurb }) => (
                <div key={route} className={styles.rcard} data-route={route}>
                  <div className={styles.rnum}>{routes[route]}</div>
                  <div className={styles.rlab}>{ROUTE_LABEL[route]}</div>
                  <div className={styles.rblurb}>{blurb}</div>
                </div>
              ))}
            </div>
            {routes.insufficient > 0 && (
              <p className={styles.routeNote}>
                {routes.insufficient} {routes.insufficient === 1 ? 'response' : 'responses'} not yet
                complete enough to route.
              </p>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Readiness by domain</h2>
            <p className={styles.cardSub}>
              The bars give the exact numbers; the radar shows the estate&rsquo;s overall shape.
            </p>
            <div className={styles.readinessRow}>
              <div className={styles.bars}>
                {[...estate]
                  .sort((a, b) => b.score - a.score)
                  .map((d) => {
                    const band = scoreBand(d.score);
                    return (
                      <div key={d.id} className={styles.barRow}>
                        <div className={styles.barName}>{d.name}</div>
                        <div className={styles.barTrack}>
                          {d.answered > 0 && (
                            <div className={styles.barFill} data-band={band} style={{ width: `${d.score}%` }} />
                          )}
                        </div>
                        <div className={styles.barValue}>{d.answered > 0 ? d.score : 'n/a'}</div>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.radarBox}>
                <RadarChart scores={estate} title="Estate readiness by domain" />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>School-by-school detail</h2>
            <p className={styles.cardSub}>
              The full picture, if you want it — otherwise the summary above is enough.
            </p>
            <Heatmap questionSet={ispAuditQuestionSet} responses={responses} />
          </div>

          {catalogue.length > 0 && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Device catalogue preferences</h2>
              <p className={styles.cardSub}>What schools said matters most — raw input for the catalogue.</p>
              <div className={styles.bars}>
                {catalogue.map((c) => (
                  <div key={c.label} className={styles.barRow}>
                    <div className={styles.barName}>{c.label}</div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        data-band="accent"
                        style={{ width: `${Math.round((c.count / catalogueMax) * 100)}%` }}
                      />
                    </div>
                    <div className={styles.barValue}>{c.count}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Manage responses</h2>
            <p className={styles.cardSub}>Delete a response — use this to clear test data. This can&rsquo;t be undone.</p>
            <ResponseManager rows={manageRows} />
          </div>

          <div className={styles.notes}>
            <h2>Context &amp; notes, by school</h2>
            {responses.map((r) => {
              const domainNotes = ispAuditQuestionSet.domains
                .map((d) => ({ name: d.name, text: r.answers.notes[d.id]?.trim() }))
                .filter((n): n is { name: string; text: string } => Boolean(n.text));

              return (
                <div key={r.id} className={styles.noteCard}>
                  <h3>
                    {r.school || 'Response'}
                    {r.region ? `, ${r.region}` : ''}
                  </h3>
                  <p className={styles.noteMeta}>
                    Submitted {new Date(r.submittedAt).toLocaleString('en-GB')}
                    {r.respondentName ? ` · ${r.respondentName}` : ''}
                    {r.respondentRole ? ` (${r.respondentRole})` : ''}
                    {r.respondentEmail ? ` · ${r.respondentEmail}` : ''}
                  </p>
                  {r.answers.catalogue.length > 0 && (
                    <div className={styles.noteQA}>
                      <p className={styles.noteQ}>Catalogue priorities</p>
                      <p className={styles.noteA}>{r.answers.catalogue.join(', ')}</p>
                    </div>
                  )}
                  {domainNotes.map((n) => (
                    <div key={n.name} className={styles.noteQA}>
                      <p className={styles.noteQ}>{n.name}</p>
                      <p className={styles.noteA}>{n.text}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
