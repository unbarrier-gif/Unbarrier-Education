import { AplsBadge } from './AplsBadge';
import styles from './CredentialStrip.module.css';

// The credential strip. Sits directly under the hero on every service and
// information page. APLS is the main route to market and it was previously
// buried mid-sentence in the lede on every page — this pulls it out.
//
// COPY IS EXACT (two-line layout, 2 Sep 2026). Two lines, with a gap between
// them:
//
//   led by nici foote — [APLS badge]
//   apple professional learning specialist · 26 years in classrooms ·
//   send specialist · dyslexic, dyscalculic and adhd educator
//
// Nothing on either line is emphasised. "apple professional learning
// specialist" is the first item of the credential list, in the same weight
// and colour as the rest of it.
//
// SEMANTICS — this is a strip of credentials, not a heading and not a list of
// links, and it must not read as either:
//   * two <p>s (the byline, then the credentials), never an <h*>. A heading
//     here would inject a phantom level into every page's outline, directly
//     under the h1, on eight routes.
//   * no <ul>/<li>. A screen reader announcing "list, four items" in front of
//     a byline is wrong, and it would do it on every page.
//   * no links. Nothing here is a destination.
//   * the "·" separators are real text, with real spaces around them, and are
//     NOT aria-hidden. Hiding them would leave a screen reader running the
//     four credentials together into one unpunctuated sentence. As written,
//     each line's text content is byte-identical to the approved line, so a
//     screen reader and a sighted reader get exactly the same thing.
//   * the APLS badge (components/AplsBadge.tsx) is decorative — aria-hidden,
//     no text nodes, and NO whitespace text node either side of it, so the
//     byline's text content stays byte-identical with it in place. It sits at
//     the end of the byline, immediately after the em-dash, and the line below
//     already names the credential; it adds nothing to the announced string.
//     The gap between the em-dash and the badge is the badge's own margin,
//     never a space character. It is Apple's mark, served as supplied, and its
//     colourway is chosen by ground: the strip sits on amethyst on every
//     route, so it takes the white file. If the strip ever lands on a white
//     ground, pass ground="white" — never let it inherit.
//   * the gap between the two lines is a margin on the second <p>, from a
//     spacing token. Not an empty paragraph, not a <br>, not a pixel value.
//
// Applied on the home page too (app/page.tsx), since branch D.

const CREDENTIALS = [
  'apple professional learning specialist',
  '26 years in classrooms',
  'send specialist',
  'dyslexic, dyscalculic and adhd educator',
];

export function CredentialStrip() {
  const [first, ...rest] = CREDENTIALS;
  return (
    <div className={styles.strip}>
      <p className={styles.byline}>
        led by nici foote &mdash;
        <AplsBadge ground="amethyst" />
      </p>
      <p className={styles.credentials}>
        {first}
        {rest.map((credential) => (
          <span key={credential}>
            <span className={styles.sep}>{' · '}</span>
            {credential}
          </span>
        ))}
      </p>
    </div>
  );
}
