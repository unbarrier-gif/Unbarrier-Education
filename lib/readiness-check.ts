// The readiness check does not exist yet. It is branch E — the public baseline
// config of the ISP audit engine already merged into feat/hello.
//
// The approved copy gives /audit a PRIMARY cta of "take the free readiness
// check". Shipping that label pointed at a route that 404s is the exact bug
// this branch exists to fix, so the destination sits behind this flag instead.
//
// WHILE THE FLAG IS OFF: the cta falls back to the booking link AND the label
// falls back with it. The label and the destination move together — a button
// saying "take the free readiness check" that opens a calendar is the same
// broken promise as a "book" button that opens an email client.
//
// BRANCH E, 31 AUG 2026: /readiness-check is built, so the flag is on and the
// label and the destination move together as designed. Nothing else on /audit
// was touched, exactly as this comment promised.
//
// Turning this back to false is a safe, complete rollback: the cta reverts to
// the booking link AND the label reverts with it. Do that rather than editing
// copy if the check ever has to come down.
export const READINESS_CHECK_ENABLED = true;

export const READINESS_CHECK_HREF = '/readiness-check';

export const READINESS_CHECK_LABEL = 'take the free readiness check →';
