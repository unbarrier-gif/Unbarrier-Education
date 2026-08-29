// The newsletter consent wording, versioned.
//
// ⚠️ THIS CONSTANT IS THE CONSENT RECORD. Its value is written to the
// `consent_wording` field on every subscriber, and it is also the text
// rendered as the checkbox label. One constant, both places, so the record and
// the screen cannot drift apart — the whole point of logging wording is being
// able to show what a person actually saw on the day they ticked the box.
//
// CHANGING THIS STRING CHANGES WHAT FUTURE CONSENT RECORDS CLAIM. That is
// allowed — wording gets revised. What is NOT allowed is rewriting the records
// already written: a subscriber's `consent_wording` must keep saying what was
// on screen when THEY consented, not what the current label happens to say.
// Never back-fill, never bulk-update the field in MailerLite. If the wording
// changes materially, the honest options are to leave existing records alone
// (they remain accurate for their date) or to re-seek consent.
export const CONSENT_WORDING =
  'yes, send me notice. i can unsubscribe from any email.';

// Which form the consent came from. Written to `consent_source` so a record
// can be traced back to the surface that collected it — the spec's rule that
// subscribing is never bundled with anything else only holds if we can show
// which form it came from.
//
// This stays the PREFIX rather than the whole value, so records written when
// the block lived only on /hello remain directly comparable with records
// written now it is on twelve routes. Do not change it.
export const CONSENT_SOURCE_SUBSCRIBE_BLOCK = 'subscribe block';

/**
 * The `consent_source` value for a signup, e.g.
 *   "subscribe block · /blog/planned-is-not-the-same-as-received"
 *
 * On one page the bare prefix was enough. On twelve it is not: a consent
 * record has to name the surface that collected it, or "which page was this
 * person actually looking at" becomes unanswerable.
 *
 * `route` is supplied by the page and bound to the server action server-side —
 * it never arrives as form input, so it cannot be forged by a submitter. The
 * scrub below is belt-and-braces against a bad literal in a page, not against
 * an attacker: a consent record is evidence, and evidence should not be able
 * to contain arbitrary text.
 */
export function consentSource(route: string): string {
  const cleaned = route
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9/_-]/g, '')
    .slice(0, 80);
  return `${CONSENT_SOURCE_SUBSCRIBE_BLOCK} · ${cleaned || 'unknown-route'}`;
}
