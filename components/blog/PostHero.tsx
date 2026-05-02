import Image from 'next/image';
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
          <Image
            src={post.coverUrl}
            alt={post.coverAlt || post.title}
            width={0}
            height={0}
            sizes="(min-width: 760px) 760px, 100vw"
            className={styles.cover}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        )}
      </div>
    </header>
  );
}
