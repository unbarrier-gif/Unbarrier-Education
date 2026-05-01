import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { getAllPublishedPosts } from '@/lib/notion';
import styles from './page.module.css';

// Posts come from Notion. Re-fetch in the background every 60s so
// edits in Notion show up on the live site within a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Notes from Nici · the unbarrier blog',
  description:
    'Short thoughts, honest ones, full-length arguments, and stories from other people in this world. The unbarrier blog.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Notes from Nici · the unbarrier blog',
    description:
      'Short thoughts, honest ones, full-length arguments, and stories from other people in this world.',
    url: 'https://unbarrier.me/blog',
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPublishedPosts();
  return (
    <>
      <Nav active="blog" />
      <main className={styles.main}>
        <BlogHero />
        <BlogIndex posts={posts} />
        <Footer variant="full" />
      </main>
    </>
  );
}
