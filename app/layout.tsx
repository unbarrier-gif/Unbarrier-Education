import type { Metadata, Viewport } from 'next';
import { Outfit, Comfortaa, Cherry_Bomb_One, Lexend } from 'next/font/google';
import Script from 'next/script';
import { ORGANIZATION_SCHEMA } from '@/lib/schema/organization';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const comfortaa = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600', '700'],
});

// Lexend is the documented body face in the brand spec and is purpose-built
// for reading proficiency. Comfortaa stays on the wordmark and display only —
// it is a rounded display face and was never meant to carry body copy.
const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
  weight: ['300', '400', '500', '600', '700'],
});

const cherryBomb = Cherry_Bomb_One({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cherry-bomb',
  weight: '400',
});

const SITE_URL = 'https://unbarrier.me';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Unbarrier · designed for difference.',
  description:
    "I'm Nici. I help schools, neurodivergent humans, and the people who love them find clearer ways through.",
  openGraph: {
    title: 'Unbarrier · designed for difference.',
    description:
      "I'm Nici. I help schools, neurodivergent humans, and the people who love them find clearer ways through.",
    url: `${SITE_URL}/hello`,
    siteName: 'Unbarrier',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unbarrier · designed for difference.',
    description:
      "I'm Nici. I help schools, neurodivergent humans, and the people who love them find clearer ways through.",
  },
};

export const viewport: Viewport = {
  themeColor: '#210a33',
  width: 'device-width',
  initialScale: 1,
};

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

// Pre-paint script: applies the .contrast-high class on <html> before
// first paint so high-contrast users never see a flash of low-contrast
// content. Reads the same localStorage key + media query as
// lib/useContrast.ts — keep both in sync.
const CONTRAST_BOOTSTRAP = `(function(){
  try {
    var s = localStorage.getItem('unbarrier:contrast');
    var hi = s === 'high' || (s !== 'default' && window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches);
    if (hi) document.documentElement.classList.add('contrast-high');
    var size = localStorage.getItem('unbarrier:text-size');
    if (size === 'sm' || size === 'lg') document.documentElement.setAttribute('data-text-size', size);
    if (localStorage.getItem('unbarrier:spacing') === 'true') document.documentElement.setAttribute('data-spacing', 'true');
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${outfit.variable} ${comfortaa.variable} ${lexend.variable} ${cherryBomb.variable}`}
    >
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: CONTRAST_BOOTSTRAP }} />
        {/* Organization JSON-LD, sitewide. The block itself lives in
            lib/schema/organization.ts so branch D's layout changes and this
            one do not collide over the same lines. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
      </head>
      <body>
        {children}
        {PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.outbound-links.tagged-events.js"
            strategy="afterInteractive"
          />
        )}
        {PLAUSIBLE_DOMAIN && (
          <Script id="plausible-init" strategy="afterInteractive">
            {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
          </Script>
        )}
      </body>
    </html>
  );
}
