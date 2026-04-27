# Loop Breakers content

## Editing sessions

Sessions are listed in [sessions.json](sessions.json). To add a new session:

1. Copy any existing session block as a template.
2. Fill in: `slug` (kebab-case, unique), `date` (YYYY-MM-DD), `theme` (one-line title), `blurb` (1–2 sentences).
3. For `bookingUrl`:
   - **Tuesday Loop Breakers** → use `https://tidycal.com/nici/loop-breakers-sessions-vision-to-launch`
   - **Wednesday Guest Stage** → use `https://tidycal.com/nici/loop-breakers-sketch-noting-for-joy-and-for-thinking`
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

## TidyCal URLs

The `tidycal` block at the top of `sessions.json` is the source of truth for booking links. If TidyCal slugs ever change, update them here once and every consumer picks up the new URL.

| Key | URL |
|---|---|
| `tuesday` | https://tidycal.com/nici/loop-breakers-sessions-vision-to-launch |
| `guestStage` | https://tidycal.com/nici/loop-breakers-sketch-noting-for-joy-and-for-thinking |
| `oneToOne` | https://tidycal.com/nici/accessible-coaching-monthly |
