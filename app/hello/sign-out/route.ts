import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/isp-audit/adminAuth';

export const runtime = 'nodejs';

// /hello/sign-out — clears the admin cookie and returns to the login gate.
// A GET, so it can be a plain link on the signed-in screen.
export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL('/hello/admin', req.url), 303);
  res.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}
