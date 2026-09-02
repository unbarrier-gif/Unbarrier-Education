import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CredentialStrip } from '@/components/CredentialStrip';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Glow } from '@/components/Glow';
import { InclusionStrategyBand } from '@/components/InclusionStrategyBand';
import { Icon } from '@/components/Icon';
import { Mark } from '@/components/Lockup';
import type { IconName } from '@/components/Icon';
import { Nav } from '@/components/Nav';
import { Section } from '@/components/Section';
import { IAmChooser } from '@/components/home/IAmChooser';
import { BOOKING_URL, BOOKING_LABEL } from '@/lib/booking';
import styles from './page.module.css';

// The home page. Copy verbatim from the approved page drafts (28 Aug 2026)
// with two rulings from 29 Aug applied — both recorded at their call sites:
//   1. the stat populations (see NATIONAL_PICTURE)
//   2. the 60% rephrase (see the h1)
//
// "unbarrier.voice" appears in the NDTE section. It stays TEXT — /voice is
// noindex and unlinked pending legal sign-off on the retention period and the
// two-purpose privacy notice. See app/voice/page.tsx.

export const metadata: Metadata = {
  title: 'unbarrier — the tools you already bought, reaching the learners they were bought for',
  description:
    'we help schools, trusts and edtech make sure the tools they have already bought actually reach the learners they were bought for.',
  alternates: { canonical: '/' },
  openGraph: {
    title:
      'unbarrier — the tools you already bought, reaching the learners they were bought for',
    description:
      'we help schools, trusts and edtech make sure the tools they have already bought actually reach the learners they were bought for.',
    url: 'https://www.unbarrier.me/',
    type: 'website',
  },
};

// Cap edge-cache TTL on the homepage at 60s. Vercel's project-level
// rewrite-caching can lock a stale response (e.g. the previous
// redirect('/hello') from before Phase 2) for hours despite cache-control
// headers; capping the TTL here means the worst-case cache lag after a
// deploy is one minute. Marketing copy doesn't need real-time, but a
// hot-fix shouldn't take an hour to land either.
export const revalidate = 60;

// ── what the national picture shows ──────────────────────────────────────
//
// SOURCE FOR ALL THREE: DfE, Technology in Schools Survey 2024 to 2025,
// published November 2025.
//
// THE POPULATIONS ARE LOAD-BEARING AND WERE WRONG IN THE APPROVED DRAFT.
// Corrected 29 Aug 2026 after checking against the source:
//
//   * 22% and 35% are measured on SCHOOL LEADERS, not schools. The draft said
//     "of schools have a formal plan" and "only 35% have any mechanism". A
//     school-level claim is a bigger claim than the report supports — it is a
//     survey of people, and what it measured is what leaders said.
//   * 39% is measured on TEACHERS. The draft already said "of teachers"; it is
//     correct and stays.
//
// The three figures themselves and the "not even counted" scope card are all
// verified exact. Do not change a number. Do not widen a population back to
// "of schools" — that is the specific error this comment exists to prevent.
const NATIONAL_PICTURE: Array<{ figure: string; body: string }> = [
  {
    figure: '22%',
    body: 'of school leaders have a formal plan to evaluate whether their technology spend makes any difference. broadly unchanged since 2023. only 35% of school leaders have any mechanism to monitor it at all, down from 41%.',
  },
  {
    figure: '39%',
    body: 'of teachers don’t know whether their assistive technology is fit for purpose.',
  },
  {
    figure: 'not even counted',
    body: 'the survey covered mainstream primary and secondary only. special schools, alternative provision, prus and independent schools were explicitly out of scope. the settings where this matters most were not in the national picture at all.',
  },
];

const NDTE: Array<{ lead: string; icon: IconName; body: string; aside: string }> = [
  {
    lead: 'notice',
    icon: 'ndte-notice',
    body: 'find out what is actually happening for learners, not what the strategy says should be.',
    aside: 'this is where unbarrier.voice does its work.',
  },
  {
    lead: 'design',
    icon: 'ndte-design',
    body: 'build the change with your team, not for them. the people who have to run it on a tuesday are in the room when it is designed.',
    aside: 'otherwise it is your plan, not theirs.',
  },
  {
    lead: 'try',
    icon: 'ndte-try',
    body: 'model it in real classrooms, with real learners, while your staff watch.',
    aside: 'not a twilight. not a slide deck.',
  },
  {
    lead: 'embed',
    icon: 'ndte-embed',
    body: 'make it hold after we have gone.',
    aside:
      'that is the whole test, and it is the step most consultancy skips because it is the one you cannot invoice twice.',
  },
];

const BELIEFS: string[] = [
  'belonging and psychological safety come before any tool, curriculum or strategy. you can’t learn until you feel safe and seen.',
  'the barrier is never the learner. the system needs to flex around them, not the other way round.',
  'learner voice is the anchor. forget what looks good for the adults. what are we solving for the learner?',
  'behaviour is communication. the right question is “what is this telling us?”, not “how do we stop it?”',
  'if you design well for the learners who struggle most, you make things better for everyone.',
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <Glow color="var(--spring-green)" left="-120px" top="6%" size={700} opacity={0.1} />
        <Glow color="var(--orchid-mist)" right="-100px" top="34%" size={520} opacity={0.08} />

        <header className={styles.hero}>
          {/* THE 60% REPHRASE (approved 29 Aug 2026). The draft read "the
              system wasn't built for the 60% in the middle. so i'm building it
              differently."
              The 60% is Nici's own framing and there is no published figure
              behind it, and it sat one line above a sourced 39% — an unsourced
              number next to a sourced one reads as data. Naming it as hers is
              the fix, and it is the whole fix: no source, no footnote, no
              qualifier is to be added.
              Only "the 60% in the middle" moved to the front and became "them"
              where it used to sit; every other word is the approved line. */}
          <h1 className={styles.headline}>
            i call them the{' '}
            <span className={styles.accent}>60% in the middle.</span> the system
            wasn&rsquo;t built for them, so i&rsquo;m building it differently.
          </h1>

          {/* The sourced figure the hero rests on. Measured on TEACHERS. */}
          <figure className={styles.heroStat}>
            <blockquote className={styles.heroStatLine}>
              <strong className={styles.heroStatFigure}>39%</strong> of teachers
              don&rsquo;t know whether the assistive technology they have is fit
              for purpose.
            </blockquote>
            <figcaption className={styles.heroStatSource}>
              dfe, technology in schools survey 2024 to 2025, published november
              2025
            </figcaption>
          </figure>

          <p className={styles.lede}>
            we help schools, trusts and edtech make sure the tools they have
            already bought actually reach the learners they were bought for.
          </p>

          <CredentialStrip />
        </header>

        <Section ground="deep" labelledBy="the-thesis">
          <h2 id="the-thesis" className={styles.statement}>
            buying a device for a send learner without a strategy isn&rsquo;t
            inclusion. it&rsquo;s a tick-box.
          </h2>
          <p className={styles.body}>
            the spend is real. the intent is real. but nobody checks whether it
            landed with the learner it was meant for. that is the gap we work
            in.
          </p>
        </Section>

        <Section labelledBy="national-picture">
          <h2 id="national-picture" className={styles.sectionHeading}>
            what the national picture shows
          </h2>
          <ul className={styles.cards}>
            {NATIONAL_PICTURE.map((card) => (
              <li key={card.figure} className={styles.card}>
                <p className={styles.cardFigure}>{card.figure}</p>
                <p className={styles.cardBody}>{card.body}</p>
              </li>
            ))}
          </ul>
          <p className={styles.cardSource}>
            source for all three: dfe, technology in schools survey 2024 to
            2025, published november 2025.
          </p>
        </Section>

        {/* TEMPORARY until 31 Dec 2026 — see lib/inclusion-strategy-promo.ts.
            Sits directly above the chooser, per the handoff: the deadline page
            is promoted above the home chooser until the date passes. */}
        <InclusionStrategyBand />

        <IAmChooser />

        <Section ground="tint" labelledBy="ndte">
          <Eyebrow color="var(--spring-green)">
            how the work runs — the ndte cycle
          </Eyebrow>
          <div className={styles.statementRow}>
            {/* ndte-cycle is the one display-size glyph in the set — never
                render it below ~40px or the four stage dots close up. */}
            <Icon name="ndte-cycle" size={44} />
            <h2 id="ndte" className={styles.statement}>
              notice → design → try → embed.
            </h2>
          </div>
          <p className={styles.body}>
            however you come in, it runs the same way. four words, and you can
            hold a whole year against them.
          </p>
          <ul className={styles.options}>
            {NDTE.map((step) => (
              <li key={step.lead} className={styles.option}>
                {/* Icon plus text. The icon is decorative and aria-hidden —
                    the word next to it is what carries the meaning. */}
                <p className={styles.optionLead}>
                  <Icon name={step.icon} />
                  <strong className={styles.strong}>{step.lead}</strong>
                </p>
                <p className={styles.optionBody}>{step.body}</p>
                {/* "unbarrier.voice" below is text, never a link. */}
                <p className={styles.aside}>{step.aside}</p>
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            <strong className={styles.strong}>
              and it is why the offers are one pathway rather than three
              products:
            </strong>{' '}
            a discovery day is <em>notice</em>, done properly. unbarrier.voice
            is what makes <em>notice</em> and <em>embed</em> measurable instead
            of felt. a partnership year is all four, three terms running.
          </p>
        </Section>

        <Section ground="deep" labelledBy="what-we-believe">
          <h2 id="what-we-believe" className={styles.sectionHeading}>
            what we believe
          </h2>
          <ul className={styles.list}>
            {BELIEFS.map((belief) => (
              <li key={belief} className={styles.listItem}>
                {belief}
              </li>
            ))}
          </ul>
        </Section>

        <section className={styles.close} aria-labelledby="close">
          {/* The one watermark on the site. Ground only, never behind text —
              see .watermark in page.module.css for the measurements. */}
          <Mark className={styles.watermark} />
          <h2 id="close" className={styles.closeHeading}>
            tell us what you&rsquo;re working with. if we can help, we&rsquo;ll
            say how. if we can&rsquo;t, we&rsquo;ll point you to someone who
            can.
          </h2>
          <div className={styles.ctaRow}>
            <Button href={BOOKING_URL} color="var(--spring-green)" external>
              {BOOKING_LABEL}
            </Button>
            <Button href="/faq" variant="ghost">
              questions before you get in touch? → the faq
            </Button>
          </div>
        </section>

        <NewsletterBand route="/" weight="standard" />


        <Footer variant="full" />
      </main>
    </>
  );
}
