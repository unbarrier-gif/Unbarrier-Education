import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { NewsletterBand } from '@/components/NewsletterBand';
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
    images: [
      {
        // A segment that exports its own `openGraph` does not inherit the
        // file-based card — openGraph is replaced per segment, not merged.
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'unbarrier — designed for difference. did it reach the child?',
      },
    ],
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
        <NewsletterBand route="/blog" weight="full" />

        <Footer variant="full" />
      </main>
    </>
  );
}
