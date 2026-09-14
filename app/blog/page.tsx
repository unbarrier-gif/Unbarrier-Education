import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { ReadingControls } from '@/components/ReadingControls';
import { Section } from '@/components/Section';
import { BLOG_HEADING, BLOG_LEDE, BlogHero } from '@/components/blog/BlogHero';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { MentionedBand } from '@/components/blog/MentionedBand';
import { getAllPublishedPosts, pickMentioned } from '@/lib/notion';
import styles from './page.module.css';

// /blog — the index, rebuilt 14 Sep 2026 from design_handoff_blog_page
// (Blog.dc.html + README.md; site plan step 6). Block ids from the handoff:
//
//   j0  hero (BlogHero)            eyebrow · h1 · lede · two glows
//   j0a reading controls (400)     scoped to #blog-main, which wraps j1 + j2
//   j1  the ones people bring up   Mentioned posts + feedback quotes;
//       (400)                      hides itself until one exists
//   j2  the index (base)           chips · live result line · compact cards
//                                  · 6 newest then "show all"
//   j3  close (well, loose)        readiness check + /hello · newsletter
//                                  band · footer
//
// Route accent: orchid-mist (voice, anything human). Ground ladder: bg →
// 400 → 400 → base → well. No images anywhere on the page: the redesign
// leads with the title, one line, and the time it takes.
//
// Posts come from Notion (Status = Published AND "Show on unbarrier"),
// newest first. Re-fetch in the background every 60s so edits in Notion
// show up on the live site within a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: `unbarrier.blog — ${BLOG_HEADING} | unbarrier.me`,
  description: BLOG_LEDE,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `unbarrier.blog — ${BLOG_HEADING}`,
    description: BLOG_LEDE,
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
  const mentioned = pickMentioned(posts);
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <BlogHero />

        <div className={styles.controls}>
          <div className={styles.controlsInner}>
            <ReadingControls scopeId="blog-main" />
          </div>
        </div>

        <div id="blog-main">
          <MentionedBand posts={mentioned} />

          <Section ground="base" labelledBy="everything">
            <BlogIndex posts={posts} />
          </Section>
        </div>

        <Section ground="well" space="loose" labelledBy="closing">
          <h2 id="closing" className={styles.closeHeading}>
            if one of these landed, there’s a free next step.
          </h2>
          <p className={styles.closeLede}>
            nine questions, ten minutes, no email needed. it tells you where to
            look first in your own setting.
          </p>
          <div className={styles.ctaRow}>
            <Button href="/readiness-check" color="var(--orchid-mist)">
              take the free readiness check →
            </Button>
            <Button href="/hello" variant="ghost">
              everything free, in one place →
            </Button>
          </div>
        </Section>

        <div className={styles.newsletter}>
          <NewsletterBand
            route="/blog"
            weight="standard"
            heading="notice"
            sub="one email when there is something worth saying. nothing when there isn’t. we don’t sell the list."
          />
        </div>

        <Footer variant="full" />
      </main>
    </>
  );
}
