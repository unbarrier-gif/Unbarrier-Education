// Metadata for the per-guest letters at
// /loop-breakers/guest-host-kit/[urlSlug]. The letter content itself is
// bespoke React in components/loop-breakers/guest-host-kit/letters/<ComponentKey>.tsx
// — those are too varied (custom blocks per letter) to flatten to JSON.
//
// `slug` is the canonical short name (e.g. `nicki-hambleton`).
// `urlSlug` is the public URL token: `<slug>-<8-char-hex>`. The hex
// suffix makes the URL unguessable — letter routes are private, noindex,
// and shared by direct link only. urlSlug values are stable forever
// once committed.
//
// Adding a new guest = (1) write the TSX letter, (2) add a row here
// with a fresh 8-char-hex token, (3) wire the import in
// app/loop-breakers/guest-host-kit/[urlSlug]/page.tsx.

import data from './guest-letters.json';

export type LetterStatus = 'live' | 'draft' | 'archived';

export type LetterMeta = {
  slug: string;
  urlSlug: string;
  guestName: string;
  title: string;
  accent: string;
  componentKey: string;
  status: LetterStatus;
};

export const LETTERS = data.letters as LetterMeta[];

export const liveLetters = (): LetterMeta[] =>
  LETTERS.filter((l) => l.status === 'live');

export function findLetterByUrlSlug(urlSlug: string): LetterMeta | undefined {
  return LETTERS.find((l) => l.urlSlug === urlSlug);
}
