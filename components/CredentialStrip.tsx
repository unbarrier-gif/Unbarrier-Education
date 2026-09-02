import { AplsBadge } from './AplsBadge';
import styles from './CredentialStrip.module.css';

// The credential strip. Sits directly under the hero on every service and
// information page. APLS is the main route to market and it was previously
// buried mid-sentence in the lede on every page — this pulls it out.
//
// COPY IS EXACT (approved drafts, 28 Aug 2026). Only "apple professional
// learning specialist" is emphasised; the rest of the line is not.
//
// SEMANTICS — this is a strip of credentials, not a heading and not a list of
// links, and it must not read as either:
//   * a <p>, never an <h*>. A heading here would inject a phantom level into
//     every page's outline, directly under the h1, on eight routes.
//   * no <ul>/<li>. A screen reader announcing "list, four items" in front of
//     a byline is wrong, and it would do it on every page.
//   * no links. Nothing here is a destination.
//   * the "·" separators are real text, with real spaces around them, and are
//     NOT aria-hidden. Hiding them would leave a screen reader running the
//     four credentials together into one unpunctuated sentence. As written,
//     the strip's text content is byte-identical to the approved line, so a
//     screen reader and a sighted reader get exactly the same thing.
//   * the APLS badge (components/AplsBadge.tsx) is decorative — aria-hidden,
//     no text nodes, and NO whitespace text node either side of it, so the
//     strip's text content stays byte-identical with it in place. It sits
//     beside the phrase that already names the credential; it adds nothing to
//     the announced string.
//
// Applied on the home page too (app/page.tsx), since branch D.

const CREDENTIALS = [
  '26 years in classrooms',
  'send specialist, uk state and international',
  'dyslexic and adhd educator',
];

export function CredentialStrip() {
  return (
    <p className={styles.strip}>
      led by nici foote &mdash;{' '}
      <strong className={styles.accreditation}>
        apple professional learning specialist
      </strong>
      <AplsBadge />
      {CREDENTIALS.map((credential) => (
        <span key={credential}>
          <span className={styles.sep}>{' · '}</span>
          {credential}
        </span>
      ))}
    </p>
  );
}
