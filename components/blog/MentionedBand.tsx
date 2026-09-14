import Link from 'next/link';
import { Eyebrow } from '@/components/Eyebrow';
import { PullQuote } from './PullQuote';
import { ShapeTag } from './ShapeTag';
import { SHAPES } from '@/lib/blog-shapes';
import { formatPostDate } from '@/lib/blog-format';
import type { Post } from '@/lib/notion';
import styles from './MentionedBand.module.css';

// "the ones people bring up" (design_handoff_blog_page, block j1): the
// posts an editor ticked `Mentioned` in Notion, each with what a real
// person said about it. Not the newest — the ones that come back in
// emails, on calls, in the corridor after a discovery day. Renders
// nothing until at least one post has a feedback quote, so the band
// can't ship with placeholders.

type Props = {
  /** Already picked: Mentioned + a quote, max 3. See pickMentioned(). */
  posts: Post[];
};

export function MentionedBand({ posts }: Props) {
  if (posts.length === 0) return null;
  return (
    <section className={styles.band} aria-labelledby="mentioned">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Eyebrow color="var(--orchid-mist)">start here</Eyebrow>
          <h2 id="mentioned" className={styles.heading}>
            the ones people bring up.
          </h2>
          <p className={styles.lede}>
            not the newest. the ones that come back to us in emails, on calls,
            and in the corridor after a discovery day — with what people said
            about them.
          </p>
        </div>

        <div className={styles.grid}>
          {posts.map((p) => {
            const href = `/blog/${p.slug}`;
            const meta = [
              p.date ? formatPostDate(p.date) : null,
              p.readingMin != null ? `${p.readingMin} min read` : null,
            ]
              .filter(Boolean)
              .join(' · ');
            return (
              <article key={p.slug} className={styles.card}>
                <div className={styles.top}>
                  <ShapeTag shape={p.shape} size="sm" solid />
                  <h3 className={styles.title}>
                    <Link href={href} className={styles.titleLink}>
                      {p.title}
                    </Link>
                  </h3>
                  {meta && <p className={styles.meta}>{meta}</p>}
                </div>
                {/* The negative margin cancels PullQuote's own outer air
                    inside the card. */}
                <div className={styles.quote}>
                  <PullQuote
                    color={SHAPES[p.shape].color}
                    cite={p.feedbackFrom.trim() || undefined}
                  >
                    {p.feedbackQuote}
                  </PullQuote>
                </div>
                <Link
                  href={href}
                  className={styles.read}
                  aria-label={`read: ${p.title}`}
                >
                  read →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
