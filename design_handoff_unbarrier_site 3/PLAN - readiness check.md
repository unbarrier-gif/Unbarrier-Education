# readiness check — plan (13 sep 2026, approved + built same day)

built: `Readiness Check.dc.html` · mounted at `/readiness-check` in `Site.dc.html` · hero approved: b's h1 + a's not-line.

sources read: SITE PLAN.md · notion "CTA strategy" (13 sep) · "the subscribe block + consent spec" (28 aug) · "session 4: the readiness check read" (2 sep) · "the check changes the go-to-market" (1 sep) · the bundle's `ReadinessCheck` source.

## what the bundle already has (verified in `_ds_bundle.js`)
- `Unbarrier.ReadinessCheck` IS the isp-audit engine configured: question set `readiness-check-v1`, scored by `domainScores` / `overallReadiness` / `scoreBand` from `lib/isp-audit/summary`. skipped questions are left out, not counted as nought.
- seven dimensions = the 1 sep set: provision · access · design · capability · belonging · trust · evidence. nine questions (access ×2, evidence ×2). six-point scale, "not in place at all" → "fully in place and working". no domain language. ✅ correct, keep.
- `SEVEN_QUESTIONS` (the display component) already matches the 1 sep set. ✅
- one consent only: "help build the picture" (anonymous sector layer) → reveals setting type · size band · role. stored: nine answers + those three + the date.
- already mounted on `/audit` a2 with eyebrow "free · no email needed".

## what the pack asks for that the bundle does not do
1. **no email step at all.** so nothing is forwardable — the result lives on screen and dies on refresh.
2. **two-purpose consent missing.** spec: email to send the result (purpose 1, no marketing consent needed) + unticked "yes, send me notice. i can unsubscribe from any email." (purpose 2). plus the existing sector-layer tick = **three separate consents**. ticking none still shows the result.
3. **result screen is the engine default, not the approved read:** bars 0–100 + `high/medium/low` bands + an overall mean. the 2 sep spec wants: three bands in learner language (reaching · patchy · not reaching), no overall score, no radar, lowest question → "start here", gaps written as sentences a governor would accept, closing line naming which roles haven't answered yet, "i don't know" reported as a finding not a gap.
4. **no share code** (join the same picture across roles).
5. **no onward step** — the 1 sep page calls this "the bottom of the funnel, open". result → discovery day (`/audit`) → book.
6. **privacy notice** at `/legal/privacy` does not name the readiness check, the result email or the sector layer. if we take an email, that is a purpose the notice must describe. code change in the repo, not here — flag.

## proposed build (one dc, no engine change)
**`Readiness Check.dc.html`** — a screen in the design system's own parts (`PageGround`, `Section`, `Eyebrow`, `Button`, `NewsletterBand`), scoring copied 1:1 from the engine so rows stay comparable with the live tool. the bundle component can't be edited from here; a rebuilt screen is the honest way to show the result step, then it syncs back at step 7.

**screen order**
1. hero — eyebrow `free · five minutes · no email needed`, h1, one line on what it is not (a finding). no button; the questions start on scroll.
2. the nine questions, verbatim from the bundle. one change to the scale: add a seventh option **"i don't know"** per question (2 sep spec). scored as unanswered; reported separately.
3. `see my result →` (enabled after one answer).
4. **result** — per-dimension band word only, no numbers: reaching (≥65) · patchy (50–64) · not reaching (<50). same thresholds as `scoreBand`, renamed. lowest becomes **start here** with one sentence. "i don't know" listed as "you couldn't say — that is a finding". caveat line kept from the bundle. closing line: "so far only a [role] has answered. the picture is one seat wide."
5. **keep it / send it** — three boxes, all unticked, none required:
   - email field + `send me this result` — purpose 1. wording under it names unbarrier education ltd (company no. 16603630) and the one-use of the address.
   - `[ ] yes, send me notice. i can unsubscribe from any email.` — purpose 2, exact `CONSENT_WORDING`.
   - `[ ] help build the picture.` — sector layer, reveals setting · size · role (bundle copy).
   - plus a **share code** (six characters, shown on result) with "give this to the head / senco so their answers join yours".
   - plus `copy as text` — the result as plain sentences, for pasting into an email upward. this is the forwardable-without-email path.
6. **onward step** — primary `start with a discovery day →` (`/audit`, pearl aqua), ghost `book a discovery call →` (`/book`). newsletter band not repeated (the consent is inside the form).

**in this build** forms resolve to their success state (no server). email send, share-code join and the row write are visible states, not wired. the wiring goes on the repo side.

## cta fix 1 (unblocks the notion "wobble 1")
- home hero → `/readiness-check` (currently `/audit`).
- `/audit` hero `start the free readiness check →` → `/readiness-check`; a2 (the embedded check) removed from `/audit`, replaced by a short "what the check asks" block linking there.
- `/audit` close per the table: primary = readiness check, ghost = book a discovery call. currently the reverse.
- ghosts on `/hello` and `/inclusion-strategy` that say "check your readiness first" — that's wobble 2 (sideways), nici's yes/no pending in notion; not touched here.

## tweak props
- `emailStep` on/off (if legal wants the email held until the privacy notice paragraph ships)
- `shareCode` on/off
- `bandWords` — learner language vs the engine's high/medium/low (so you can see both)

## rules carried
question wording untouched (not signed off as final). no overall score. no radar. no compass domain word. lowercase. never imply carelessness. every button links `/book`, not the calendar.

## decided 13 sep (decisions log: "readiness check: route, scale, thresholds, and ship sequence")
1. own route `/readiness-check`. `/audit` a2 embed comes out.
2. "i don't know" added as a seventh option, reported as a finding.
3. keep the engine's 65 / 50 cut-offs under the learner words.
4. share code ui held — not built until the repo join logic exists.
5. email field ships **off** behind the `emailStep` tweak until the privacy notice names it.

**hero (approved 13 sep):** h1 *you can see what isn't working. you don't hold the budget. start here.* · not-line = the bundle's result caveat, so hero and result say the same thing.

## for nici's read
- the seven start-here sentences (`START` in the logic) are new copy — written to name the gap, never the neglect. not from the pack.
- /audit a2 pointer block + the new /audit close heading ("start with five minutes. the day comes after.") are new copy.
- the copy-as-text output is the forward-upwards path while `emailStep` is off.
