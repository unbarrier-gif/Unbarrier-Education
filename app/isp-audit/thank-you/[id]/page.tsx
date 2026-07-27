import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getResponseById } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import {
  domainScores,
  overallReadiness,
  routeRecommendation,
  scoreBand,
  ROUTE_LABEL,
  type Route,
} from '@/lib/isp-audit/summary';
import RadarChart from '@/components/isp-audit/RadarChart';
import DownloadResultsButton from '@/components/isp-audit/DownloadResultsButton';
import { Wordmark } from '@/components/Wordmark';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Your Compass results',
};

export const dynamic = 'force-dynamic';

// Short, human heading for the recommendation card — the route.title carries a
// "Recommended next step:" prefix that the pill already says, so the card uses
// these instead.
const NEXT_STEP_HEADING: Record<Route, string> = {
  pedagogy: 'A pedagogy-led discovery conversation',
  procurement: 'An infrastructure & procurement conversation',
  both: 'A full discovery workshop',
  insufficient: 'Not enough answered yet',
};

export default async function ThankYouPage({ params }: { params: { id: string } }) {
  const response = await getResponseById(params.id);
  if (!response) notFound();

  const scores = domainScores(ispAuditQuestionSet, response.answers);
  const route = routeRecommendation(scores);
  const overall = overallReadiness(scores);
  const generated = new Date(response.submittedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const identityBits = [response.region, response.respondentName && response.respondentRole
    ? `completed by ${response.respondentName}, ${response.respondentRole}`
    : response.respondentName]
    .filter(Boolean)
    .join(' · ');

  return (
    <main className={styles.wrap}>
      {/* Print-only document header — matches the downloaded PDF; on screen the
          shell header already carries the wordmark. */}
      <div className={styles.printHeader}>
        <Wordmark suffix=".me" size="md" inverse />
        <div className={styles.printMeta}>
          ISP Learning &amp; Device Compass
          <br />
          your results · generated {generated}
        </div>
      </div>

      <div className={styles.toolbar}>
        <p className={styles.generated}>your results · generated {generated}</p>
        <DownloadResultsButton
          filename={`ISP-Compass-results${
            response.school ? `-${response.school.replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '')}` : ''
          }`}
        />
      </div>

      <h1 className={styles.title}>ISP Learning &amp; Device Compass — your results</h1>
      <p className={styles.subline}>
        {response.school ? <strong>{response.school}</strong> : <strong>Your response</strong>}
        {identityBits ? ` · ${identityBits}` : ''}
      </p>

      <div className={styles.topRow}>
        <div className={styles.scoreCard}>
          <div className={styles.bigScore}>{overall.answered > 0 ? overall.score : '—'}</div>
          <div className={styles.scoreUnit}>out of 100</div>
          <div className={styles.scoreLabel}>overall readiness</div>
          <div className={styles.scoreDivider} />
          <div className={styles.nextEyebrow}>Your next step</div>
          <div className={styles.nextValue}>{ROUTE_LABEL[route.route]}</div>
        </div>

        <div className={styles.radarCard}>
          <p className={styles.cardHeading}>Your shape across the seven</p>
          <RadarChart scores={scores} title={`${response.school || 'Your'} — domain scores`} />
        </div>
      </div>

      <div className={styles.domainsCard}>
        <p className={styles.cardHeading}>Your seven domains — the detail</p>
        <div className={styles.bars}>
          {scores.map((s) => {
            const band = scoreBand(s.score);
            return (
              <div key={s.id} className={styles.barRow}>
                <div className={styles.barName}>{s.name}</div>
                <div className={styles.barTrack}>
                  {s.answered > 0 && (
                    <div
                      className={styles.barFill}
                      data-band={band}
                      style={{ width: `${s.score}%` }}
                    />
                  )}
                </div>
                <div className={styles.barValue}>
                  {s.answered > 0 ? s.score : <span className={styles.barNa}>n/a</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.nextCard} data-route={route.route}>
        <span className={styles.nextPill}>Recommended next step</span>
        <h2 className={styles.nextTitle}>{NEXT_STEP_HEADING[route.route]}</h2>
        <p className={styles.nextBody}>{route.body}</p>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.miniCard}>
          <p className={styles.cardHeading}>Your device catalogue priorities</p>
          {response.answers.catalogue.length > 0 ? (
            <>
              <div className={styles.pills}>
                {response.answers.catalogue.map((c) => (
                  <span key={c} className={styles.pill}>
                    {c}
                  </span>
                ))}
              </div>
              <p className={styles.miniCaption}>
                These feed the central catalogue ISP is building — chosen centrally, selected
                regionally.
              </p>
            </>
          ) : (
            <p className={styles.miniCaption}>No catalogue priorities flagged on this response.</p>
          )}
        </div>

        <div className={styles.miniCard}>
          <p className={styles.cardHeading}>What happens next</p>
          <ol className={styles.nextList}>
            <li>Your answers join the estate-wide picture for ISP’s phase-two planning.</li>
            <li>
              Schools landing on {ROUTE_LABEL[route.route].toLowerCase()} are the natural first
              conversations — you may be contacted about a discovery session.
            </li>
            <li>Nothing is decided from one form — it’s a starting point, in your own words.</li>
          </ol>
        </div>
      </div>

      <p className={styles.privacyLine}>
        This page is private to you — bookmark it to come back. ISP’s planning team sees only
        aggregated patterns across schools, not your individual answers. See our{' '}
        <a href="/isp-audit/privacy">privacy notice</a>.
      </p>
    </main>
  );
}
