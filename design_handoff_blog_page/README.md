# handoff: /blog — unbarrier.me

## overview
the blog index for unbarrier.me. replaces the current blog page. one route (`/blog`); the post page (`/blog/[slug]`) is out of scope here except where noted.

design goals, in order: accessible by design (dyslexic and screen-reader readers), not overwhelming, leads with nici's voice. every decision below serves one of those.

## about the design file
`Blog.dc.html` is a **design reference built in HTML** — it shows intended look and behaviour. it is not production code. recreate it in the unbarrier.me next.js codebase using the existing `unbarrier-education` components and `app/globals.css` tokens. where a design-system component didn't fit, this file hand-builds the element and says so; those are the sync items listed at the end.

## fidelity
**high-fidelity.** colours, type, spacing and copy are final. every value is a token from `globals.css` — no hex anywhere. match it 1:1.

## data source
notion → `📝 Blog Posts` (data source `b81fe8cd-39c5-40cc-8034-a9000a52a37e`). schema after the 14 sep changes:

| property | type | use on /blog |
|---|---|---|
| Title | title | card h3 (lowercase per site rule; proper nouns keep case) |
| Slug | text | `/blog/{slug}` |
| Shape | select: out-loud · reality-check · honestly · stories · invitations | ShapeTag + chip filter |
| Status | Draft / Published | only Published renders |
| **Show on unbarrier** | checkbox (new) | **must be ticked** to appear. lets loop breakers / coaching posts stay in the db but off this site |
| Date | date | meta line, sort key (newest first) |
| Reading min | number | meta line — **first**, before the date |
| Excerpt | text | not shown on the card unless `Pull line` is empty → first sentence of Excerpt. use as `<meta description>` on the post page |
| **Pull line** | text (new) | the one line under the title. quoted from inside the post |
| Featured | checkbox | not used on /blog any more (no hero card). keep for social |
| **Mentioned** | checkbox (new) | pins the post into "the ones people bring up" band. max 3 |
| **Feedback quote** | text (new) | what a real person said about the post — the PullQuote in that band |
| **Feedback from** | text (new) | role + setting, no names — the PullQuote cite |
| Cover / Cover Alt | file / text | **not used.** the redesign has no images |

query: `Status = Published AND Show on unbarrier = true`, sort `Date desc`.

## page structure (top → bottom)
route accent for this page: `--orchid-mist` (voice / anything human). ground ladder: hero (`--bg`) → `--ground-400` → `--ground-400` → base → `well`.

### j0 · hero
- `<Nav />` (no active item)
- padding `calc(var(--nav-height) + var(--space-10)) clamp(20px,5vw,64px) var(--space-10)`, `overflow:hidden`, two `<Glow>`s: orchid-mist left -8% top 2% size 560 opacity .09; spring-green right -12% top -16% size 520 opacity .07
- inner column `max-width:900px`, flex column, `gap:var(--space-5)`
- `<Eyebrow color="var(--orchid-mist)">unbarrier.blog</Eyebrow>`
- `h1` (global style) `max-width:18ch`: **said out loud, then typed down.**
- `p` `--fg-muted`, `--fs-body-lg`, `max-width:54ch`: *you bought it. nobody checked it reached the child. these are the notes from finding out why — short ones, honest ones, full arguments, and stories from people who get it.*
- nothing else. no tag row, no buttons.

### j0a · reading controls
- band `background:var(--ground-400)`, padding `var(--space-5) clamp(20px,5vw,64px)`, inner `max-width:900px`
- `<ReadingControls scopeId="blog-main" />` — listen / text size / spacing. `blog-main` wraps everything below this band down to (not including) the close.

### j1 · the ones people bring up  *(tweak `leadWith`: "mentioned" | "latest"; default mentioned. "latest" hides this band)*
- band `background:var(--ground-400)`, padding `var(--space-8) clamp(20px,5vw,64px)`, inner `max-width:1100px`, flex column `gap:var(--space-6)`
- header: `<Eyebrow color="var(--orchid-mist)">start here</Eyebrow>` · `h2` `max-width:22ch`: **the ones people bring up.** · `p` `--fg-muted` `max-width:54ch`: *not the newest. the ones that come back to us in emails, on calls, and in the corridor after a discovery day — with what people said about them.*
- grid `repeat(auto-fit, minmax(280px, 1fr))`, `gap:var(--space-5)`; one `<article>` per post with `Mentioned = true` (max 3):
  - `padding:var(--space-5)`, `border-radius:var(--radius-md)`, `background:var(--ground-300)`, flex column `gap:var(--space-4)`
  - `<ShapeTag shape size="sm" solid />`
  - `h3` `--fs-h4`; the title is an `<a href="/blog/{slug}">` in `--fg`, underlined with `text-decoration-color:var(--text-faint)`, `text-underline-offset:4px`
  - meta `p` `--fs-small` `--text-subtle`: `{date, en-GB "21 Aug 2026"} · {readingMin} min read`
  - `<PullQuote color={shapeColour} cite={Feedback from}>{Feedback quote}</PullQuote>` — wrapped in a div with `margin: calc(var(--space-6) * -1) 0` to cancel PullQuote's own outer spacing inside the card
  - `<a href="/blog/{slug}" aria-label="read: {title}">read →</a>` — `--font-heading` 800, `--orchid-mist`
- **the three quotes in the design file are placeholders.** real ones come from notion `Feedback quote` / `Feedback from`. if fewer than one post has `Mentioned`, hide the band.

### j2 · the index
- `<Section ground="base" labelledBy="everything">`
- `h2#everything` `max-width:22ch`: **pick a shape. or read the newest.**
- **chips** — `role="toolbar" aria-label="filter by shape"`, flex wrap `gap:var(--space-2)`, `margin-bottom:var(--space-6)`. six `<button type="button" aria-pressed>`: everything · out loud · reality check · honestly · stories · invitations, each with a count.
  - `min-height:44px`, `padding:0 var(--space-4)`, `border:0`, `border-radius:var(--radius-pill)`, `--font-body`, `--fs-small`, inline-flex `gap:var(--space-2)`
  - 10px dot in the shape colour (everything = `--fg`), label, count at `opacity:.7`
  - inactive: `background:var(--ground-300)`, `color:var(--fg)`. active: `background:var(--fg)`, `color:var(--amethyst)`
  - shape colours: out-loud `--spring-green` · reality-check `--princeton-orange` · honestly `--orchid-mist` · stories `--pearl-aqua` · invitations `--school-bus-yellow` (these are the `SHAPES` constants in the design system)
- **result line** — `p aria-live="polite"`, `--fs-small` `--text-subtle`, `margin-bottom:var(--space-4)`: "the 6 newest of 22" / "all 22, newest first" / "5 in honestly" / "nothing in this shape yet. one's on the way."
- **cards** — `<ul>` (list-style none) grid `repeat(auto-fill, minmax(280px, 1fr))` `gap:var(--space-4)`; each `<li>`:
  - `padding:var(--space-5)`, `border-radius:var(--radius-md)`, `background:var(--ground-400)`, flex column `align-items:flex-start` `gap:var(--space-3)`
  - `<ShapeTag shape size="sm" solid />`
  - `h3` `--fs-h4`, title as underlined `<a>` (same style as j1)
  - `p` `--fs-small` `--fg-muted`: `Pull line`, else first sentence of `Excerpt`
  - `p` `--fs-caption` `--text-subtle` `margin-top:auto`: `{readingMin} min · {date en-GB}`
  - **no image, no excerpt, no "read →"** — the title is the link. one line per card. this is deliberate: two reads for one decision is the thing dyslexic readers give up on.
- **show more** — when "everything" is selected and not expanded, show 6 newest + a `<button type="button">show all 22 →</button>`: `min-height:44px`, `padding:0 var(--space-5)`, `border:1px solid var(--text-faint)` (hover `--fg`), `border-radius:var(--radius-pill)`, transparent, `--fg`, `--font-heading` 800, `--fs-body`. clicking expands in place (no navigation). selecting a shape shows all posts in that shape, no limit.
- **lowercase**: the design-system `ShapeTag` names ("Reality Check") and any "Read →" text render in title case. site rule is lowercase — fix the constants at sync, not with `text-transform`.

### j3 · close
- `<Section ground="well" space="loose" labelledBy="closing">`
- `h2#closing` `max-width:22ch`: **if one of these landed, there's a free next step.**
- `p` `--fg-muted` `max-width:54ch` `margin-bottom:var(--space-6)`: *nine questions, ten minutes, no email needed. it tells you where to look first in your own setting.*
- buttons flex wrap `gap:var(--space-4)`: `<Button href="/readiness-check" color="var(--orchid-mist)">take the free readiness check →</Button>` · `<Button href="/hello" variant="ghost">everything free, in one place →</Button>`
- then `<NewsletterBand route="/blog" weight="standard" heading="notice" sub="one email when there is something worth saying. nothing when there isn't. we don't sell the list." />` inside a div `padding:var(--space-10) 0 var(--space-8)`
- `<Footer variant="full" />`

## interactions & state
- `shape: 'all' | ShapeKey` — chip click sets it and resets `expanded` to false
- `expanded: boolean` — "show all" sets true
- no url state needed; if you add it, use `?shape=` and keep the chips as the source of truth
- chips are buttons with `aria-pressed`; the result line is the live region — don't add a second one
- reading controls: `scopeId` must point at a content wrapper, never the page (the design-system prompt says so)
- no hover effects beyond the design system's own; underline offset on titles is the affordance

## accessibility decisions (keep these)
- every interactive target ≥ 44px
- titles are real links, visibly underlined; "read →" only appears in j1 and carries `aria-label="read: {title}"` so a links list reads sensibly
- one line of copy per card; reading time before date
- 6 posts shown by default; the rest behind an explicit action
- no images, no decorative tiles
- global `h1–h4`/`p` line heights untouched (the loose spacing is an accessibility decision)
- lowercase everywhere except proper nouns

## post page (`/blog/[slug]`) — not designed here, but binding
- `<ReadingControls scopeId="post-body" />` above the first paragraph — mandatory
- `<PostHero>`, `<PostMeta>`, `<NotionRenderer>`, `<PostFooter>` from the design system
- `Excerpt` → `<meta name="description">`
- the £900m figure appears in "a menu nobody feels allowed to order from". the site-wide never-cite rule does not apply to this post — accepted exception, nici 14 sep 2026. leave the post as written.

## tokens used
all from `globals.css`: `--bg` `--ground-400` `--ground-300` `--fg` `--fg-muted` `--text-subtle` `--text-faint` `--amethyst` `--orchid-mist` `--spring-green` `--princeton-orange` `--pearl-aqua` `--school-bus-yellow` · `--font-heading` `--font-body` · `--fs-h4` `--fs-body` `--fs-body-lg` `--fs-small` `--fs-caption` · `--space-2/3/4/5/6/8/10` · `--radius-md` `--radius-pill` · `--nav-height`. no hex values anywhere.

## design-system sync items (do these in `unbarrier-education`, then delete the hand-built bits)
1. `SHAPES[*].name` → lowercase ("out loud", "reality check"…)
2. `BlogCard`: add a `compact` variant = tag · title-link · one line · meta. no media, no excerpt, no cta. add `post.pullLine` to the `Post` type
3. `BlogIndex`: chips as `aria-pressed` buttons (already), 44px min-height, active = `--fg`/`--amethyst`; add `limit` + "show all" behaviour; add a live result line; accept the compact card
4. `Button`: forward `onClick` (currently dropped — the design file had to use a raw `<button>` for "show all")
5. `BlogHero`: the fixed copy ("Notes from Nici", "The unbarrier blog.") is superseded by the j0 copy above; make heading/lede props or retire it
6. `BOOKING_URL` still holds the calendar link; site uses `/book`

## files in this folder
- `Blog.dc.html` — the design reference (open in a browser; needs `support.js` + `_ds/` beside it)
- `support.js`, `_ds/` — runtime + the bound design-system bundle so the file renders standalone
- `SITE PLAN.md` — the wider rebuild plan; this page is step 6
