import type { MetadataRoute } from 'next';

// Block crawlers from any /loop-breakers/guest-host-kit/ path that has
// a hyphen in the segment after — that's our private guest-letter URLs
// (urlSlug = `<name>-<8-hex>`). The bare /loop-breakers/guest-host-kit
// kit page itself is public and indexable.
//
// Per-page noindex + dynamicParams=false on the [urlSlug] route are the
// real privacy guarantee; this is belt-and-braces.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/loop-breakers/guest-host-kit/*-',
      },
    ],
  };
}
