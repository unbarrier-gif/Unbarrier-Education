import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import styles from './page.module.css';

// Loop Breakers is retired (28 Aug 2026). This is the only page left: the
// route stays live and indexable so no bookmark, newsletter link or business
// card 404s — holding copy only, per the approved page drafts. No prices, no
// session ladder, no booking links.
//
// Every other Loop Breakers surface (/loop-breakers/sessions, the guest-host
// kit, /guest-stage and the guest pages) was deleted and 301s here — see the
// redirects in next.config.js. The guest hosts' own letters and artwork were
// archived to /_archive before deletion.

export const metadata: Metadata = {
  title: 'loopbreakers is paused · unbarrier.me',
  description:
    'loopbreakers is paused while we concentrate on the education work — audits, partnerships, and the voice instrument. if it starts again we will say so here first.',
  alternates: { canonical: '/loop-breakers' },
};

// Match the homepage edge-cache TTL — keeps deploy-to-visible lag bounded
// (see app/page.tsx:25 for the same reasoning).
export const revalidate = 60;

export default function LoopBreakersPage() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <Glow
          color="var(--school-bus-yellow)"
          left="-140px"
          top="2%"
          size={520}
          opacity={0.08}
          blur={160}
        />

        <div className={styles.wrap}>
          <p className={styles.eyebrow}>loop breakers</p>

          <h1 className={styles.heading}>loopbreakers is paused.</h1>

          <p className={styles.lede}>
            the coaching room isn&rsquo;t running at the moment. we&rsquo;re
            concentrating on the education work &mdash; audits, partnerships,
            and the voice instrument &mdash; and we&rsquo;d rather say that
            plainly than leave a page up that looks open when it isn&rsquo;t.
          </p>

          <p className={styles.body}>
            if you were part of it, thank you. it mattered. if it starts again
            we&rsquo;ll say so here first.
          </p>

          <p className={styles.body}>
            if you came looking for the education work,{' '}
            <Link href="/access" className={styles.link}>
              that&rsquo;s here
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer variant="full" />
    </>
  );
}
