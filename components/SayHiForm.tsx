'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { sayHiAction, type FormState } from '@/app/hello/actions';
import styles from './SayHiForm.module.css';

const initialState: FormState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? 'Sending…' : 'Send'}
    </button>
  );
}

export function SayHiForm() {
  const [state, formAction] = useFormState(sayHiAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'ok') {
      formRef.current?.reset();
      if (
        typeof window !== 'undefined' &&
        typeof window.plausible === 'function'
      ) {
        window.plausible('say_hi_sent');
      }
    }
  }, [state]);

  return (
    <section className={styles.band} aria-labelledby="sayhi-heading">
      <div className={styles.inner}>
        <h2 id="sayhi-heading" className={styles.heading}>
          Just say hi.
        </h2>
        <p className={styles.sub}>
          No agenda. Drop a line. I read every one.
        </p>

        <form ref={formRef} action={formAction} className={styles.form} noValidate>
          <label htmlFor="sayhi-email" className={styles.srOnly}>
            Email address
          </label>
          <input
            id="sayhi-email"
            type="email"
            name="email"
            required
            placeholder="your email"
            autoComplete="email"
            className={styles.input}
          />

          <label htmlFor="sayhi-message" className={styles.srOnly}>
            Your message
          </label>
          <textarea
            id="sayhi-message"
            name="message"
            required
            placeholder="what's on your mind?"
            rows={5}
            maxLength={2000}
            className={styles.textarea}
          />

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

          <div className={styles.submitRow}>
            <p className={styles.privacyNote}>
              We use your email only to reply.{' '}
              <Link href="/legal/privacy" className={styles.privacyLink}>
                Privacy notice
              </Link>
              .
            </p>
            <SubmitButton />
          </div>
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
            "Thanks — got it. I'll reply within 2 working days."}
          {state.status === 'error' && state.message}
        </p>
      </div>
    </section>
  );
}
