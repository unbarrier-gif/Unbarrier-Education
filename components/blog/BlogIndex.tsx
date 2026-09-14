'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/Button';
import { BlogCard } from './BlogCard';
import { SHAPE_KEYS, SHAPES, type Shape } from '@/lib/blog-shapes';
import type { Post } from '@/lib/notion';
import styles from './BlogIndex.module.css';

// The /blog index (design_handoff_blog_page, block j2). Chips filter by
// shape; "everything" shows the `limit` newest with an explicit "show all"
// behind them, a shape shows every post in it. State is local — chips are
// the source of truth; no url state. The result line is the one live
// region on the page: don't add a second.
//
// Accessibility decisions carried from the handoff: every target ≥ 44px;
// titles are real, visibly underlined links; one line of copy per card;
// reading time before date; nothing behind an image.

type Filter = 'all' | Shape;

type Props = {
  /** Newest first, already filtered to what the site shows. */
  posts: Post[];
  /** How many to show on "everything" before "show all". Default 6. */
  limit?: number;
  heading?: string;
  /** id of the h2 — the surrounding <Section labelledBy> points at it. */
  headingId?: string;
};

export function BlogIndex({
  posts,
  limit = 6,
  heading = 'pick a shape. or read the newest.',
  headingId = 'everything',
}: Props) {
  const [shape, setShape] = useState<Filter>('all');
  const [expanded, setExpanded] = useState(false);

  const counts = useMemo(() => {
    const c: Partial<Record<Shape, number>> = {};
    for (const p of posts) c[p.shape] = (c[p.shape] ?? 0) + 1;
    return c;
  }, [posts]);

  const filtered =
    shape === 'all' ? posts : posts.filter((p) => p.shape === shape);
  const showMore = shape === 'all' && !expanded && filtered.length > limit;
  const visible = showMore ? filtered.slice(0, limit) : filtered;

  const resultLine =
    posts.length === 0
      ? 'first notes coming soon. check back shortly.'
      : filtered.length === 0
        ? 'nothing in this shape yet. one’s on the way.'
        : shape === 'all'
          ? showMore
            ? `the ${limit} newest of ${posts.length}`
            : `all ${posts.length}, newest first`
          : `${filtered.length} in ${SHAPES[shape].name}`;

  const pick = (next: Filter) => {
    setShape(next);
    setExpanded(false);
  };

  return (
    <>
      <h2 id={headingId} className={styles.heading}>
        {heading}
      </h2>

      <div className={styles.chips} role="toolbar" aria-label="filter by shape">
        <Chip
          label="everything"
          color="var(--fg)"
          count={posts.length}
          active={shape === 'all'}
          onClick={() => pick('all')}
        />
        {SHAPE_KEYS.map((key) => (
          <Chip
            key={key}
            label={SHAPES[key].name}
            color={SHAPES[key].color}
            count={counts[key] ?? 0}
            active={shape === key}
            onClick={() => pick(key)}
          />
        ))}
      </div>

      <p aria-live="polite" className={styles.result}>
        {resultLine}
      </p>

      {visible.length > 0 && (
        <ul className={styles.grid}>
          {visible.map((p) => (
            <li key={p.slug} className={styles.item}>
              <BlogCard post={p} variant="compact" />
            </li>
          ))}
        </ul>
      )}

      {showMore && (
        <div className={styles.more}>
          <Button variant="ghost" onClick={() => setExpanded(true)}>
            show all {posts.length} →
          </Button>
        </div>
      )}
    </>
  );
}

type ChipProps = {
  label: string;
  color: string;
  count: number;
  active: boolean;
  onClick: () => void;
};

function Chip({ label, color, count, active, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.chip} ${active ? styles.chipActive : ''}`}
      style={{ '--c': color } as CSSProperties}
      aria-pressed={active}
    >
      <span className={styles.chipDot} aria-hidden="true" />
      <span>{label}</span>
      <span className={styles.chipCount}>{count}</span>
    </button>
  );
}
