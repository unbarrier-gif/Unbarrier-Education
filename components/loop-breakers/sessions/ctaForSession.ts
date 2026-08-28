import type { LBSession } from '@/content/loop-breakers/sessions';

// Shared CTA copy for any session card. Both SessionCard (full filterable
// list at /loop-breakers/sessions) and LBUpcoming (homepage preview) call
// this so their button text can't drift apart again. If you change copy,
// change it here.
//
// Loop Breakers is paused (28 Aug 2026) and TidyCal was retired as the
// booking surface on 21 Aug 2026, so there are no booking URLs left in
// sessions.json to point at. Every CTA is therefore disabled — this stays a
// function so that restarting the room is one change here plus booking URLs
// back in the data, rather than an archaeology exercise.
export type SessionCta = { label: string; href: null; disabled: true };

export function ctaForSession(s: LBSession): SessionCta {
  if (s.status === 'past') {
    return { label: 'Past session', href: null, disabled: true };
  }
  return { label: 'sessions paused', href: null, disabled: true };
}
