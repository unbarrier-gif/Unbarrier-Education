import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import styles from './page.module.css';

// /notice — the sign-up route for notice, the newsletter.
//
// This is the destination for every sign-up route unbarrier has: the gmail
// signature, the soft opt-in email, the one-to-one ask, the line in Terri's
// Albion September series, the linkedin first-comment line, and three QR codes
// plus a closing slide that are already rendered and decode to
// https://www.unbarrier.me/notice. That is why this is a route and not a
// redirect.
//
// A ROUTE, NOT A DESIGN. No new components, no new tokens, no second form. It
// composes the subscribe block that already shipped (#71–#73) and passes the
// approved copy through the block's optional copy props. The consent checkbox
// label is NOT overridden: it is CONSENT_WORDING and it IS the consent record.
//
// SENTENCE CASE — THE ONE EXCEPTION ON THE SITE. Every other page is
// lowercase. This one serves the notice audience (heads, SENCOs, trust leads),
// and the audience rule beats the channel rule. Brand names stay lowercase:
// unbarrier, notice, loopbreakers. It will look wrong next to the rest of the
// site. It is correct. Do not "fix" it.
//
// ONE CALL TO ACTION. The page has exactly one button, and it is subscribe.
// The standing thesis line under the block is a TEXT link to
// /readiness-check — not a Button, not a ctaRow — so the page never carries
// two competing asks.
//
// Copy is verbatim from `the sign-up copy pack — notice`, section 7, and the
// branch G spec (1 Sep 2026). Not new writing, not up for revision here.

const CANONICAL = 'https://www.unbarrier.me/notice';

const HEADLINE = 'Two minutes. Sunday morning.';

const LEDE =
  'Something I noticed in a classroom, the number underneath it, and one line you can use in Monday’s SLT meeting. For headteachers, SENCOs, trust inclusion leads, and anyone writing an inclusion strategy this term.';

const BUTTON = 'Send me notice';

const UNDER_THE_BUTTON =
  'Weekly is the aim. I’m ADHD, so it’s a wild ride. I’d rather say that now than pretend to a schedule I can’t hold.';

// The controller clause is deliberate. The band's default privacy paragraph
// names the controller in the block (consent mechanic 3, shipped 28 Aug 2026);
// the first approved /notice line (21 Aug) predated that and dropped it. The
// copy pack was updated 2 Sep 2026 to carry it, so the newer mechanic holds on
// the page where most people will actually tick the box.
const PRIVACY =
  'Your address is used for notice and nothing else, ever. One-click unsubscribe on every email. It’s sent by unbarrier education ltd (company no. 16603630).';

export const metadata: Metadata = {
  title: `notice · ${HEADLINE}`,
  description: LEDE,
  alternates: { canonical: CANONICAL },
  // Indexed and in the sitemap — the opposite of /voice. No robots block here.
  openGraph: {
    title: `notice · ${HEADLINE}`,
    description: LEDE,
    url: CANONICAL,
    type: 'website',
    images: [
      {
        // A segment that exports its own `openGraph` does not inherit the
        // file-based card — openGraph is replaced per segment, not merged.
        // Named explicitly so this route ships a share card.
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'unbarrier — designed for difference. did it reach the child?',
      },
    ],
  },
};

export default function NoticePage() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.bandWrap}>
          <Glow
            color="var(--school-bus-yellow)"
            top="-80px"
            right="-100px"
            size={420}
            opacity={0.08}
            blur={160}
          />
          {/* consent_source is composed from `route` server-side —
              "subscribe block · /notice" — see lib/consent.ts. The bind sits
              in a client component, so that is provenance recorded in good
              faith, not tamper-proof evidence. */}
          <NewsletterBand
            route="/notice"
            weight="full"
            headingLevel="h1"
            heading={HEADLINE}
            sub={LEDE}
            emailLabel="Email address"
            buttonLabel={BUTTON}
            buttonPendingLabel="Sending…"
            note={UNDER_THE_BUTTON}
            privacy={PRIVACY}
            privacyLinkLabel="Privacy notice"
          />
        </div>

        {/* The standing thesis line. A line, not a second button: the page's
            one call to action is the subscribe button above. The same line
            ships in the footer of every issue of notice. */}
        <p className={styles.thesis}>
          The{' '}
          <Link href="/readiness-check" className={styles.thesisLink}>
            readiness check
          </Link>{' '}
          is free and anonymous. Every result added makes the answer less of a
          guess.
        </p>
      </main>

      <Footer variant="full" />
    </>
  );
}
