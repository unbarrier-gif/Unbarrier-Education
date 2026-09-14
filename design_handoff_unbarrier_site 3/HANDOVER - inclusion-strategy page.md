# handover: build /inclusion-strategy into Site.dc.html

## what exists
- `Site.dc.html` — one DC, three screens behind `<sc-if>`: home (`isHome`, ids b0–b6), audit (`isAudit`, a0–a3), access (`isAccess`, c0–c8). Add `isInclusionStrategy` the same way, ids d0–dn.
- routing lives in the logic class: `onClick` → `go()`. Extend `go` mapping for `/inclusion-strategy`; add `'inclusion-strategy'` to the hash regex and to `startScreen` options in `data-props`. Nav accepts `active="inclusion-strategy"`.
- design system bound at `_ds/02-26-unbarrier-me-website-e0ed2706-2c06-4d17-8bae-fbb847fa55fe/`. Strand accent for this page: `--princeton-orange` (dates, deadlines). Use `Unbarrier.InclusionStrategyBand` (exists in bundle, no props) somewhere on the page — check what it renders first.
- ground ladder: hero (base) → credential strip `ground-400` → sections walk second/deep/base → close on `ground="well" space="loose"` with primary + ghost Button pair → NewsletterBand → Footer. Copy the access screen's structure.
- `First Visit.dc.html` embeds Site in an iframe; Site defaults to `home` when framed, `access` when standalone — switch standalone default to the new page while working on it.

## source copy
notion: "website rebuild — approved page drafts (28 aug 2026)" → section `/inclusion-strategy`
https://app.notion.com/p/unbarrier/website-rebuild-approved-page-drafts-28-aug-2026-3cabbd600b3f81f88a9af60b346d364c
strategy origin: "Quentin — website inputs" https://app.notion.com/p/unbarrier/Quentin-website-inputs-3b3bbd600b3f8166b5acd0b9e91d5c16

## rules from the pack (binding)
lowercase · "we" not "i" · "learners" · ndte cycle named · never imply a school was careless · no client named · proof block = only things done · no day rate · one cta per page (+ subscribe block) · **no live week-count** — write "this term".
resolved 29 aug: voice = seven *questions*; "domains" only for the six domains of inclusion. one word to fix on this page.

## flags to carry into the build
- 🚨 ship-first page: revenue attached to 31 december deadline. don't gold-plate.
- the "your trust cannot write it for you" line is superseded — use the precise per-school-publication wording.
- funding line: name principle 7, never declare eligibility.
- "why this work" and voice legal sign-off are not this page's blockers.

## resources (second half of the task)
the pack lists these downloadable/free resources, currently linked from home `#b5` CtaCards and `/hello`:
the seven questions · the belonging check · the receipts · the one-thing template · why your hands move · the takeaway.
task: give them a real home (a `/resources` screen or the `/hello` stage page — decide with nici), using `Unbarrier.CtaCard` / `Unbarrier.TodayBlock`. content for each still needs writing from nici's material — ask before inventing.

## copy-advice pattern used on /access (repeat here)
apply the approved copy; where it breaks a pack rule or contradicts another page, change it and list every change in chat with the reason so nici can revert. put open pricing/evidence decisions behind tweak props rather than picking for her.
