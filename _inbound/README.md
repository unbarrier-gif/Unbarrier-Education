# Unbarrier Design System

Values-driven practice — consultancy, personal brand, and emerging movement built around real inclusion, belonging, and digital access. This design system is the single source of truth for Unbarrier's voice, visuals, and components.

**Company:** Unbarrier Education Ltd (trading as Unbarrier.Me), Company Number 16603630.
**Founder:** Nici Foote — educator with dyslexia & ADHD, Apple Professional Learning Specialist, Accessibility Champion (Edufuturists Uprising Awards 2026 shortlist).

---

## Index

| Path | Purpose |
| --- | --- |
| `colors_and_type.css` | CSS variables: color palette, type scale, radii, shadows, semantic tokens |
| `fonts/` | Outfit, Comfortaa, Cherry Bomb One — self-hosted TTFs |
| `assets/logos/` | Full logo & icon mark in colour / green / white / black (strap + no-strap) |
| `assets/illustrations/` | Cosmic hero art + transparent PNG elements (planets, wrench, ruler, pyramids etc.) |
| `assets/badges/` | Apple MIEE, GCE, Innovator, I/We Digital badges |
| `preview/` | Design System tab cards (colors, type, spacing, components, brand) |
| `ui_kits/unbarrier-website/` | Main marketing site UI kit (index + JSX components) |
| `ui_kits/loop-breakers/` | Vision→Launch landing page UI kit |
| `SKILL.md` | Agent skill definition — cross-compatible with Claude Code |

## Sources

- **Primary codebase:** `unbarrier-gif/unbarrier-me-APR-2026` (GitHub, private) — React 19 + TypeScript + Vite, shadcn/ui, Tailwind 4. Design tokens live in `src/styles/tokens.ts`.
- **Loop Breakers codebase:** `unbarrier-gif/loop-breakers-landing` (GitHub, private) — Vision→Launch Sessions landing.
- **Live sites:** https://unbarrier.me and https://vision.unbarrier.me (Vercel, auto-deploy on push to main).
- **Brand assets:** provided via the project uploads folder (logos, illustrations, fonts, badges).

---

## Brand at a glance

- **What Unbarrier does:** removes barriers to learning and belonging for neurodivergent and disabled students — and the "60% in the middle" the system forgets. Three service strands: **unbarrier.audit** (EHCP-style reports), **unbarrier.access** (digital accessibility, Apple PLS, iPad strategy), **unbarrier.voice** (student voice + EdTech evidence partner).
- **What it stands for:** belonging first, inclusion as everyday practice, student voice at the centre, joyful no-bullshit communication.
- **The personal brand:** Nici — direct, warm, ADHD-aware. The one in the room who says what others are thinking.
- **The signature moment:** *bring the joy.* — a cosmic triangular "spotlight" illustration, vibrant planets, and a character jumping free of the dark.

---

## CONTENT FUNDAMENTALS

### Voice anchor
> Clear. Human. Grounded. Honest.
> Speaks *with* people, not *at* them. Makes complex things feel usable, not overwhelming. "Let's make this make sense — and actually work for you."

### Five pillars of tone
1. **Clarity over cleverness** — short sentences, clean structure. *"Here's what this actually means."*
2. **Empathy-first, not soft** — names real challenges directly. *"If this feels hard, there's a reason."*
3. **Direct and honest** — says the thing others avoid. *"This isn't a behaviour problem."*
4. **Structured thinking, visible** — ideas are chunked and named. *"There are three things happening here:"*
5. **Quiet authority** — earned, not loud. *"What we see again and again is…"*

### Signature moves
- **Contrast framing** — "This isn't X. It's Y."
- **Naming the invisible** — "What's actually happening here is…"
- **Normalising without excusing** — "Of course this is hard — the system isn't designed for this."
- **Reducing overwhelm** — "You don't need to do everything. Start here."

### Casing & style rules
- **Brand wordmark is always lowercase:** `unbarrier me`, `unbarrier.audit`, `unbarrier.access`, `unbarrier.voice`, `unbarrier.hub`. Never title-case. Navigation links are lowercase too: `audit / access / voice / hub / about`.
- **Headlines use sentence case**, not title case. "Pick your starting point" — not "Pick Your Starting Point".
- **First person, singular and plural, both work.** Nici speaks as "I" from the founder's voice ("I'm Nici — I work with schools, families…"). The collective "we" appears in the strapline: *in our world, we bring the joy.*
- **Use "you"** — speaks *to* the reader, never about them abstractly.
- **UK English** (colour, realise, organisation).
- **Em-dashes and short paragraphs** are the rhythm. Lots of breathing room.
- **No emoji** in brand/marketing voice. Emoji is not a brand device. (Unicode arrows → are fine as a micro-tell after CTAs.)
- **No exclamation marks** in body copy. Confidence doesn't need them.

### What Unbarrier does NOT sound like
- Corporate / EdTech brochure — no "innovative solutions", "transformative learning experiences", "leveraging cutting-edge technology".
- Academic-heavy — no dense theory without translation.
- Performative inspirational — no "every child can succeed if we just believe!".
- Saviour tone — works *with*, not *on*.
- Overly soft or vague — not "it might be helpful to consider…".

### Example copy, verbatim
- Hero: *"The system wasn't built for the 60% in the middle. I'm building it differently."*
- CTA framing: *"Not sure where to start? Just email me. Honestly. Tell me what's happening. I'll tell you if I can help, or point you towards someone who can. No forms, no funnels, no expectations."*
- Belief row: *"Buying a device for a SEND student without a strategy isn't inclusion. It's a tick-box."*

---

## VISUAL FOUNDATIONS

### Colour
- **Dark Amethyst `#210a33` is the canvas.** ~70% of every screen. Everything else floats on top of it.
- **Accent ratio:** 70% Amethyst / 20% White or Antique Cream / 10% one accent. **One accent per section**, never multiple accents fighting.
- **Accents each carry meaning:**
  - Spring Green `#38ff99` → action / CTA / home / hub
  - Pearl Aqua `#69d9d1` → unbarrier.audit (calm, evidence)
  - Princeton Orange `#ff8a1c` → unbarrier.access (premium, energy)
  - Orchid Mist `#db7dcc` → unbarrier.voice / Nici / about (human)
  - School Bus Yellow `#ffc203` → payoff / price / community / Loop Breakers
  - Pink Mist `#e3a1b0` → supporting soft accent
- **No muddy gradients.** Gradients are used sparingly as *glows* (huge blurred radial orbs behind content, 6–10% opacity) and as *section rules* (2px linear gradient from accent→transparent at the top of each section).

### Type
- **Outfit** — all headings (700–900 weight). Tight letter-spacing (-0.025em). Sentence case.
- **Comfortaa** — all body copy (400–600). Generous line-height (1.75+).
- **Cherry Bomb One** — reserved, decorative. Used ONLY for the signature "bring the joy" moment and occasional standout word (*bold stories*). One appearance per screen maximum.
- **Eyebrow label** — Outfit 700, 0.72rem, letter-spacing 0.14em, UPPERCASE, coloured. Sits above every H2 to signal section.

### Illustration
- **Hand-drawn, vibrant, cosmic.** Planets, pyramids, wrenches, rulers, basketballs, beakers, helmets. A character (hair pink/orange, orange tee, blue jeans) floating/jumping. The signature piece is a downward-pointing triangular "spotlight" that pours a colourful world out from the dark.
- **All illustrations live on Amethyst.** Never on white. Transparent PNGs so they can be placed over the canvas with glows.
- **Ambient glow treatment.** Illustrations get a soft blurred radial halo of their dominant colour (orange planet → orange glow, blue planet → green-cyan glow).
- **Never hand-rolled SVG.** When you need an illustration, COPY from `assets/illustrations/`. Never draw your own.

### Backgrounds
- Solid Amethyst by default.
- **Glow orbs:** absolutely-positioned 400–700px blurred radial divs (filter: blur(160px); opacity 0.06–0.12) in the section accent colour.
- **Subtle tinted bands:** `linear-gradient(135deg, <accent>14, <accent>09)` for "about" / "human" sections — very low alpha, noticeable only in peripheral vision.
- Never full-bleed photography. Never repeating patterns. Never noise textures.

### Shape & borders
- **Corner radius:** 12px is the site default. Cards step up to 18px. Pills / buttons use 100px.
- **Border default:** 1.5px `rgba(255,255,255,0.08)`. On hover, switches to `<accent>70` (~44% alpha).
- **No heavy drop shadows.** Depth comes from accent glows and hairline borders, not elevation shadows. `shadow-md` exists for cards-over-image moments only.

### Hover & press
- Links: colour fades from `rgba(240,235,229,0.6)` → full `--text` on hover (150ms).
- Buttons: reduce to `opacity: 0.88` on hover. No colour shift, no scale.
- Cards: background tints to `<accent>0e` (5% alpha), border lifts to `<accent>70`. 200ms ease.
- Press: no bespoke press state — :active relies on the opacity/border change.

### Layout rules
- Content max-width: **1200–1300px** for landing sections, **900px** for inner page heroes, **720px** for reading/legal pages.
- Sections: vertical rhythm `clamp(4rem, 8vw, 7rem)` top/bottom; `clamp(1.5rem, 5vw, 5rem)` horizontal.
- **Fixed nav:** translucent amethyst (rgba(33,10,51,0.82)) with 20px backdrop-blur; tightens to 0.97 alpha once scrolled 40px.
- **Section bar:** 2px linear-gradient accent→transparent at the top of every new section. The colour signals the section.
- Grid: `repeat(auto-fit, minmax(260–320px, 1fr))`. Gap 16–32px.

### Animation
- Restrained. 150–300ms ease transitions on colour, opacity, border.
- No bounces, no springs, no parallax.
- Scroll animations are opt-in at most — prefer static, confident layouts.
- No skeleton loaders or shimmer effects in the brand surface.

### Transparency & blur
- Nav: `backdrop-filter: blur(20px)` over a 0.82-alpha amethyst. This is the one place heavy blur lives.
- Everywhere else: keep things solid. Transparency is used for *text* tiers (65% / 45% / 32% alpha of the text colour), not for glass panels.

### Imagery vibe
- **Vibrant, joyful, slightly weird.** The world is out in space. Colours pop — fuchsia, acid green, orange, sky blue. Character faces are round and friendly.
- **Never stock photography.** Never AI-generated people. When a photo is needed (e.g. Nici), it is a real portrait on a plain amethyst background.

---

## ICONOGRAPHY

- **There is no custom icon font or icon set in the codebase.** The brand leans on *illustration*, not *iconography*. Where a tiny ui symbol is needed, the codebase uses:
  - **Unicode arrows:** `→` after CTA text (*"Find out more →"*, *"Email Nici →"*, *"More about Nici →"*). This is the house style.
  - **Bullet-style arrow rows** — `→` as a list bullet in Belief-style components (coloured with the section accent).
  - No emoji in any production code or marketing voice.
- **For any new surface that genuinely needs UI icons** (e.g. settings gear, close X, checkmark), use **Lucide** via CDN (`https://unpkg.com/lucide@latest`). Stroke weight 1.5, same colour as text. **This is a substitution** — flag to user and prefer requesting a bespoke set before launch. ⚠ Flagged.
- **Apple-related badges** (MIEE, GCE, Innovator, I/We Digital) live in `assets/badges/`. Use at 32–64px tall, never manipulated, always on amethyst.
- **The brand mark itself** is the "U-shield with spotlight + book" — available as colour / green / white / black in `assets/logos/`. Use icon-only at ≤48px, full logo from 120px up, full-with-strap version on marketing surfaces.

---

## Font substitutions
All three families (Outfit, Comfortaa, Cherry Bomb One) are provided as TTFs and self-hosted in `fonts/`. No Google Fonts fallback needed, but production uses `https://fonts.googleapis.com/css2?family=Outfit…` as a fallback — both sources match.

No substitutions required. ✅
