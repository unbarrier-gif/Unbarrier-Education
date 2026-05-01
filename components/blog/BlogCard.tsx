import Link from 'next/link';
import { PostMeta } from './PostMeta';
import type { Post } from '@/lib/notion';
import styles from './BlogCard.module.css';

type Props = {
  post: Post;
};

export function BlogCard({ post }: Props) {
  const featuredClass = post.featured ? styles.featured : '';
  return (
    <Link href={`/blog/${post.slug}`} className={`${styles.card} ${featuredClass}`}>
      {post.coverUrl && (
        // Notion file URLs are signed and time-limited (~1 hour). They
        // refresh on each ISR render — using <img> lets the URL flow
        // through unmodified rather than going through next/image's
        // optimizer (which would cache the soon-to-expire signature).
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverUrl}
          alt=""
          className={styles.cover}
          loading="lazy"
        />
      )}
      <div className={styles.body}>
        <PostMeta shape={post.shape} date={post.date} readingMin={post.readingMin} />
        <h2 className={styles.title}>{post.title}</h2>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        <span className={styles.cta}>Read →</span>
      </div>
    </Link>
  );
}
