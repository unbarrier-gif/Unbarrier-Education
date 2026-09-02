import Image from 'next/image';
import styles from './AplsBadge.module.css';

// The Apple Professional Learning Specialist badge. APPLE'S MARK, NOT OURS.
//
// Third-party credential marks never enter the currentColor token system
// (decision, 2 Sep 2026). Apple supplies this badge in two colourways, white
// and black, and that is Apple telling us how it is used: pick the colourway
// that suits the ground. So the badge is served as supplied — the unmodified
// files in public/assets/, Apple's filenames verbatim — through an <img>. An
// <img> cannot inherit `color`, and here that is the point: no currentColor,
// no class="accent", no high-contrast drop, no token, and no stylesheet rule
// can reach inside it. Do not inline it, recolour it, optimise it or rename
// the files.
//
// The colourway is chosen by GROUND, explicitly, by the caller. There is no
// default on purpose: whoever places the badge on a new surface has to say
// what it sits on. amethyst → white badge; white → black badge. Everything on
// the site today is amethyst. The goodnotes one-pager (public/goodnotes/) has
// its own copy of the two-line white file and is not this component.
//
// DECORATIVE. It sits beside text that already says "apple professional
// learning specialist", so it is aria-hidden with an empty alt and adds
// nothing to what a screen reader announces. It contributes no text node, so
// the credential strip's text content is unchanged by its presence.

export type BadgeGround = 'amethyst' | 'white';

const FILE: Record<BadgeGround, string> = {
  amethyst: '/assets/Apple_Prof_Learning_Specialist_1ln_wht_061623.svg',
  white: '/assets/Apple_Prof_Learning_Specialist_1ln_blk_061623.svg',
};

// Intrinsic size of Apple's one-line lockup (its viewBox), so the box is
// reserved before the file arrives. The rendered size comes from the CSS.
const WIDTH = 552;
const HEIGHT = 64;

export function AplsBadge({ ground }: { ground: BadgeGround }) {
  return (
    <Image
      className={styles.badge}
      src={FILE[ground]}
      width={WIDTH}
      height={HEIGHT}
      alt=""
      aria-hidden="true"
      // Served byte-for-byte as Apple supplied it. Never through the optimiser.
      unoptimized
    />
  );
}
