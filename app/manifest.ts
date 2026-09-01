import type { MetadataRoute } from 'next';

// Minimal manifest. Its only job is to declare the maskable icon, which lives
// in public/ rather than app/ on purpose: Next.js auto-detects any app/icon.*
// by filename and emits a <link rel="icon"> for it, so a maskable file in app/
// would be offered to browsers as a tab icon — the padding is built for
// Android launcher cropping and reads as a near-empty square at 16px.
//
// display: 'browser' keeps this a plain web page. Adding a manifest is enough
// to make some browsers offer a PWA install prompt, and that is not what this
// site is.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Unbarrier',
    short_name: 'Unbarrier',
    description:
      "I'm Nici. I help schools, neurodivergent humans, and the people who love them find clearer ways through.",
    start_url: '/',
    display: 'browser',
    theme_color: '#210a33',
    background_color: '#210a33',
    icons: [
      {
        src: '/assets/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
