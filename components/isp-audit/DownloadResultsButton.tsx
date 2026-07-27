'use client';

import styles from './DownloadResultsButton.module.css';

// The results page carries print styles that lay it out exactly like the
// target PDF, so "download" is the browser's own print-to-PDF: on desktop and
// Android the print dialog offers "Save as PDF"; on iOS the share sheet offers
// "Save to Files". No server-side PDF generation needed, and it always matches
// what the respondent sees.
export default function DownloadResultsButton() {
  return (
    <button type="button" className={styles.button} onClick={() => window.print()}>
      <span aria-hidden="true">⬇</span> Download (PDF)
    </button>
  );
}
