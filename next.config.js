/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'loop-breakers.unbarrier.me' }],
        destination: 'https://www.unbarrier.me/hello',
        permanent: true,
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
