import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addSubscriber } from '@/lib/mailerlite';
import { sendSayHi } from '@/lib/resend';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(1).max(2000),
  honeypot: z.string().max(0),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    // Treat honeypot trip as silent success.
    const honeypot =
      typeof body === 'object' &&
      body !== null &&
      'honeypot' in body &&
      typeof (body as { honeypot: unknown }).honeypot === 'string'
        ? ((body as { honeypot: string }).honeypot)
        : '';
    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const ip = clientIp(req.headers);
  const limit = rateLimit(`say-hi:${ip}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: 'rate-limited' },
      {
        status: 429,
        headers: limit.retryAfter
          ? { 'Retry-After': String(limit.retryAfter) }
          : undefined,
      },
    );
  }

  // Add to MailerLite (best effort — email forward is the priority).
  await addSubscriber(parsed.data.email);

  const sent = await sendSayHi(parsed.data.email, parsed.data.message);
  if (!sent.ok) {
    return NextResponse.json(
      { ok: false, error: 'send-failed' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
