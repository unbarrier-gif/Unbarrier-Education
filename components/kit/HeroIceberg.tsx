// The hero's iceberg, inlined from public/assets/iceberg.svg (amber's art, v4,
// 26 Oct 2026). Inlined, not <img>, so the berg and its band take the colour
// from the wrapper (`color: var(--spring-green)`); the tip stays white.
//
// One object: the berg and the waterline band are the hero's rule. The band in
// the supplied file is clipped to the berg's width; here it is not, and it
// runs the whole width of the box the svg is given. The viewBox is cut so that
// at 150px tall the box is 620px wide, with the berg 21px in from the right.
// `xMaxYMid slice` keeps the berg's size set by the height and anchors it on
// the right, so a narrower column crops the band's far left end and never the
// berg.
//
// The CALLER sets width and height (page.module.css). Decorative: aria-hidden.
//
// The chapter cards keep the <img> iceberg (components/kit/Iceberg.tsx).
export function HeroIceberg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2161 14.8 2641 639"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <clipPath id="hero-berg-lower">
          <path d="M 24.757812 225 L 390.757812 225 L 390.757812 653.8125 L 24.757812 653.8125 Z" />
        </clipPath>
        <clipPath id="hero-berg-upper">
          <path d="M 24.757812 14.8125 L 390.757812 14.8125 L 390.757812 232 L 24.757812 232 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#hero-berg-lower)">
        <path
          fill="currentColor"
          d="M 402.304688 225.300781 L 18.15625 225.300781 L 88.675781 331.46875 L 122.894531 478.949219 L 158.144531 450.304688 L 211.925781 653.570312 L 241.546875 540.859375 L 264.558594 575.585938 L 319.042969 399.277344 L 360.304688 375.191406 Z"
        />
      </g>
      <g clipPath="url(#hero-berg-upper)">
        <path
          fill="currentColor"
          d="M 207.125 14.832031 L 146.75 88.582031 L 72.371094 121.980469 L 18.15625 231.703125 L 396.09375 231.703125 L 347.367188 136.882812 L 291.839844 125.007812 Z"
        />
      </g>
      <path
        fill="#ffffff"
        d="M 206.835938 35.648438 L 154.238281 99.953125 L 81.574219 132.175781 L 40.082031 218.550781 L 272.902344 218.550781 L 246.417969 152.417969 L 154.511719 183.003906 L 212.640625 128.621094 Z"
      />
      {/* the waterline band: same y and thickness as the supplied file, run out to both ends */}
      <rect x="-2200" y="219.558594" width="2720" height="13.054687" fill="currentColor" />
    </svg>
  );
}
