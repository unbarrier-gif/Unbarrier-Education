'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { subscribeAction, type FormState } from '@/app/actions';
import { CONSENT_WORDING } from '@/lib/consent';
import styles from './NewsletterBand.module.css';

// The subscribe block. Copy is verbatim from the subscribe + consent spec
// (28 Aug 2026).
//
// FOUR THINGS HERE ARE CONSENT MECHANICS, NOT STYLING:
//
//  1. The checkbox starts UNTICKED and has no `defaultChecked`. A pre-ticked
//     box is not consent. Never add one.
//  2. Its label is CONSENT_WORDING — the same constant written to the
//     subscriber's consent_wording field, so the record and the screen cannot
//     drift. See lib/consent.ts.
//  3. The controller is named in the block itself — "unbarrier education ltd
//     (company no. 16603630)" — not only in the privacy notice, and the
//     privacy notice is linked from here rather than only from the footer.
//  4. Subscribing is not bundled with anything. This block asks for one thing.
//
// The form keeps `noValidate` so a failed submit shows our own message rather
// than a browser tooltip. `required` on the checkbox stays for assistive tech;
// the server is what actually enforces it.
//
// TWO WEIGHTS, ONE BLOCK — never two components. The wording, the checkbox and
// everything above is identical on every page; `weight` changes presentation
// only:
//   * `full`     — pages where the reader has just been given something free
//                  (/blog, a post, /hello, /belonging-check). Carries the
//                  decorative notice banner.
//   * `standard` — the default, for offer pages. No banner: that asset is a
//                  /hello-era graphic and it would outweigh the page's own
//                  call to action on a page that is selling something.
//
// `route` is REQUIRED so no page can quietly ship a signup whose consent
// record cannot name the page it came from. It is bound to the server action
// below, server-side — see app/actions.ts.
//
// COPY OVERRIDES (added for /notice, 2 Sep 2026). Every copy slot the block
// renders can be replaced through an optional prop, and every default is the
// literal that shipped, so the twelve existing routes render byte-identically
// when no override is passed. /notice is the one sentence-case page on the
// site and needs the approved sign-up copy in these slots rather than the
// lowercase site copy. The overrides are PRESENTATION: they never touch the
// consent checkbox label, which is CONSENT_WORDING and IS the consent record,
// and they never touch what the server action captures.

const FALLBACK_EMAIL = 'nici@unbarrier.me';

const initialState: FormState = { status: 'idle' };

type Weight = 'standard' | 'full';

type HeadingLevel = 'h1' | 'h2';

type Props = {
  /** The route this block is rendered on, e.g. "/blog" or "/blog/some-slug". */
  route: string;
  /** Presentation only. Never changes what consent is captured. */
  weight?: Weight;

  // ── copy overrides — all optional, all default to the shipped literal ──
  /** The block heading. Default "notice". */
  heading?: string;
  /**
   * Element for the heading. Default `h2`: on every existing route the block
   * sits under the page's own h1. A page that is nothing but this block
   * (/notice) passes `h1` so the page has one.
   */
  headingLevel?: HeadingLevel;
  /** The line under the heading. */
  sub?: string;
  /** Accessible name and placeholder of the email field. Default "email address". */
  emailLabel?: string;
  /** Submit button. Default "subscribe →". */
  buttonLabel?: string;
  /** Submit button while the action is in flight. Default "subscribing…". */
  buttonPendingLabel?: string;
  /**
   * A short line directly under the button. Rendered ONLY when given — the
   * default block has no such line, so omitting it changes nothing.
   */
  note?: string;
  /** The message shown after a successful submit. Double opt-in: it must not claim the person is subscribed. */
  successMessage?: string;
  /**
   * The sentences of the privacy paragraph, before the privacy-notice link.
   * The link itself always points at /legal/privacy and cannot be moved.
   * NOTE: the default sentence is where mechanic 3 above names the controller
   * in the block. An override replaces that sentence, so a page passing this
   * is choosing to name the controller elsewhere (on /notice: the footer).
   */
  privacy?: string;
  /** Text of the privacy-notice link. Default "privacy notice". */
  privacyLinkLabel?: string;
};

// Double opt-in: nobody is subscribed until they click the link in the
// confirmation email, so the success message must not claim they are.
const DEFAULT_SUCCESS =
  'almost there — check your inbox and click the confirmation link. you’re not on the list until you do.';

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? pendingLabel : label}
    </button>
  );
}

export function NewsletterBand({
  route,
  weight = 'standard',
  heading = 'notice',
  headingLevel = 'h2',
  sub,
  emailLabel = 'email address',
  buttonLabel = 'subscribe →',
  buttonPendingLabel = 'subscribing…',
  note,
  successMessage = DEFAULT_SUCCESS,
  privacy,
  privacyLinkLabel = 'privacy notice',
}: Props) {
  const Heading = headingLevel;
  // Bound server-side: the route reaches the action as a bound argument rather
  // than as a form field, so it is not something a submitter types in. That
  // makes consent_source provenance recorded in good faith — nothing stronger.
  // This bind sits in a client component, so it is not tamper-proof evidence
  // and not a security control. Never call it unforgeable.
  const [state, formAction] = useFormState(
    subscribeAction.bind(null, route),
    initialState,
  );
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
    <section
      className={`${styles.band} ${weight === 'full' ? styles.full : styles.standard}`}
      aria-labelledby="newsletter-heading"
    >
      <div className={styles.inner}>
        {/* Decorative: the heading below carries the same word. `full` only —
            see the weight note above. */}
        {weight === 'full' && (
          <Image
            src="/assets/hello/notice-banner.webp"
            alt=""
            aria-hidden="true"
            width={900}
            height={180}
            className={styles.banner}
          />
        )}

        <Heading id="newsletter-heading" className={styles.heading}>
          {heading}
        </Heading>
        <p className={styles.sub}>
          {sub ?? (
            <>
              one email when there is something worth saying. nothing when
              there isn&rsquo;t. written for people who don&rsquo;t have time
              to read it twice.
            </>
          )}
        </p>

        <form
          ref={formRef}
          action={formAction}
          className={styles.form}
          noValidate
        >
          <div className={styles.fields}>
            <label htmlFor="newsletter-email" className={styles.srOnly}>
              {emailLabel}
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder={emailLabel}
              autoComplete="email"
              className={styles.input}
            />
          </div>

          {/* Unticked by default. No defaultChecked — see the header comment. */}
          <div className={styles.consentRow}>
            <input
              id="newsletter-consent"
              type="checkbox"
              name="consent"
              value="yes"
              required
              className={styles.checkbox}
            />
            <label htmlFor="newsletter-consent" className={styles.consentLabel}>
              {CONSENT_WORDING}
            </label>
          </div>

          <SubmitButton label={buttonLabel} pendingLabel={buttonPendingLabel} />

          {/* Only /notice passes this. Nothing renders here otherwise. */}
          {note && <p className={styles.note}>{note}</p>}

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
          {/* See DEFAULT_SUCCESS: an override must keep the same promise. */}
          {state.status === 'ok' && successMessage}
          {state.status === 'error' && (
            <>
              {state.message}
              {/* Never a thank-you on failure. A genuine failure offers a
                  human instead; a validation error does not, because the fix
                  is on the form. */}
              {state.mailto && (
                <>
                  {' '}
                  <a href={`mailto:${FALLBACK_EMAIL}`} className={styles.statusLink}>
                    email {FALLBACK_EMAIL} and we&rsquo;ll add you by hand.
                  </a>
                </>
              )}
            </>
          )}
        </p>

        <p className={styles.consent}>
          {privacy ?? (
            <>
              unbarrier education ltd (company no.&nbsp;16603630) will use
              your email address only to send you notice. we won&rsquo;t pass
              it to anyone else, and every email has a one-click unsubscribe.
            </>
          )}{' '}
          <Link href="/legal/privacy">{privacyLinkLabel}</Link>
        </p>
      </div>
    </section>
  );
}
