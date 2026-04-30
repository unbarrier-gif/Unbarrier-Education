'use client';

import Link from 'next/link';
import styles from './NewsletterBand.module.css';

const MAILERLITE_FORM_URL =
  'https://preview.mailerlite.io/forms/1438334/185568935471482009/share';

function handleClick() {
  if (
    typeof window !== 'undefined' &&
    typeof window.plausible === 'function'
  ) {
    window.plausible('newsletter_signup');
  }
}

export function NewsletterBand() {
  return (
    <section className={styles.band} aria-labelledby="newsletter-heading">
      <div className={styles.inner}>
        <h2 id="newsletter-heading" className={styles.heading}>
          One note from me, once a month.
        </h2>
        <p className={styles.sub}>
          Maybe less. Never more. Unsubscribe anytime.
        </p>

        <p className={styles.consent}>
          Yes, send me the Loop Breakers newsletter from Nici Foote
          (Unbarrier Education Ltd) — practical writing on neurodiversity,
          belonging, and inclusion. Unsubscribe any time. Privacy:{' '}
          <Link href="/legal/privacy">unbarrier.me/legal/privacy</Link>
        </p>

        <a
          href={MAILERLITE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={styles.button}
        >
          Sign me up
        </a>
      </div>
    </section>
  );
}
