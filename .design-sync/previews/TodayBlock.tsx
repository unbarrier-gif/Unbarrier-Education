import { TodayBlock } from 'unbarrier-education';
import type { HelloLink } from '@/lib/hello-links';

// The /hello "your stuff from today" panel. Rows come from the Notion "hello
// links" database with Group = today; the heading is the first row's meta.
function link(
  n: number,
  title: string,
  meta: string,
  href: string,
  accent: string,
  accentRgb: string,
  external: boolean,
): HelloLink {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return {
    id: `today-${n}`,
    title,
    meta,
    href,
    group: 'today',
    order: n,
    accent,
    accentRgb,
    external,
    image: '',
    initial: title.trim().charAt(0).toUpperCase(),
    slug,
  };
}

const SESSION_LINKS: HelloLink[] = [
  link(1, 'the seven questions', 'everything from the session', '/the-takeaway.html', 'var(--spring-green)', '56, 255, 153', true),
  link(2, 'goodnotes for schools', 'the training one-pager from today’s session.', '/goodnotes-training.html', 'var(--school-bus-yellow)', '255, 194, 3', true),
  link(3, 'the takeaway', 'the talk, on one page. pick one. ask it monday.', '/the-takeaway.html', 'var(--pearl-aqua)', '105, 217, 209', true),
];

/** Three rows from today's session, numbered, each carrying its own accent. */
export const ThreeLinks = () => (
  <TodayBlock heading="everything from the session" links={SESSION_LINKS} />
);

/** A dated event heading — what /hello shows on the day itself. */
export const EventHeading = () => (
  <TodayBlock
    heading="inclusion beyond send — university of surrey, 17 september"
    links={[
      link(1, 'prompting for inclusion', 'the slides and the prompts.', '/prompting-for-inclusion.html', 'var(--orchid-mist)', '219, 125, 204', true),
      link(2, 'the belonging check', 'a prompt to build a 5-minute form for your people.', '/belonging-check', 'var(--spring-green)', '56, 255, 153', false),
      link(3, 'the receipts', 'six numbers under the talk.', '/the-receipts.html', 'var(--princeton-orange)', '255, 138, 28', true),
    ]}
  />
);
