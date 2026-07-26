import type { DomainScore } from '@/lib/isp-audit/summary';
import styles from './RadarChart.module.css';

// Sized with real headroom for label text, not just the plot circle — at 7
// axes (vs the original 6) the angular gap between labels is tighter, and
// the longest labels ("Leadership, governance", "Community, culture") need
// enough margin on both sides of their anchor point to avoid either
// clipping the canvas edge or colliding with the next label around. A
// directional (start/end) text-anchor was tried first but just moved the
// collision to a different pair of labels — plain centred anchor with a
// wider canvas is simpler and holds for all 7 at once.
const SIZE = 500;
const CENTER = SIZE / 2;
const RADIUS = 150;

function point(angle: number, r: number): [number, number] {
  return [CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)];
}

function angleFor(index: number, count: number): number {
  return -Math.PI / 2 + (index * 2 * Math.PI) / count;
}

// SVG (not canvas) so the shape itself is in the accessibility tree, plus a
// paired sr-only table below — same dual-representation pattern as the
// admin heatmap, since a purely visual chart is otherwise opaque to screen
// reader users.
export default function RadarChart({ scores, title }: { scores: DomainScore[]; title: string }) {
  const n = scores.length;
  const rings = [1, 2, 3, 4];

  const dataPoints = scores
    .map((s, i) => point(angleFor(i, n), RADIUS * (s.score / 100)))
    .map(([x, y]) => `${x},${y}`)
    .join(' ');

  return (
    <div>
      <div className={styles.wrap}>
        <svg
          className={styles.svg}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-labelledby="radar-title"
        >
          <title id="radar-title">{title}</title>
          {rings.map((ring) => (
            <polygon
              key={ring}
              className={styles.grid}
              points={scores
                .map((_, i) => point(angleFor(i, n), (RADIUS * ring) / 4))
                .map(([x, y]) => `${x},${y}`)
                .join(' ')}
            />
          ))}
          {scores.map((s, i) => {
            const [x, y] = point(angleFor(i, n), RADIUS + 16);
            return (
              <text key={s.id} className={styles.axisLabel} x={x} y={y}>
                {s.name.split(' ').slice(0, 2).join(' ')}
              </text>
            );
          })}
          <polygon className={styles.polygon} points={dataPoints} />
        </svg>
      </div>

      <table className={styles.srOnly}>
        <caption>{title} — domain scores out of 100</caption>
        <thead>
          <tr>
            <th scope="col">Domain</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s) => (
            <tr key={s.id}>
              <th scope="row">{s.name}</th>
              <td>{s.score}/100</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
