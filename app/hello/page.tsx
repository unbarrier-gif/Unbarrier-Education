import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { CtaCard } from '@/components/CtaCard';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { TodayBlock } from '@/components/TodayBlock';
import { BOOKING_URL } from '@/lib/booking';
import { getHelloLinks, groupLinks, isTodayGroup } from '@/lib/hello-links';
import { HELLO_FALLBACK_GROUPS } from './fallback';
import styles from './page.module.css';

// /hello — the stage page. Nici says this url out loud from a platform and a
// room scans a QR code into it, on conference wifi, immediately. It replaces
// linktree in November.
//
// Copy from the approved page drafts (28 Aug 2026).
//
// THREE THINGS ABOUT THIS PAGE ARE NOT NEGOTIABLE:
//
//  1. NO HERO. Links are above the fold. The brand mark, the "designed for
//     difference" display headline and the bio paragraph that used to sit here
//     pushed the first link off a phone screen, which is the one thing this
//     page cannot do. There is no credential strip here either, for the same
//     reason — /hello is a link hub, not a sales page.
//
//  2. EDITABLE WITHOUT A DEPLOY. Cards come from Notion (lib/hello-links.ts).
//     `revalidate = 60` below is what makes that true: the page is
//     incrementally regenerated, so an edit in Notion appears within about a
//     minute with no branch, no PR and no deploy. A statically generated page
//     would satisfy the letter of "Notion driven" and defeat the entire point —
//     do not remove the revalidate.
//
//  3. IT RENDERS EVEN WHEN NOTION DOES NOT, and that outranks freshness.
//     Notion can be slow, rate-limited, down, or missing a token. On this page
//     that failure is a 500 in front of a live audience holding phones.
//     getHelloLinks() returns null on every failure — no token, no database id,
//     network error, API error, or nothing ticked — and the committed fallback
//     in ./fallback.ts renders instead. Never an error, never an empty page,
//     never a spinner. Stale beats absent here.

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'hello — everything i said i’d send | unbarrier.me',
  description:
    'you just met me somewhere. here’s everything i said i’d send. no sign-up, no gate.',
  alternates: { canonical: '/hello' },
};

export default async function HelloPage() {
  const links = await getHelloLinks();
  // One expression, one decision: live cards if Notion gave us any, the
  // committed fallback otherwise.
  const groups = links ? groupLinks(links) : HELLO_FALLBACK_GROUPS;

  const todayGroup = groups.find((g) => isTodayGroup(g.group));
  const cardGroups = groups.filter((g) => !isTodayGroup(g.group));

  // The today block's heading is the first today row's Meta — the one line
  // Nici changes on the morning of an event.
  const todayHeading = todayGroup?.links[0]?.meta ?? 'everything from the session';

  return (
    <>
      <Nav />
      <main className={styles.main}>
        {/* Compact, not a hero: two lines, then links. */}
        <header className={styles.intro}>
          <h1 className={styles.headline}>
            you just met me somewhere. here&rsquo;s everything i said i&rsquo;d
            send.
          </h1>
          <p className={styles.introLine}>
            no sign-up, no gate. take what&rsquo;s useful and ignore the rest.
          </p>
        </header>

        {todayGroup && (
          <TodayBlock heading={todayHeading} links={todayGroup.links} />
        )}

        {/* SESSIONS — the dated, pinned card. Static and in the repo, not in
            Notion: it is one card with a fixed date, and it has to sit above
            "for schools" on the day itself, which is exactly when Notion is
            least trusted (rule 3 above). The label reuses the same eyebrow as
            every other group heading; the card is the same CtaCard with its
            optional `detail` line. There is no destination yet, so the card
            carries no href and renders as a panel — a dead link on /hello is
            the one failure this page cannot have. When the session has a page
            or a booking link, add `href` here and nothing else changes. */}
        <section className={styles.cards} aria-labelledby="group-sessions">
          <h2 id="group-sessions" className={styles.eyebrow}>
            sessions
          </h2>
          <div className={styles.list}>
            <CtaCard
              card="inclusion_beyond_send"
              title="Inclusion Beyond SEND"
              meta="Prompting for inclusion — getting more out of the AI you already have."
              detail="University of Surrey, Guildford · Thursday 17 September 2026"
              accent="var(--spring-green)"
              accentRgb="56, 255, 153"
              // Nici is adding the artwork. Until the file lands the tile
              // shows the tinted initial; when it lands at this path it shows
              // the image. A different extension means changing this one string.
              image="/assets/inclusion-beyond-send.webp"
              initial="I"
            />
          </div>
        </section>

        {cardGroups.map((group) => {
          const id = `group-${group.group.replace(/[^a-z0-9]+/gi, '-')}`;
          return (
            <section key={group.group} className={styles.cards} aria-labelledby={id}>
              <h2 id={id} className={styles.eyebrow}>
                {group.heading}
              </h2>
              <div className={styles.list}>
                {group.links.map((link) => (
                  <CtaCard
                    key={link.id}
                    card={link.slug}
                    title={link.title}
                    meta={link.meta}
                    href={link.href}
                    external={link.external}
                    accent={link.accent}
                    accentRgb={link.accentRgb}
                    image={link.image}
                    initial={link.initial}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* The one call to action on this page. The approved copy closes on
            "if you want to talk about your setting — that's what we actually
            do. start here." The say-hi form that used to sit here was a second,
            competing action and is not in the approved copy; the component and
            its API route are untouched, just no longer rendered. */}
        <section className={styles.close} aria-labelledby="talk">
          <h2 id="talk" className={styles.closeHeading}>
            if you want to talk about your setting
          </h2>
          <p className={styles.closeLine}>
            that&rsquo;s what we actually do. start here.
          </p>
          <Button href={BOOKING_URL} color="var(--spring-green)" external>
            book a discovery call →
          </Button>
        </section>

        <section className={styles.dataNote} aria-label="how we handle your data">
          <p>a note on what happens with your data:</p>
          <p>
            if you book a discovery call or sign up to the newsletter, your
            details are handled per our{' '}
            <Link href="/legal/privacy">privacy notice</Link>. you can
            unsubscribe, ask what we hold, or ask us to delete it any time — just
            email <a href="mailto:nici@unbarrier.me">nici@unbarrier.me</a>.
          </p>
        </section>
        {/* "notice" — the approved copy's newsletter line. Below the close CTA,
            per the spec: subscribe is never above the primary ask. `full`
            weight — this is a resource page. */}
        <section className={styles.bandWrap}>
          <Glow
            color="var(--school-bus-yellow)"
            top="-80px"
            right="-100px"
            size={420}
            opacity={0.08}
            blur={160}
          />
          <NewsletterBand route="/hello" weight="full" />
        </section>

      </main>

      <Footer variant="full" />
    </>
  );
}
