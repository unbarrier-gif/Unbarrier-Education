import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { KitDealBox } from '@/components/loop-breakers/guest-host-kit/KitDealBox';
import { KitEasyNo } from '@/components/loop-breakers/guest-host-kit/KitEasyNo';
import { KitNavForward } from '@/components/loop-breakers/guest-host-kit/KitNavForward';
import { KitSection } from '@/components/loop-breakers/guest-host-kit/KitSection';
import { KitSpecsGrid } from '@/components/loop-breakers/guest-host-kit/KitSpecsGrid';
import { KitTimeline } from '@/components/loop-breakers/guest-host-kit/KitTimeline';
import { liveLetters } from '@/content/loop-breakers/guest-letters';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Guest Host Kit · Loop Breakers',
  description:
    'Come host a room of the people you are for. The deal, the timeline, the boundaries — laid out plainly.',
  alternates: { canonical: '/loop-breakers/guest-host-kit' },
  robots: { index: false, follow: false },
};

const SPECS = [
  { k: 'Duration', v: '90 minutes' },
  { k: 'Capacity', v: 'Regular: 10 max (hard cap) · Guest Stage: up to 40' },
  { k: 'Platform', v: 'Google Meet (link auto-generated)' },
  { k: 'Recording', v: 'Optional — attendees consent, you decide' },
  { k: 'Format', v: 'Flexible — propose what fits your topic' },
  {
    k: 'Framework',
    v: 'Session template provided (open → teach → practise → reflect). Adapt freely.',
  },
];

const TIMELINE = [
  {
    when: '4 weeks out',
    what: (
      <>
        30-min prep call. You tell us your topic. We agree the format, date,
        title, short description.
        <small>
          15-min ahead of that, I&apos;ll send you a one-pager with questions
          so you come ready.
        </small>
      </>
    ),
  },
  {
    when: '3 weeks out',
    what: (
      <>
        We build your session landing page + open bookings to our list.
        <small>
          You get a draft — change anything that doesn&apos;t sound like you
          before we publish.
        </small>
      </>
    ),
  },
  {
    when: '2 weeks out',
    what: 'You share the link with your audience. We share with ours.',
  },
  {
    when: '3 days out',
    what: 'Check-in. Attendee count, any final tweaks, tech check booked.',
  },
  {
    when: '1 day out',
    what:
      "Attendees get their reminder + any pre-work you've chosen to send.",
  },
  {
    when: 'Session day',
    what:
      "You arrive 10 mins early. We host the green room while people arrive. You run the session. We handle Q&A moderation if you want us to.",
  },
  {
    when: 'Next 7 days',
    what: 'Recording edited + sent. Attendee follow-up sent. Payment to you processed.',
  },
];

export default function GuestHostKitPage() {
  return (
    <>
      <Nav active="loop-breakers" />
      <main className={styles.main}>
        <article className={styles.page}>
          <header className={styles.cover}>
            <p className={styles.eyebrow}>
              Loop Breakers · Guest Host Kit
            </p>
            <h1 className={styles.heading}>
              Come host a room
              <br />
              <em className={styles.headingAccent}>
                of the people you&apos;re for.
              </em>
            </h1>
            <p className={styles.deck}>
              You&apos;ve got a topic, a practice, a story. Loop Breakers is
              the room to bring it to. <b>Two formats:</b> regular sessions
              (10 max, hard cap, properly small) and Guest Stages (up to 40,
              talk + held Q&amp;A, when we want to open it wider). 90 minutes
              on Google Meet, all the admin already handled. This is the
              deal, in plain view.
            </p>
          </header>

          <KitSection
            number="01"
            eyebrow="What Loop Breakers is"
            heading="A small room for the looping."
            accent="var(--spring-green)"
          >
            <p>
              Loop Breakers is a series of small-group coaching sessions for
              neurodivergent adults — founders, educators, writers,
              designers, parents — who&apos;ve been circling the same idea
              for months, sometimes years.
            </p>
            <p>
              The format is deliberately simple.{' '}
              <b>90 minutes. Google Meet.</b> Two room sizes — a regular
              Loop Breakers room (10 max, hard cap, round-the-room) or a
              Guest Stage (up to 40, talk + held Q&amp;A). People bring one
              thing they&apos;re stuck on. They leave with it moved forward
              — not finished, not perfect, <em>moved</em>.
            </p>
            <p>I run most of them. I&apos;d like to hand some to you.</p>
          </KitSection>

          <KitSection
            number="02"
            eyebrow="Why host one"
            heading="What's in it for you."
            accent="var(--orchid-mist)"
          >
            <ul>
              <li>
                <b>Reach an audience who already gets it.</b> Our cohort is
                pre-filtered for &ldquo;gets neurodivergence&rdquo;,
                &ldquo;values slow, careful work&rdquo;, and &ldquo;actually
                shows up&rdquo;. No convincing, no defending your premise.
              </li>
              <li>
                <b>Test a session format with low stakes.</b> Want to try
                running your own thing someday? Borrow our room, our
                framework, our production. See if it lands.
              </li>
              <li>
                <b>Paid work.</b> See §04.
              </li>
              <li>
                <b>Own your content.</b> You keep the IP on what you teach.
                We keep the recording; you get a copy to reuse wherever you
                like.
              </li>
              <li>
                <b>No admin.</b> We handle sign-ups, payment, calendar,
                tech, follow-up. You show up and host.
              </li>
            </ul>
          </KitSection>

          <KitSection
            number="03"
            eyebrow="What a session looks like"
            heading="The shape."
            accent="var(--pearl-aqua)"
          >
            <KitSpecsGrid rows={SPECS} />
            <p>
              You can run it however you like within that container —
              lecture-style, workshop, held conversation, worked example,
              Q&amp;A. Pick what your topic needs. We&apos;ll talk through
              your plan in a 30-min prep call.
            </p>
          </KitSection>

          <KitSection
            number="04"
            eyebrow="The deal"
            heading="What we give each other."
            accent="var(--school-bus-yellow)"
          >
            <KitDealBox
              intro={
                <>
                  We&apos;re being straight with you. Loop Breakers is in{' '}
                  <b>Phase 1 of 3</b> right now. Pricing is deliberately low
                  to fill the room. So the guest-host fee at this stage is{' '}
                  <b>not a split of takings</b> — it&apos;s a flat fee
                  Unbarrier pays you, regardless of seats sold. Here&apos;s
                  how it grows.
                </>
              }
              phases={[
                {
                  accent: 'yellow',
                  label: <>Phase 1 · Now → 10 regulars</>,
                  body: (
                    <>
                      <b>£75 flat fee per session</b> · paid within 7 days ·
                      regardless of attendance · no-shows don&apos;t land on
                      you.
                      <em>
                        Tickets are £15 (sliding scale £8 / £15 / £25 for
                        accessibility). At a Guest Stage of 20+ paying
                        attendees, the session covers your fee with margin.
                        At a regular session of 10, Unbarrier tops up the
                        gap — deliberate, sustainable, honest about Phase 1.
                      </em>
                    </>
                  ),
                },
                {
                  accent: 'aqua',
                  label: (
                    <>Phase 2 · 10+ regulars + 3 sold-out sessions in a row</>
                  ),
                  body: (
                    <>
                      <b>£125 flat fee per session</b> · same flat-fee model
                      · no risk to you. Triggered when Wednesday Guest Stage
                      tickets move to £35 (sliding £20 / £35 / £50). Tuesday
                      Loop Breakers stays at £10 — that&apos;s the access
                      floor.
                    </>
                  ),
                },
                {
                  accent: 'green',
                  label: <>Phase 3 · 20+ members, weekly cadence</>,
                  body: (
                    <>
                      <b>£200 base + 50% of revenue above base</b> · the
                      room is established, real splits become fair.
                      We&apos;ll renegotiate this in writing before we get
                      there.
                    </>
                  ),
                },
              ]}
              footer={
                <>
                  Why we&apos;re showing you all three phases: because
                  &ldquo;we&apos;ll pay more later&rdquo; is the kind of
                  thing people say and don&apos;t honour. Putting the
                  numbers on paper, with the trigger criteria written down,
                  is how we mean it.
                </>
              }
            />

            <h3>What you bring</h3>
            <ul>
              <li>Your topic / thing you want to teach or run</li>
              <li>Your brand and credibility</li>
              <li>
                <b>Help getting the word out.</b> A forward to your newsletter
                list, a post or two to your socials, a mention in the corners
                of the internet you live in.{' '}
                <em>You don&apos;t have to be a marketer about it</em> —
                we&apos;ll give you everything ready-to-share (copy,
                graphics, your own booking link). You just press send.
              </li>
              <li>Show up on the day, 10 minutes early for tech check</li>
            </ul>

            <h3>What we bring</h3>
            <ul>
              <li>Platform — Google Meet link, calendar invites, reminders</li>
              <li>
                Audience — our newsletter list + Loop Breakers community get
                first shot at seats
              </li>
              <li>
                Session framework — a tested 90-minute container you can
                adapt
              </li>
              <li>
                <b>A full promo pack so sharing is easy:</b> landing page for
                your session, a drafted invite email you can edit, social
                graphics (square / portrait / story sizes), a one-line pitch
                you can paste anywhere, plus a custom booking link with your
                name on it so you can see what you brought in.
              </li>
              <li>
                Payment processing (TidyCal) — goes through us, cleans up
                your admin
              </li>
              <li>Recording + transcript — we capture it, send you a copy</li>
              <li>
                Post-session follow-up — attendees get a short summary + any
                links you share
              </li>
              <li>
                Community access — attendees can join the WhatsApp cohort
                space if they want ongoing community
              </li>
            </ul>

            <h3>IP &amp; ownership</h3>
            <ul>
              <li>
                <b>You own your content.</b> Slides, materials, frameworks,
                worked examples — yours. Use them however you want, before or
                after the session.
              </li>
              <li>
                <b>We own the recording.</b> Edited version lives in the Loop
                Breakers library for attendees who missed it.
              </li>
              <li>
                <b>You get a full copy of the recording</b> to use however
                you like — promo, your own course, your YouTube channel,
                wherever.
              </li>
            </ul>
          </KitSection>

          <KitSection
            number="05"
            eyebrow="Straight talk about what we won't do"
            heading="A few boundaries, said out loud."
            accent="var(--princeton-orange)"
          >
            <ul>
              <li>
                <b>We approve topic and framing.</b> Not because we don&apos;t
                trust you — because Loop Breakers has a specific audience
                and tone. If the fit isn&apos;t right, we&apos;ll say so
                early (and you keep the idea, obviously).
              </li>
              <li>
                <b>Payment goes through our TidyCal.</b> Keeps it clean for
                attendees, means we can do the refund/cancellation handling
                consistently.
              </li>
              <li>
                <b>Loop Breakers stays Loop Breakers.</b> We co-promote, but
                we don&apos;t rebrand the series. Your name is on the
                session; ours is on the room.
              </li>
              <li>
                <b>No minimum audience promise.</b> We&apos;ll do our best on
                promo, but we won&apos;t guarantee X attendees. The flat fee
                (Phase 1: £75 / Phase 2: £125) is how we handle that risk
                fairly — you&apos;re paid whether the room fills or not.
              </li>
              <li>
                <b>We don&apos;t carry admin beyond production.</b> If
                someone books and then has an issue with your content, we
                facilitate the conversation but don&apos;t mediate it for
                you.
              </li>
            </ul>
          </KitSection>

          <KitSection
            number="06"
            eyebrow="How it actually runs"
            heading="Timeline, session to launch."
            accent="var(--spring-green)"
          >
            <KitTimeline rows={TIMELINE} />
          </KitSection>

          <KitSection
            number="07"
            eyebrow="When we're aiming for"
            heading="The May → August ramp."
            accent="var(--orchid-mist)"
          >
            <ul>
              <li>
                <b>Mid-May 2026</b> — first guest-hosted session
              </li>
              <li>
                <b>Late May / June</b> — building cadence, probably one
                every 2–3 weeks
              </li>
              <li>
                <b>July / August</b> — settled rhythm, one session per week,
                mix of me + guest hosts
              </li>
            </ul>
            <p>
              If mid-May is tight for you, we can target June or July. No
              pressure to move faster than makes sense for your life.
            </p>
          </KitSection>

          <KitSection
            number="08"
            eyebrow="Saying no"
            heading="On saying no."
            accent="var(--school-bus-yellow)"
          >
            <KitEasyNo title="A note on saying no">
              <p>
                If this isn&apos;t the right shape, the right season, or the
                right ask for you — that&apos;s genuinely fine. A &ldquo;not
                now&rdquo; or &ldquo;not this&rdquo; is useful information,
                not a failure. Tell me what would be closer to right, or
                just say no. I won&apos;t follow up with a pitch.
              </p>
              <p>
                The kit is designed so you can make a decision without
                needing more info from me. If you want more info, obviously
                also fine — email me whenever.
              </p>
            </KitEasyNo>
          </KitSection>

          <KitSection
            number="09"
            eyebrow="Next step"
            heading="If you're in, or curious."
            accent="var(--spring-green)"
          >
            <p>
              Reply to the email this kit came in. One line is enough —{' '}
              <em>&ldquo;yes, let&apos;s talk&rdquo;</em>,{' '}
              <em>&ldquo;maybe, ask me again later&rdquo;</em>, or{' '}
              <em>&ldquo;not for me, thanks&rdquo;</em>.
            </p>
            <p>If it&apos;s a yes-or-maybe, I&apos;ll send a prep-call link.</p>
            <p>— Nici</p>

            <KitNavForward letters={liveLetters()} />
          </KitSection>
        </article>

        <Footer variant="full" />
      </main>
    </>
  );
}
