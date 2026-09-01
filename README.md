# Unbarrier Education

The site at **[unbarrier.me](https://unbarrier.me)**. Phase 1 ships a single page — `/hello` — the QR-target on the back of the Cardiff conference flyer (Wed 29 Apr 2026).

- Bio + CTA cards (driven from Notion)
- MailerLite newsletter opt-in
- "Just say hi" form (forwards to inbox via Resend, also adds to MailerLite)
- Plausible analytics with custom events

`/` redirects to `/hello` for Phase 1. Homepage is Phase 2.

## Stack

- Next.js 14, App Router, TypeScript strict
- CSS Modules + design tokens (no Tailwind)
- `next/font/google` for **Outfit** (headings and the 01–07 numerals), **Comfortaa** (the wordmark and display only — never body, never numerals) and **Lexend** (body, `--fs-body` 1.05rem). Lexend has been the body face since the 26 Jul 2026 typography correction; it was missing from this list until 31 Aug.
  - Cherry Bomb One is also still loaded, for the `.joy` class and nothing else. "in our world we bring the joy" was separated from the consultancy brand on 31 Aug 2026 and is in no current brand rule — the font load and the `.joy` class should come out with it.
- Resend for transactional email
- MailerLite REST API (direct fetch, no SDK)
- Plausible analytics
- Zod for validation

## Architecture — one domain

`unbarrier.me` serves everything from `app/`. There is no multi-zone routing and no `middleware.ts`: both were removed on 28 Aug 2026 when Loop Breakers was retired.

**Retired subdomains.** These 301 to the main domain, defined in `next.config.js` so the rules are reviewable in a diff rather than hidden in the Vercel dashboard:

| Host | 301s to |
|---|---|
| `loop.unbarrier.me` (and `www.`) | `https://www.unbarrier.me/loop-breakers` |
| `loop-breakers.unbarrier.me` | `https://www.unbarrier.me/hello` |

Every path on those subdomains redirects, including the root and anything that would previously have 404'd. The in-app paths `/loop` and `/loop/*` 301 to `/loop-breakers` as well.

**Vercel project setup**: keep `loop.unbarrier.me` assigned to the `unbarrier-me` project — the redirect only runs if the request reaches this app. Removing the domain from the project would 404 those URLs instead of redirecting them. DNS is via Bluehost.

## Run locally

```bash
npm install
cp .env.example .env.local
# fill in MAILERLITE_API_KEY and RESEND_API_KEY in .env.local
npm run dev
```

Open <http://localhost:3000/hello>.

## Deploy

Vercel project `unbarrier-me` is GitHub-connected — pushes to any branch get a preview URL, merges to `feat/hello` ship to production. `feat/hello` is the default/production branch; there is no `main`. Domain `unbarrier.me` already points at Vercel.

## Environment variables

All env vars live in Vercel's project settings. Mirror the structure in `.env.example`.

| Variable | Public? | Notes |
|---|---|---|
| `MAILERLITE_API_KEY` | server-only | Bearer token for the MailerLite REST API |
| `MAILERLITE_GROUP_ID` | server-only | `185831469000688733` (Loop Breakers list) |
| `RESEND_API_KEY` | server-only | Bearer token for Resend |
| `SAY_HI_FORWARD_TO` | server-only | Inbox the say-hi form posts to (`hello@unbarrier.me`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | public | `unbarrier.me` |
| `DATABASE_URL` | server-only | Postgres/Neon connection string for ISP Compass responses. `POSTGRES_URL` accepted as an alias. |
| `ISP_AUDIT_ADMIN_KEY` | server-only | Passcode that unlocks the ISP Compass admin dashboard (`/isp-audit/dashboard`) |

`NEXT_PUBLIC_*` vars are bundled into the browser. Anything sensitive must NOT use that prefix.

> **ISP Compass (`/isp-audit`) requires `DATABASE_URL` (or `POSTGRES_URL`) and `ISP_AUDIT_ADMIN_KEY` to be set in the Vercel _Production_ environment** — without the DB var every submission fails (the respondent sees a retry message; nothing is stored), and without the admin key the dashboard stays locked. The `respondent_email` column is created lazily on first submit.

## File map (Phase 1)

```
app/
  layout.tsx              fonts (next/font), Plausible, root metadata
  globals.css             design tokens (verbatim from colors_and_type.css)
  page.tsx                redirects to /hello
  not-found.tsx           on-brand 404
  hello/
    page.tsx              the page
    page.module.css
    actions.ts            server actions (newsletter + say-hi)
  legal/
    privacy/page.tsx      Phase 2: real privacy text from Legal Pages v1
    terms/page.tsx        Phase 2: real terms text from Legal Pages v1
    legal.module.css
  api/
    say-hi/route.ts       POST handler — Zod + honeypot + rate limit
components/
  HelloHero.tsx
  CtaCard.tsx
  NewsletterBand.tsx
  SayHiForm.tsx
  Footer.tsx
  Wordmark.tsx            shared brand wordmark with coloured-dot variants
  Glow.tsx                shared blur-disc primitive
lib/
  mailerlite.ts           addSubscriber (treats 422 as success)
  resend.ts               sendSayHi
  rateLimit.ts            in-memory map, 5/IP/hour
app/
  favicon.ico             16/32/48/64 in one file
  icon.png                512, maskable-safe
  apple-icon.png          180, opaque amethyst (iOS fills transparency black)
  opengraph-image.png     1200 × 630 share card
public/assets/
  logos/                  8 brand SVGs — mark, wordmark, lockup-strapline,
                          and the five sub-brand lockups
  icons/                  32 brand SVGs — the NDTE five, the 4-pillar check,
                          the voice seven, the numerals 01–07, the notice
                          eight, plus shared `resource` and `research`
  icons-email/            20 PNG twins, 48 × 48 @2x, white + amethyst.
                          SVG does not work in email — Gmail strips it and
                          Outlook will not render it. MailerLite uses these.
  nici-portrait.png       transparent, black and white, 1466 × 2000
  nici-avatar.png         400 × 400, spring-green ground kept
  illustrations/          Phase 2 art. `hero-bring-the-joy.png` and the
                          bring-the-joy wordmarks are retired artwork — the
                          joy line was separated from the consultancy brand
                          on 31 Aug 2026. Nothing in `app/` references them.
  og-hello.png            superseded by app/opengraph-image.png. Unreferenced.
```

## Brand assets

`public/assets/logos/` and `public/assets/icons/` hold the SVG brand set.
Built in-house, 31 Aug 2026. Canva holds reference artwork only and cannot
export SVG — never re-export a brand asset from it.

**Icons and the mark are `stroke="currentColor"`, `fill="none"`.** Inline them.
An `<img src="….svg">` cannot inherit `color`, so it will render black on
amethyst and vanish. This is also what makes them work in the high-contrast
toggle and in black-ink print with no second export. `components/Icon.tsx` is
the inlined set; the files in `public/assets/icons/` stay the canonical source.

- Icon grid: 24 × 24 viewBox, 2.5 stroke, round cap and join. No exceptions.
- `ndte-cycle.svg` is display-size — do not render it below ~40px, or the four
  stage dots close up.
- **Spring green lives on its own path**, tagged `class="accent"`. The rules
  that theme it and drop it in high contrast are in `app/globals.css`. Never
  merge the accent back into the main path, or high contrast has nothing to
  switch off.
- On the numerals the *leading zero* is the green one and the digit is
  `currentColor` — green never carries the information.
- Icon plus text, always. Decorative icons carry `aria-hidden="true"`.
- Wordmark type is Comfortaa, already outlined to paths — no font load needed.

The four files in `app/` need no wiring: the App Router picks up `favicon.ico`,
`icon.png`, `apple-icon.png` and `opengraph-image.png` by filename. **Do not
add a `<link rel="icon">` tag or a manual `og:image` — either will win over
them.** The manual `/assets/og-hello.png` entries were removed from all eight
route files on 31 Aug 2026 for exactly this reason.

**But a route segment that exports its own `openGraph` does not inherit the
file-based card.** `openGraph` is replaced per segment, not merged, so removing
those entries left every route except `/` with no card at all. Each route now
names `/opengraph-image.png` explicitly, and a blog post with no cover image
falls back to it rather than shipping a bare link.

`/inclusion-strategy` is the one override: `app/inclusion-strategy/opengraph-image.png`
sits in its own segment, so the file convention picks it up with no entry
needed. It has the deadline on it. Give any future route its own card the same
way — a PNG in the segment, plus an `opengraph-image.alt.txt` beside it.

Tagline: **designed for difference. did it reach the child?**
The lockup carries the question only; the full line goes in the footer.

## Section grounds and the contrast floor

`components/Section.tsx` is the full-bleed section wrapper. Home used to run
six identical `<section className={styles.section}>`, so a hairline was the
only thing marking a section change. Three grounds now alternate: `base`
(`--bg`), `deep` (`--bg-alt`) and `tint` (`--bg-tint`). **The hairlines stay** —
lines were never the fault; lines doing the sectioning job alone were.

**Grounds are contrast-bound, not free.** `--text-faint` (alpha 0.50) measures
4.51:1 on `--amethyst` — exactly the WCAG AA floor — so any ground lighter than
amethyst pushes it under. Measured over `--amethyst-deep` with pearl-aqua:
6% → 4.58 · **8% → 4.54** · 10% → 4.48 (fails). `--bg-tint` is the 8% mix,
flattened to a hex so the value that was tested is the value that ships.

The same limit governs the tinted panels (`--panel-aqua`, `--panel-green`):
`--text-faint` fails on all of them, so panel copy uses `--text-muted` or
`--text-subtle` only. Measure any new ground or panel before shipping it. Do
not lower a text token to make one fit.

## Branch / PR model

- `feat/hello` is the default and production branch. Branch off it, PR back into it, never push direct.
- Phase 1: `feat/hello` shipped as PR #1. Cardiff hard-deadline 29 Apr.
- Phase 2: one branch per route, each PR&rsquo;d to `feat/hello` independently.
  - `feat/phase-2/homepage` &mdash; unbarrier.me homepage (Week 1).
  - `feat/phase-2/host-kit` &mdash; guest host kit + Nicki + Gemma (Week 3 / 3.5).
  - `feat/phase-2/blog` &mdash; blog system + index (Week 4).
- Phase 3: TBD &mdash; newsletter funnel, content, polish.

## Phase 1.5 todo

- [x] Replace `public/assets/nici-portrait.png` with the real portrait — done 31 Aug 2026, transparent b&w 1466 × 2000.
- [x] Replace `public/assets/og-hello.png` with the designed 1200×630 social card — done 31 Aug 2026 as `app/opengraph-image.png`, picked up by filename. The manual `og:image` entries were removed so it can win.
- [ ] Drop in real `/legal/privacy` text from solicitor (Rob, due 6 May 2026).
- [ ] Drop in real `/legal/terms` text from solicitor (Rob, due 6 May 2026).
- [ ] Update footer Co. No. if ICO registration completes.

## Plausible events

| Trigger | Event | Props |
|---|---|---|
| CTA card click | `cta_click` | `{ card: 'tuesday' \| 'guest' \| 'coaching' \| 'schools' }` |
| Newsletter signup success | `newsletter_signup` | — |
| Say-hi success | `say_hi_sent` | — |

Outbound links auto-track via the `script.outbound-links.tagged-events.js` Plausible loader. (TidyCal was retired as the booking surface on 21 Aug 2026; Loop Breakers is paused and `/loop-breakers/sessions` and `/guest-stage` 301 to the `/loop-breakers` holding page.)

## Acceptance (Spec §09)

- [ ] `/hello` renders mobile (375px) + desktop (1280px)
- [ ] Newsletter form adds a test email to MailerLite group `185831469000688733`
- [ ] Say-hi form delivers to `hello@unbarrier.me` within 60s
- [ ] Plausible shows `cta_click`, `newsletter_signup`, `say_hi_sent` events
- [ ] Lighthouse (mobile): Accessibility ≥ 95, Performance ≥ 90
- [ ] `/` redirects to `/hello`; `/anything-else` hits the 404
