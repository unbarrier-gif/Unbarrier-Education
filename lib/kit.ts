// /kit — the seven free guides to the inclusion strategy, one per principle
// of the inclusive mainstream fund. Data for the landing page, in one place.
//
// Source: the Notion "kit landing page — spec + copy draft" (5 Sep 2026) and
// the 8 Sep amendment pass, as the 13 Sep design handover carried them.

import { SITE_FLAGS } from './site-flags';

export type Principle = {
  /** The 01–07 numeral shown on the row (Outfit, like every numeral). */
  n: string;
  /** The principle number as the guidance counts it. */
  num: string;
  /** The conditions-of-grant wording, verbatim. Not ours to edit. */
  name: string;
  /** Written and sendable now. The others follow this term, in build order. */
  ready: boolean;
  /**
   * The sponsor state of the row, resolved from the flags:
   *   `own`   principle 1 — unbarrier's own, never sponsored
   *   `paid`  a sponsor paid for the guide to be free — carries a logo slot
   *   `open`  no sponsor yet, said out loud (SITE_FLAGS.kitUnpaidRowText)
   *   `none`  no sponsor yet, nothing said
   */
  sponsor: 'own' | 'paid' | 'open' | 'none';
};

// BUILD ORDER, not principle order — the contents list runs in the order the
// guides land. Two are ready; five follow this term.
//
// THE SPONSOR ROWS. The demo "paid" state on principle 7 is for review only
// (SITE_FLAGS.kitDemoSponsorRow, off). A real sponsor is a data change here
// — `sponsor: 'paid'` and the logo file — once one has actually paid.
const RAW: Array<Omit<Principle, 'sponsor'> & { own?: boolean; demoPaid?: boolean }> = [
  { n: '05', num: '5', name: 'a safe and respectful culture fostering belonging, attendance and participation', ready: true },
  { n: '07', num: '7', name: 'inclusive environments with continuous improvements to accessibility', ready: true, demoPaid: true },
  { n: '03', num: '3', name: 'high-quality adaptive teaching with curriculum designed for all learners', ready: false },
  { n: '04', num: '4', name: 'enriching provision beyond the classroom that all children can access', ready: false },
  { n: '02', num: '2', name: 'evidence-based support prioritising early intervention', ready: false },
  { n: '06', num: '6', name: 'strong partnerships with families and wider services', ready: false },
  { n: '01', num: '1', name: 'ambitious leadership and governance that embeds inclusion', ready: false, own: true },
];

export const PRINCIPLES: Principle[] = RAW.map(({ own, demoPaid, ...p }) => ({
  ...p,
  sponsor: own
    ? 'own'
    : demoPaid && SITE_FLAGS.kitDemoSponsorRow
      ? 'paid'
      : SITE_FLAGS.kitUnpaidRowText === 'open to a sponsor'
        ? 'open'
        : 'none',
}));

/** The lines a row shows for each sponsor state. */
export const SPONSOR_LINE: Record<Principle['sponsor'], string> = {
  own: "unbarrier's own. this one is never sponsored.",
  paid: 'free because of',
  open: 'open to a sponsor',
  none: '',
};

/** The role select. The value is what MailerLite stores. */
export const KIT_ROLES = [
  'headteacher',
  'deputy or assistant head',
  'senco or inclusion lead',
  'trust or mat role',
  'governor',
  'other',
] as const;

export type KitRole = (typeof KIT_ROLES)[number];

// ⚠️ THIS CONSTANT IS A CONSENT RECORD — the same rule as CONSENT_WORDING in
// lib/consent.ts. It is the label on the /kit notice checkbox AND the value
// written to `consent_wording` when that box is ticked, so the record and the
// screen cannot drift. It is deliberately NOT the site-wide CONSENT_WORDING:
// the kit form shows different words (the 5 Sep spec), and a record has to
// say what the person actually read. Changing it changes what future records
// claim; never back-fill the old ones.
//
// The words are the spec's, near-verbatim. Two things in them are Nici's to
// confirm: "fortnightly" (the subscribe block promises no cadence) and "the
// child" (the site says learners everywhere but the two founding lines).
export const KIT_CONSENT_WORDING =
  'send me notice — a fortnightly email for school leaders on inclusion that actually reaches the child. unsubscribe any time.';

/** Which form the consent came from — see lib/consent.ts consentSource. */
export const KIT_CONSENT_SOURCE = 'kit form · /kit';

/**
 * The `?from=` on the url, scrubbed, so a link in a talk or a newsletter can
 * say where the request came from. Stored on the subscriber (kit_source).
 * Anything that is not a short slug becomes "direct".
 */
export function kitSource(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const cleaned = (value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, 40);
  return cleaned || 'direct';
}
