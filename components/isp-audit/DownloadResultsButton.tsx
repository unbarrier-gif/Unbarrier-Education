'use client';

import styles from './DownloadResultsButton.module.css';

// The results page carries print styles that lay it out on a single A4 page,
// so "download" is the browser's own print-to-PDF: desktop/Android offer
// "Save as PDF", iOS offers "Save to Files". The browser derives the suggested
// filename from document.title, so we swap it to the desired name for the
// duration of the print dialog and restore it afterwards.
export default function DownloadResultsButton({ filename }: { filename: string }) {
  function download() {
    const previous = document.title;
    document.title = filename;
    const restore = () => {
      document.title = previous;
      window.removeEventListener('afterprint', restore);
    };
    window.addEventListener('afterprint', restore);
    window.print();
    // Fallback in case afterprint doesn't fire (some browsers).
    window.setTimeout(restore, 1000);
  }

  return (
    <button type="button" className={styles.button} onClick={download}>
      <span aria-hidden="true">⬇</span> Download (PDF)
    </button>
  );
}
