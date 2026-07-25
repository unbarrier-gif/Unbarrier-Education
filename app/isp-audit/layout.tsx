import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import styles from './layout.module.css';

// Client tool reached via a shared link, not a marketing page — keep it out
// of search results even though it's fully unbarrier-branded now.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function IspAuditLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Nav active="audit" />
      <div className={styles.navSpacer}>{children}</div>
      <Footer variant="full" />
    </div>
  );
}
