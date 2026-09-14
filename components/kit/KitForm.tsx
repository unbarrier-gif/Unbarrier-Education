'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { kitAction, type KitField, type KitState } from '@/app/kit/actions';
import { KIT_CONSENT_WORDING, KIT_ROLES } from '@/lib/kit';
import styles from './KitForm.module.css';

// The /kit request form (k4). Four fields, one unticked box, one button.
//
// ERRORS ARE TEXT, AND FOCUS MOVES. A failed submit renders a summary
// (role="alert") that takes focus, each line a link to its field, and the
// same message under the field with aria-invalid on the control. The
// browser's own tooltips are off (noValidate) so the messages are ours and
// reachable. Success swaps the form for the confirmation (role="status"),
// which takes focus, so a screen reader hears it.
//
// THE CONSENT BOX starts unticked, is never required, and its label is
// KIT_CONSENT_WORDING — the constant written to the consent record when it
// is ticked (lib/kit.ts). Ticking nothing still gets the guides.
//
// `source` is bound to the action here, the way NewsletterBand binds its
// route: provenance in good faith, not a security control.

const initialState: KitState = { status: 'idle' };

const FALLBACK_EMAIL = 'nici@unbarrier.me';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      {pending ? 'sending…' : 'get the guides'}
    </button>
  );
}

type Props = {
  /** The scrubbed `?from=` slug, or "direct". */
  source: string;
};

export function KitForm({ source }: Props) {
  const [state, formAction] = useFormState(
    kitAction.bind(null, source),
    initialState,
  );
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === 'invalid') summaryRef.current?.focus();
    if (state.status === 'ok') {
      doneRef.current?.focus();
      if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
        window.plausible('kit_request');
      }
    }
  }, [state]);

  if (state.status === 'ok') {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className={styles.done}>
        <p className={styles.doneHeading}>check your inbox.</p>
        <p className={styles.doneBody}>
          if it isn&rsquo;t there in five minutes, look in junk, and mark it
          not junk so the rest arrive.
        </p>
        {state.consented && (
          <p className={styles.doneBody}>
            you&rsquo;re on notice too. one click unsubscribes, any time.
          </p>
        )}
      </div>
    );
  }

  const errors = state.status === 'invalid' ? state.errors : [];
  const bad = (field: KitField) => errors.some((e) => e.field === field);
  const errorId = (field: KitField) => (bad(field) ? `kit-${field}-error` : undefined);

  return (
    <form action={formAction} className={styles.form} noValidate>
      {errors.length > 0 && (
        <div
          ref={summaryRef}
          id="kit-errors"
          tabIndex={-1}
          role="alert"
          className={styles.summary}
        >
          <p className={styles.summaryHeading}>
            a few things to fix before we can send them:
          </p>
          <ul className={styles.summaryList}>
            {errors.map((e) => (
              <li key={e.field}>
                <a href={`#kit-${e.field}`}>{e.text}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="kit-name" className={styles.label}>
          name
        </label>
        <input
          id="kit-name"
          name="name"
          type="text"
          autoComplete="name"
          className={styles.input}
          aria-invalid={bad('name') || undefined}
          aria-describedby={errorId('name')}
        />
        {bad('name') && (
          <p id="kit-name-error" className={styles.fieldError}>
            we need a name to address the email to.
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="kit-school" className={styles.label}>
          school
        </label>
        <input
          id="kit-school"
          name="school"
          type="text"
          autoComplete="organization"
          className={styles.input}
          aria-invalid={bad('school') || undefined}
          aria-describedby={errorId('school')}
        />
        {bad('school') && (
          <p id="kit-school-error" className={styles.fieldError}>
            which school is this for?
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="kit-role" className={styles.label}>
          role
        </label>
        <select
          id="kit-role"
          name="role"
          defaultValue=""
          className={styles.select}
          aria-invalid={bad('role') || undefined}
          aria-describedby={errorId('role')}
        >
          <option value="" disabled>
            choose one
          </option>
          {KIT_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {bad('role') && (
          <p id="kit-role-error" className={styles.fieldError}>
            pick the one closest to your job.
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="kit-email" className={styles.label}>
          email
        </label>
        <input
          id="kit-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          className={styles.input}
          aria-invalid={bad('email') || undefined}
          aria-describedby={errorId('email')}
        />
        {bad('email') && (
          <p id="kit-email-error" className={styles.fieldError}>
            that doesn&rsquo;t look like an email address. any address works,
            including a personal one.
          </p>
        )}
      </div>

      {/* Unticked by default. No defaultChecked. Never required. */}
      <label htmlFor="kit-consent" className={styles.consentRow}>
        <input
          id="kit-consent"
          name="consent"
          type="checkbox"
          className={styles.checkbox}
        />
        <span className={styles.consentLabel}>{KIT_CONSENT_WORDING}</span>
      </label>

      {/* honeypot */}
      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className={styles.submitRow}>
        <SubmitButton />
        {state.status === 'error' && (
          <p className={styles.failure} role="alert">
            {state.message}{' '}
            <a href={`mailto:${FALLBACK_EMAIL}`}>
              email {FALLBACK_EMAIL} and we&rsquo;ll send them by hand.
            </a>
          </p>
        )}
        <p className={styles.privacy}>
          we&rsquo;ll send the guides to that address. we won&rsquo;t sell your
          details, share them with a sponsor, or add you to anything you
          didn&rsquo;t tick.{' '}
          <Link href="/legal/privacy">how we handle your data →</Link>
        </p>
      </div>
    </form>
  );
}
