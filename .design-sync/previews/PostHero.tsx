import { PostHero } from 'unbarrier-education';
import type { Post } from '@/lib/notion';

const post: Post = {
  id: 'p-honestly-1',
  slug: 'i-wrote-this-with-my-voice',
  title: 'i wrote this with my voice, because my hands would not',
  shape: 'honestly',
  excerpt:
    'on being dyslexic, running an education company, and the rereading nobody sees. this one is slower. it is allowed to be.',
  date: '2026-08-19',
  readingMin: 5,
  featured: false,
  coverUrl: null,
  coverAlt: '',
  status: 'Published',
};

const short: Post = {
  id: 'p-out-loud-1',
  slug: 'the-app-did-not-reach-the-child',
  title: 'the app did not reach the child',
  shape: 'out-loud',
  excerpt: '',
  date: '2026-09-03',
  readingMin: 2,
  featured: false,
  coverUrl: null,
  coverAlt: '',
  status: 'Published',
};

/** The post header with a dek: back link, meta row, title, excerpt. No cover image. */
export const WithExcerpt = () => <PostHero post={post} />;

/** An out-loud note with no excerpt: the header stops at the title. */
export const TitleOnly = () => <PostHero post={short} />;
