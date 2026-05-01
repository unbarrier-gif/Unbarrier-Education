import { ShapeTag } from './ShapeTag';
import type { Shape } from '@/lib/blog-shapes';
import styles from './PostMeta.module.css';

type Props = {
  shape: Shape;
  date: string | null;
  readingMin: number | null;
};

export function PostMeta({ shape, date, readingMin }: Props) {
  return (
    <div className={styles.meta}>
      <ShapeTag shape={shape} size="sm" />
      {date && <span className={styles.span}>{formatDate(date)}</span>}
      {readingMin != null && (
        <span className={styles.span}>· {readingMin} min read</span>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
