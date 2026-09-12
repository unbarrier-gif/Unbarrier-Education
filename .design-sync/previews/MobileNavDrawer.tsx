import { MobileNavDrawer } from 'unbarrier-education';

// The LINKS from components/Nav.tsx, verbatim. audit and access carry their
// strand dots; the campaign and plain routes do not.
const LINKS = [
  { key: 'audit', label: 'audit', href: '/audit', dot: 'var(--pearl-aqua)' },
  { key: 'access', label: 'access', href: '/access', dot: 'var(--princeton-orange)' },
  { key: 'inclusion-strategy', label: 'inclusion strategy', href: '/inclusion-strategy' },
  { key: 'edtech', label: 'edtech', href: '/edtech' },
  { key: 'blog', label: 'blog', href: '/blog' },
  { key: 'about', label: 'about', href: '/about' },
] as const;

/** The drawer open on a phone, on /audit. It is position: fixed; the backdrop dims the page behind it. */
export const Open = () => (
  <MobileNavDrawer open onClose={() => {}} links={LINKS} activeKey="audit" />
);
