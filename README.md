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
- `next/font/google` for the three type tiers — **Outfit**, **Lexend**, **Comfortaa** — see "Type tiers and the lowercase rule" below. Nothing else is loaded.
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

**Third-party credential marks are the exception, and stay outside all of the
above.** Apple, Google, Microsoft and Edufuturists marks ship as supplied, in
the colourway that suits the ground — no `currentColor`, no `class="accent"`,
no high-contrast drop, no token (decision, 2 Sep 2026). They are served as
`<img>` from the unmodified files under their suppliers' own filenames
(`public/assets/Apple_Prof_Learning_Specialist_1ln_wht_061623.svg` and
`…_blk_…` for the APLS badge; `components/AplsBadge.tsx` picks by ground). Do
not inline, rename, optimise or recolour them.

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

## Type tiers and the lowercase rule

Three faces, tiered like the colour. Recovered from the original Unbarrier Me
guidelines on 2 Sep 2026: the original stack was MuseoModerno · Comfortaa ·
Cherry Bomb One, and the current stack is a deliberate evolution of it.

| tier | face | job |
|---|---|---|
| primary | **Outfit** | headings, impact text, large pullouts, the 01–07 numerals |
| secondary | **Lexend** | body copy (`--fs-body` 1.05rem). Replaced Comfortaa for readability on 26 Jul 2026 — deliberate |
| brand | **Comfortaa** | the wordmark and display only. Never body, never numerals |
| tertiary | Cherry Bomb One | illustration visuals only. **Not a consultancy face and not loaded** — removed from `app/layout.tsx` with the `.joy` class on 2 Sep 2026 |

**Lowercase is an accessibility decision, not a style.** Section 2.7 of the
original guidelines, verbatim:

> "Where possible we keep everything lowercase for ease of legibility.
> Comfortaa is a dyslexia-friendly font. The larger letter spacing and
> increased line spacing improve readability for the individual."

That line carries two specs the system had never written down, both
readability decisions rather than taste: **larger letter spacing** and
**increased line spacing**. In the tokens they are `--lh-body` 1.75 on every
paragraph, `--lh-loose` 1.85, `letter-spacing: 0.01em` on the base `p`, and
the reading preference `data-spacing` stepping to 1.95 / 0.045em / 0.12em
word spacing. Do not tighten any of them to fit a layout. Casing by channel
is still the rule (the website lowercase; emails and LinkedIn sentence case)
— see decisions & rules in Notion.

## Colour: two tiers, the ground ladder, the panels

Ruled 2 Sep 2026 and restored from the original guidelines; the token block
in `app/globals.css` is the source and carries the measurements. In short:

- **Primaries** lead and one is on every surface: techy green `--spring-green`
  (action), new world blue `--amethyst` (the page — a blue, not a purple),
  light joy `--antique-white` (print and lockups, never a screen ground).
- **Secondaries** never lead a page and never become a ground: light blue
  `--pearl-aqua` (evidence, numbers), dark pink `--orchid-mist` (anything
  human), orange `--princeton-orange` (dates, deadlines), light pink
  `--pink-mist` (beside dark pink only), yellow `--school-bus-yellow` (pills
  and labels only).
- **Grounds are new world blue only**: `--ground-500` the page ·
  `--ground-400` · `--ground-300` (footers, bands) · `--ground-200` (the
  deepest well). Every tinted ground is vetoed; `--bg-tint` is superseded
  and survives only as home's third ground until home moves onto the ladder.
- **A colour goes up, never down.** Two moves: *full strength* (the accent as
  a block or pill with new world blue text — once per page, `.pull` on the
  route pages) and *lifted* (the accent at 10% over the page: the six
  `--panel-*` tokens). Darkening a brand colour toward black is banned.
- The code names are the shipped names. Renaming `--amethyst` to
  `--new-world-blue` touches every file and is Nici's call.

## Section grounds and the contrast floor

`components/Section.tsx` is the full-bleed section wrapper. Home used to run
six identical `<section className={styles.section}>`, so a hairline was the
only thing marking a section change. The wrapper carries the ground ladder:
`base` (500), `second` (400), `deep` (300), `well` (200), plus the superseded
`tint` that home still uses. The five route pages (`/audit`, `/access`,
`/about`, `/faq`, `/edtech`) walk 400 → 300 → 500 from the hero and close on
the 200 well; boxed items sit on the panel that matches the section's job
(evidence light blue · human dark pink · dates orange · what-happens-next
green), and each page carries exactly one full-strength block.

**Drawn edges are off, site-wide (2 Sep 2026).** This supersedes the 31 Aug
"keep the hairlines" finding. Sections are separated by ground, never by a
line: the `SectionBar` component is gone, and the 1px card outlines, the 3px
accent bars and the divider rules came off every card, panel and band. A card
that lost its outline sits on one of the shipped grounds instead
(`--bg-alt`, `--bg-tint`, `--panel-aqua`, `--panel-green`).

What keeps an edge, on purpose: every `:focus-visible` outline; form-control
boundaries (text inputs, selects, the consent checkbox, the contrast toggle,
the reading controls, filter chips and secondary buttons); the row rules in
the `/legal` data tables; and **high contrast**. The `--border-*` tokens jump
from 0.08 to 0.45 inside `html.contrast-high`, where they do access work, so
every removed 1px rule is restored under that selector in the same module
(`:global(html.contrast-high) .card { border: … }`). Removing a border from
the default theme without re-adding it there is a regression.

**Grounds are contrast-bound, not free.** `--text-faint` (alpha 0.50) measures
4.51:1 on `--amethyst` — exactly the WCAG AA floor — so any ground lighter than
amethyst pushes it under. Measured over `--amethyst-deep` with pearl-aqua:
6% → 4.58 · **8% → 4.54** · 10% → 4.48 (fails). `--bg-tint` is the 8% mix,
flattened to a hex so the value that was tested is the value that ships.

The same limit governs the six panels (`--panel-green`, `--panel-lightblue`,
`--panel-darkpink`, `--panel-orange`, `--panel-lightpink`, `--panel-yellow`;
`--panel-aqua` is the shipped alias of light blue): muted and subtle pass on
all six and `--text-faint` fails on every one, so panel copy uses
`--text-muted` or `--text-subtle` only. Measure any new ground or panel
before shipping it. Do not lower a text token to make one fit.

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
