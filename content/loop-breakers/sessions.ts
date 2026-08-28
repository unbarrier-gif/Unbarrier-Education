// Typed entry point for Loop Breakers session data.
// Edits go in sessions.json — this file just types and sorts the array
// so consumers (LBUpcoming, /loop-breakers/sessions, /guest-stage/[slug])
// don't all duplicate the cast + sort.

import data from './sessions.json';

export type SessionStatus =
  | 'open'
  | 'soon'
  | 'waitlist'
  | 'full'
  | 'past';

export type LBSession = {
  slug: string;
  date: string;        // 'YYYY-MM-DD'
  time: string;        // '10:30'
  tz: string;          // 'BST'
  host: string;
  hostRole: string;
  theme: string;
  blurb: string;
  /** Long-form variant for detail/booking surfaces. Optional; only set where the room benefits from a longer explanation. */
  blurbLong?: string;
  format: string;
  durationMin: number;
  seats: number;
  seatsLeft: number;
  isGuestStage: boolean;
  /** Default true. Set false only for explicitly solo-guest sessions — none planned currently. */
  coHosted: boolean;
  price: {
    amount: number;
    currency: string;
    note: string;
  };
  status: SessionStatus;
  tags: string[];
  accent: string;      // CSS var token, e.g. 'var(--spring-green)'
  replay?: boolean;
};

export const SESSIONS = (data.sessions as LBSession[])
  .slice()
  .sort((a, b) => a.date.localeCompare(b.date));

export const upcomingSessions = (): LBSession[] =>
  SESSIONS.filter((s) => s.status !== 'past');

export const pastSessions = (): LBSession[] =>
  SESSIONS.filter((s) => s.status === 'past').reverse();

export const openSessions = (): LBSession[] =>
  SESSIONS.filter((s) => s.status === 'open');

export const guestStages = (): LBSession[] =>
  SESSIONS.filter((s) => s.isGuestStage);

// Pretty-print "Tue 5 May" from an ISO date. Avoids timezone bugs that
// would surface if we constructed a Date with no zone — `${date}T00:00:00`
// pins it at local midnight, which lines up with what the calendar says.
export function formatSessionDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function formatTimeRange(time: string, durationMin: number): string {
  const [hh, mm] = time.split(':').map((x) => parseInt(x, 10));
  const start = new Date(2000, 0, 1, hh, mm);
  const end = new Date(start.getTime() + durationMin * 60_000);
  const fmt = (d: Date) =>
    `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  return `${fmt(start)}–${fmt(end)}`;
}
