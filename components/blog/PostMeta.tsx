import { ShapeTag } from './ShapeTag';
import type { Shape } from '@/lib/blog-shapes';
import { formatPostDate } from '@/lib/blog-format';
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
      {date && <span className={styles.span}>{formatPostDate(date)}</span>}
      {readingMin != null && (
        <span className={styles.span}>· {readingMin} min read</span>
      )}
    </div>
  );
}
