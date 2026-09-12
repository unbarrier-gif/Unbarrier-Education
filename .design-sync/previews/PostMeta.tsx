import { PostMeta } from 'unbarrier-education';

/** The full row as PostHero shows it: shape tag, date, read time. */
export const Full = () => (
  <PostMeta shape="reality-check" date="2026-08-27" readingMin={6} />
);

/** A post without a reading time yet. */
export const NoReadingTime = () => (
  <PostMeta shape="stories" date="2026-08-12" readingMin={null} />
);

/** An undated draft: just the tag. */
export const TagOnly = () => (
  <PostMeta shape="honestly" date={null} readingMin={null} />
);

/** All five shapes down the page, each with a plausible date and length. */
export const FiveShapes = () => (
  <div style={{ display: 'grid', gap: 14 }}>
    <PostMeta shape="out-loud" date="2026-09-03" readingMin={2} />
    <PostMeta shape="reality-check" date="2026-08-27" readingMin={6} />
    <PostMeta shape="honestly" date="2026-08-19" readingMin={5} />
    <PostMeta shape="stories" date="2026-08-12" readingMin={4} />
    <PostMeta shape="invitations" date="2026-08-05" readingMin={3} />
  </div>
);
