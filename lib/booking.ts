// Every booking button on the site links /book — never the calendar url
// directly (decided 13 Sep 2026). /book is a 307 in next.config.js to the
// live Google Calendar appointment schedule, so the calendar can change
// without a single button, pdf or printed QR code needing to change with it.
//
// Rendered as a plain <a>, not a next/link, because the destination is a
// redirect to another origin: pass `external` to <Button>.
export const BOOKING_URL = '/book';

/** The approved label. Kept next to the URL so the two never drift apart. */
export const BOOKING_LABEL = 'book a discovery call →';
