import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShapeTag } from './ShapeTag';
import { SHAPES } from '@/lib/blog-shapes';
import { cardLine, formatPostDate } from '@/lib/blog-format';
import type { Post } from '@/lib/notion';
import styles from './BlogCard.module.css';

// `compact` is what /blog uses since the 14 Sep 2026 redesign: tag ·
// title-link · one line · meta. No media, no excerpt, no "read →" — the
// title is the link. One read per card is deliberate: two reads for one
// decision is the thing dyslexic readers give up on. `standard` and `hero`
// are the older media cards, kept for anywhere else that wants a picture.
type Variant = 'standard' | 'hero' | 'compact';

type Props = {
  post: Post;
  variant?: Variant;
};

export function BlogCard({ post, variant = 'standard' }: Props) {
  if (variant === 'compact') return <CompactCard post={post} />;

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
          {post.date && <span>{formatPostDate(post.date)}</span>}
          {post.readingMin != null && (
            <span>· {post.readingMin} min read</span>
          )}
        </div>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        <span className={styles.cta}>read →</span>
      </div>
    </Link>
  );
}

function CompactCard({ post }: { post: Post }) {
  const line = cardLine(post);
  // Reading time first, then the date: "5 min · 21 Aug 2026".
  const meta = [
    post.readingMin != null ? `${post.readingMin} min` : null,
    post.date ? formatPostDate(post.date) : null,
  ]
    .filter(Boolean)
    .join(' · ');
  return (
    <article className={styles.compact}>
      <ShapeTag shape={post.shape} size="sm" solid />
      <h3 className={styles.compactTitle}>
        <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
          {post.title}
        </Link>
      </h3>
      {line && <p className={styles.compactLine}>{line}</p>}
      {meta && <p className={styles.compactMeta}>{meta}</p>}
    </article>
  );
}
