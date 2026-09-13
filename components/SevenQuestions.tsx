import { Section, type SectionGround } from '@/components/Section';
import styles from '@/app/route-page.module.css';

// The seven questions — unbarrier.voice, the measurement layer.
//
// THE 1 SEP 2026 SET. provision · access · design · capability · belonging ·
// trust · evidence. The earlier seven (access · communication · independence ·
// participation · staff capability · consistency · evidence) are superseded
// and must not come back: only "access" survives by name.
//
// This data is the site's single copy. /access (c3), /voice (v2) and home (b4)
// all render this component; the voice baseline pdf carries the same seven in
// sentence case. Voice = seven QUESTIONS. "domains" belongs only to the six
// domains of inclusion.
//
// "the child" appears four times below, on purpose — the instrument's founding
// line is "the audit that starts with the child". Everywhere else on the site
// says learners.

export type SevenQuestion = {
  term: string;
  question: string;
  /** The one-line gloss under the question. */
  note: string;
};

export const SEVEN_QUESTIONS: SevenQuestion[] = [
  {
    term: 'provision',
    question:
      'is there a device, a tool, a connection at all — and is it in the room, charged and working when the lesson starts?',
    note: 'does the thing exist for this child, or only on the inventory?',
  },
  {
    term: 'access',
    question:
      'can the child get into it without an adult beside them — the settings, the login, the support features?',
    note: 'does it work for them, not just work?',
  },
  {
    term: 'design',
    question:
      'was the material built with more than one way in, before anyone had to ask for an adjustment?',
    note: 'universal design, and the only lever left where the law cannot reach.',
  },
  {
    term: 'capability',
    question:
      'can the adults set it up on a tuesday, and does it hold across teachers, subjects and buildings when the champion is away?',
    note: 'is this practice, or is it one person?',
  },
  {
    term: 'belonging',
    question:
      'does the child want to be there, take part without being asked, and get back in when something goes wrong?',
    note: 'access without belonging is attendance.',
  },
  {
    term: 'trust',
    question:
      'do the child, the family and the staff believe it will work when it matters — and believe their data is safe?',
    note: 'a tool that fails twice in front of a class is never opened again, whatever the audit says.',
  },
  {
    term: 'evidence',
    question:
      'can you show a parent, a governor or an inspector what actually changed, without reaching for the word “engagement”?',
    note: 'if it cannot be shown, it cannot be funded, defended, or done again.',
  },
];

type Props = {
  /** The section heading. Differs between /access, /voice and home. */
  heading: string;
  /** Anchor id, used for aria-labelledby. */
  id: string;
  /** One paragraph under the heading. Optional. */
  intro?: string;
  /** Where this lands in the page's ground ladder. Default: the page. */
  ground?: SectionGround;
};

export function SevenQuestions({ heading, id, intro, ground = 'base' }: Props) {
  return (
    <Section measure="route" ground={ground} labelledBy={id}>
      <h2 id={id} className={styles.sectionHeading}>
        {heading}
      </h2>
      {intro && <p className={styles.body}>{intro}</p>}
      <dl className={styles.questions}>
        {SEVEN_QUESTIONS.map(({ term, question, note }, i) => (
          <div key={term} className={styles.question}>
            <dt className={styles.questionTerm}>
              <span className={styles.questionNumber} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>{' '}
              {term}
            </dt>
            <dd className={styles.questionBody}>
              {question}
              <span className={styles.questionNote}>{note}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
