import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Multi-zone routing for a single Next.js app.
//
//  unbarrier.me            → routes at the app root (app/page.tsx, app/hello, …)
//  loop.unbarrier.me       → rewrites /<path> to /loop/<path>
//                            (sourced from app/loop/*)
//
// Direct hits to /loop/* on the main domain are 308-redirected to
// loop.unbarrier.me so there's only one canonical URL per piece of content.
//
// Vercel previews don't have the subdomain. To exercise loop content on a
// preview URL, hit the path directly: https://<preview>.vercel.app/loop/...
// — middleware skips the host check when the host is a vercel.app preview.

const LOOP_HOSTS = new Set([
  'loop.unbarrier.me',
  'www.loop.unbarrier.me',
]);

const MAIN_HOSTS = new Set([
  'unbarrier.me',
  'www.unbarrier.me',
]);

export const config = {
  // Run on everything except static assets, the Next image optimiser,
  // and the say-hi API route (which is shared infrastructure).
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|api).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = (req.headers.get('host') ?? '').toLowerCase();

  // Loop subdomain → rewrite into /loop/* under the hood.
  if (LOOP_HOSTS.has(host)) {
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/loop';
    } else if (!url.pathname.startsWith('/loop')) {
      url.pathname = `/loop${url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Main domain hitting /loop/* → redirect to the canonical subdomain URL.
  if (MAIN_HOSTS.has(host) && url.pathname.startsWith('/loop')) {
    const dest = new URL(url.toString());
    dest.host = 'loop.unbarrier.me';
    dest.pathname = url.pathname.replace(/^\/loop/, '') || '/';
    return NextResponse.redirect(dest, 308);
  }

  return NextResponse.next();
}
