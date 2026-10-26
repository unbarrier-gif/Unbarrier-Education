// /inclusive-mainstream — the landing page for the Inclusive Mainstream Fund guide (version 2,
// from the "kit landing page v2" design). Everything the page says, and the
// seven chapters, live in this one file.
//
// THE COPY HERE IS STAND-IN, FOR AMBER TO WRITE OVER. It is not final: Nici
// writes the real words and they replace these, in this file, with no
// component touched. A slot whose `text` is null renders its `placeholder`
// as plain text instead (components/kit/Slot.tsx) — today that is only the
// cover alt text and the meta description, which have no stand-in yet.
//
// Site copy is lowercase. The guide title and the seven chapter titles keep
// their capitals: they are the guide's chapter names.

export type Copy = {
  /** What shows where `text` is still null. */
  placeholder: string;
  /** The words. `null` = not written yet. */
  text: string | null;
};

const slot = (name: string, text: string | null = null): Copy => ({
  placeholder: `[${name} · nici's words]`,
  text,
});

/** The guide title. Not a slot: it is given, and keeps its capitals. */
export const GUIDE_TITLE =
  'The Inclusive Mainstream Fund: what you need to understand before you act';

export const KIT_COPY = {
  // header
  headerButton: slot('button label', 'get the guide'),

  // first screen · left
  label: slot('label above title', 'a free guide for school leaders'),
  guideLine: slot('one line: what the guide is', 'one guide, seven principles. what the department asks, and what to find out before you spend.'),
  afterLine: slot('one line: what happens after you sign up', 'the guide lands in your inbox.'),
  coverAlt: slot('guide cover alt text', 'Download your copy to make a difference. A tablet showing the cover of The Inclusive Mainstream Fund: what you need to understand before you act.'),

  // first screen · right
  formHeading: slot('form heading', 'get your copy'),
  detailsLine: slot('one line on what happens to their details', 'we use your details to send the guide. tick the box if you’d like notice too.'),

  // contents
  contentsHeading: slot('contents heading', 'what’s inside'),

  // <head>: the page is noindex, but the tab and any shared link still read these
  metaDescription: slot('meta description', 'a free guide for school leaders. one guide, seven principles. what the department asks, and what to find out before you spend.'),
} satisfies Record<string, Copy>;

/**
 * The guide cover. `src` stays null until amber supplies the image, and the
 * page shows a placeholder box. Drop the file in /public/assets and set it.
 */
export const KIT_COVER: { src: string | null; width: number; height: number } = {
  src: '/assets/inclusive-mainstream-download-banner.png',
  width: 1200,
  height: 600,
};

/** A sponsor's logo file in /public. Height-matched in the strip, never width-matched. */
export type SponsorLogo = {
  src: string;
  /** Intrinsic size of the file, for next/image. Only the ratio is used. */
  width: number;
  height: number;
};

export type Sponsor = {
  /** Lowercase company name. It is the logo's alt text and the fallback text. */
  name: string;
  /**
   * `null` until the logo file is in /public/assets/sponsors: the strip shows
   * the name as text meanwhile. `'wordmark'` is the site's own component.
   */
  logo: SponsorLogo | 'wordmark' | null;
  /** Only card 01 links out. */
  link?: { href: string; label: string };
};

export type Chapter = {
  /** 01–07, Outfit. */
  n: string;
  title: Copy;
  sponsor: Sponsor;
  /** The chapter's tint, a token from app/globals.css. */
  tint: string;
};

const chapterTitle = (text: string): Copy => ({
  placeholder: '[chapter title]',
  text,
});

const SPONSOR_DIR = '/assets/sponsors';

// TODO(nici asking the sponsors): gaia-learning (86x48), skolon (150x74) and talamo
// (160x40) are small screenshots and look soft on retina. Swap in their own
// high-res or svg files, same filenames, and update width/height below.

export const CHAPTERS: Chapter[] = [
  {
    n: '01',
    title: chapterTitle('Deciding'),
    tint: 'var(--kit-tint-01)',
    sponsor: {
      name: 'kaleidoscope',
      logo: { src: `${SPONSOR_DIR}/kaleidoscope.png`, width: 800, height: 81 },
      link: {
        href: 'https://kaleidoscope-research.org/inclusion-index-autumn-2026-1',
        label: 'kaleidoscope, inclusion index autumn 2026',
      },
    },
  },
  {
    n: '02',
    title: chapterTitle('Noticing'),
    tint: 'var(--kit-tint-02)',
    // bloom is gaia learning's programme; the strip carries gaia learning's logo
    sponsor: { name: 'bloom', logo: { src: `${SPONSOR_DIR}/gaia-learning.png`, width: 86, height: 48 } },
  },
  {
    n: '03',
    title: chapterTitle('Designing'),
    tint: 'var(--kit-tint-03)',
    sponsor: { name: 'talamo', logo: { src: `${SPONSOR_DIR}/talamo.png`, width: 160, height: 40 } },
  },
  {
    n: '04',
    title: chapterTitle('Joining'),
    tint: 'var(--kit-tint-04)',
    sponsor: { name: 'digit music', logo: { src: `${SPONSOR_DIR}/digit-music.png`, width: 600, height: 187 } },
  },
  {
    n: '05',
    title: chapterTitle('Belonging'),
    tint: 'var(--kit-tint-05)',
    sponsor: { name: 'cosmo', logo: { src: `${SPONSOR_DIR}/cosmo.svg`, width: 4300, height: 1120 } },
  },
  {
    n: '06',
    title: chapterTitle('Listening'),
    tint: 'var(--kit-tint-06)',
    sponsor: { name: 'held by unbarrier', logo: { src: `${SPONSOR_DIR}/unbarrier-me.png`, width: 615, height: 136 } },
  },
  {
    n: '07',
    title: chapterTitle('Reaching'),
    tint: 'var(--kit-tint-07)',
    sponsor: { name: 'skolon', logo: { src: `${SPONSOR_DIR}/skolon.png`, width: 150, height: 74 } },
  },
];

/**
 * The next-step block. FINAL COPY from nici, 25 oct 2026. Not a slot, not
 * stand-in: do not edit a word without her.
 */
export const NEXT_STEP = {
  label: 'the next step',
  heading:
    'you are about to spend fund money against a statement. find out what it missed first.',
  buyingLabel: 'what you are buying',
  buying:
    'your inclusion strategy statement, read through the seven lenses in this guide, then one day in your school with the learners it was written for.',
  lensesLine: 'every chapter of this guide reads the fund through one word.',
  lenses: [
    'failure',
    'early',
    'designed',
    'reasonable adjustments',
    'belonging',
    'partnership',
    'barrier',
  ],
  sendLine: 'send me your statement and i read it through all seven before i come.',
  notLabel: 'what you do not get',
  not: 'a report that sits in a drawer, or a list of things to buy.',
  getLabel: 'what lands on your desk',
  get: [
    'your own statement back, with the gaps marked',
    'what the learners said, in their words',
    'the one thing to do next, and what not to buy yet',
  ],
  more: 'this is the first block of work. if you want more after it, the next block is built from what the day found.',
  button: 'send your statement',
  link: 'get the guide first',
  clinic: 'if your trust wants to read its statements together, ask about a clinic.',
} as const;

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

/**
 * The iceberg (public/assets/iceberg.svg). 420 × 690; the waterline sits 225
 * down from the top, 32.6% of its height. The CSS reads the same two numbers
 * (`calc(height * 225 / 690)`), so a re-issued file with a different waterline
 * changes them here and in app/inclusive-mainstream/page.module.css, nowhere
 * else.
 */
export const ICEBERG = {
  src: '/assets/iceberg.svg',
  width: 420,
  height: 690,
  waterline: 225,
} as const;

/** Alt text for the iceberg on the first screen. The chapter cards' copy is decorative: empty alt. */
export const ICEBERG_ALT =
  'an iceberg, a small tip above the waterline and most of it below';
