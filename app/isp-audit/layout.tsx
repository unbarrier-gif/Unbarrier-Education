import type { Metadata, Viewport } from 'next';
import styles from './layout.module.css';

// Client tool reached via a shared link, not a marketing page — keep it out
// of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Override the site-wide amethyst theme-color (app/layout.tsx) — this route
// is deliberately un-branded, including the mobile browser chrome tint.
export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function IspAuditLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
