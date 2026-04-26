'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { addSubscriber } from '@/lib/mailerlite';
import { sendSayHi } from '@/lib/resend';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export type FormState =
  | { status: 'idle' }
  | { status: 'ok' }
  | { status: 'error'; message: string };

const newsletterSchema = z.object({
  email: z.string().email(),
  honeypot: z.string().max(0),
});

const NEWSLETTER_ERROR =
  'Something glitched. Try again or just say hi below.';

export async function subscribeAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get('email'),
    honeypot: formData.get('company') ?? '',
  });

  if (!parsed.success) {
    return { status: 'error', message: NEWSLETTER_ERROR };
  }

  const result = await addSubscriber(parsed.data.email);
  if (!result.ok) {
    return { status: 'error', message: NEWSLETTER_ERROR };
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
    honeypot: formData.get('company') ?? '',
  });

  if (!parsed.success) {
    // Honeypot tripped → fake-success so bots don't learn.
    const honeypot = String(formData.get('company') ?? '');
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

  // Add to MailerLite (ignore failure — the email forward is the priority).
  await addSubscriber(parsed.data.email);

  const sent = await sendSayHi(parsed.data.email, parsed.data.message);
  if (!sent.ok) {
    return { status: 'error', message: SAY_HI_ERROR };
  }
  return { status: 'ok' };
}
