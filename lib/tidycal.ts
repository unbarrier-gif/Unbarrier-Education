// Hard-coded fallbacks so links resolve even when Preview env vars are missing.
// These URLs are public, locked in Spec §05, and safe to ship in the bundle.
const FALLBACKS = {
  tuesday: 'https://tidycal.com/nici/loop-breakers-sessions-vision-to-launch',
  guest: 'https://tidycal.com/nici/loop-breakers-sketch-noting-for-joy-and-for-thinking',
  coaching: 'https://tidycal.com/nici/chat-with-nici',
} as const;

export const TIDYCAL_LINKS = {
  tuesday: process.env.NEXT_PUBLIC_TIDYCAL_TUESDAY || FALLBACKS.tuesday,
  guest: process.env.NEXT_PUBLIC_TIDYCAL_GUEST || FALLBACKS.guest,
  coaching: process.env.NEXT_PUBLIC_TIDYCAL_COACHING || FALLBACKS.coaching,
} as const;

export type TidyCalKey = keyof typeof TIDYCAL_LINKS;
