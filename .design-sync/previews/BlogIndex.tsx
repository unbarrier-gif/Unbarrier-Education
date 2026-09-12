import { BlogIndex } from 'unbarrier-education';
import type { Post } from '@/lib/notion';

// Date-desc, as notion.ts returns them. One featured post so the
// "Everything" view shows the hero slot above the grid.
const posts: Post[] = [
  {
    id: 'p1',
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
  },
  {
    id: 'p2',
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
  },
  {
    id: 'p3',
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
  },
  {
    id: 'p4',
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
  },
  {
    id: 'p5',
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
  },
  {
    id: 'p6',
    slug: 'reading-age-is-not-reading',
    title: 'reading age is not reading',
    shape: 'out-loud',
    excerpt:
      'a number on a spreadsheet is not a child with a book. said out loud on the drive home.',
    date: '2026-07-29',
    readingMin: 1,
    featured: false,
    coverUrl: null,
    coverAlt: '',
    status: 'Published',
  },
];

/** The index as /blog renders it: filter chips with counts, the featured hero, then the grid. */
export const Index = () => <BlogIndex posts={posts} />;

/** Before the first post is published: the chips at zero and the waiting line. */
export const Empty = () => <BlogIndex posts={[]} />;
