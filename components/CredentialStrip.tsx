import Image from 'next/image';
import { AplsBadge } from './AplsBadge';
import { ScopeLine } from './ScopeLine';
import styles from './CredentialStrip.module.css';

// The credential strip — under the hero, on every route.
//
// Two variants:
//   `line`     the two-line strip that has run under the hero since 28 Aug.
//   `portrait` the b1 / c1 block from the 13 Sep design handover: nici's
//              portrait, the APLS badge, the byline, one line of credentials,
//              and the scope line under all of it. It sits on --ground-400 as
//              its own band, full bleed, 900px measure.
//
// APLS stays attached to nici's name (individual accreditation), and the badge
// is Apple's mark served as supplied — see AplsBadge.tsx.

const CREDENTIALS = [
  'apple professional learning specialist',
  '26 years in classrooms',
  'send specialist',
  'dyslexic, dyscalculic and adhd educator',
];

/** The portrait variant's single credentials line — the handover's wording. */
const PORTRAIT_LINE =
  'dyslexic, dyscalculic and adhd educator · 26 years in classrooms · digital inclusion specialist';

type Props = {
  variant?: 'line' | 'portrait';
  /** Block id, so the section can be named in a question back ("b1"). */
  id?: string;
};

export function CredentialStrip({ variant = 'line', id }: Props) {
  if (variant === 'portrait') {
    return (
      <div id={id} className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.person}>
            {/* Decorative — the byline beside it names her. The edufuturists
                portrait (14 Sep 2026) is 4:5 with the face top-right and the
                award card filling the left half, so a plain cover crop shows
                a small face beside a card nobody can read at 132px. The
                wrapper is the circle; the image is scaled and offset inside
                it so the face fills the circle — see `.portraitImage`. */}
            <span className={styles.portrait} aria-hidden="true">
              <Image
                src="/assets/portraits/nici-foote-profile-edufuturist.png"
                alt=""
                width={240}
                height={300}
                className={styles.portraitImage}
              />
            </span>
            <div className={styles.personText}>
              <p className={styles.badgeRow}>
                <AplsBadge ground="amethyst" />
              </p>
              <p className={styles.name}>led by nici foote</p>
              <p className={styles.line}>{PORTRAIT_LINE}</p>
            </div>
          </div>
          <ScopeLine />
        </div>
      </div>
    );
  }

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
