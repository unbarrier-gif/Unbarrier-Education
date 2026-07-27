import { cookies } from 'next/headers';
import { createHash, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'isp_audit_admin';

// The session cookie stores a hash of the admin key, never the raw passcode —
// so the literal secret never sits in the browser, and a leaked cookie can't
// be replayed as the passcode itself.
function tokenFor(key: string): string {
  return createHash('sha256').update(`isp-audit:v1:${key}`).digest('hex');
}

// Constant-time comparison of two equal-length hex strings.
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/**
 * True only when an admin key is configured AND the request carries a session
 * cookie whose token matches it. Fails closed: with no ISP_AUDIT_ADMIN_KEY set,
 * or no/again-wrong cookie, this returns false and no response data is shown.
 */
export function isAdminAuthed(): boolean {
  const key = process.env.ISP_AUDIT_ADMIN_KEY;
  if (!key) return false;
  const cookie = cookies().get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  return safeEqual(cookie, tokenFor(key));
}

/** True only when a key is configured and the submitted passcode matches it. */
export function checkAdminPasscode(passcode: string): boolean {
  const key = process.env.ISP_AUDIT_ADMIN_KEY;
  if (!key) return false;
  // Hash both sides so timingSafeEqual gets equal-length inputs and the
  // comparison leaks neither length nor content through timing.
  return safeEqual(tokenFor(passcode), tokenFor(key));
}

/** The value to store in the session cookie once a passcode is accepted. */
export function adminSessionToken(): string | null {
  const key = process.env.ISP_AUDIT_ADMIN_KEY;
  return key ? tokenFor(key) : null;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
