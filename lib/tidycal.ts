export const TIDYCAL_LINKS = {
  tuesday: process.env.NEXT_PUBLIC_TIDYCAL_TUESDAY ?? '',
  guest: process.env.NEXT_PUBLIC_TIDYCAL_GUEST ?? '',
  coaching: process.env.NEXT_PUBLIC_TIDYCAL_COACHING ?? '',
} as const;

export type TidyCalKey = keyof typeof TIDYCAL_LINKS;
