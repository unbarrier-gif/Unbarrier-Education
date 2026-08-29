// The single booking surface for the whole site.
//
// TidyCal was retired as the booking surface on 21 Aug 2026. Google Calendar
// replaced it, and /inclusion-strategy (#67) was the first page to use the new
// link — as a hardcoded string. Lifted here so there is exactly one place to
// change it the next time the tool changes.
//
// STANDING RULE: every "book a discovery call" button on every page uses this
// constant. A button that says "book" must open a booking page, not an email
// client — the label says book, the action has to match. mailto: is fine for a
// genuine "email us"; it is never fine behind a button that says book.
export const BOOKING_URL = 'https://calendar.app.google/WEZqBDRFhPFzsqUw5';

/** The approved label. Kept next to the URL so the two never drift apart. */
export const BOOKING_LABEL = 'book a discovery call →';
