import styles from '@/app/route-page.module.css';

// The seven questions. Rendered on /access and on /voice, and the two are
// deliberately identical — this is the instrument, and two copies would drift
// within a term. One component, both pages.
//
// Copy exact (approved drafts, 28 Aug 2026). The heading differs between the
// two pages, so it arrives as a prop; the questions themselves never do.
//
// The section takes its colour from --route-accent, set on <main> by each
// page, so it renders in princeton-orange on /access and orchid-mist on
// /voice without either page overriding anything.
//
// Marked up as a <dl>: seven terms, each with its definition. That is what
// this is, and it gives a screen reader the pairing for free — a flat list of
// <li>s would read the domain name and its question as one run-on string.

export const SEVEN_QUESTIONS: Array<{ term: string; question: string }> = [
  {
    term: 'access',
    question:
      'can this learner get in at all — to the lesson, the device, the text, the room — without an adult beside them?',
  },
  {
    term: 'communication',
    question: 'can they say what they need, in whatever way they say it?',
  },
  {
    term: 'independence',
    question:
      'how much is the learner doing themselves — on paper, on screen, by symbol, sign or speech — and how much needs an adult’s hand?',
  },
  {
    term: 'participation',
    question:
      'are they doing the same work as the room, or a parallel version of it?',
  },
  {
    term: 'staff capability',
    question:
      'not confidence, but whether the adult can actually set it up on a tuesday.',
  },
  {
    term: 'consistency',
    question:
      'does it hold across teachers, subjects and settings, or only where the champion is?',
  },
  {
    term: 'evidence',
    question:
      'could you show a parent, or a governor, what changed — without using the word “engagement”?',
  },
];

type Props = {
  /** The section heading. Differs between /access and /voice. */
  heading: string;
  /** Anchor id, used for aria-labelledby. */
  id: string;
};

export function SevenQuestions({ heading, id }: Props) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.sectionHeading}>
        {heading}
      </h2>
      <dl className={styles.questions}>
        {SEVEN_QUESTIONS.map(({ term, question }) => (
          <div key={term} className={styles.question}>
            <dt className={styles.questionTerm}>{term}</dt>
            <dd className={styles.questionBody}>{question}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
