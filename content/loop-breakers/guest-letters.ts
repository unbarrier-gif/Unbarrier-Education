// Metadata for the per-guest letters at /loop-breakers/guest-host-kit/[slug].
// The letter content itself is bespoke React in
// components/loop-breakers/guest-host-kit/letters/<ComponentKey>.tsx
// — those are too varied (custom blocks per letter) to flatten to JSON.
//
// Adding a new guest = (1) write the TSX letter, (2) add a row here,
// (3) wire the import in app/loop-breakers/guest-host-kit/[slug]/page.tsx.

import data from './guest-letters.json';

export type LetterStatus = 'live' | 'draft' | 'archived';

export type LetterMeta = {
  slug: string;
  guestName: string;
  title: string;
  accent: string;
  componentKey: string;
  status: LetterStatus;
};

export const LETTERS = data.letters as LetterMeta[];

export const liveLetters = (): LetterMeta[] =>
  LETTERS.filter((l) => l.status === 'live');

export function findLetterBySlug(slug: string): LetterMeta | undefined {
  return LETTERS.find((l) => l.slug === slug);
}
