import type { MetadataRoute } from 'next';

// The guest-host-kit Disallow that used to live here was removed on
// 28 Aug 2026: Loop Breakers is retired, the route is deleted, and
// /loop-breakers/guest-host-kit/* now 301s to the holding page. There is
// nothing left to hide from crawlers.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  };
}
