import Link from 'next/link';
import styles from './GemmaLetter.module.css';

const PROMPTS = [
  "What's the thing in your business you keep half-starting and not finishing?",
  'What did you take off your plate recently — and what changed when you did?',
  'What are you currently saying NO to, on purpose?',
  'What does "enough" look like for you, today, in this season?',
  'What have you stopped pretending to want?',
];

const OPTIONS = [
  {
    label: 'Option A',
    title:
      '"Why the fuck not: reclaiming small joy when your brain has been running everyone else\'s race"',
    body: "Your story, in your voice. The phone, the walks, the horse, the hill barefoot. What it took to stop optimising and start noticing. The audience leaves with permission to do one un-urgent thing this week.",
  },
  {
    label: 'Option B',
    title:
      '"The parts people don\'t tell you — a live Q&A on living small, on purpose"',
    body: 'More conversational. Attendees submit questions in advance — about phone-and-app boundaries, about saying no to urgency, about what "enough" looks like when you\'ve been wired for more. You answer in your own pace. I hold the room.',
  },
  {
    label: 'Option C',
    title: 'A two-parter: story first, then the practical bits a month later',
    body: "Session 1 — you tell your story. Session 2 — we come back with what people wanted next (the practical tools, the advice you'd give, the \"what I wish I'd known\"). Two rooms, two recordings, deeper impact.",
  },
];

export function GemmaLetter() {
  return (
    <article className={styles.page}>
      <p className={styles.eyebrow}>A note before the kit — for Gemma</p>
      <h1 className={styles.heading}>
        Gemma,
        <br />
        you&apos;ve got the <em className={styles.headingAccent}>stories.</em>
        <br />
        Let&apos;s build the room.
      </h1>

      <p className={styles.lede}>
        Last month you sent me a voice note. You&apos;d taken the apps off
        your phone, walked four times in a day, done yoga in a field with
        your horse. You said your brain felt like it had room.{' '}
        <em className={styles.accent}>That&apos;s</em> the thing other people
        need to hear. Your story is the session.
      </p>

      <div className={styles.testimonialEcho}>
        &ldquo;I can&apos;t begin to explain to you the difference it has
        made by removing the apps and notifications from my phone. My brain
        just feels like it has so much more room, and nothing feels urgent.
        I just walked up a hill barefoot. I feel like the dogs are listening
        to me more, and they&apos;re having a better time, because I&apos;m
        walking along and then sitting down and taking in the sunshine and
        the forest, rather than just plodding along thinking about all the
        things I have to do. I&apos;ve had four walks today. Now I&apos;m
        gonna go and do some yoga in the field with my horse. Because why
        the fuck not?&rdquo;
        <small>— Gemma, in a voice note we both kept</small>
      </div>

      <p>
        You&apos;ve already done the hard work — the noticing, the
        experimenting, the small everyday acts of rebellion against the
        urgency that other people think is normal. A Loop Breakers session
        could be the room where you say it out loud. 90 minutes. People who
        get it. You telling the parts that feel right to tell.
      </p>

      <h2>Three shapes I can see — pick one, or propose your own</h2>

      <p>
        I know you want to craft your own session, and I trust that
        completely. Here are three shapes as a starting point. You can use
        any of them as a spine, mix them, or ignore them entirely and
        propose something else.
      </p>

      <div className={styles.options}>
        {OPTIONS.map((opt) => (
          <div key={opt.label} className={styles.option}>
            <p className={styles.optionLabel}>{opt.label}</p>
            <p className={styles.optionTitle}>{opt.title}</p>
            <p className={styles.optionBody}>{opt.body}</p>
          </div>
        ))}
      </div>

      <p>
        I&apos;m <em className={styles.accent}>not</em> voting for any of
        these. They&apos;re three doors. Walk through whichever feels most
        yours — or shut all three and propose a fourth. The one rule is
        that the session is shaped by what you actually want to say, not
        what you think Loop Breakers wants to hear.
      </p>

      <p>
        If you want me to talk any of them through with you on a call before
        deciding, that&apos;s what the prep slot is for. No homework before
        then.
      </p>

      <hr className={styles.partDivider} />
      <p className={styles.partLabel}>Part Two · the live-now layer</p>
      <h2>
        Or — and this might be the better way in —{' '}
        <em className={styles.accent}>start from what&apos;s loud right now.</em>
      </h2>

      <p>
        The three shapes above all use the story you&apos;ve already told.
        But the truth is, your story is still being lived — and the most
        useful sessions in Loop Breakers are the ones where the host is
        mid-thing, not retrospective about it. So here&apos;s a different
        door:
      </p>

      <div className={styles.nowCard}>
        <h3>
          What if the session is about what&apos;s actually <em>up</em> for
          you right now?
        </h3>
        <p>
          Not a polished talk. Not &ldquo;here&apos;s what I&apos;ve already
          figured out.&rdquo; More like:{' '}
          <em className={styles.accent}>
            &ldquo;here&apos;s the thing I&apos;m currently wrestling with in
            my business and my life — let&apos;s think about it together
            with people who get it.&rdquo;
          </em>
        </p>
        <p>
          That makes you a peer in the room, not a presenter. It&apos;s the
          format Loop Breakers does best.{' '}
          <em>
            And it takes far less prep, because you&apos;re not performing a
            finished thing — you&apos;re inviting people into a live one.
          </em>
        </p>
      </div>

      <div className={styles.promptBlock}>
        <p className={styles.promptEyebrow}>One question · that&apos;s it</p>
        <h3>
          What&apos;s the question you keep coming back to, that you don&apos;t
          yet have an answer for?
        </h3>
        <p>
          That&apos;s the only one I&apos;d ask you to sit with before the prep
          call. Bring the <em>question</em>, not a conclusion — that&apos;s
          often the best Loop Breakers session shape, because the room helps
          you think instead of nodding at something you&apos;ve already
          figured out.
        </p>
      </div>

      <details className={styles.details}>
        <summary className={styles.detailsSummary}>
          A few more prompts if the one above doesn&apos;t pull at anything →
        </summary>
        <p className={styles.detailsIntro}>
          Don&apos;t read these as homework. Skim. If one tugs, follow it. If
          none do, the question above is enough on its own.
        </p>
        <ul className={styles.detailsList}>
          {PROMPTS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </details>

      <div className={styles.inviteBox}>
        <p>
          <b>The honest invitation:</b> sit with the question above.{' '}
          <em>Bring whatever it stirs to the prep call</em> — half-formed is
          fine, no-words-yet is fine — and we&apos;ll build the session
          around it from there.
        </p>
        <p>
          You don&apos;t have to know yet whether the session is your story
          (Part One) or what&apos;s-live-now (Part Two) or some mix.
          We&apos;ll figure that out together. The prep call is for that.
        </p>
      </div>

      <h2>What I&apos;ll bring to make this easy for you</h2>

      <ul>
        <li>
          <b>Full production.</b> Landing page, invites, tech, payment,
          follow-up — all handled. You show up and tell your truth.
        </li>
        <li>
          <b>A prep call where I ask you questions.</b> Not to design the
          session for you — to help you get clear on what you want to say.
          Then you shape the session from there.
        </li>
        <li>
          <b>A safety net on the day.</b> If anything comes up that feels too
          much, we pause. I&apos;m in the room with you, not off-stage.
          You&apos;re never alone up there.
        </li>
        <li>
          <b>An audience who <em>wants</em> to hear what you have to say.</b>{' '}
          Loop Breakers is a gentle room. People come to listen carefully.
        </li>
      </ul>

      <div className={styles.signOff}>
        <p>
          With warmth and the deepest respect for the work you&apos;ve already
          done,
        </p>
        <p>
          <em className={styles.accent}>— Nici</em>
        </p>
      </div>

      <Link href="/loop-breakers/guest-host-kit" className={styles.backLink}>
        → Read the full kit
      </Link>
    </article>
  );
}
