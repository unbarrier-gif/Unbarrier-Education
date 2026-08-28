import type { MetadataRoute } from 'next';
import { getAllPublishedPosts } from '@/lib/notion';

const SITE_URL = 'https://unbarrier.me';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPublishedPosts();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/loop-breakers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    // /access shipped 3 May 2026 — uses WWW (canonical host post-redirect
    // investigation). Other entries still use bare; site-wide host
    // canonicalisation is a separate task tracked elsewhere.
    { url: 'https://www.unbarrier.me/access', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.unbarrier.me/goodnotes', lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
