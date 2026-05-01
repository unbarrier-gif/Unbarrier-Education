import Link from 'next/link';
import { PostMeta } from './PostMeta';
import type { Post } from '@/lib/notion';
import styles from './PostHero.module.css';

type Props = {
  post: Post;
};

export function PostHero({ post }: Props) {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <Link href="/blog" className={styles.back}>
          ← Notes from Nici
        </Link>
        <PostMeta
          shape={post.shape}
          date={post.date}
          readingMin={post.readingMin}
        />
        <h1 className={styles.title}>{post.title}</h1>
        {post.excerpt && <p className={styles.dek}>{post.excerpt}</p>}
        {post.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverUrl}
            alt=""
            className={styles.cover}
            loading="eager"
          />
        )}
      </div>
    </header>
  );
}
