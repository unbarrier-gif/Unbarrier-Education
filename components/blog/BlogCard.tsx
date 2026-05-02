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
      <div className={styles.body}>
        <PostMeta shape={post.shape} date={post.date} readingMin={post.readingMin} />
        <h2 className={styles.title}>{post.title}</h2>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        <span className={styles.cta}>Read →</span>
      </div>
    </Link>
  );
}
