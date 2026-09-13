import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CtaCard } from '@/components/CtaCard';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Section } from '@/components/Section';
import { TodayBlock } from '@/components/TodayBlock';
import { BOOKING_URL } from '@/lib/booking';
import { getHelloLinks, isTodayGroup } from '@/lib/hello-links';
import { LIVE_SHELF, countHeading, type ShelfItem } from '@/lib/hello-shelf';
import { fallbackTodayLinks, DEFAULT_TODAY_HEADING } from './today-fallback';
import styles from './page.module.css';

// /hello — the stage page, public state. Stage 5 of the 13 Sep 2026 rebuild,
// from Site.dc.html → isHello (e0–e3). The block ids stay on the wrappers.
//
//   e0  hero (spring-green glow)
//   e1  the today block — heading + ordered links from the Notion "hello
//       links" table (rows in the today group); Nici edits both at /hello/admin
//   e2  things to ask (second)  — the question sets
//   e2b things to read (deep)   — the one-pagers
//   e3  close (well, loose) · newsletter band · footer
//
// ONLY LIVE RESOURCES RENDER. The shelf (lib/hello-shelf.ts) carries the held
// ones with their status; the public page filters to `live`.
//
// IT RENDERS EVEN WHEN NOTION DOES NOT. Notion can be slow, down, or missing a
// token, and on this page that failure is in front of a room. getHelloLinks()
// returns null on every failure and the committed fallback renders instead.
// `revalidate = 60` is what makes an edit in Notion land within a minute
// without a deploy — do not remove it.

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'hello — everything i said i’d send | unbarrier.me',
  description:
    'everything i said i’d send. free. no sign-up. each one says what it is and how long it takes.',
  alternates: { canonical: '/hello' },
  openGraph: {
    title: 'hello — everything i said i’d send',
    description: 'free. no sign-up. each one says what it is and how long it takes.',
    url: 'https://www.unbarrier.me/hello',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'unbarrier — designed for difference. did it reach the child?',
      },
    ],
  },
};

function ShelfCard({ item }: { item: ShelfItem }) {
  return (
    <div className={styles.cardWithPill}>
      <CtaCard
        card={item.card}
        title={item.title}
        meta={item.meta}
        href={item.href}
        external
        accent={item.accent}
        accentRgb={item.accentRgb}
        initial={item.initial}
      />
      <span className={styles.pill}>{item.minutes} min read</span>
    </div>
  );
}

export default async function HelloPage() {
  const links = await getHelloLinks();
  const todayRows = links?.filter((l) => isTodayGroup(l.group)) ?? [];
  const todayLinks = todayRows.length > 0 ? todayRows : fallbackTodayLinks();
  // The heading is the first today row's Meta — the one line Nici changes on
  // the morning of an event, in Notion or at /hello/admin.
  const todayHeading = todayRows[0]?.meta || DEFAULT_TODAY_HEADING;

  const ask = LIVE_SHELF.filter((i) => i.shelf === 'ask');
  const read = LIVE_SHELF.filter((i) => i.shelf === 'read');

  return (
    <>
      <Nav />
      <main className={styles.main}>
        {/* e0 — hero */}
        <div id="e0" className={styles.hero}>
          <Glow color="var(--spring-green)" left="-8%" top="0%" size={540} opacity={0.1} />
          <header className={styles.heroInner}>
            <Eyebrow color="var(--spring-green)">hello</Eyebrow>
            <h1 className={styles.heading}>everything i said i&rsquo;d send.</h1>
            <p className={styles.lede}>
              free. no sign-up. each one says what it is and how long it takes.
            </p>
          </header>
        </div>

        {/* e1 — your stuff from today */}
        <div id="e1" className={styles.today}>
          <div className={styles.todayInner}>
            <TodayBlock heading={todayHeading} links={todayLinks} />
          </div>
        </div>

        {/* e2 — things to ask */}
        <Section id="e2" measure="route" ground="second" labelledBy="hello-ask">
          <Eyebrow color="var(--pearl-aqua)">things to ask</Eyebrow>
          <h2 id="hello-ask" className={styles.sectionHeading}>
            {countHeading(ask.length, 'ask')}
          </h2>
          <p className={styles.sectionLine}>take one into a meeting you already have.</p>
          <div className={styles.cards}>
            {ask.map((item) => (
              <ShelfCard key={item.card} item={item} />
            ))}
          </div>
        </Section>

        {/* e2b — things to read */}
        <Section id="e2b" measure="route" ground="deep" labelledBy="hello-read">
          <Eyebrow color="var(--princeton-orange)">things to read</Eyebrow>
          <h2 id="hello-read" className={styles.sectionHeading}>
            {countHeading(read.length, 'read')}
          </h2>
          <p className={styles.sectionLine}>on screen, not print. forward the link.</p>
          <div className={styles.cards}>
            {read.map((item) => (
              <ShelfCard key={item.card} item={item} />
            ))}
          </div>
        </Section>

        {/* e3 — close · subscribe · footer */}
        <div id="e3">
          <Section measure="route" ground="well" space="loose" labelledBy="e-closing">
            <h2 id="e-closing" className={styles.closeHeading}>
              if you want to talk about your setting &mdash; that&rsquo;s what
              we actually do.
            </h2>
            <div className={styles.ctaRow}>
              <Button href={BOOKING_URL} color="var(--spring-green)" external>
                start a conversation →
              </Button>
              {/* Down the ladder, never sideways: the discovery day. */}
              <Button href="/audit" variant="ghost">
                not there yet? → start with a discovery day
              </Button>
            </div>
          </Section>
          <div className={styles.bandWrap}>
            <NewsletterBand
              route="/hello"
              weight="standard"
              sub="one email when there is something worth saying. nothing when there isn’t. written for people who don’t have time to read it twice."
            />
          </div>
          <Footer variant="full" />
        </div>
      </main>
    </>
  );
}
