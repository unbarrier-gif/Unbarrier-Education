import type { Metadata } from 'next';
import { AboutBeliefs } from '@/components/AboutBeliefs';
import { HomeHero } from '@/components/HomeHero';
import { HomeLoopTease } from '@/components/HomeLoopTease';
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

export default function HomePage() {
  return (
    <main className={styles.main}>
      <HomeHero />
      <StatStrip />
      <Services />
      <AboutBeliefs />
      <PickYourStartingPoint />
      <HomeLoopTease />
      {/* Footer follows in row 1.7. Nav lands in row 2. */}
    </main>
  );
}
