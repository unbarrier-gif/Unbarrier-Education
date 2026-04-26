import type { Metadata, Viewport } from 'next';
import { Outfit, Comfortaa, Cherry_Bomb_One } from 'next/font/google';
import Script from 'next/script';
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
    "I'm Nici. I help schools, neurodivergent humans, and the people who love them find clearer ways through. Loop Breakers is where we get unstuck together.",
  openGraph: {
    title: 'Unbarrier · designed for difference.',
    description:
      "I'm Nici. I help schools, neurodivergent humans, and the people who love them find clearer ways through. Loop Breakers is where we get unstuck together.",
    url: `${SITE_URL}/hello`,
    siteName: 'Unbarrier',
    images: [
      {
        url: '/assets/og-hello.png',
        width: 1200,
        height: 630,
        alt: 'Unbarrier — designed for difference.',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unbarrier · designed for difference.',
    description:
      "I'm Nici. I help schools, neurodivergent humans, and the people who love them find clearer ways through.",
    images: ['/assets/og-hello.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#210a33',
  width: 'device-width',
  initialScale: 1,
};

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${outfit.variable} ${comfortaa.variable} ${cherryBomb.variable}`}
    >
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
