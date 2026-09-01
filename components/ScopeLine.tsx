import styles from './ScopeLine.module.css';

// The scope line. Sits directly under the CredentialStrip.
//
// WHY IT IS A SEPARATE COMPONENT and not an edit to CredentialStrip: that
// component's copy is the exact approved line from the 28 Aug drafts and its
// docblock says so. This is new copy (1 Sep 2026) answering a different
// question — not "who leads this" but "who is it for" — so it gets its own
// element rather than quietly extending an approved one.
//
// WHAT IT IS ARGUING. Working with everyone in the chain is not scope creep
// bolted on to reach more buyers. It is the method, and it follows from the
// thesis: something can be bought well and configured well and still not
// reach the learner, because one person in the chain was never asked. The
// settings list widens the market; the second half is the reason it is
// honest to widen it.
//
// "a learner is anyone in a learning capacity" is the site's `learners` rule
// stated out loud for the first time. It is why the rule exists, and it is
// what keeps the two "the child" exceptions fenced to two places.
//
// Same semantics as CredentialStrip: a <p>, never a heading, no list, no
// links, and the separators are real text with real spaces so a screen
// reader and a sighted reader get the same thing.

const SETTINGS = [
  'secondary',
  'special',
  'alternative provision',
  'colleges',
  'international',
];

export function ScopeLine() {
  return (
    <p className={styles.scope}>
      <span>primary</span>
      {SETTINGS.map((setting) => (
        <span key={setting}>
          <span className={styles.sep}>{' · '}</span>
          {setting}
        </span>
      ))}
      <span className={styles.tail}>
        {' '}
        &mdash; and everyone in the chain, not only the person who signed it
        off.
      </span>
    </p>
  );
}
