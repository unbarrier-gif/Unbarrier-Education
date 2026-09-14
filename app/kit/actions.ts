'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { addKitSubscriber } from '@/lib/mailerlite';
import { KIT_CONSENT_SOURCE, KIT_CONSENT_WORDING, KIT_ROLES } from '@/lib/kit';
import { clientIp, rateLimit } from '@/lib/rateLimit';

// The /kit form. One thing happens on submit: the address joins the kit
// group, and the MailerLite automation on that group sends the guides. If
// the notice box was ticked — and only then — the address also joins the
// notice group, with the consent record written (see lib/kit.ts).
//
// NO BUNDLING. Requesting the guides is purpose 1 (send me what I asked
// for). The notice tick is purpose 2, starts unticked, and is never required.
// Ticking nothing still gets the guides.

export type KitField = 'name' | 'school' | 'role' | 'email';

export type KitError = { field: KitField; text: string };

export type KitState =
  | { status: 'idle' }
  | { status: 'ok'; consented: boolean }
  /** Validation: the fixes are on the form, so no human fallback is offered. */
  | { status: 'invalid'; errors: KitError[] }
  /** A genuine failure. The component pairs it with a mailto fallback. */
  | { status: 'error'; message: string };

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  school: z.string().trim().min(1).max(160),
  role: z.enum(KIT_ROLES),
  email: z.string().trim().email().max(254),
  consent: z.literal('on').optional(),
  honeypot: z.string().max(0),
});

// The text of each error, in the summary and under the field. The summary's
// versions are short because they are links; the field's say what to do.
const ERRORS: Record<KitField, string> = {
  name: 'add your name',
  school: 'add your school',
  role: 'choose a role',
  email: 'check the email address',
};

const ORDER: KitField[] = ['name', 'school', 'role', 'email'];

const FAILURE = 'we couldn’t send them just then. it’s us, not you —';

/**
 * `source` is BOUND SERVER-SIDE by the page (the scrubbed `?from=`), so it is
 * not a field a submitter types in. Provenance recorded in good faith, no
 * more — see the same note on subscribeAction in app/actions.ts.
 */
export async function kitAction(
  source: string,
  _prev: KitState,
  formData: FormData,
): Promise<KitState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    school: String(formData.get('school') ?? ''),
    role: String(formData.get('role') ?? ''),
    email: String(formData.get('email') ?? ''),
    consent: formData.get('consent') === 'on' ? ('on' as const) : undefined,
    honeypot: String(formData.get('website') ?? ''),
  };

  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    // Honeypot tripped → fake success so bots learn nothing.
    if (raw.honeypot.length > 0) return { status: 'ok', consented: false };
    const bad = new Set(
      parsed.error.issues
        .map((issue) => issue.path[0])
        .filter((p): p is KitField => ORDER.includes(p as KitField)),
    );
    return {
      status: 'invalid',
      errors: ORDER.filter((f) => bad.has(f)).map((field) => ({
        field,
        text: ERRORS[field],
      })),
    };
  }

  const ip = clientIp(headers());
  if (!rateLimit(`kit:${ip}`).ok) {
    return { status: 'error', message: FAILURE };
  }

  const v = parsed.data;
  const consented = v.consent === 'on';
  const result = await addKitSubscriber(
    v.email,
    { name: v.name, school: v.school, role: v.role, source },
    consented
      ? { wording: KIT_CONSENT_WORDING, source: KIT_CONSENT_SOURCE, ip }
      : null,
  );
  if (!result.ok) return { status: 'error', message: FAILURE };
  return { status: 'ok', consented };
}
