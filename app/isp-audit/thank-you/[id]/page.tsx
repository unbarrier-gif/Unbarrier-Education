import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getResponseById } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import { domainScores, routeRecommendation } from '@/lib/isp-audit/summary';
import RadarChart from '@/components/isp-audit/RadarChart';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Your Compass results',
};

export const dynamic = 'force-dynamic';

export default async function ThankYouPage({ params }: { params: { id: string } }) {
  const response = await getResponseById(params.id);
  if (!response) notFound();

  const scores = domainScores(ispAuditQuestionSet, response.answers);
  const route = routeRecommendation(scores);
  const notes = ispAuditQuestionSet.domains
    .map((d) => ({ domain: d, text: response.answers.notes[d.id]?.trim() }))
    .filter((n): n is { domain: (typeof ispAuditQuestionSet.domains)[number]; text: string } => Boolean(n.text));

  return (
    <main className={styles.wrap}>
      <h1 className={styles.title}>Thanks, {response.school}.</h1>
      <p className={styles.lede}>
        Here’s a summary of your own answers. This page is private to you — bookmark it if you’d like to
        come back. ISP’s planning team sees only aggregated patterns across all schools, not your
        individual answers.
      </p>

      <RadarChart scores={scores} title={`${response.school} — domain scores`} />

      <div className={styles.scoreList}>
        {scores.map((s) => (
          <div key={s.id} className={styles.scoreRow}>
            <span>{s.name}</span>
            <strong>{s.answered > 0 ? `${s.score}/100` : 'Not yet answered'}</strong>
          </div>
        ))}
      </div>

      <div className={styles.route} data-route={route.route}>
        <p className={styles.routeTitle}>{route.title}</p>
        <p>{route.body}</p>
      </div>

      {response.answers.catalogue.length > 0 && (
        <div className={styles.catalogue}>
          <h2>Catalogue priorities you flagged</h2>
          <p>{response.answers.catalogue.join(', ')}</p>
        </div>
      )}

      {notes.length > 0 && (
        <div className={styles.notes}>
          <h2>Your notes</h2>
          {notes.map(({ domain, text }) => (
            <div key={domain.id} className={styles.noteItem}>
              <p className={styles.noteDomain}>{domain.name}</p>
              <p className={styles.noteText}>{text}</p>
            </div>
          ))}
        </div>
      )}

      <p className={styles.closing}>
        This is a starting point, not a verdict — ISP’s planning team will use patterns across the whole
        estate, alongside your notes, to prioritise phase-two support.
      </p>
    </main>
  );
}
