import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { timingSafeEqual } from 'node:crypto';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { ReadingControls } from '@/components/ReadingControls';
import { NotionRenderer } from '@/components/blog/NotionRenderer';
import { PostFooter } from '@/components/blog/PostFooter';
import { PostHero } from '@/components/blog/PostHero';
import { PreviewBanner } from '@/components/blog/PreviewBanner';
import {
  getPostBlocks,
  getPostBySlug,
  getPostBySlugAnyStatus,
} from '@/lib/notion';
import styles from './page.module.css';

// Force per-request dynamic rendering. Reading searchParams plus
// generateStaticParams returning empty (no Published posts at build)
// was producing a static/dynamic conflict that 500'd every request,
// even on slugs that should clearly 404. force-dynamic sidesteps that
// by skipping the static fallback path entirely. Notion still de-dupes
// fetches per render via React.cache().
export const dynamic = 'force-dynamic';

type Params = { slug: string };
type SearchParams = { [key: string]: string | string[] | undefined };

function isNextInternalError(err: unknown): boolean {
  return (
    err != null &&
    typeof err === 'object' &&
    'digest' in err &&
    typeof (err as { digest?: unknown }).digest === 'string' &&
    ((err as { digest: string }).digest.startsWith('NEXT_NOT_FOUND') ||
      (err as { digest: string }).digest.startsWith('NEXT_REDIRECT'))
  );
}

function describeError(err: unknown) {
  return err instanceof Error
    ? { name: err.name, message: err.message, stack: err.stack }
    : err;
}

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

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams?: SearchParams;
}): Promise<Metadata> {
  try {
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
  } catch (err) {
    if (isNextInternalError(err)) throw err;
    console.error('[blog/[slug]] generateMetadata failed', {
      slug: params.slug,
      hasSearchParams: searchParams != null,
      previewParamType: typeof searchParams?.preview,
      hasNotionToken: !!process.env.NOTION_TOKEN,
      hasDatabaseId: !!process.env.NOTION_BLOG_DATABASE_ID,
      hasPreviewSecret: !!process.env.BLOG_PREVIEW_SECRET,
      error: describeError(err),
    });
    // Don't crash the whole render just because metadata threw.
    return { title: 'Notes from Nici' };
  }
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
    const schema = !isPreview
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt || undefined,
          image: post.coverUrl ? [post.coverUrl] : undefined,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: 'Nici Foote',
            url: 'https://unbarrier.me',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Unbarrier Education',
            logo: {
              '@type': 'ImageObject',
              url: 'https://unbarrier.me/assets/logos/logo-icon-green.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://unbarrier.me/blog/${post.slug}`,
          },
        }
      : null;
    return (
      <>
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
        {isPreview && <PreviewBanner />}
        <Nav active="blog" />
        <main className={styles.main}>
          <PostHero post={post} />
          <ReadingControls />
          <NotionRenderer blocks={blocks} />
          <PostFooter />
          <Footer variant="full" />
        </main>
      </>
    );
  } catch (err) {
    if (isNextInternalError(err)) throw err;
    console.error('[blog/[slug]] render failed', {
      slug: params.slug,
      hasSearchParams: searchParams != null,
      previewParamType: typeof searchParams?.preview,
      hasNotionToken: !!process.env.NOTION_TOKEN,
      hasDatabaseId: !!process.env.NOTION_BLOG_DATABASE_ID,
      hasPreviewSecret: !!process.env.BLOG_PREVIEW_SECRET,
      error: describeError(err),
    });
    throw err;
  }
}
