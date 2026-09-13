// The printable documents served as pdfs at stable urls. Each is built from a
// source html in docs/print/ by scripts/build-pdfs.sh (headless Chromium, no
// npm dependency) and committed under public/. If a document changes, rebuild
// the pdf and commit it; the url never changes, so nothing linked or printed
// needs updating.

/** The discovery day — what it is and why (mainstream). Linked from /audit. */
export const DISCOVERY_DAY_PDF = '/discovery-day.pdf';

/** The voice baseline — the three-page client-facing paper. */
export const VOICE_BASELINE_PDF = '/voice-baseline.pdf';
