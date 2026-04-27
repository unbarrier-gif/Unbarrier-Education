import type { Metadata } from 'next';
import { HomeHero } from '@/components/HomeHero';
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
      {/* StatStrip, Services, AboutBeliefs, PickYourStartingPoint,
          HomeLoopTease, Footer follow in subsequent commits.
          Nav lands in row 2. */}
    </main>
  );
}
