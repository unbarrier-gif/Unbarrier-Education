import type { CSSProperties } from 'react';
import { Eyebrow } from '../../Eyebrow';
import styles from './AfterSessionGrid.module.css';

const STEPS = [
  {
    when: 'Day 0',
    title: 'Session notes',
    body: "A one-page recap of your idea, your next step, and a link to your breakout partners' notes. In your inbox within 24 hours.",
    accent: 'var(--spring-green)',
  },
  {
    when: 'Days 1–30',
    title: 'The WhatsApp group',
    body: 'A small, moderated WhatsApp group for the cohort — where you already are, no new app to learn. Ask a question, share a win, request a nudge. 30-day access.',
    accent: 'var(--pearl-aqua)',
  },
  {
    when: 'Day 60',
    title: 'One nudge',
    body: 'A single "how\'s it going?" email with your original one-next-step attached. No guilt, no dashboard. Just a check-in.',
    accent: 'var(--school-bus-yellow)',
  },
  {
    when: 'Day 90',
    title: 'Invitation back',
    body: "Either as an attendee with a new loop, or — if you're ready — as a guest host.",
    accent: 'var(--orchid-mist)',
  },
];

export function AfterSessionGrid() {
  return (
    <section className={styles.section}>
      <Eyebrow color="var(--pearl-aqua)">You&apos;re not on your own after</Eyebrow>
      <h2 className={styles.heading}>
        The <span className={styles.accent}>90-day loop</span> — what
        happens after the session.
      </h2>
      <p className={styles.lede}>
        You don&apos;t book a session and disappear. You get three things
        — gentle, useful, no spam.
      </p>
      <div className={styles.grid}>
        {STEPS.map((s) => (
          <article
            key={s.when}
            className={styles.step}
            style={{ ['--c' as string]: s.accent } as CSSProperties}
          >
            <div className={styles.when}>{s.when}</div>
            <h4 className={styles.title}>{s.title}</h4>
            <p className={styles.body}>{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
