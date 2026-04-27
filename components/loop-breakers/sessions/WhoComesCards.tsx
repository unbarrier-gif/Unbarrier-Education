import type { CSSProperties } from 'react';
import { Eyebrow } from '../../Eyebrow';
import styles from './WhoComesCards.module.css';

type Person = {
  initial: string;
  name: string;
  role: string;
  quote: string;
  accent: string;
};

const PEOPLE: Person[] = [
  {
    initial: 'G',
    name: 'Gemma',
    role: 'ADHD founder · coaching practice',
    quote:
      "I stopped circling the thing. Ninety minutes, a room of women who got it. I left with one next step I'd been avoiding for months.",
    accent: 'var(--spring-green)',
  },
  {
    initial: 'N',
    name: 'Nicki Hambleton',
    role: 'Educator · illustrator · 20 May guest host',
    quote:
      'What I struggle with is the starting point, even though I know where I am. I may be an octopus with lots of different arms, but even one octopus can only go down one rabbit hole at a time.',
    accent: 'var(--orchid-mist)',
  },
  {
    initial: 'S',
    name: 'Sana',
    role: 'Teacher turned consultant',
    quote:
      "I'd been rewriting the same landing page for three months. In one session it was done. Not perfect. Done.",
    accent: 'var(--princeton-orange)',
  },
  {
    initial: 'E',
    name: 'Ellie',
    role: 'Illustrator · shelved 4 launches',
    quote:
      "The first space where 'started and stopped' wasn't a confession. It was the whole point.",
    accent: 'var(--school-bus-yellow)',
  },
];

export function WhoComesCards() {
  return (
    <section className={styles.section}>
      <Eyebrow color="var(--orchid-mist)">Who&apos;s in the room</Eyebrow>
      <h2 className={styles.heading}>
        You won&apos;t be the only one who{' '}
        <span className={styles.accent}>circles an idea for months.</span>
      </h2>
      <p className={styles.lede}>
        Not a hypothetical audience. Real attendees and incoming guest hosts,
        in their own words. (Nicki&apos;s words below are from our prep
        conversation — used with her permission.)
      </p>
      <div className={styles.grid}>
        {PEOPLE.map((p) => (
          <article
            key={p.name}
            className={styles.card}
            style={{ ['--c' as string]: p.accent } as CSSProperties}
          >
            <div className={styles.avatar}>{p.initial}</div>
            <div className={styles.name}>{p.name}</div>
            <div className={styles.role}>{p.role}</div>
            <p className={styles.quote}>&ldquo;{p.quote}&rdquo;</p>
          </article>
        ))}
      </div>
      <p className={styles.consent}>
        Names and quotes shared with consent. More stories as the community grows.
      </p>
    </section>
  );
}
