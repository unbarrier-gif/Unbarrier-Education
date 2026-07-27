import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkAdminPasscode, adminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/isp-audit/adminAuth';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const schema = z.object({ passcode: z.string().min(1).max(200) });

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const limit = rateLimit(`isp-audit-login:${ip}`);
  if (!limit.ok) {
    return NextResponse.json({ ok: false, error: 'rate-limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success || !checkAdminPasscode(parsed.data.passcode)) {
    return NextResponse.json({ ok: false, error: 'invalid-passcode' }, { status: 401 });
  }

  // Store a hash of the key, not the raw passcode the user just typed.
  const token = adminSessionToken();
  if (!token) {
    return NextResponse.json({ ok: false, error: 'not-configured' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    // Needs to reach both /isp-audit/dashboard and /api/isp-audit/export.
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
