import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { CopyPrompt } from './CopyPrompt';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'The belonging check · Unbarrier',
  description:
    'Paste this into ChatGPT or Claude. It builds you a 5-minute, anonymous form to find out whether your people feel safe enough to try.',
  alternates: { canonical: '/belonging-check' },
};

export default function BelongingCheckPage() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <section className={styles.intro}>
          <Glow
            color="var(--orchid-mist)"
            top="-90px"
            right="-120px"
            size={420}
            opacity={0.1}
            blur={160}
          />
          <p className={styles.eyebrow}>For school leaders</p>
          <h1 className={styles.title}>The belonging check</h1>
          <p className={styles.lede}>
            Paste this into ChatGPT or Claude. It builds you a 5-minute,
            anonymous form to find out whether your people feel safe enough
            to try.
          </p>
        </section>

        <CopyPrompt />

        <Footer />
      </main>
    </>
  );
}
