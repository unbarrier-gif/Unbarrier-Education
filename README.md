# Unbarrier Education

The site at **[unbarrier.me](https://unbarrier.me)**. Phase 1 ships a single page — `/hello` — the QR-target on the back of the Cardiff conference flyer (Wed 29 Apr 2026).

- Bio + 4 CTA cards (TidyCal link-out)
- MailerLite newsletter opt-in
- "Just say hi" form (forwards to inbox via Resend, also adds to MailerLite)
- Plausible analytics with custom events

`/` redirects to `/hello` for Phase 1. Homepage is Phase 2.

## Stack

- Next.js 14, App Router, TypeScript strict
- CSS Modules + design tokens (no Tailwind)
- `next/font/google` for Outfit + Comfortaa + Cherry Bomb One
- Resend for transactional email
- MailerLite REST API (direct fetch, no SDK)
- Plausible analytics
- Zod for validation
- Multi-zone subdomain routing via `middleware.ts` (single Next app serves both `unbarrier.me` and `loop.unbarrier.me`)

## Architecture — multi-zone routing (Phase 2)

One Next.js app, two domains. `middleware.ts` reads the request host and rewrites paths into the right route subtree.

| Host | Resolves from |
|---|---|
| `unbarrier.me` (and `www.`) | `app/page.tsx`, `app/hello/`, `app/legal/`, `app/blog/`, &hellip; |
| `loop.unbarrier.me` (and `www.`) | `app/loop/*` &mdash; middleware silently prepends `/loop` |

Direct hits to `unbarrier.me/loop/*` 308-redirect to the canonical `loop.unbarrier.me/*` URL.

**Vercel previews** don&rsquo;t carry the subdomain &mdash; access loop content on a preview URL by hitting `/loop` directly: `https://<preview>.vercel.app/loop/sessions`.

**Vercel project setup**: both `unbarrier.me` and `loop.unbarrier.me` must be assigned to the same Vercel project (Settings &rarr; Domains). DNS is via Bluehost.

## Run locally

```bash
npm install
cp .env.example .env.local
# fill in MAILERLITE_API_KEY and RESEND_API_KEY in .env.local
npm run dev
```

Open <http://localhost:3000/hello>.

## Deploy

Vercel project `unbarrier-me` is GitHub-connected — pushes to any branch get a preview URL, merges to `main` ship to production. Domain `unbarrier.me` already points at Vercel.

## Environment variables

All env vars live in Vercel's project settings. Mirror the structure in `.env.example`.

| Variable | Public? | Notes |
|---|---|---|
| `MAILERLITE_API_KEY` | server-only | Bearer token for the MailerLite REST API |
| `MAILERLITE_GROUP_ID` | server-only | `185831469000688733` (Loop Breakers list) |
| `NEXT_PUBLIC_TIDYCAL_TUESDAY` | public | Tuesday Loop Breakers booking URL |
| `NEXT_PUBLIC_TIDYCAL_GUEST` | public | Wednesday Guest Stage booking URL |
| `NEXT_PUBLIC_TIDYCAL_COACHING` | public | Accessible Coaching booking URL |
| `RESEND_API_KEY` | server-only | Bearer token for Resend |
| `SAY_HI_FORWARD_TO` | server-only | Inbox the say-hi form posts to (`hello@unbarrier.me`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | public | `unbarrier.me` |

`NEXT_PUBLIC_*` vars are bundled into the browser. Anything sensitive must NOT use that prefix.

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
  loop/                   Phase 2: loop.unbarrier.me content tree
    layout.tsx
    page.tsx              "landing soon" placeholder
    page.module.css
    not-found.tsx
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
  tidycal.ts              re-exports the 3 booking URLs from env
  rateLimit.ts            in-memory map, 5/IP/hour
middleware.ts             multi-zone subdomain routing
public/assets/
  illustrations/          hero-bring-the-joy.png + Phase 2 art
  logos/                  brand mark
  nici-portrait.png       PLACEHOLDER (replace Mon)
  og-hello.png            PLACEHOLDER
```

## Branch / PR model

- Phase 1: `feat/hello` &rarr; PR #1 to `main`. Cardiff hard-deadline 29 Apr.
- Phase 2: one branch per route, each PR&rsquo;d to `main` independently.
  - `feat/phase-2/foundation` &mdash; middleware + `/loop` scaffolding.
  - `feat/phase-2/homepage` &mdash; unbarrier.me homepage (Week 1).
  - `feat/phase-2/loop-landing` &mdash; loop.unbarrier.me landing + sessions (Week 2).
  - `feat/phase-2/host-kit` &mdash; guest host kit + Nicki + Gemma (Week 3 / 3.5).
  - `feat/phase-2/blog` &mdash; blog system + index (Week 4).
- Phase 3: TBD &mdash; newsletter funnel, content, polish.

## Phase 1.5 todo

- [ ] Replace `public/assets/nici-portrait.png` with the real portrait (Nici sending Mon).
- [ ] Replace `public/assets/og-hello.png` with the designed 1200×630 social card.
- [ ] Drop in real `/legal/privacy` text from solicitor (Rob, due 6 May 2026).
- [ ] Drop in real `/legal/terms` text from solicitor (Rob, due 6 May 2026).
- [ ] Update footer Co. No. if ICO registration completes.

## Plausible events

| Trigger | Event | Props |
|---|---|---|
| CTA card click | `cta_click` | `{ card: 'tuesday' \| 'guest' \| 'coaching' \| 'schools' }` |
| Newsletter signup success | `newsletter_signup` | — |
| Say-hi success | `say_hi_sent` | — |

Outbound TidyCal links also auto-track via the `script.outbound-links.tagged-events.js` Plausible loader, giving us redundant data on the same clicks.

## Acceptance (Spec §09)

- [ ] `/hello` renders mobile (375px) + desktop (1280px)
- [ ] All 4 CTA cards open correct TidyCal URL in new tab
- [ ] Newsletter form adds a test email to MailerLite group `185831469000688733`
- [ ] Say-hi form delivers to `hello@unbarrier.me` within 60s
- [ ] Plausible shows `cta_click`, `newsletter_signup`, `say_hi_sent` events
- [ ] Lighthouse (mobile): Accessibility ≥ 95, Performance ≥ 90
- [ ] `/` redirects to `/hello`; `/anything-else` hits the 404
