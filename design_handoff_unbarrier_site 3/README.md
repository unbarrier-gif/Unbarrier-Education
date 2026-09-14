# handover: unbarrier.me rebuild — staged, seven pages

date: 13 september 2026 (rev 3, evening — home reorder + nici block rule + /about stub) · owner: nici (unbarrier education ltd) · for: claude code, working in the unbarrier.me next.js repo

## read this first

the files in this bundle are **design references built in html** — prototypes showing the intended look, copy and behaviour. they are not production code to ship. the task is to **recreate each screen in the unbarrier.me next.js codebase** using its own components (the `unbarrier-education` react library — `PageGround`, `Nav`, `Section`, `Eyebrow`, `Button`, `CtaCard`, `NewsletterBand`, `Footer`, `SevenQuestions`, `ReadinessCheck`, `AdminLoginForm`, blog components) and its token sheet (`app/globals.css`). the design system bundled here IS that library, so component names, props and tokens map 1:1. never type a hex; every value is a `var(--token)`.

**fidelity: high.** copy is final where marked approved. layout, ground ladder, spacing and component choice are final. recreate faithfully; do not restyle.

## how the prototypes are organised

- `Site.dc.html` — one file, one screen per route behind `<sc-if value="{{ isX }}">`. the logic class at the bottom maps `/audit`, `/access`, `/voice`, `/hello`, `/readiness-check` … to screens. **each `<sc-if>` block = one next.js route.** ignore screens not in this handover (inclusion-strategy, kit, ndte, resources) — they are parked, not cancelled.
- block ids inside each screen (`b0`…`b6`, `a0`…`a3`, `c0`…`c8`, `v0`…) are section anchors; use them in questions back to nici ("c3 heading").
- `<x-import component-from-global-scope="Unbarrier.Button" …>` = `<Button …>` from the library. attributes are props (kebab → camelCase). `{{ }}` holes are values from the logic class.
- `data-props` json on the `<script data-dc-script>` tag lists **tweak props** — these are nici's open decisions. each becomes either a feature flag or a content field, never a hard-coded pick. defaults given per stage below.
- `.dc.html` files ending in "Baseline" / "Proposal" / "Discovery Day" are **printable A4 documents** (`doc-page` component, white paper, sentence case) — deliver as pdf, not as routes.

## rules that hold on every page (binding)

lowercase on the website (brand names keep case; sentence case only on paper docs) · "we" never "i" · "learners" not "students" · never imply a school was careless · no client named · no day rate · **one cta per page** + the subscribe block · no live week-count (write "this term") · deadline is the dfe's, not ours · every figure with source + year · never cite: joyce & showers 5/95, £900m, 276,890, "sustained beats one-off" · every booking button links `/book` (nici owns the `/book` → calendar redirect; the library's `BOOKING_URL` constant still holds the calendar url — update it) · ground ladder separates sections, never lines: no borders, dividers or card outlines · every page closes on a primary `Button` (strand colour) + ghost `Button` · voice = seven *questions*; "domains" only for the six domains of inclusion.

## scope rule

**if it is not decided in notion, it is out of scope.** anything below marked *open* is not built, not defaulted, not asked about — the developer ships without it and leaves a code-level flag off. nici decides later in notion; the developer picks it up on the next pass.

## delivery order

ship in this order. each stage is independently deployable; nothing in a later stage blocks an earlier one.

| stage | route(s) | source in bundle | strand colour |
|---|---|---|---|
| 1 | `/` (home) | `Site.dc.html` → `isHome`, b0–b6 | spring green |
| 2 | `/audit` + `/readiness-check` | `Site.dc.html` → `isAudit` a0–a3 · `Readiness Check.dc.html` | pearl aqua |
| 3 | `/access` | `Site.dc.html` → `isAccess` c0–c8 | princeton orange |
| 4 | `/voice` + baseline pdf | `Voice.dc.html` · `Voice Baseline.dc.html` · SevenQuestions data | orchid mist |
| 5 | `/hello` (public + admin) | `Site.dc.html` → `isHello` e0–, e-login, e-admin | spring green |
| 1b | `/about` | `Site.dc.html` → `isAbout` h0–h2 — **stub**, ship with stage 1 so the about link resolves | spring green |
| — | `/blog` | **out of scope** — not designed, not decided; existing blog stays live untouched | — |

---

## stage 1 — home `/`

**status: approved copy, ready.**
source: `Site.dc.html` lines ~43–132 (`isHome`). notion: "website rebuild — approved page drafts (28 aug 2026)" → `/`.

structure (top → bottom), **reordered 13 sep evening — this order is final**: `Nav` (no active) → hero b0 (`Glow` spring green + orchid, `Eyebrow`, h1 "you bought it. nobody checked it reached the child.", lede, primary `Button` → `/readiness-check`, ghost → `#b4`) → b1 nici block (ground-400: portrait `image-slot` 132px circle, `AplsBadge ground="amethyst"`, "led by nici foote", one-line bio, `ScopeLine`) → **b3 `IAmChooser`** (`Section ground="base"` — the route system, first fork after the hero) → **b1a `InclusionStrategyBand`** (the dated route; copy unchanged, keep the component as is) → **b2 ndte strip** (ground-300, one row: "however you come in, it runs the same way." + four `Icon`s `ndte-notice|design|try|embed` with bold labels + ghost `Button` "how the work runs →" → `/ndte`) → b4 `SevenQuestions heading="what it asks — the seven questions" ground="second"` (`--route-accent: pearl aqua`) → b5 free-resources (`Section ground="deep"`, `Eyebrow` "free, and yours", three `CtaCard`s seven_questions / belonging_check / receipts, ghost → `/resources`) → b6 close (`Section ground="well" space="loose"`, "forty-five minutes. no deck, no pitch, no pipeline.", primary "book a discovery call →" → `/book` external, ghost → `/audit`) → `NewsletterBand route="/" heading="notice"` → `Footer variant="full"`.

**cut 13 sep:** the former b2 `Section ground="deep"` ("nobody audits whether the tech reached the child." + paragraph) — it duplicated the hero. do not rebuild it. if nici reverts, it sits between b3 and b4 (see `SITE PLAN.md` → "home reorder").

**nici identity block (b1) — placement rule (approved 13 sep):** appears on home (b1) and `/about` (h1) only. every other page carries a slim strip: `ScopeLine` + one line "led by nici foote · about →" (see `/access` c1, `/inclusion-strategy` d1 — already applied in `Site.dc.html`). build the full block once as a shared component (`NiciBlock`, say) and the slim strip as its `variant="slim"`.

**`/about` — stub only (h0–h2).** route exists so the "about →" link resolves: hero (eyebrow "about", h1 "who is asking.", placeholder lede), full nici block, close (book + ghost → `/`), footer. **copy is not written** — ship the route with the block and the close; the lede is nici's to write in notion. no newsletter band.

tweaks → flags: `showFigures` (default on), `showGhostCta` (default on). hero `hero` prop (site / statement / billboard) is a design exploration — ship `site`.

ctas: hero → `/readiness-check` (ghost → `#b4`). close primary → `/book` (external), ghost → `/audit`. ndte strip ghost → `/ndte`.

## stage 2 — audit `/audit` + readiness check `/readiness-check`

**status: approved, ready. `Readiness Check.dc.html` supersedes the library's `ReadinessCheck` result screen — read `PLAN - readiness check.md` in full before touching the engine.**

`/audit` (a0–a3): hero → a1 "the gap" → a2 **pointer block** "what the check asks" linking `/readiness-check` (the embedded engine was removed from this page — do not re-embed) → a3 close: primary `start the free readiness check →` (`/readiness-check`, pearl aqua), ghost `book a discovery call →` (`/book`). links doc 1 (`Discovery Day - what it is and why -mainstream-.dc.html`) as the discovery-day explainer — provide as pdf at a stable url, `bookingUrl` tweak = `unbarrier.me/book`, qr off. discovery day = the paid "notice" step inside unbarrier.audit; no separate route. the £500 day price on this page is the decided price (notion, /audit approved draft); the partnership proposal's £1k is a separate document and does not touch this route.

`/readiness-check` (own route, own nav/footer; `Nav active="audit"`):
- nine questions verbatim from the engine's `readiness-check-v1` set (wording not signed off as final — keep it editable). seven dimensions: provision · access · design · capability · belonging · trust · evidence.
- scale: the engine's six points **plus a seventh "i don't know"** — scored as unanswered, reported as a finding ("you couldn't say — that is a finding").
- scoring copied 1:1: mean × 20 per dimension; bands ≥65 reaching · 50–64 patchy · <50 not reaching (engine's `scoreBand` thresholds, renamed). **no overall score, no radar, no numbers shown** — band word only.
- lowest dimension → "start here" + one sentence (the seven `START` sentences in the logic class — new copy, nici-read pending).
- closing line: "so far only a [role] has answered. the picture is one seat wide."
- three separate consents, none required, all unticked: email-me-the-result (purpose 1) · `yes, send me notice. i can unsubscribe from any email.` (purpose 2, exact `CONSENT_WORDING`) · `help build the picture.` (sector layer → setting type · size band · role).
- `copy as text` button: result as plain sentences (the forward-upwards path).
- onward: primary `start with a discovery day →` (`/audit`), ghost `book a discovery call →` (`/book`). no newsletter band on this page.
- **flags:** `emailStep` **OFF** — the email field and result-email send are *open* (privacy notice does not name them) → not built. `shareCode` *open* → not built. `bandWords` — ship learner.
- wiring to build: sector-layer row write only (nine answers + three fields + date) — the existing engine consent, already covered.

## stage 3 — access `/access`

**status: approved, ready.** source: `Site.dc.html` ~190–420 (`isAccess`). notion: approved page drafts → `/access`.

c0 hero (orange glow) → c1 credential strip → c2 → c3 **`SevenQuestions` component** (the library component, data fixed to the 1 sep set — do not hand-build) → c4 the four-step block (notice → design → try → embed) → c5 pricing tiers → c5b groups block (lowercased) → c6–c7 → c8 close: primary `/book` (orange) + ghost.

tweaks → flags/content: `pricing` enum `two tiers` (default) · `all tiers` (adds trust tier) · `in conversation` (hides prices) — ship `two tiers`. `retainerPublic` **default off** — the retainer card + paragraph stay proposal-only until sold once. `showFundingLine` default on (names principle 7, never declares eligibility).

## stage 4 — voice `/voice` + baseline one-pager + seven questions

**status: approved 13 sep. ⚠ legal hold on the instrument.**

`/voice`: `Voice.dc.html` (mounted in Site via `<dc-import name="Voice" embedded>`; ship with `showPlan=false` — the plan block is an internal review panel, never public). orchid mist strand. v0 hero → sections → close: primary `/book`, ghost → `/readiness-check` (`closeGhost` prop). `NewsletterBand route="/voice"`.

**legal hold (binding):** do not sell the instrument. no "delivered / the tool" split, no self-serve tool, no founding cohorts. close on *"we agree how you will know it worked, and when we will check."*

seven questions: the library's `SevenQuestions` data = the 1 sep set (provision · access · design · capability · belonging · trust · evidence). the `Voice Baseline.dc.html` copy is now canonical for voice on paper (incl. "the child" ×4 in the questions). sync the library data to it if they differ.

**`Voice Baseline.dc.html`** — two A4 pages, sentence case, white paper → deliver as pdf. `showConsents` block default on pending legal sign-off. sections "where it sits" / "how a baseline is taken" approved 13 sep.

optional: `Voice Report Pages.dc.html` — three light-theme sample report pages (sample school, 24 learners) for the proposal. illustration only; not a route, not a client deliverable yet.

## stage 5 — hello `/hello`

**status: structure ready. ship the public page with the three live resources only.** the one-thing template, the neurodiversity conversation and why-your-hands-move are *open* (no confirmed url / no copy) → not shown. source: `Site.dc.html` ~758–903 (`isHello`), three states via `helloState`: `public` · `login` · `signed in`.

public (e0–): spring-green strand. hero → `TodayBlock` ("your stuff from today" — heading + ordered links; heading and order editable by nici when signed in) → "three to read" `CtaCard` row → resources shelf.

login (`e-login`): `IspAuditLayout` (light) wrapping `AdminLoginForm`; the prototype swallows the submit — in the repo this POSTs to `/api/isp-audit/login` (existing auth). `/hello/sign-out` returns to login.

signed in (`e-admin`): edit today's heading (text field), reorder today's links (up/down), view the shelf with status pills (live · revamp pending · held for blog · url to confirm). persist heading + order — source of truth = notion "website → hello links" table.

resource list (live urls):
- the belonging check — https://www.unbarrier.me/belonging-check
- the takeaway — the seven questions — https://www.unbarrier.me/the-takeaway.html
- the receipts — https://www.unbarrier.me/the-receipts.html
- the one-thing template — live, revamp pending
- the neurodiversity conversation — live, url to confirm (`Neurodiversity Conversation.dc.html` in this bundle is its design)
- why your hands move — `handsMoveOnHello` default **off**; held for the blog.

card copy for the three live resources = title + the existing page's own first line. nothing new written. privacy notice v1.1 and `/accessibility` statement: build if drafts exist in notion; otherwise ship without the subscribe consent box on this page (the `NewsletterBand` already carries the decided consent wording).

## blog, about

**out of scope.** the existing notion-backed blog stays live as-is. no `/about` route. nothing to build.

---

## tokens

all from `_ds/…/_ds_bundle.css` (= `app/globals.css`). grounds `--bg`, `--ground-500/400/300/200` · text `--fg`, `--fg-muted`, `--text-subtle` · primaries `--spring-green`, `--amethyst` · strands `--pearl-aqua` (audit) `--princeton-orange` (access) `--orchid-mist` (voice) · panels `--panel-*` · type `--font-heading` (outfit) `--font-body` (lexend) `--font-brand` (comfortaa, wordmark only) · scale `--fs-*`, `--lh-*` (never tighten — accessibility decision) · spacing `--space-1…12` · radii `--radius-*`.

## files in this bundle

- `Site.dc.html` — home, audit, access, hello (+ parked screens)
- `Readiness Check.dc.html` — /readiness-check
- `Voice.dc.html` — /voice
- `Voice Baseline.dc.html` — A4 doc, stage 4
- `Voice Report Pages.dc.html` — optional sample report, stage 4
- `Discovery Day - what it is and why -mainstream-.dc.html` — A4 doc linked from /audit
- `Neurodiversity Conversation.dc.html` — hello resource design
- `Readiness Check.dc.html` depends on `support.js`, `doc-page.js`, `image-slot.js`, `browser-window.jsx`, `icons/` — included so the prototypes open in a browser
- `_ds/` — the design-system bundle (the library, compiled)
- `SITE PLAN.md`, `PLAN - readiness check.md`, `HANDOVER - inclusion-strategy page.md` — decisions and rationale

## open items — parked, not blocking

not built in this pass. the developer does not ask about these; nici decides in notion when ready.

1. readiness check email step + share code (needs privacy notice paragraph).
2. /hello: three held resources; `/accessibility` statement.
3. voice baseline consents block (legal sign-off) — pdf ships with the block on, as approved 13 sep.
4. blog redesign, about page.
