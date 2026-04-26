# Loop Breakers UI Kit

Recreation of the live landing page at **vision.unbarrier.me**, based on `src/pages/LandingPage.tsx` from `unbarrier-gif/loop-breakers-landing`.

## Components
- `LBPrimitives.jsx` — `LBLogo`, `Pill`, `GreenRule`, `ArrowLi`
- `LBHeader.jsx` — fixed nav with scroll state
- `LBHero.jsx` — hero + stat tiles + "Meet Nici" strip
- `LBMiddle.jsx` — Problem, Shift, How It Works, Mid CTA, Template
- `LBPackages.jsx` — pricing grid (standard + recommended), testimonial, Final CTA, Footer

## Notable differences from production
- Nici portrait is a **placeholder** (green circular gradient with the bring-the-joy illustration). The real image `/images/hero_image_green.png` wasn't in the provided assets.
- Testimonial is rendered as **text** (Gemma quote reconstructed from context) rather than the image file `gemma_testimonial_v2.png` — that image wasn't provided.

Everything else — colours, rounded corners, shadows, copy, structure — matches the source verbatim.
