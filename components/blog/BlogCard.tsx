import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShapeTag } from './ShapeTag';
import { SHAPES } from '@/lib/blog-shapes';
import type { Post } from '@/lib/notion';
import styles from './BlogCard.module.css';

type Variant = 'standard' | 'hero';

type Props = {
  post: Post;
  variant?: Variant;
};

export function BlogCard({ post, variant = 'standard' }: Props) {
  const isHero = variant === 'hero';
  const shapeColor = SHAPES[post.shape].color;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${styles.card} ${isHero ? styles.hero : ''}`}
    >
      <div className={styles.media}>
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.coverAlt || post.title}
            fill
            sizes={
              isHero
                ? '(min-width: 768px) 60vw, 100vw'
                : '(min-width: 768px) 50vw, 100vw'
            }
            className={styles.cover}
          />
        ) : (
          <div
            className={styles.fallback}
            style={{ '--shape-c': shapeColor } as CSSProperties}
            aria-hidden="true"
          />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.shape}>
          <ShapeTag shape={post.shape} size={isHero ? 'md' : 'sm'} solid />
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <div className={styles.metadata}>
          {post.date && <span>{formatDate(post.date)}</span>}
          {post.readingMin != null && (
            <span>· {post.readingMin} min read</span>
          )}
        </div>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        <span className={styles.cta}>Read →</span>
      </div>
    </Link>
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
