import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CredentialStrip } from '@/components/CredentialStrip';
import { CtaCard } from '@/components/CtaCard';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Icon, type IconName } from '@/components/Icon';
import { InclusionStrategyBand } from '@/components/InclusionStrategyBand';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Section } from '@/components/Section';
import { SevenQuestions } from '@/components/SevenQuestions';
import { IAmChooser } from '@/components/home/IAmChooser';
import { BOOKING_LABEL, BOOKING_URL } from '@/lib/booking';
import { READINESS_CHECK_HREF, READINESS_CHECK_LABEL } from '@/lib/readiness-check';
import { SITE_FLAGS } from '@/lib/site-flags';
import styles from './page.module.css';

// The home page — stage 1 of the 13 Sep 2026 rebuild. Recreated block for
// block from the design handover (Site.dc.html → isHome, b0–b6). The block ids
// are kept on the wrappers so a question back to Nici can name a block.
//
//   b0  hero            spring-green glow · eyebrow · h1 · lede · primary + ghost
//   b1  credential band  portrait · APLS badge · byline · scope line (ground-400)
//   b1a inclusion-strategy band (temporary, gated on the 31 Dec date)
//   b2  the thesis      (deep)   + the four ndte icons
//   b3  the i-am chooser (base)
//   b4  the seven questions (second) — the library component, 1 Sep set
//   b5  free, and yours (deep)   — three CtaCards, ghost to /hello
//   b6  close (well, loose) · newsletter band · footer
//
// One cta per page: the readiness check. The hero ghost only scrolls down
// this page. The close's ghost points to /book, per the handover.
//
// The strand accent is spring green; b4 borrows pearl aqua because the seven
// questions are the audit strand's evidence block wherever they appear.

export const metadata: Metadata = {
  title: 'unbarrier — you bought it. nobody checked it reached the child.',
  description:
    'the invoice cleared. the licences are live. the training happened. and the child it was bought for still can’t use it. we find out where that broke and we say so.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'unbarrier — you bought it. nobody checked it reached the child.',
    description:
      'the invoice cleared. the licences are live. the training happened. and the child it was bought for still can’t use it. we find out where that broke and we say so.',
    url: 'https://www.unbarrier.me/',
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

// Cap edge-cache TTL on the homepage at 60s. Vercel's project-level
// rewrite-caching can lock a stale response for hours despite cache-control
// headers; capping the TTL here means the worst-case cache lag after a
// deploy is one minute.
export const revalidate = 60;

const NDTE: Array<{ lead: string; icon: IconName }> = [
  { lead: 'notice', icon: 'ndte-notice' },
  { lead: 'design', icon: 'ndte-design' },
  { lead: 'try', icon: 'ndte-try' },
  { lead: 'embed', icon: 'ndte-embed' },
];

// The three free resources (b5). Title + the existing page's own first line;
// nothing new written. Every one is a live url.
const TAKE_AWAY = [
  {
    card: 'seven_questions',
    title: 'the seven questions',
    meta: 'the instrument, on one page. take it into your next planning meeting.',
    href: 'https://www.unbarrier.me/the-takeaway.html',
  },
  {
    card: 'belonging_check',
    title: 'the belonging check',
    meta: 'ten minutes with a class you already teach.',
    href: 'https://www.unbarrier.me/belonging-check',
  },
  {
    card: 'receipts',
    title: 'the receipts',
    meta: 'what the evidence actually says, with sources — including where it says we’re wrong.',
    href: 'https://www.unbarrier.me/the-receipts.html',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        {/* b0 — hero */}
        <div id="b0" className={styles.hero}>
          <Glow color="var(--spring-green)" left="-8%" top="2%" size={560} opacity={0.09} />
          <Glow color="var(--orchid-mist)" right="-12%" top="-16%" size={520} opacity={0.08} />
          <div className={styles.heroInner}>
            <Eyebrow color="var(--spring-green)">unbarrier.me</Eyebrow>
            {/* "the child" — the founding line. Everywhere below says learners. */}
            <h1 className={styles.headline}>
              you bought it. nobody checked it reached the child.
            </h1>
            <p className={styles.lede}>
              the invoice cleared. the licences are live. the training
              happened. and the child it was bought for still can&rsquo;t use
              it. we find out where that broke and we say so &mdash; including
              when the answer is you.
            </p>
            <div className={styles.ctaRow}>
              <Button href={READINESS_CHECK_HREF} color="var(--spring-green)">
                {READINESS_CHECK_LABEL}
              </Button>
              {SITE_FLAGS.showGhostCta && (
                <Button href="#b4" variant="ghost">
                  see what it asks before you give us anything →
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* b1 — the credential band */}
        <CredentialStrip variant="portrait" id="b1" />

        {/* b1a — TEMPORARY until 31 Dec 2026, see lib/inclusion-strategy-promo.ts */}
        <div id="b1a">
          <InclusionStrategyBand />
        </div>

        {/* b2 — the thesis */}
        <Section id="b2" ground="deep" labelledBy="thesis">
          <h2 id="thesis" className={styles.sectionHeading}>
            nobody audits whether the tech reached the child.
          </h2>
          <p className={styles.body}>
            not the supplier &mdash; they sold it. not the it lead &mdash; they
            installed it, and it works. not ofsted &mdash; they don&rsquo;t
            look. so nobody checks, for years, and the gap ends up written down
            as the child&rsquo;s problem instead of the purchase&rsquo;s.
          </p>
          <ul className={styles.iconRow} aria-label="the ndte cycle">
            {NDTE.map((step) => (
              <li key={step.lead} className={styles.iconItem}>
                {/* Icon plus text — the word carries the meaning. */}
                <Icon name={step.icon} size={26} />
                <strong>{step.lead}</strong>
              </li>
            ))}
          </ul>
        </Section>

        {/* b3 — where to start */}
        <div id="b3">
          <IAmChooser />
        </div>

        {/* b4 — the seven questions. The audit strand's evidence block, so
            it carries pearl aqua wherever it appears. */}
        <div
          id="b4"
          className={styles.anchor}
          style={{ '--route-accent': 'var(--pearl-aqua)' } as CSSProperties}
        >
          <SevenQuestions
            id="seven-questions"
            heading="what it asks — the seven questions"
            ground="second"
          />
        </div>

        {/* b5 — free, and yours */}
        <Section id="b5" ground="deep" labelledBy="take-away">
          <Eyebrow color="var(--pearl-aqua)">free, and yours</Eyebrow>
          <h2 id="take-away" className={styles.sectionHeading}>
            take it and use it. you don&rsquo;t have to pay us to fix this.
          </h2>
          <div className={styles.cards}>
            {TAKE_AWAY.map((item) => (
              <CtaCard
                key={item.card}
                card={item.card}
                title={item.title}
                meta={item.meta}
                href={item.href}
                external
              />
            ))}
          </div>
          <div className={styles.cardsMore}>
            <Button href="/hello" variant="ghost">
              everything free, in one place →
            </Button>
          </div>
        </Section>

        {/* b6 — close · subscribe · footer */}
        <div id="b6">
          <Section ground="well" space="loose" labelledBy="closing">
            {/* Heading and lede: Nici, 13 Sep 2026 — the close leads with the
                check (the primary) and offers the call second (the ghost). */}
            <h2 id="closing" className={styles.closeHeading}>
              five minutes. nine questions. one honest answer.
            </h2>
            <p className={styles.closeBody}>
              find out whether what you bought is reaching learners. if
              you&rsquo;d rather talk it through first, forty-five minutes, no
              deck, no pitch.
            </p>
            <div className={styles.ctaRow}>
              <Button href={READINESS_CHECK_HREF} color="var(--spring-green)">
                {READINESS_CHECK_LABEL}
              </Button>
              <Button href={BOOKING_URL} variant="ghost" external>
                {BOOKING_LABEL}
              </Button>
            </div>
          </Section>
          <div className={styles.bandWrap}>
            <NewsletterBand
              route="/"
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
