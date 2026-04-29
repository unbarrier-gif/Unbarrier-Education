import type { LBSession } from '@/content/loop-breakers/sessions';

// Shared CTA copy for any session card. Both SessionCard (full filterable
// list at /loop-breakers/sessions) and LBUpcoming (homepage preview) call
// this so their button text can't drift apart again. If you change copy,
// change it here.
export type SessionCta =
  | { label: string; href: string; disabled: false }
  | { label: string; href: null; disabled: true };

export function ctaForSession(s: LBSession): SessionCta {
  if (s.status === 'past') {
    return { label: 'Past session', href: null, disabled: true };
  }
  if (s.status === 'full' || s.status === 'waitlist') {
    return { label: 'Join the waitlist →', href: s.bookingUrl, disabled: false };
  }
  if (s.isGuestStage) {
    return s.status === 'open'
      ? { label: 'Book Guest Stage →', href: s.bookingUrl, disabled: false }
      : { label: 'Save my seat →', href: s.bookingUrl, disabled: false };
  }
  return s.status === 'open'
    ? { label: 'Book your seat →', href: s.bookingUrl, disabled: false }
    : { label: 'Tell me when it opens →', href: s.bookingUrl, disabled: false };
}
