import type { Metadata } from 'next';
import { AboutBeliefs } from '@/components/AboutBeliefs';
import { Footer } from '@/components/Footer';
import { HomeHero } from '@/components/HomeHero';
import { InclusionStrategyBand } from '@/components/InclusionStrategyBand';
import { Nav } from '@/components/Nav';
import { PickYourStartingPoint } from '@/components/PickYourStartingPoint';
import { Services } from '@/components/Services';
import { StatStrip } from '@/components/StatStrip';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Unbarrier · designed for difference.',
  description:
    "Inclusion specialist Nici Foote helps schools, families, and EdTech companies remove the barriers that stop children from learning, belonging, and thriving.",
  alternates: { canonical: '/' },
};

// Cap edge-cache TTL on the homepage at 60s. Vercel's project-level
// rewrite-caching can lock a stale response (e.g. the previous
// redirect('/hello') from before Phase 2) for hours despite cache-control
// headers; capping the TTL here means the worst-case cache lag after a
// deploy is one minute. Marketing copy doesn't need real-time, but a
// hot-fix shouldn't take an hour to land either.
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <HomeHero />
        <StatStrip />
        <Services />
        <AboutBeliefs />
        {/* TEMPORARY until 31 Dec 2026 — see lib/inclusion-strategy-promo.ts */}
        <InclusionStrategyBand />
        <PickYourStartingPoint />
        <Footer variant="full" />
      </main>
    </>
  );
}
