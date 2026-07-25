'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { rollups } from 'd3-array';
import type { AuditResponse, QuestionSet, ScoreQuestion, ScoreValue } from '@/lib/isp-audit/types';
import styles from './Heatmap.module.css';

const LEVEL_LABEL: Record<ScoreValue, string> = { low: 'Low', medium: 'Medium', high: 'High' };
const LEVEL_GLYPH: Record<ScoreValue, string> = { low: 'L', medium: 'M', high: 'H' };

type Column = { section: { id: string; title: string }; question: ScoreQuestion; index: number };

export default function Heatmap({
  questionSet,
  responses,
}: {
  questionSet: QuestionSet;
  responses: AuditResponse[];
}) {
  const [selected, setSelected] = useState<{ response: AuditResponse; column: Column } | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // The grid can hold hundreds of cell buttons at full scale (schools x
  // questions) — sighted keyboard users who click/activate a cell should see
  // the detail panel that appears well below the grid, not have to hunt for it.
  useEffect(() => {
    if (selected) {
      detailRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [selected]);

  const columns = useMemo<Column[]>(() => {
    let i = 0;
    const cols: Column[] = [];
    for (const section of questionSet.sections) {
      if (!section.scored) continue;
      for (const q of section.questions) {
        if (q.type !== 'score') continue;
        i += 1;
        cols.push({ section: { id: section.id, title: section.title }, question: q, index: i });
      }
    }
    return cols;
  }, [questionSet]);

  // d3.rollups: count 'low' answers per column across every response, to
  // surface the weakest areas across the whole estate rather than just per
  // school.
  const weakestColumns = useMemo(() => {
    const flat = responses.flatMap((r) =>
      columns
        .filter((c) => r.answers[c.question.id]?.type === 'score' && r.answers[c.question.id].value === 'low')
        .map((c) => c.question.id),
    );
    const counts = rollups(
      flat,
      (v) => v.length,
      (id) => id,
    ) as [string, number][];
    return counts
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, count]) => ({ column: columns.find((c) => c.question.id === id)!, count }));
  }, [columns, responses]);

  const gridTemplateColumns = `220px repeat(${columns.length}, minmax(44px, 1fr))`;

  return (
    <div className={styles.wrap}>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} data-swatch="low" style={{ background: 'var(--ia-low)' }}>
            L
          </span>
          Low
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ background: 'var(--ia-medium)' }}>
            M
          </span>
          Medium
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ background: 'var(--ia-high)' }}>
            H
          </span>
          High
        </span>
        <span className={styles.legendNote}>
          Colour is always paired with a letter and a stripe pattern (low = diagonal, medium = cross-diagonal,
          high = solid) — never colour alone.
        </span>
      </div>

      {weakestColumns.length > 0 && (
        <div className={styles.weakest}>
          <h3>Weakest areas across the estate</h3>
          <ol>
            {weakestColumns.map(({ column, count }) => (
              <li key={column.question.id}>
                {column.question.prompt} — {count} of {responses.length} schools rated this low
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* The visual grid below can be hundreds of Tab stops at full scale
          (schools x questions) — let keyboard users skip past it to the
          equivalent screen-reader table or the notes underneath. */}
      <a href="#heatmap-grid-end" className="skipLink">
        Skip the results grid ({responses.length * columns.length} cells)
      </a>

      <div className={styles.scrollWrap}>
        <div className={styles.grid} style={{ gridTemplateColumns }} role="presentation">
          <div className={styles.rowHeaderCell} aria-hidden="true" />
          {columns.map((c) => (
            <div key={c.question.id} className={styles.headerCell} title={c.question.prompt} aria-hidden="true">
              {c.section.id.replace('s', '')}.{c.index}
            </div>
          ))}

          {responses.map((r) => (
            <RowCells
              key={r.id}
              response={r}
              columns={columns}
              onSelect={(column) => setSelected({ response: r, column })}
              selected={selected}
            />
          ))}
        </div>
      </div>
      <span id="heatmap-grid-end" />

      {/* Screen-reader-only data table mirroring the same values — a more
          robust way to read a school x question grid than an SVG/button grid. */}
      <table className={styles.srOnly}>
        <caption>{questionSet.title} — full results by school and question</caption>
        <thead>
          <tr>
            <th scope="col">School</th>
            {columns.map((c) => (
              <th scope="col" key={c.question.id}>
                {c.section.title}: {c.question.prompt}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responses.map((r) => (
            <tr key={r.id}>
              <th scope="row">
                {r.school}
                {r.region ? `, ${r.region}` : ''}
              </th>
              {columns.map((c) => {
                const a = r.answers[c.question.id];
                return <td key={c.question.id}>{a && a.type === 'score' ? LEVEL_LABEL[a.value] : 'No answer'}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className={styles.detail} role="region" aria-live="polite" ref={detailRef}>
          <span className={styles.detailLevel}>
            {selected.response.answers[selected.column.question.id]?.type === 'score'
              ? LEVEL_LABEL[(selected.response.answers[selected.column.question.id] as { value: ScoreValue }).value]
              : ''}
          </span>
          <h3>{selected.column.question.prompt}</h3>
          <p className={styles.detailMeta}>
            {selected.response.school}
            {selected.response.region ? `, ${selected.response.region}` : ''} · {selected.column.section.title}
          </p>
          {(() => {
            const answer = selected.response.answers[selected.column.question.id];
            if (!answer || answer.type !== 'score') return null;
            if (answer.value === 'high') return <p>Rated high — no action flagged.</p>;
            const nextStep = selected.column.question.nextStep[answer.value];
            return <p>{nextStep ?? 'No suggestion authored for this level yet.'}</p>;
          })()}
        </div>
      )}
    </div>
  );
}

function RowCells({
  response,
  columns,
  onSelect,
  selected,
}: {
  response: AuditResponse;
  columns: Column[];
  onSelect: (column: Column) => void;
  selected: { response: AuditResponse; column: Column } | null;
}) {
  return (
    <>
      <div className={styles.rowHeaderCell}>
        {response.school}
        {response.region ? `, ${response.region}` : ''}
      </div>
      {columns.map((c) => {
        const answer = response.answers[c.question.id];
        const isSelected = selected?.response.id === response.id && selected?.column.question.id === c.question.id;
        if (!answer || answer.type !== 'score') {
          return (
            <div key={c.question.id} className={`${styles.cell} ${styles.cellEmpty}`}>
              —
            </div>
          );
        }
        return (
          <button
            key={c.question.id}
            type="button"
            className={styles.cellButton}
            data-level={answer.value}
            data-selected={isSelected ? 'true' : undefined}
            aria-label={`${response.school}, ${c.section.title}: ${c.question.prompt}. Rated ${LEVEL_LABEL[answer.value]}.`}
            onClick={() => onSelect(c)}
          >
            {LEVEL_GLYPH[answer.value]}
          </button>
        );
      })}
    </>
  );
}
