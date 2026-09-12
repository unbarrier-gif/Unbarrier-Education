import { BlogCard } from 'unbarrier-education';
import type { Post } from '@/lib/notion';

// Posts as notion.ts returns them. coverUrl stays null so the card paints
// the shape-coloured fallback tile and never waits on a remote image.
const featured: Post = {
  id: 'p-reality-1',
  slug: 'we-have-the-software-is-not-an-inclusion-strategy',
  title: '"we’ve got the software" is not an inclusion strategy',
  shape: 'reality-check',
  excerpt:
    'licences are not access. the belief that buying the tool does the work, examined properly, with the receipts.',
  date: '2026-08-27',
  readingMin: 6,
  featured: true,
  coverUrl: null,
  coverAlt: '',
  status: 'Published',
};

const outLoud: Post = {
  id: 'p-out-loud-1',
  slug: 'the-app-did-not-reach-the-child',
  title: 'the app did not reach the child',
  shape: 'out-loud',
  excerpt:
    'a two-minute voice note, typed up. the dashboard said green. the child said nothing.',
  date: '2026-09-03',
  readingMin: 2,
  featured: false,
  coverUrl: null,
  coverAlt: '',
  status: 'Published',
};

const honestly: Post = {
  id: 'p-honestly-1',
  slug: 'i-wrote-this-with-my-voice',
  title: 'i wrote this with my voice, because my hands would not',
  shape: 'honestly',
  excerpt:
    'on being dyslexic, running an education company, and the rereading nobody sees.',
  date: '2026-08-19',
  readingMin: 5,
  featured: false,
  coverUrl: null,
  coverAlt: '',
  status: 'Published',
};

const stories: Post = {
  id: 'p-stories-1',
  slug: 'the-boy-who-read-the-whole-thing-on-his-phone',
  title: 'the boy who read the whole thing on his phone',
  shape: 'stories',
  excerpt:
    'a teaching assistant on the day text-to-speech stopped being a special arrangement and became a tuesday.',
  date: '2026-08-12',
  readingMin: 4,
  featured: false,
  coverUrl: null,
  coverAlt: '',
  status: 'Published',
};

const invitations: Post = {
  id: 'p-invitations-1',
  slug: 'come-and-sit-in-on-the-belonging-check',
  title: 'come and sit in on the belonging check',
  shape: 'invitations',
  excerpt:
    'ten minutes with a class you already teach. no slides, no pitch. a door, gently opened.',
  date: '2026-08-05',
  readingMin: 3,
  featured: false,
  coverUrl: null,
  coverAlt: '',
  status: 'Published',
};

const noMeta: Post = {
  ...outLoud,
  id: 'p-out-loud-2',
  slug: 'reading-age-is-not-reading',
  title: 'reading age is not reading',
  excerpt: '',
  date: null,
  readingMin: null,
};

/** The standard card as the index grid lays it out: fallback tile, solid tag, date, read time, excerpt. */
export const Standard = () => (
  <div style={{ maxWidth: 420 }}>
    <BlogCard post={outLoud} />
  </div>
);

/** The hero variant the index gives to the most recent featured post. */
export const Hero = () => (
  <div style={{ maxWidth: 960 }}>
    <BlogCard post={featured} variant="hero" />
  </div>
);

/** Every shape gets its own fallback tile colour; a strip of all five. */
export const FiveShapes = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: 20,
      maxWidth: 1180,
    }}
  >
    <BlogCard post={outLoud} />
    <BlogCard post={featured} />
    <BlogCard post={honestly} />
    <BlogCard post={stories} />
    <BlogCard post={invitations} />
  </div>
);

/** A post with no excerpt, date or reading time: the metadata row collapses cleanly. */
export const Minimal = () => (
  <div style={{ maxWidth: 420 }}>
    <BlogCard post={noMeta} />
  </div>
);
