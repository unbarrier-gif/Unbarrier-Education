// Typed entry point for /guest-stage content.
// `sessionSlug` joins each guest record to a row in sessions.json so
// price / date / bookingUrl never get duplicated.

import data from './guests.json';
import { SESSIONS, type LBSession } from './sessions';

export type GuestStatus = 'live' | 'draft' | 'past';

export type SketchNoteExample = {
  src: string;
  alt: string;
};

export type GuestStage = {
  slug: string;
  sessionSlug: string;
  guest: {
    name: string;
    role: string;
    tagline: string;
    bio: string;
    photo?: string;
    heroImage?: { src: string; alt: string };
    links?: Record<string, string>;
    sketchNoteExamples?: SketchNoteExample[];
  };
  session: {
    title: string;
    subtitle?: string;
    longBlurb: string;
    youllLeaveWith: string[];
    whoForExtra?: string;
    format: string;
    accent: string;
  };
  status: GuestStatus;
};

export const GUESTS = data.guests as GuestStage[];

export const liveGuests = (): GuestStage[] =>
  GUESTS.filter((g) => g.status === 'live');

export const pastGuests = (): GuestStage[] =>
  GUESTS.filter((g) => g.status === 'past');

export function findGuestBySlug(slug: string): GuestStage | undefined {
  return GUESTS.find((g) => g.slug === slug);
}

export function findSessionForGuest(g: GuestStage): LBSession | undefined {
  return SESSIONS.find((s) => s.slug === g.sessionSlug);
}
