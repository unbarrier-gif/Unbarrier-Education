# Loop Breakers content

> **Loop Breakers is retired (28 Aug 2026).** `/loop-breakers` is a holding
> page; `/loop-breakers/sessions` and `/guest-stage` 301 to it. Booking URLs
> have been removed from `sessions.json` and every session CTA renders
> disabled. TidyCal was retired as the booking surface on 21 Aug 2026 — do
> not reintroduce TidyCal links here. The notes below apply if the room
> restarts on a new booking provider.

## Editing sessions

Sessions are listed in [sessions.json](sessions.json). To add a new session:

1. Copy any existing session block as a template.
2. Fill in: `slug` (kebab-case, unique), `date` (YYYY-MM-DD), `theme` (one-line title), `blurb` (1–2 sentences).
3. There is no `bookingUrl` field any more. Restoring booking means adding it
   back to `LBSession` in [sessions.ts](sessions.ts) and re-enabling
   [ctaForSession.ts](../../components/loop-breakers/sessions/ctaForSession.ts),
   which is the single place every session CTA is built.
4. Set `isGuestStage: true` if it's a Wednesday Guest Stage; otherwise `false`.
5. `status` values:
   - `"open"` — booking now
   - `"soon"` — visible but not yet booking
   - `"waitlist"` — fully booked, taking waitlist
   - `"full"` — closed
   - `"past"` — auto-filtered off the landing page; shown in the "Past" filter on `/loop-breakers/sessions`
6. `accent` uses CSS var tokens defined in [app/globals.css](../../app/globals.css):
   `var(--spring-green)` · `var(--pearl-aqua)` · `var(--orchid-mist)` · `var(--princeton-orange)` · `var(--school-bus-yellow)`.

After editing, push to `feat/hello`. The page revalidates within 60s of deploy — past sessions auto-hide on the landing page; upcoming sessions appear in chronological order.

