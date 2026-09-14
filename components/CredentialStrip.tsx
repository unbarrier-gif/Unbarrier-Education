import Image from 'next/image';
import Link from 'next/link';
import { AplsBadge } from './AplsBadge';
import { ScopeLine } from './ScopeLine';
import styles from './CredentialStrip.module.css';

// The credential strip — under the hero, on every route.
//
// Three variants:
//   `line`     the two-line strip that has run under the hero since 28 Aug.
//   `portrait` the b1 / h1 block from the 13 Sep design handover: nici's
//              portrait, the APLS badge, the byline, one line of credentials,
//              and the scope line under all of it. It sits on --ground-400 as
//              its own band, full bleed, 900px measure.
//   `scope`    the same band with the identity taken out: the scope line and
//              one line, "led by nici foote · about →". THE RULE (handover,
//              13 Sep 2026): the identity block appears once on home (b1) and
//              once on /about (h1). Every other page carries this variant
//              (/access c1, /inclusion-strategy d1) so the portrait and the
//              badge are not repeated down the site.
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
  variant?: 'line' | 'portrait' | 'scope';
  /** Block id, so the section can be named in a question back ("b1"). */
  id?: string;
};

export function CredentialStrip({ variant = 'line', id }: Props) {
  if (variant === 'scope') {
    return (
      <div id={id} className={`${styles.band} ${styles.scopeBand}`}>
        <div className={`${styles.bandInner} ${styles.scopeInner}`}>
          <ScopeLine />
          <p className={styles.ledBy}>
            led by nici foote ·{' '}
            <Link href="/about" className={styles.ledByLink}>
              about →
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'portrait') {
    return (
      <div id={id} className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.person}>
            {/* Decorative — the byline beside it names her. */}
            <Image
              src="/assets/nici-avatar.png"
              alt=""
              aria-hidden="true"
              width={132}
              height={132}
              className={styles.portrait}
            />
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
