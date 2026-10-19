// /kit — the landing page for the Inclusive Mainstream Fund guide (version 2,
// from the "kit landing page v2" design). Everything the page says, and the
// seven chapters, live in this one file.
//
// NICI WRITES ALL THE COPY. A slot with `text: null` renders its placeholder
// (components/kit/Slot.tsx), clearly marked. To fill one, set `text` — that is
// the whole change; no component needs touching. The `placeholder` strings are
// the spec's own, so the PR's copy sheet and the page say the same thing.
//
// Site copy is lowercase. The guide title and the chapter titles Nici named
// keep their capitals, as supplied.

export type Copy = {
  /** What shows until Nici's words arrive. */
  placeholder: string;
  /** The words. `null` = not written yet. */
  text: string | null;
};

const nici = (slot: string): Copy => ({
  placeholder: `[${slot} · nici's words]`,
  text: null,
});

/** The guide title. Not a slot: it is given, and keeps its capitals. */
export const GUIDE_TITLE =
  'The Inclusive Mainstream Fund: what you need to understand before you act';

export const KIT_COPY = {
  // header
  headerButton: nici('button label'),

  // first screen · left
  label: nici('label above title'),
  guideLine: nici('one line: what the guide is'),
  afterLine: nici('one line: what happens after you sign up'),
  coverAlt: nici('guide cover alt text'),

  // first screen · right
  formHeading: nici('form heading'),
  detailsLine: nici('one line on what happens to their details'),

  // contents
  contentsHeading: nici('contents heading'),

  // the next step
  nextHeading: nici('heading'),
  nextBody: nici('the call and the clinic'),
  bookingButton: nici('booking button'),
  backToForm: nici('back to the form'),

  // <head>: the page is noindex, but the tab and any shared link still read these
  metaDescription: nici('meta description'),
} satisfies Record<string, Copy>;

/**
 * The guide cover. `src` stays null until amber supplies the image, and the
 * page shows a placeholder box. Drop the file in /public/assets and set it.
 */
export const KIT_COVER: { src: string | null; width: number; height: number } = {
  src: null,
  width: 600,
  height: 800,
};

export type Chapter = {
  /** 01–07, Outfit. */
  n: string;
  title: Copy;
  /** The sponsor strip. Same line on every chapter until copy freeze. */
  sponsor: Copy;
  /** The chapter's tint, a token from app/globals.css. */
  tint: string;
};

const chapterTitle = (text: string | null): Copy => ({
  placeholder: '[chapter title]',
  text,
});

const sponsor = (): Copy => ({
  placeholder: '[sponsor · confirmed at copy freeze]',
  text: null,
});

export const CHAPTERS: Chapter[] = [
  { n: '01', title: chapterTitle('Leadership'), sponsor: sponsor(), tint: 'var(--kit-tint-01)' },
  { n: '02', title: chapterTitle('Noticing'), sponsor: sponsor(), tint: 'var(--kit-tint-02)' },
  { n: '03', title: chapterTitle('Designing'), sponsor: sponsor(), tint: 'var(--kit-tint-03)' },
  { n: '04', title: chapterTitle(null), sponsor: sponsor(), tint: 'var(--kit-tint-04)' },
  { n: '05', title: chapterTitle(null), sponsor: sponsor(), tint: 'var(--kit-tint-05)' },
  { n: '06', title: chapterTitle(null), sponsor: sponsor(), tint: 'var(--kit-tint-06)' },
  { n: '07', title: chapterTitle(null), sponsor: sponsor(), tint: 'var(--kit-tint-07)' },
];

/**
 * The HubSpot form (amber's). The fields — name, school, role, email and the
 * unticked notice box — live in HubSpot, not in our code. EU1 region.
 */
export const HUBSPOT = {
  scriptSrc: 'https://js-eu1.hsforms.net/forms/embed/149444141.js',
  region: 'eu1',
  portalId: '149444141',
  formId: '1a682a60-53c9-4981-9b89-147983a4dc48',
} as const;

/** The id the header button, the next-step card and the hash links jump to. */
export const FORM_ID = 'form';
