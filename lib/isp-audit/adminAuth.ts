import { cookies } from 'next/headers';

const COOKIE_NAME = 'isp_audit_admin';

export function isAdminAuthed(): boolean {
  const key = process.env.ISP_AUDIT_ADMIN_KEY;
  if (!key) return false;
  return cookies().get(COOKIE_NAME)?.value === key;
}

export function checkAdminPasscode(passcode: string): boolean {
  const key = process.env.ISP_AUDIT_ADMIN_KEY;
  return Boolean(key) && passcode === key;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
