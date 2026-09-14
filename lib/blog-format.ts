// Small, pure helpers shared by the blog index, its cards and the post
// page. Kept out of the components so the same date reads the same
// everywhere and the "one line per card" rule has one implementation.

import type { Post } from './notion';

/** "21 Aug 2026" — en-GB, short month, no weekday. */
export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * The first sentence of a piece of text: everything up to the first
 * full stop, question mark or exclamation mark that is followed by
 * whitespace (or the end). A closing quote after the mark stays with
 * the sentence; "e.g." and "i.e." don't end one. Returns the whole
 * text if no sentence break is found.
 */
export function firstSentence(text: string): string {
  const trimmed = text.trim();
  const m = trimmed.match(/^.*?(?<!\b[ei]\.[ge])[.?!]["”’']?(?=\s|$)/);
  return m ? m[0] : trimmed;
}

/**
 * The one line shown under a title on the index: the post's own pull
 * line when the editor set one, else the first sentence of the excerpt.
 * Empty string when the post has neither.
 */
export function cardLine(post: Pick<Post, 'pullLine' | 'excerpt'>): string {
  const pull = post.pullLine.trim();
  if (pull) return pull;
  return firstSentence(post.excerpt);
}
