import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { NotionRenderer } from '@/components/blog/NotionRenderer';
import { PostFooter } from '@/components/blog/PostFooter';
import { PostHero } from '@/components/blog/PostHero';
import {
  getAllPublishedPosts,
  getPostBlocks,
  getPostBySlug,
} from '@/lib/notion';
import styles from './page.module.css';

export const revalidate = 60;

type Params = { slug: string };

// Pre-render slugs we already know about. dynamicParams stays at its
// default (true), so a post freshly published in Notion still renders
// the first time anyone hits its URL — ISR fills in the static cache
// after that.
export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Not found · Notes from Nici' };
  const url = `https://unbarrier.me/blog/${post.slug}`;
  const description = post.excerpt || undefined;
  return {
    title: `${post.title} · Notes from Nici`,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.coverUrl ? [post.coverUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  const blocks = await getPostBlocks(post.id);
  return (
    <>
      <Nav active="blog" />
      <main className={styles.main}>
        <PostHero post={post} />
        <NotionRenderer blocks={blocks} />
        <PostFooter />
        <Footer variant="full" />
      </main>
    </>
  );
}
