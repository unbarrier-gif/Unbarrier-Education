'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { addSubscriber } from '@/lib/mailerlite';
import { CONSENT_WORDING, consentSource } from '@/lib/consent';
import { sendSayHi } from '@/lib/resend';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export type FormState =
  | { status: 'idle' }
  | { status: 'ok' }
  /**
   * `mailto: true` means we could not process the request and the person
   * should be offered a human fallback. It is NOT set for validation errors
   * (a missing tick, a malformed address) — pushing someone to email because
   * they forgot to tick a box loses the subscription and answers the wrong
   * question. Every genuine failure sets it.
   */
  | { status: 'error'; message: string; mailto?: boolean };

const newsletterSchema = z.object({
  email: z.string().email(),
  // The consent checkbox. An unchecked box submits nothing at all, so a
  // missing value is the unticked case — it must fail, never subscribe.
  // z.literal here rather than a loose truthiness check: the only acceptable
  // value is the one the checkbox sends.
  consent: z.literal('yes'),
  honeypot: z.string().max(0),
});

const NEWSLETTER_EMAIL_ERROR =
  'that email address doesn’t look right. check it and try again.';

// Not a failure — an instruction. No mailto: the fix is one tick away.
const NEWSLETTER_CONSENT_ERROR =
  'please tick the box to confirm you want notice.';

// A genuine failure. The component pairs this with a mailto fallback.
const NEWSLETTER_FAILURE =
  'we couldn’t sign you up just then. it’s us, not you —';

/**
 * `route` is BOUND SERVER-SIDE by the caller (NewsletterBand binds it before
 * passing the action to useFormState). It is deliberately not read from
 * formData, so it is not a field a submitter fills in. Take it for what it is:
 * provenance, recorded in good faith. The bind happens inside a client
 * component, so `consent_source` is not tamper-proof evidence and must not be
 * relied on as a security control.
 */
export async function subscribeAction(
  route: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get('email'),
    consent: formData.get('consent') ?? '',
    honeypot: formData.get('website') ?? '',
  });

  if (!parsed.success) {
    // Honeypot tripped → fake-success so bots learn nothing.
    if (String(formData.get('website') ?? '').length > 0) {
      return { status: 'ok' };
    }
    // Separate the two so the message names the actual problem. Neither
    // subscribes anyone: an unticked box is a hard stop, not a warning.
    const missingConsent = formData.get('consent') !== 'yes';
    return {
      status: 'error',
      message: missingConsent
        ? NEWSLETTER_CONSENT_ERROR
        : NEWSLETTER_EMAIL_ERROR,
    };
  }

  // Same limiter as say-hi, separate key so the two forms don't consume each
  // other's budget.
  const ip = clientIp(headers());
  const limit = rateLimit(`subscribe:${ip}`);
  if (!limit.ok) {
    return { status: 'error', message: NEWSLETTER_FAILURE, mailto: true };
  }

  const result = await addSubscriber(parsed.data.email, {
    // The wording written to the consent record is the same constant the
    // checkbox label renders — see lib/consent.ts.
    wording: CONSENT_WORDING,
    source: consentSource(route),
    ip,
  });
  if (!result.ok) {
    return { status: 'error', message: NEWSLETTER_FAILURE, mailto: true };
  }
  return { status: 'ok' };
}

const sayHiSchema = z.object({
  email: z.string().email(),
  message: z.string().min(1).max(2000),
  honeypot: z.string().max(0),
});

const SAY_HI_ERROR =
  "Couldn't send that. Email me directly: hello@unbarrier.me";

export async function sayHiAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = sayHiSchema.safeParse({
    email: formData.get('email'),
    message: formData.get('message'),
    honeypot: formData.get('website') ?? '',
  });

  if (!parsed.success) {
    // Honeypot tripped → fake-success so bots don't learn.
    const honeypot = String(formData.get('website') ?? '');
    if (honeypot.length > 0) {
      return { status: 'ok' };
    }
    return { status: 'error', message: SAY_HI_ERROR };
  }

  const ip = clientIp(headers());
  const limit = rateLimit(`say-hi:${ip}`);
  if (!limit.ok) {
    return { status: 'error', message: SAY_HI_ERROR };
  }

  // NO addSubscriber CALL HERE, AND THERE MUST NOT BE ONE. Sending a message
  // through a contact form is not consent to marketing. Adding the address to
  // the newsletter is bundled consent, which the consent spec forbids and UK
  // GDPR does not treat as valid. Subscribing happens on the subscribe block,
  // behind its own unticked box, or it does not happen.

  const sent = await sendSayHi(parsed.data.email, parsed.data.message);
  if (!sent.ok) {
    return { status: 'error', message: SAY_HI_ERROR };
  }
  return { status: 'ok' };
}
