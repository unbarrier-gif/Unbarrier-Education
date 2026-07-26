'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { rollups } from 'd3-array';
import type { AuditResponse, QuestionSet } from '@/lib/isp-audit/types';
import { domainScores, routeRecommendation, ROUTE_LABEL, type Route } from '@/lib/isp-audit/summary';
import styles from './Heatmap.module.css';

type Band = 'low' | 'medium' | 'high';

function bandFor(score: number): Band {
  if (score < 40) return 'low';
  if (score < 70) return 'medium';
  return 'high';
}

type Selected =
  | {
      kind: 'domain';
      response: AuditResponse;
      domainId: string;
      score: number;
      answered: number;
      note: string | undefined;
    }
  | { kind: 'route'; response: AuditResponse; route: ReturnType<typeof routeRecommendation> };

export default function Heatmap({
  questionSet,
  responses,
}: {
  questionSet: QuestionSet;
  responses: AuditResponse[];
}) {
  const [selected, setSelected] = useState<Selected | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) detailRef.current?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const rows = useMemo(
    () =>
      responses.map((r) => {
        const scores = domainScores(questionSet, r.answers);
        return { response: r, scores, route: routeRecommendation(scores) };
      }),
    [questionSet, responses],
  );

  // d3.rollups: how many schools land on each route recommendation, to
  // surface an estate-wide "what does ISP need to do next" summary rather
  // than just a grid of numbers.
  const routeCounts = useMemo(() => {
    const counts = rollups(
      rows,
      (v) => v.length,
      (r) => r.route.route,
    ) as [Route, number][];
    return counts.sort((a, b) => b[1] - a[1]);
  }, [rows]);

  const weakestDomains = useMemo(() => {
    // Only average domains a response actually has data for — otherwise a
    // domain nobody's touched yet (routine, given the multi-respondent
    // workflow) drags the estate-wide average down as a false 0.
    const flat = rows.flatMap((r) => r.scores.filter((s) => s.answered > 0).map((s) => ({ id: s.id, name: s.name, score: s.score })));
    const grouped = rollups(
      flat,
      (v) => Math.round(v.reduce((sum, x) => sum + x.score, 0) / v.length),
      (x) => x.id,
    ) as [string, number][];
    return grouped
      .map(([id, avg]) => ({ id, avg, name: questionSet.domains.find((d) => d.id === id)!.name }))
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 3);
  }, [rows, questionSet]);

  const gridTemplateColumns = `220px repeat(${questionSet.domains.length}, minmax(70px, 1fr)) 160px`;

  return (
    <div className={styles.wrap}>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ background: 'var(--ia-low-fill)' }}>
            L
          </span>
          &lt;40
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ background: 'var(--ia-medium-fill)' }}>
            M
          </span>
          40–69
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ background: 'var(--ia-high-fill)' }}>
            H
          </span>
          70+
        </span>
        <span className={styles.legendNote}>
          Colour is always paired with a letter and a stripe pattern (low = diagonal, medium = cross-diagonal,
          high = solid) — never colour alone. Scores are domain averages, 0–100.
        </span>
      </div>

      <div className={styles.weakest}>
        <h3>Estate-wide summary</h3>
        <ul>
          {routeCounts.map(([route, count]) => (
            <li key={route}>
              {count} of {rows.length} schools flagged for: {ROUTE_LABEL[route]}
            </li>
          ))}
        </ul>
        <p className={styles.weakestSub}>Weakest domains on average: {weakestDomains.map((d) => `${d.name} (${d.avg})`).join(', ')}</p>
      </div>

      <a href="#heatmap-grid-end" className="skipLink">
        Skip the results grid ({rows.length * (questionSet.domains.length + 1)} cells)
      </a>

      <div className={styles.scrollWrap}>
        <div className={styles.grid} style={{ gridTemplateColumns }} role="presentation">
          <div className={styles.rowHeaderCell} aria-hidden="true" />
          {questionSet.domains.map((d) => (
            <div key={d.id} className={styles.headerCell} title={d.name} aria-hidden="true">
              {d.name.split(' ').slice(0, 2).join(' ')}
            </div>
          ))}
          <div className={`${styles.headerCell} ${styles.headerCellHorizontal}`} aria-hidden="true">
            Route
          </div>

          {rows.map(({ response, scores, route }) => (
            <RowCells
              key={response.id}
              response={response}
              scores={scores}
              route={route}
              onSelectDomain={(domainId, score, answered) =>
                setSelected({
                  kind: 'domain',
                  response,
                  domainId,
                  score,
                  answered,
                  note: response.answers.notes[domainId]?.trim() || undefined,
                })
              }
              onSelectRoute={() => setSelected({ kind: 'route', response, route })}
              selected={selected}
            />
          ))}
        </div>
      </div>
      <span id="heatmap-grid-end" />

      {/* Screen-reader-only data table mirroring the same values. */}
      <table className={styles.srOnly}>
        <caption>{questionSet.title} — full results by school and domain</caption>
        <thead>
          <tr>
            <th scope="col">School</th>
            {questionSet.domains.map((d) => (
              <th scope="col" key={d.id}>
                {d.name}
              </th>
            ))}
            <th scope="col">Recommended next step</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ response, scores, route }) => (
            <tr key={response.id}>
              <th scope="row">
                {response.school}
                {response.region ? `, ${response.region}` : ''}
              </th>
              {scores.map((s) => (
                <td key={s.id}>{s.answered > 0 ? `${s.score}/100` : 'Not yet answered'}</td>
              ))}
              <td>{ROUTE_LABEL[route.route]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className={styles.detail} role="region" aria-live="polite" ref={detailRef}>
          {selected.kind === 'domain' ? (
            <>
              <span className={styles.detailLevel}>
                {selected.answered > 0 ? bandFor(selected.score).toUpperCase() : 'NO DATA'}
              </span>
              <h3>{questionSet.domains.find((d) => d.id === selected.domainId)?.name}</h3>
              <p className={styles.detailMeta}>
                {selected.response.school}
                {selected.response.region ? `, ${selected.response.region}` : ''} ·{' '}
                {selected.answered > 0 ? `${selected.score}/100` : 'not yet answered'}
              </p>
              <p>{selected.note ?? 'No notes left for this domain.'}</p>
            </>
          ) : (
            <>
              <h3>{selected.route.title}</h3>
              <p className={styles.detailMeta}>
                {selected.response.school}
                {selected.response.region ? `, ${selected.response.region}` : ''}
              </p>
              <p>{selected.route.body}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function RowCells({
  response,
  scores,
  route,
  onSelectDomain,
  onSelectRoute,
  selected,
}: {
  response: AuditResponse;
  scores: ReturnType<typeof domainScores>;
  route: ReturnType<typeof routeRecommendation>;
  onSelectDomain: (domainId: string, score: number, answered: number) => void;
  onSelectRoute: () => void;
  selected: Selected | null;
}) {
  const routeSelected = selected?.kind === 'route' && selected.response.id === response.id;

  return (
    <>
      <div className={styles.rowHeaderCell}>
        {response.school}
        {response.region ? `, ${response.region}` : ''}
      </div>
      {scores.map((s) => {
        const isSelected = selected?.kind === 'domain' && selected.response.id === response.id && selected.domainId === s.id;
        // No answered questions in this domain — a plain 0 would read as a
        // genuinely bad score, so it gets its own neutral state rather than
        // a colour band.
        if (s.answered === 0) {
          return (
            <button
              key={s.id}
              type="button"
              className={styles.cellButtonEmpty}
              data-selected={isSelected ? 'true' : undefined}
              aria-label={`${response.school}, ${s.name}: not yet answered.`}
              onClick={() => onSelectDomain(s.id, s.score, s.answered)}
            >
              —
            </button>
          );
        }
        const band = bandFor(s.score);
        return (
          <button
            key={s.id}
            type="button"
            className={styles.cellButton}
            data-level={band}
            data-selected={isSelected ? 'true' : undefined}
            aria-label={`${response.school}, ${s.name}: ${s.score} out of 100.`}
            onClick={() => onSelectDomain(s.id, s.score, s.answered)}
          >
            {s.score}
          </button>
        );
      })}
      <button
        type="button"
        className={styles.routeButton}
        data-route={route.route}
        data-selected={routeSelected ? 'true' : undefined}
        aria-label={`${response.school}: ${ROUTE_LABEL[route.route]}`}
        onClick={onSelectRoute}
      >
        {ROUTE_LABEL[route.route]}
      </button>
    </>
  );
}
