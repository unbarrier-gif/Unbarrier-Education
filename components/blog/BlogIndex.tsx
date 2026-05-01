'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { BlogCard } from './BlogCard';
import { SHAPE_KEYS, SHAPES, type Shape } from '@/lib/blog-shapes';
import type { Post } from '@/lib/notion';
import styles from './BlogIndex.module.css';

type Filter = 'all' | Shape;

type Props = {
  posts: Post[];
};

export function BlogIndex({ posts }: Props) {
  const [active, setActive] = useState<Filter>('all');

  const counts = useMemo(() => {
    const c: Partial<Record<Shape, number>> = {};
    for (const p of posts) c[p.shape] = (c[p.shape] ?? 0) + 1;
    return c;
  }, [posts]);

  const visible =
    active === 'all' ? posts : posts.filter((p) => p.shape === active);

  return (
    <section className={styles.section}>
      <div className={styles.chips} role="toolbar" aria-label="Filter by shape">
        <Chip
          label="Everything"
          color="var(--text)"
          count={posts.length}
          active={active === 'all'}
          showDot={false}
          onClick={() => setActive('all')}
        />
        {SHAPE_KEYS.map((key) => (
          <Chip
            key={key}
            label={SHAPES[key].name}
            color={SHAPES[key].color}
            count={counts[key] ?? 0}
            active={active === key}
            onClick={() => setActive(key)}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>
          {posts.length === 0
            ? 'First notes coming soon. Check back shortly.'
            : 'Nothing in this shape yet. One’s on the way.'}
        </p>
      ) : (
        <div className={styles.grid}>
          {visible.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </section>
  );
}

type ChipProps = {
  label: string;
  color: string;
  count: number;
  active: boolean;
  showDot?: boolean;
  onClick: () => void;
};

function Chip({
  label,
  color,
  count,
  active,
  showDot = true,
  onClick,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.chip} ${active ? styles.chipActive : ''}`}
      style={{ '--c': color } as CSSProperties}
      aria-pressed={active}
    >
      {showDot && <span className={styles.chipDot} aria-hidden="true" />}
      <span>{label}</span>
      <span className={styles.chipCount}>{count}</span>
    </button>
  );
}
