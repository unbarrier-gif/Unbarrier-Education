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
} from '@/lib/isp-audit/summary';
import Heatmap from '@/components/isp-audit/Heatmap';
import RadarChart from '@/components/isp-audit/RadarChart';
import AdminLoginForm from '@/components/isp-audit/AdminLoginForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ISP Compass — dashboard',
};

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  if (!isAdminAuthed()) {
    return (
      <main>
        <AdminLoginForm />
      </main>
    );
  }

  const responses = await getAllResponses();

  if (responses.length === 0) {
    return (
      <main className={styles.wrap}>
        <div className={styles.header}>
          <h1 className={styles.title}>ISP Learning &amp; Device Compass — results</h1>
        </div>
        <p className={styles.empty}>No responses yet — share the audit link with schools to get started.</p>
      </main>
    );
  }

  const estate = estateReadinessByDomain(ispAuditQuestionSet, responses);
  const attention = [...estate].filter((d) => d.answered > 0).sort((a, b) => a.score - b.score);
  const routes = routeCounts(ispAuditQuestionSet, responses);
  const overall = estateOverall(ispAuditQuestionSet, responses);
  const catalogue = catalogueCounts(responses);
  const catalogueMax = catalogue.length > 0 ? catalogue[0].count : 1;
  const regionsCovered = new Set(
    responses.map((r) => r.region?.trim()).filter((x): x is string => Boolean(x)),
  ).size;

  const ROUTE_ORDER = ['pedagogy', 'procurement', 'both', 'insufficient'] as const;

  return (
    <main className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>ISP Learning &amp; Device Compass — results</h1>
        <a className={styles.exportLink} href="/api/isp-audit/export">
          Download CSV
        </a>
      </div>
      <p className={styles.count}>
        {responses.length} {responses.length === 1 ? 'response' : 'responses'} so far
      </p>

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
        <p className={styles.cardSub}>The weakest areas across everyone who&rsquo;s responded — read top to bottom.</p>
        {attention.map((d) => {
          const band = scoreBand(d.score);
          return (
            <div key={d.id} className={styles.attn}>
              <span className={styles.dot} data-band={band} />
              <div className={styles.attnName}>{d.name}</div>
              <span className={styles.attnScore} data-band={band}>
                {d.score}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>What each school needs next</h2>
        <p className={styles.cardSub}>Every response routed to the conversation it actually needs — before any spend.</p>
        <div className={styles.routes}>
          {ROUTE_ORDER.filter((r) => routes[r] > 0).map((r) => (
            <div key={r} className={styles.rcard} data-route={r}>
              <div className={styles.rnum}>{routes[r]}</div>
              <div className={styles.rlab}>{ROUTE_LABEL[r]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Readiness by domain</h2>
        <p className={styles.cardSub}>The bars give the exact numbers; the radar shows the estate&rsquo;s overall shape.</p>
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
        <p className={styles.cardSub}>The full picture, if you want it — otherwise the summary above is enough.</p>
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
    </main>
  );
}
