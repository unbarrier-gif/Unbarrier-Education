import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { LBHero } from '@/components/loop-breakers/LBHero';
import { LBProblem } from '@/components/loop-breakers/LBProblem';
import { LBHow } from '@/components/loop-breakers/LBHow';
import { LBUpcoming } from '@/components/loop-breakers/LBUpcoming';
import { LBPricing } from '@/components/loop-breakers/LBPricing';
import { LBTestimonial } from '@/components/loop-breakers/LBTestimonial';
import { LBShape } from '@/components/loop-breakers/LBShape';
import { LBMeetNici } from '@/components/loop-breakers/LBMeetNici';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Loop Breakers · unbarrier.me',
  description:
    "A held room for neurodivergent women circling an idea — because the loop breaks when someone else sees it. £10 Tuesdays, pay-as-you-go.",
  alternates: { canonical: '/loop-breakers' },
};

// Match the homepage edge-cache TTL — keeps deploy-to-visible lag bounded
// (see app/page.tsx:25 for the same reasoning).
export const revalidate = 60;

export default function LoopBreakersPage() {
  return (
    <>
      <Nav active="loop-breakers" />
      <main className={styles.main}>
        <LBHero />
        <LBProblem />
        <LBHow />
        <LBUpcoming />
        <LBPricing />
        <LBTestimonial />
        <LBShape />
        <LBMeetNici />
        <Footer variant="full" />
      </main>
    </>
  );
}
