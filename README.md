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
- `next/font/google` for Outfit + Comfortaa + Cherry Bomb One
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
public/assets/
  illustrations/          hero-bring-the-joy.png + Phase 2 art
  logos/                  brand mark
  nici-portrait.png       PLACEHOLDER (replace Mon)
  og-hello.png            PLACEHOLDER
```

## Branch / PR model

- `feat/hello` is the default and production branch. Branch off it, PR back into it, never push direct.
- Phase 1: `feat/hello` shipped as PR #1. Cardiff hard-deadline 29 Apr.
- Phase 2: one branch per route, each PR&rsquo;d to `feat/hello` independently.
  - `feat/phase-2/homepage` &mdash; unbarrier.me homepage (Week 1).
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

Outbound links auto-track via the `script.outbound-links.tagged-events.js` Plausible loader. (TidyCal was retired as the booking surface on 21 Aug 2026; Loop Breakers is paused and `/loop-breakers/sessions` and `/guest-stage` 301 to the `/loop-breakers` holding page.)

## Acceptance (Spec §09)

- [ ] `/hello` renders mobile (375px) + desktop (1280px)
- [ ] Newsletter form adds a test email to MailerLite group `185831469000688733`
- [ ] Say-hi form delivers to `hello@unbarrier.me` within 60s
- [ ] Plausible shows `cta_click`, `newsletter_signup`, `say_hi_sent` events
- [ ] Lighthouse (mobile): Accessibility ≥ 95, Performance ≥ 90
- [ ] `/` redirects to `/hello`; `/anything-else` hits the 404
