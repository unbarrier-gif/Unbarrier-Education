import type { ReactElement, ReactNode } from 'react';

// One colour + one glyph per domain, always paired with the domain's own
// text label — colour is never the only signal (colourblind/low-vision
// accessibility). Deliberately kept out of red/amber/green (already the
// score-band language elsewhere in this tool) and out of true orchid/
// princeton-orange (reserved for the voice/access strands — audit's own
// palette stays in the teal/blue/violet family).
export const DOMAIN_COLORS: Record<string, string> = {
  pedagogy: '#5EEAD4',
  impact: '#38BDF8',
  device: '#60A5FA',
  environment: '#818CF8',
  leadership: '#A78BFA',
  community: '#34D399',
  'eal-neurodiversity': '#F472B6',
};

function Icon({ children }: { children: ReactNode }): ReactElement {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {children}
    </svg>
  );
}

export const DOMAIN_ICONS: Record<string, ReactElement> = {
  // Open book — pedagogy & teacher confidence.
  pedagogy: (
    <Icon>
      <path d="M12 6.5 3 4v14l9 2.5 9-2.5V4l-9 2.5Z" />
      <path d="M12 6.5v14" />
    </Icon>
  ),
  // Trending line — student practice & impact evidence.
  impact: (
    <Icon>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 6h6v6" />
    </Icon>
  ),
  // Tablet/device — device & deployment readiness.
  device: (
    <Icon>
      <rect x="4" y="3" width="16" height="14" rx="2" />
      <path d="M9 21h6" />
    </Icon>
  ),
  // Wi-Fi arcs — environment & infrastructure.
  environment: (
    <Icon>
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M12 20h.01" />
    </Icon>
  ),
  // Flag — leadership, governance & voice.
  leadership: (
    <Icon>
      <path d="M4 21V4" />
      <path d="M4 4h13l-3 4 3 4H4" />
    </Icon>
  ),
  // People — community, culture & inclusion.
  community: (
    <Icon>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M22 20c0-2.8-2-5-5-5.5" />
    </Icon>
  ),
  // Infinity — the neurodiversity movement's own symbol (not the puzzle
  // piece, which the community itself has largely rejected).
  'eal-neurodiversity': (
    <Icon>
      <path d="M8 9a3 3 0 1 0 0 6 3 3 0 0 0 2.5-1.3C11.2 12.5 12 11 12 11s.8 1.5 1.5 2.7A3 3 0 1 0 16 9a3 3 0 0 0-2.5 1.3C12.8 11.5 12 13 12 13s-.8-1.5-1.5-2.7A3 3 0 0 0 8 9Z" />
    </Icon>
  ),
};
