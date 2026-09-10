import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
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
// THE DESIGN PASS (10 Sep 2026). The page went from one block and one line to
// the approved layout: a two-column hero (copy left, the sign-up card right),
// "what's in it", "who it's for", and the readiness-check panel. Everything
// on the page is still tokens from app/globals.css. The atmosphere (three
// radial washes over --amethyst-deep) is scoped to this page's CSS module and
// is NOT a tinted section ground — sections sit on the ladder, the washes sit
// under all of them.
//
// THE FORM DID NOT MOVE. The sign-up card IS the subscribe block that
// already shipped (#71–#73), rendered at its `card` weight. Weight is
// presentation only: the MailerLite submit, the server-side consent_source
// and the unticked consent checkbox are exactly what they were in September.
// The checkbox label is NOT overridden: it is CONSENT_WORDING and it IS the
// consent record (its casing was corrected in the record itself, 10 Sep).
//
// SENTENCE CASE — THE ONE EXCEPTION ON THE SITE. Every other page is
// lowercase. This one serves the notice audience (heads, SENCOs, trust leads),
// and the audience rule beats the channel rule. Brand names stay lowercase:
// unbarrier, notice. It will look wrong next to the rest of the site. It is
// correct. Do not "fix" it.
//
// ONE CALL TO ACTION. The page has exactly one button, and it is subscribe.
// The readiness check is a TEXT link in a panel — not a Button, not a
// ctaRow — so the page never carries two competing asks.
//
// Copy is verbatim from `/notice — copy sheet` (newsletter projects
// database), which lists every slot of the approved design in page order.
// Not new writing, not up for revision here.

const CANONICAL = 'https://www.unbarrier.me/notice';

// ── 0 · masthead ────────────────────────────────────────────────────────
// Live text, never an image. Two paragraphs and a link, not headings: the
// page's h1 is the hero headline below. "inclusion, evidenced" is Nici's
// line, lowercase and punctuated as she wrote it.

const MASTHEAD_MARK = 'notice';

const MASTHEAD_LINE = 'inclusion, evidenced';

const MASTHEAD_HOME = 'unbarrier.me';

// ── 1 · hero ────────────────────────────────────────────────────────────

const EYEBROW = 'The newsletter';

const HEADLINE = 'Two minutes. Sunday morning.';

const LEDE =
  'Something I noticed in a classroom, the number underneath it, and one line you can use in Monday’s SLT meeting.';

const META = ['Two minutes to read', 'Sunday morning', 'One-click unsubscribe'];

// ── 2 · the sign-up card ────────────────────────────────────────────────

const CARD_HEADING = 'Send me notice';

const CARD_SUB =
  'For headteachers, SENCOs, trust inclusion leads, and anyone writing an inclusion strategy this term.';

const EMAIL_LABEL = 'Email address';

const EMAIL_PLACEHOLDER = 'you@school.org.uk';

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

// ── 3 · what's in it ────────────────────────────────────────────────────

const PARTS_HEADING = 'What’s in it';

const PARTS_NOTE = 'Three parts. Same three every week.';

// The rail and numeral colours are the brief's: 01 pearl-aqua, 02
// school-bus-yellow, 03 spring-green. Set as modifier classes, not inline
// styles, so high contrast can reach them.
const PARTS = [
  {
    num: '01',
    label: 'The noticing',
    line: 'Something I noticed in a classroom.',
    tone: styles.partAqua,
  },
  {
    num: '02',
    label: 'The number',
    line: 'The number underneath it.',
    tone: styles.partYellow,
  },
  {
    num: '03',
    label: 'The line for Monday',
    line: 'One line you can use in Monday’s SLT meeting.',
    tone: styles.partGreen,
  },
];

// ── 4 · who it's for ────────────────────────────────────────────────────

const WHO_HEADING = 'Who it’s for';

const WHO_NOTE =
  'Written for the person who has to put the inclusion strategy in front of governors, not for a mailing list.';

const WHO_ROWS = [
  'Headteachers',
  'SENCOs',
  'Trust inclusion leads',
  'Anyone writing an inclusion strategy this term',
];

// ── 5 · the readiness check ─────────────────────────────────────────────

const READINESS_HEADING = 'Before you subscribe to anything';

const READINESS_BODY =
  'The readiness check is free and anonymous. Every result added makes the answer less of a guess.';

const READINESS_LINK = 'Take the readiness check →';

// The share description predates the design pass and is unchanged: it is
// the hero lede and the card sub as the one sentence they used to be.
const DESCRIPTION = `${LEDE} ${CARD_SUB}`;

export const metadata: Metadata = {
  title: `notice · ${HEADLINE}`,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  // Indexed and in the sitemap — the opposite of /voice. No robots block here.
  openGraph: {
    title: `notice · ${HEADLINE}`,
    description: DESCRIPTION,
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
        <div className={styles.inner}>
          {/* ── hero: copy left, the sign-up card right ─────────────── */}
          <section className={styles.hero} aria-labelledby="notice-heading">
            {/* The green full stop is its own span so high contrast can drop
                it — the same rule as the icons' .accent path. */}
            <header className={styles.masthead}>
              <div>
                <p className={styles.mark}>
                  {MASTHEAD_MARK}
                  <span className={styles.dot}>.</span>
                </p>
                <p className={styles.line}>{MASTHEAD_LINE}</p>
              </div>
              <Link className={styles.home} href="/">
                {MASTHEAD_HOME}
              </Link>
            </header>

            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{EYEBROW}</p>
              <h1 id="notice-heading" className={styles.headline}>
                {HEADLINE}
              </h1>
              <p className={styles.lede}>{LEDE}</p>
              <ul className={styles.meta} role="list">
                {META.map((item) => (
                  <li key={item} className={styles.metaPill}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* consent_source is composed from `route` server-side —
                "subscribe block · /notice" — see lib/consent.ts. The bind sits
                in a client component, so that is provenance recorded in good
                faith, not tamper-proof evidence. */}
            <div className={styles.signup}>
              <NewsletterBand
                route="/notice"
                weight="card"
                headingLevel="h2"
                heading={CARD_HEADING}
                sub={CARD_SUB}
                emailLabel={EMAIL_LABEL}
                emailPlaceholder={EMAIL_PLACEHOLDER}
                buttonLabel={BUTTON}
                buttonPendingLabel="Sending…"
                note={UNDER_THE_BUTTON}
                privacy={PRIVACY}
                privacyLinkLabel="Privacy notice"
              />
            </div>
          </section>

          {/* ── what's in it ───────────────────────────────────────── */}
          <section className={styles.section} aria-labelledby="parts-heading">
            <div className={styles.sectionHead}>
              <h2 id="parts-heading" className={styles.sectionHeading}>
                {PARTS_HEADING}
              </h2>
              <p className={styles.sectionNote}>{PARTS_NOTE}</p>
            </div>
            <ol className={styles.parts} role="list">
              {PARTS.map((part) => (
                <li key={part.num} className={`${styles.part} ${part.tone}`}>
                  {/* The list already numbers the items for assistive tech;
                      the drawn numeral is decoration on top of that. */}
                  <span className={styles.partNum} aria-hidden="true">
                    {part.num}
                  </span>
                  <div className={styles.partBody}>
                    <h3 className={styles.partLabel}>{part.label}</h3>
                    <p className={styles.partLine}>{part.line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── who it's for ───────────────────────────────────────── */}
          <section className={styles.who} aria-labelledby="who-heading">
            <div className={styles.sectionHead}>
              <h2 id="who-heading" className={styles.sectionHeading}>
                {WHO_HEADING}
              </h2>
              <p className={styles.sectionNote}>{WHO_NOTE}</p>
            </div>
            <ul className={styles.rows} role="list">
              {WHO_ROWS.map((row) => (
                <li key={row} className={styles.row}>
                  {row}
                </li>
              ))}
            </ul>
          </section>

          {/* ── the readiness check ────────────────────────────────────
              A panel with a text link, not a second button: the page's one
              call to action is the subscribe button in the card. The same
              line ships in the footer of every issue of notice. */}
          <section
            className={styles.readiness}
            aria-labelledby="readiness-heading"
          >
            <h2 id="readiness-heading" className={styles.readinessHeading}>
              {READINESS_HEADING}
            </h2>
            <p className={styles.readinessBody}>{READINESS_BODY}</p>
            <Link href="/readiness-check" className={styles.readinessLink}>
              {READINESS_LINK}
            </Link>
          </section>
        </div>
      </main>

      <Footer variant="full" />
    </>
  );
}
