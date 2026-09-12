// design-sync host adapter for `@/app/actions`. The real module is a Next.js
// server-action file (Resend, MailerLite, rate limiting) and cannot run in a
// browser bundle. Designs built with the DS get inert forms that resolve to
// the success state, so the success copy can be designed and reviewed.
export type FormState =
  | { status: 'idle' }
  | { status: 'ok' }
  | { status: 'error'; message: string; mailto?: boolean };

async function inert(): Promise<FormState> {
  await new Promise((r) => setTimeout(r, 400));
  return { status: 'ok' };
}

export async function subscribeAction(_prev: FormState, _formData: FormData): Promise<FormState> {
  return inert();
}

export async function sayHiAction(_prev: FormState, _formData: FormData): Promise<FormState> {
  return inert();
}
