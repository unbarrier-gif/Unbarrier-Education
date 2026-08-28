'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { subscribeAction, type FormState } from '@/app/hello/actions';
import styles from './NewsletterBand.module.css';

const initialState: FormState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? 'Signing up…' : 'Sign me up'}
    </button>
  );
}

export function NewsletterBand() {
  const [state, formAction] = useFormState(subscribeAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'ok') {
      formRef.current?.reset();
      if (
        typeof window !== 'undefined' &&
        typeof window.plausible === 'function'
      ) {
        window.plausible('newsletter_signup');
      }
    }
  }, [state]);

  return (
    <section className={styles.band} aria-labelledby="newsletter-heading">
      <div className={styles.inner}>
        {/* Decorative: the heading below carries the same words. */}
        <img
          src="/assets/hello/notice-banner.webp"
          alt=""
          aria-hidden="true"
          className={styles.banner}
          loading="lazy"
          decoding="async"
        />

        <h2 id="newsletter-heading" className={styles.heading}>
          One note from me, once a month.
        </h2>
        <p className={styles.sub}>
          Maybe less. Never more. The first one goes out 9 September.
        </p>

        <p className={styles.consent}>
          Yes, send me notice — the monthly letter from Nici Foote (Unbarrier
          Education Ltd) on inclusion, belonging, and what actually reaches the
          child. Unsubscribe any time. Privacy:{' '}
          <Link href="/legal/privacy">unbarrier.me/legal/privacy</Link>
        </p>

        <form
          ref={formRef}
          action={formAction}
          className={styles.form}
          noValidate
        >
          <div className={styles.fields}>
            <label htmlFor="newsletter-email" className={styles.srOnly}>
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="your email"
              autoComplete="email"
              className={styles.input}
            />

            <SubmitButton />
          </div>

          {/* honeypot */}
          <label className={styles.honeypot} aria-hidden="true">
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </form>

        <p
          className={`${styles.status} ${
            state.status === 'ok'
              ? styles.statusOk
              : state.status === 'error'
                ? styles.statusError
                : ''
          }`}
          role="status"
          aria-live="polite"
        >
          {state.status === 'ok' &&
            "You're on the list. One note a month — that's it."}
          {state.status === 'error' && state.message}
        </p>
      </div>
    </section>
  );
}
