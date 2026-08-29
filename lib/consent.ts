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
export const CONSENT_SOURCE_SUBSCRIBE_BLOCK = 'subscribe block';
