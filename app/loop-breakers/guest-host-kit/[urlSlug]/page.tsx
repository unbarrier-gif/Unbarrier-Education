import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { GemmaLetter } from '@/components/loop-breakers/guest-host-kit/letters/GemmaLetter';
import { NickiHambletonLetter } from '@/components/loop-breakers/guest-host-kit/letters/NickiHambletonLetter';
import {
  findLetterByUrlSlug,
  liveLetters,
} from '@/content/loop-breakers/guest-letters';
import styles from './page.module.css';

type Params = { urlSlug: string };

// componentKey in guest-letters.json maps to one of these. New guests:
// add the TSX file, register the entry in guest-letters.json, then add
// the import + key here. Three small, colocated changes.
const COMPONENTS: Record<string, () => JSX.Element> = {
  NickiHambletonLetter,
  GemmaLetter,
};

export function generateStaticParams(): Params[] {
  return liveLetters().map((l) => ({ urlSlug: l.urlSlug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Params },
): Promise<Metadata> {
  const meta = findLetterByUrlSlug(params.urlSlug);
  if (!meta) return { robots: { index: false, follow: false } };
  return {
    title: `${meta.title} · Loop Breakers Guest Host Kit`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/loop-breakers/guest-host-kit/${meta.urlSlug}`,
    },
  };
}

export default function LetterPage({ params }: { params: Params }) {
  const meta = findLetterByUrlSlug(params.urlSlug);
  if (!meta) notFound();
  const Letter = COMPONENTS[meta.componentKey];
  if (!Letter) notFound();

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <Letter />
        <Footer variant="full" />
      </main>
    </>
  );
}
