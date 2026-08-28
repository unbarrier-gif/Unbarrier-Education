# Phase 2 — handover for the next Claude Code session

This doc is for the next Claude Code session (likely on Mac) picking up Phase 2 of the unbarrier.me build. Read this top-to-bottom before writing any code.

## Where we are

**Phase 1 (`/hello` Cardiff page)** &mdash; built and pushed, awaiting QA + merge:
- PR #1: `feat/hello` &rarr; `main`
- Live preview should show the v1.2 spec: type-only hero, 4 accent-coloured CTA cards, yellow newsletter band, orchid say-hi band, real privacy + terms pages, working honeypot + rate limit.
- Cardiff QR scan target = `unbarrier.me/hello`. Hard deadline: **Wed 29 Apr 2026**.

**Phase 2 foundation** &mdash; built and pushed, awaiting review + merge:
- PR #2: `feat/phase-2/foundation` &rarr; `main` (layered on top of `feat/hello`)
> **Superseded, 28 Aug 2026.** Loop Breakers is retired. `middleware.ts` and
> `app/loop/` were deleted; `loop.unbarrier.me` now 301s to
> `unbarrier.me/loop-breakers` via `next.config.js`. Everything below about
> multi-zone routing and the loop subdomain is kept as a record of what was
> built, not as instructions. Do not action the Vercel/DNS checklist.

- Adds `middleware.ts` for multi-zone subdomain routing (unbarrier.me + loop.unbarrier.me on a single Next.js app)
- Adds `app/loop/` placeholder ("landing soon")
- README + `docs/local-setup.md` updated

## Architectural decisions already locked

These were resolved in the web Claude Code session that built Phase 1 and the foundation. Don't relitigate:

1. **Single Next.js app, not a Turborepo monorepo.** Source-of-Truth &sect;09c wins over the Phase 2 plan's monorepo prereqs. Both domains served from this one repo.
2. **Subdomain routing via `middleware.ts`.** `unbarrier.me/<path>` maps to `app/<path>`; `loop.unbarrier.me/<path>` silently rewrites to `app/loop/<path>`. Direct hits to `unbarrier.me/loop/*` 308 to the canonical loop subdomain URL.
3. **Shared primitives live in `components/`** &mdash; not in a separate `@unbarrier/design-system` package. `Wordmark`, `Glow`, `CtaCard`, etc. are already there. Add new ones (`Button`, `Card`, `Pill`, `Eyebrow`, `SectionHeader`, `PersonalIntro`, `TestimonialEcho`, `HostKit`, `BlogCard`, etc.) to `components/` as you need them.
4. **`/hello` hero is locked type-only.** No illustration. Don't put one back. Source: `_inbound/Claude Code Prompt - Hello Page.html`.
5. **Multi-PR cadence**: one branch per route. `feat/phase-2/homepage` next, then `feat/phase-2/loop-landing`, then `feat/phase-2/host-kit`, then `feat/phase-2/blog`. Don't bundle.
6. **Branch authorship**: every commit uses `unbarrier-gif <253911519+unbarrier-gif@users.noreply.github.com>` so Vercel accepts deployments. Use `git config user.email` locally on the Mac &mdash; or set per-commit with `git -c user.email=... commit ...`.

## What Vercel needs (operational, not code)

Before Phase 2 routes can serve loop.unbarrier.me:

- [ ] Add `loop.unbarrier.me` (and `www.loop.unbarrier.me` if used) to the `unbarrier-me` Vercel project under Settings &rarr; Domains.
- [ ] Confirm Bluehost DNS for `loop.unbarrier.me` &rarr; Vercel (CNAME `cname.vercel-dns.com.`).
- [ ] No `vision.unbarrier.me` redirect needed &mdash; archived per Nici.

Env vars (from PR #1 work) needed in Vercel for /hello forms to work:
- `MAILERLITE_API_KEY` (Production + Preview) &mdash; **must be named exactly this**, not "Mailerlite"
- `MAILERLITE_GROUP_ID` &mdash; `185831469000688733`
- `RESEND_API_KEY` (Production + Preview) &mdash; **must be named exactly this**, not "Resend"
- `SAY_HI_FORWARD_TO` &mdash; `hello@unbarrier.me`
- `NEXT_PUBLIC_TIDYCAL_TUESDAY` / `_GUEST` / `_COACHING` (Production + Preview)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` &mdash; `unbarrier.me` (**Production only** &mdash; ticking Preview pollutes analytics)

## Phase 2 plan reference

The full plan: `_inbound/Phase 2 - Build Plan.html`. Read it; ignore the monorepo prereqs (already reconciled above).

Other inbound docs you'll want:
- `_inbound/ui_kits/unbarrier-website/` &mdash; Hero.jsx, Sections.jsx, Services.jsx, AboutBeliefs.jsx, Nav.jsx, Primitives.jsx (homepage source mocks)
- `_inbound/ui_kits/loop-breakers/` &mdash; LBHero.jsx, LBHeader.jsx, LBMiddle.jsx, LBPackages.jsx (loop landing source mocks)
- `_inbound/blog/` &mdash; BlogIndex.jsx, BlogCard.jsx, StoriesPost.jsx, BlogPrimitives.jsx
- `_inbound/loop-breakers/sessions/SessionsData.jsx` &mdash; sessions data shape
- `_inbound/loop-breakers/guest-host-kit/` &mdash; the kit + Nicki + Gemma personal-intro letters
- `_inbound/Loop Breakers - Source of Truth.html` &mdash; canonical pricing, capacities, dates
- `_inbound/Visuals.html` &mdash; image naming + asset inventory
- `_inbound/colors_and_type.css` &mdash; design tokens (already in `app/globals.css`)

Asset bundle:
- `_inbound/assets/illustrations/` &mdash; copy needed illustrations into `public/assets/illustrations/` per route
- `_inbound/assets/logos/` &mdash; logo mark + lockups (square version still needs cropping for favicon &mdash; Phase 1.5 todo)
- `_inbound/assets/badges/` &mdash; Apple MIEE/GCE/Innovator badges (homepage credibility strip)
- `_inbound/assets/nicki-portrait.png` &mdash; for Nicki Hambleton's host page (Week 3)

`_inbound/` is excluded from `tsconfig.json` and `.eslintignore` &mdash; reference only, doesn't ship.

## Next step: Week 1 &mdash; homepage

Branch: `feat/phase-2/homepage` off `main` (after PR #1 merges) or off `feat/phase-2/foundation` (if working in parallel).

Source: `_inbound/ui_kits/unbarrier-website/index.html` + the `.jsx` siblings in that folder. Port section by section per the Phase 2 plan &sect;03 table:

| # | Section | Source | Notes |
|---|---|---|---|
| 1 | Nav | `Nav.jsx` | Lowercase links: audit / access / voice / hub / about. Sticks with backdrop-blur. |
| 2 | Hero | `Hero.jsx` | "bring the joy." Cherry Bomb. Triangular spotlight on the right (use `_inbound/assets/illustrations/hero-bring-the-joy.png`, copy to `public/assets/illustrations/`). Two glows. |
| 3 | Services strip | `Services.jsx` | Three cards &mdash; audit (aqua), access (orange), voice (orchid). |
| 4 | Beliefs row | `AboutBeliefs.jsx` | Arrow-bullet list. |
| 5 | About Nici | `Sections.jsx` | Real portrait on amethyst. |
| 6 | Pick your starting point | `Sections.jsx` | Three CTAs: `/audit`, `loop.unbarrier.me`, `mailto:`. |
| 7 | Loop Breakers tease | new `HomeLoopTease.tsx` | Yellow accent, links to loop.unbarrier.me. |
| 8 | Footer | shared | Company line, legal links. |

Acceptance: pixel-compare with the source HTML at 1440 / 1024 / 768 / 390 widths. Lighthouse a11y &ge; 98.

## Working notes for the Mac session

- The repo is at `~/Documents/Unbarrier-Education` (cloned via SSH).
- Run `npm run dev` for live preview at `http://localhost:3000`.
- To preview loop content locally on a non-loop URL: `http://localhost:3000/loop`.
- Plan mode (Shift+Tab) is your friend for any non-trivial change.
- Use the GitHub MCP (already scoped to this repo) to check PR status without leaving the terminal: "what's open on PR #1?"

## OG cards

A prompt for design Claude is drafted (see chat history of the web session). Expected deliverables: 5 PNGs at `assets/og/*.png` in the design system bundle, plus a templated source for blog post variants. Wire them into route metadata in the relevant Phase 2 PRs as they land.
