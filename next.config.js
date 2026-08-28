/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'loop-breakers.unbarrier.me' }],
        destination: 'https://www.unbarrier.me/hello',
        permanent: true,
      },
      // loop.unbarrier.me is retired (28 Aug 2026). The whole subdomain 301s
      // to the holding page — every path, including the root and anything
      // that would previously have 404'd, so nothing on it can render.
      //
      // Deliberately here in version control rather than as a Vercel
      // dashboard redirect: this is reviewable in a diff, a dashboard rule is
      // invisible to whoever comes next.
      //
      // These run before middleware and before the filesystem, which is why
      // deleting app/loop/ is safe — the redirect answers first.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'loop.unbarrier.me' }],
        destination: 'https://www.unbarrier.me/loop-breakers',
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.loop.unbarrier.me' }],
        destination: 'https://www.unbarrier.me/loop-breakers',
        statusCode: 301,
      },
      // The same content used to be reachable at unbarrier.me/loop/* , which
      // middleware 308'd to the subdomain. Middleware is gone, so these two
      // now go straight to the holding page instead of taking two hops.
      // `/loop` and `/loop/:path*` do not match `/loop-breakers` — different
      // path segment.
      {
        source: '/loop',
        destination: '/loop-breakers',
        statusCode: 301,
      },
      {
        source: '/loop/:path*',
        destination: '/loop-breakers',
        statusCode: 301,
      },
      // Loop Breakers is fully retired (28 Aug 2026). Every surface it had
      // 301s to the /loop-breakers holding page instead of 404ing, so links
      // from search, bookmarks, old newsletters and the guest hosts' own
      // direct links all land on "paused".
      //
      // `statusCode: 301` rather than `permanent: true` — the latter emits
      // 308, and the handoff specified 301.
      //
      // The pages behind these are deleted; the redirects are the route now.
      // Each surface is listed twice (bare + `:path*`) so the index and every
      // child path are covered explicitly rather than relying on `*` matching
      // the empty segment.
      {
        source: '/loop-breakers/sessions',
        destination: '/loop-breakers',
        statusCode: 301,
      },
      {
        source: '/loop-breakers/guest-host-kit',
        destination: '/loop-breakers',
        statusCode: 301,
      },
      {
        source: '/loop-breakers/guest-host-kit/:path*',
        destination: '/loop-breakers',
        statusCode: 301,
      },
      {
        source: '/guest-stage',
        destination: '/loop-breakers',
        statusCode: 301,
      },
      {
        source: '/guest-stage/:path*',
        destination: '/loop-breakers',
        statusCode: 301,
      },
    ];
  },
  // Clean, emailable URL for the GoodNotes one-pager — the file lives as
  // static HTML in /public (it's a standalone print/PDF handout, not a
  // Next.js page), so this rewrite drops the .html extension without
  // moving the file.
  async rewrites() {
    return [
      {
        source: '/goodnotes-training',
        destination: '/goodnotes-training.html',
      },
      {
        source: '/three-questions',
        destination: '/three-questions.html',
      },
      {
        source: '/goodnotes',
        destination: '/goodnotes/index.html',
      },
    ];
  },
  // Cap the homepage edge-cache lifetime to 60s with a 5-minute SWR window.
  // Vercel's project-level rewrite-caching layer doesn't always honour the
  // implicit `revalidate = 60` set in app/page.tsx — once we hit a redirect
  // lock-in (e.g. the previous redirect('/hello') from before Phase 2) the
  // stale response sat in the edge for 11+ hours despite cache-control:
  // max-age=0. Sending an explicit `s-maxage` here gives the CDN a clear
  // ceiling it must obey, so the worst-case post-deploy lag is one minute.
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
