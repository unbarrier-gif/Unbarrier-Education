import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { timingSafeEqual } from 'node:crypto';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { NotionRenderer } from '@/components/blog/NotionRenderer';
import { PostFooter } from '@/components/blog/PostFooter';
import { PostHero } from '@/components/blog/PostHero';
import { PreviewBanner } from '@/components/blog/PreviewBanner';
import {
  getAllPublishedPosts,
  getPostBlocks,
  getPostBySlug,
  getPostBySlugAnyStatus,
} from '@/lib/notion';
import styles from './page.module.css';

export const revalidate = 60;

type Params = { slug: string };
type SearchParams = { [key: string]: string | string[] | undefined };

// Constant-time comparison so the preview secret can't be probed via
// timing differences. timingSafeEqual throws on mismatched lengths,
// so we short-circuit there first.
function previewSecretMatches(provided: string | undefined): boolean {
  const expected = process.env.BLOG_PREVIEW_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function pickPreviewParam(sp: SearchParams | undefined): string | undefined {
  const raw = sp?.preview;
  if (typeof raw === 'string') return raw;
  if (Array.isArray(raw)) return raw[0];
  return undefined;
}

// Pre-render slugs we already know about. dynamicParams stays at its
// default (true), so a post freshly published in Notion still renders
// the first time anyone hits its URL — ISR fills in the static cache
// after that. Reading searchParams in the page below opts request-
// time rendering into dynamic mode, which is the trade-off for
// supporting ?preview= on the same URL as the canonical post.
export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams?: SearchParams;
}): Promise<Metadata> {
  const isPreview = previewSecretMatches(pickPreviewParam(searchParams));
  const post = isPreview
    ? await getPostBySlugAnyStatus(params.slug)
    : await getPostBySlug(params.slug);
  if (!post) return { title: 'Not found · Notes from Nici' };

  const url = `https://unbarrier.me/blog/${post.slug}`;
  const description = post.excerpt || undefined;
  return {
    title: `${post.title} · Notes from Nici`,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    // Block indexing of preview URLs so a leaked link can't end up in
    // search results. Canonical URL is unaffected.
    robots: isPreview ? { index: false, follow: false } : undefined,
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

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams?: SearchParams;
}) {
  try {
    const previewParam = pickPreviewParam(searchParams);
    const isPreview = previewSecretMatches(previewParam);
    const post = isPreview
      ? await getPostBySlugAnyStatus(params.slug)
      : await getPostBySlug(params.slug);
    if (!post) notFound();
    const blocks = await getPostBlocks(post.id);
    return (
      <>
        {isPreview && <PreviewBanner />}
        <Nav active="blog" />
        <main className={styles.main}>
          <PostHero post={post} />
          <NotionRenderer blocks={blocks} />
          <PostFooter />
          <Footer variant="full" />
        </main>
      </>
    );
  } catch (err) {
    // notFound() throws a sentinel that Next intercepts to render 404.
    // Don't swallow or log it — re-throw cleanly.
    if (
      err &&
      typeof err === 'object' &&
      'digest' in err &&
      typeof (err as { digest?: unknown }).digest === 'string' &&
      ((err as { digest: string }).digest.startsWith('NEXT_NOT_FOUND') ||
        (err as { digest: string }).digest.startsWith('NEXT_REDIRECT'))
    ) {
      throw err;
    }
    console.error('[blog/[slug]] render failed', {
      slug: params.slug,
      hasSearchParams: searchParams != null,
      previewParamType: typeof searchParams?.preview,
      hasNotionToken: !!process.env.NOTION_TOKEN,
      hasDatabaseId: !!process.env.NOTION_BLOG_DATABASE_ID,
      hasPreviewSecret: !!process.env.BLOG_PREVIEW_SECRET,
      error:
        err instanceof Error
          ? { name: err.name, message: err.message, stack: err.stack }
          : err,
    });
    throw err;
  }
}
