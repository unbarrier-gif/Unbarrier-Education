# unbarrier — how to build with these components

This is the website unbarrier.me, imported as-is: Next.js components, CSS Modules, and one token sheet (`app/globals.css`, shipped inside `_ds_bundle.css`). There is no utility-class system and no Tailwind. Read `styles.css` and its imports before styling anything; read `components/<group>/<Name>/<Name>.prompt.md` before using a component.

## Setup: one wrapper, once

Wrap the whole design in `PageGround` once, at the root. It paints the page ground (new world blue, `--bg`), sets the text colour (`--fg`) and the body face. Without it, text renders cream on white and vanishes. Never nest it.

```jsx
<PageGround>
  <Nav active="audit" />
  <main>
    <Section measure="route" ground="second" labelledBy="the-gap">
      <Eyebrow color="var(--pearl-aqua)">unbarrier.audit</Eyebrow>
      <h2 id="the-gap">nobody audits whether the tech reached the child.</h2>
      <p style={{ color: 'var(--fg-muted)', maxWidth: '60ch' }}>something can be bought well and configured well and still not reach the learner.</p>
      <Button href="/readiness-check" color="var(--pearl-aqua)">take the free readiness check →</Button>
    </Section>
    <NewsletterBand route="/audit" weight="standard" />
  </main>
  <Footer variant="full" />
</PageGround>
```

The ISP audit tool (`isp-audit` group) is a separate LIGHT theme. Wrap those components in `IspAuditLayout` instead of using them on the dark ground; it owns the `--ia-*` tokens they read.

## Styling idiom: tokens, not classes

Components carry their own styles. For your own layout glue write inline styles or your own CSS, and take every value from a token with `var(--name)`. Never type a hex. Never invent a class name: the component class names are hashed and private.

| need | tokens |
|---|---|
| grounds (new world blue only) | `--bg` (page), `--ground-500` `--ground-400` `--ground-300` `--ground-200` (the ladder; use `<Section ground="base|second|deep|well">`), `--bg-alt` |
| text | `--fg`, `--fg-muted`, `--text-subtle`, `--text-faint` |
| primaries | `--spring-green` (action, focus ring, the one full-strength block per page), `--amethyst` (the page), `--antique-white` (print and lockups only, never a screen ground) |
| secondaries (never a ground, never lead a page) | `--pearl-aqua` (audit, evidence, numbers) · `--princeton-orange` (access, dates, deadlines) · `--orchid-mist` (voice, anything human) · `--pink-mist` (beside dark pink only) · `--school-bus-yellow` (pills and labels only) |
| a lifted surface (an accent at 10%) | `--panel-green`, `--panel-lightblue`, `--panel-darkpink`, `--panel-orange`, `--panel-lightpink`, `--panel-yellow`, `--panel-aqua` |
| semantic roles | `--action` `--action-fg` `--payoff` `--human` `--quiet` `--premium` `--focus-ring` |
| type faces | `--font-heading` (Outfit: headings, impact text, the 01–07 numerals) · `--font-body` (Lexend: all body copy) · `--font-brand` (Comfortaa: wordmark and display only, never body) |
| type scale | `--fs-display` `--fs-h1` `--fs-h2` `--fs-h3` `--fs-h4` `--fs-body` `--fs-body-lg` `--fs-small` `--fs-eyebrow` `--fs-caption`; line heights `--lh-tight` `--lh-snug` `--lh-body` `--lh-loose`; tracking `--ls-tight` `--ls-eyebrow` |
| spacing | `--space-1` (4px) `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-8` `--space-10` `--space-12` (96px) |
| radii | `--radius-sm` `--radius-md` (site default) `--radius-lg` `--radius-xl` `--radius-pill` |
| elevation | `--shadow-sm` `--shadow-md` `--shadow-lg`, `--glow-green` `--glow-orchid` `--glow-yellow` |

`h1`–`h4` and `p` are styled globally (Outfit 800, Lexend 1.75 line height): plain heading and paragraph elements are already on-brand. Do not tighten line height or letter spacing; the loose spacing is an accessibility decision.

## Rules that hold on every surface

- Sections are separated by ground, never by a line: no borders, no divider rules, no card outlines. Walk the ladder 400 → 300 → 500 and close on 200 with `<Section ground="well" space="loose">`.
- A colour goes up, never down: never darken a brand colour toward black. One full-strength block per page (accent background, amethyst text).
- Spring green never sits alone on a light ground.
- Copy on the website is lowercase (brand names and proper nouns keep their case). Short sentences. Name the cost up front. No corporate language.
- Every page ends on the closing pair: a primary `Button` (`color` = the page's strand colour, `external` for the booking link) and a ghost `Button` (`variant="ghost"`).
- Icons (`Icon`) and the lockups (`StrandLockup`, `StraplineLockup`, `Mark`) are inline SVG in `currentColor` with a single spring-green accent path; icon plus text, always. Wrap a lockup in a box with an explicit width. `StraplineLockup` belongs in the footer only; `Wordmark` is the nav wordmark.
- Links are plain anchors and forms resolve to their success state in this build (no server behind them); `Image` sources that start with `/` load from unbarrier.me.
