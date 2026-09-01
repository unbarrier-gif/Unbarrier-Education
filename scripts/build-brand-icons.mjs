/**
 * build-brand-icons.mjs — rasterise every brand icon from one source mark.
 *
 *   node scripts/build-brand-icons.mjs
 *
 * Outputs (all committed):
 *   app/icon.png                            512, full-bleed  — browser tab / generic
 *   app/favicon.ico                         16/32/48/64, full-bleed — legacy tab icon
 *   app/apple-icon.png                      180, opaque, no alpha — iOS home screen
 *   public/assets/icons/icon-maskable-512.png  512, maskable-safe — Android/PWA
 *
 * WHY TWO SETS OF PADDING
 * -----------------------
 * A maskable icon must keep its artwork inside the inner 80% circle, because
 * Android crops the tile to whatever shape the launcher wants. That rule is
 * correct for launchers and wrong for browser tabs: it leaves the mark at ~57%
 * of the canvas, and mark.svg's shield ring is only 7.05% of the mark's width
 * (18.89 units across a 268.06-wide viewBox). At a 16px tab icon that ring
 * lands at 0.64px — sub-pixel, so it anti-aliases to grey and vanishes into
 * the amethyst. Full-bleed puts the ring at 0.99px, which is the threshold
 * where a silhouette survives. So the browser icons are built full-bleed and
 * the maskable icon keeps its safe area, in a separate file.
 *
 * PLACEMENT RULE: the maskable PNG lives in public/, never in app/. Next.js
 * App Router auto-detects app/icon.* and app/apple-icon.* by filename and
 * emits <link rel="icon"> for them. A maskable file in app/ would be offered
 * to browsers as a tab icon — the exact bug this script exists to fix. It is
 * referenced from app/manifest.ts only.
 *
 * KNOWN AND ACCEPTED: the interior chevrons (arrow + book inside the shield)
 * are ~0.4-0.8px at 16px and still fill in. The silhouette is what has to
 * identify at that size.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const p = (...parts) => path.join(ROOT, ...parts);

const MARK_SVG = p('public/assets/logos/mark.svg');
const GLOBALS_CSS = p('app/globals.css');
const ICON_PNG = p('app/icon.png');

/** Content box as a fraction of the canvas, per job. */
const FULL_BLEED = 0.88;          // ~6% margin each side — browser icons
const APPLE_INSET = 0.8;          // ~10% margin each side — iOS adds its own rounding
const MASKABLE_SAFE = 0.8 / Math.SQRT2; // largest square inside the inner 80% circle

const ICO_LAYERS = [16, 32, 48, 64];

/**
 * Optional dilation, in mark-viewBox units, applied to the small .ico layers.
 * mark.svg is fill-based — there are no strokes in it, so there is no
 * stroke-width to raise. Adding a stroke of the same colour to a filled path
 * grows it outward, which thickens the shield ring without redrawing it. This
 * is an export setting, not a design change; reach for it only if full-bleed
 * alone leaves 16px unreadable. 0 = off.
 */
const ICO_DILATION = { 16: 0, 32: 0, 48: 0, 64: 0 };

// ── source colour ────────────────────────────────────────────────────────────

/** The token comments in globals.css are the only source of truth for brand colour. */
async function readAmethyst() {
  const css = await readFile(GLOBALS_CSS, 'utf8');
  const match = css.match(/--amethyst:\s*(#[0-9a-fA-F]{6})\s*;/);
  if (!match) {
    throw new Error(`Could not find the --amethyst token in ${GLOBALS_CSS}.`);
  }
  return match[1].toLowerCase();
}

/**
 * mark.svg is fill="currentColor". Rasterised standalone, currentColor
 * resolves to black and you get a black shield on amethyst, so the literal
 * hex has to be substituted in before the SVG reaches the rasteriser.
 */
async function readMark(hex) {
  const svg = await readFile(MARK_SVG, 'utf8');
  if (!svg.includes('currentColor')) {
    throw new Error('mark.svg no longer uses currentColor — check what changed before trusting this script.');
  }
  const viewBox = svg.match(/viewBox="([\d.\s-]+)"/);
  if (!viewBox) throw new Error('mark.svg has no viewBox.');
  const [, , width, height] = viewBox[1].trim().split(/\s+/).map(Number);
  return { svg: svg.replaceAll('currentColor', hex), width, height };
}

/**
 * Confirm the mark colour rather than guessing it. The shipped icon.png is a
 * flat two-colour image: amethyst ground plus the mark. Whatever the second
 * most common colour is, that is the mark — and it must be white.
 */
async function confirmMarkIsWhite(background) {
  if (!existsSync(ICON_PNG)) {
    throw new Error(`${ICON_PNG} is missing — cannot confirm the mark colour. Restore it or set the colour deliberately.`);
  }
  const { data, info } = await sharp(ICON_PNG).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const counts = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const hex = '#' + [data[i], data[i + 1], data[i + 2]]
      .map((v) => v.toString(16).padStart(2, '0')).join('');
    counts.set(hex, (counts.get(hex) || 0) + 1);
  }
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const mark = ranked.find(([hex]) => hex !== background);
  if (!mark || mark[0] !== '#ffffff') {
    throw new Error(
      `Expected the mark in app/icon.png to be #ffffff on ${background}, found ${mark ? mark[0] : 'nothing'}. ` +
      'Stopping rather than guessing a brand colour.'
    );
  }
  return mark[0];
}

// ── rasterising ──────────────────────────────────────────────────────────────

/**
 * The viewBox is 268.06 x 274.02 — 2% taller than wide, not square. Fit by the
 * longer side and centre; never stretch it square.
 */
function fitBox(mark, box) {
  const scale = box / Math.max(mark.width, mark.height);
  return { width: Math.round(mark.width * scale), height: Math.round(mark.height * scale) };
}

/** Grow the filled paths outward by `units` viewBox units. See ICO_DILATION. */
function dilate(svg, hex, units) {
  if (!units) return svg;
  return svg.replaceAll(
    '<path fill=',
    `<path stroke="${hex}" stroke-width="${units}" stroke-linejoin="round" fill=`
  );
}

/** Render the mark centred on a flat, fully opaque ground. */
async function render({ mark, markHex, size, contentFraction, background, dilation = 0 }) {
  const box = Math.round(size * contentFraction);
  const { width, height } = fitBox(mark, box);
  const svg = dilate(mark.svg, markHex, dilation);

  const artwork = await sharp(Buffer.from(svg), {
    // Rasterise the vector at the size it will actually be drawn at, so the
    // edges come from the geometry rather than from a resampled bitmap.
    density: Math.min(2400, Math.ceil((72 * box) / Math.max(mark.width, mark.height))),
  })
    .resize({ width, height, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: artwork, gravity: 'centre' }])
    // Opaque to the edge, with no alpha channel at all: iOS fills any
    // transparency in apple-icon.png with black, and a maskable icon has to
    // survive being cropped to an arbitrary shape.
    .flatten({ background })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// ── main ─────────────────────────────────────────────────────────────────────

const amethyst = await readAmethyst();
const markHex = await confirmMarkIsWhite(amethyst);
const mark = await readMark(markHex);
const background = { r: parseInt(amethyst.slice(1, 3), 16), g: parseInt(amethyst.slice(3, 5), 16), b: parseInt(amethyst.slice(5, 7), 16), alpha: 1 };

console.log(`ground ${amethyst} (app/globals.css)   mark ${markHex} (confirmed from app/icon.png)`);
console.log(`mark.svg viewBox ${mark.width} x ${mark.height} — fitted by the longer side, centred\n`);

const outputs = [];

// app/icon.png — browser tab, full-bleed.
outputs.push([p('app/icon.png'), await render({
  mark, markHex, size: 512, contentFraction: FULL_BLEED, background,
})]);

// app/apple-icon.png — iOS home screen, more inset, opaque.
outputs.push([p('app/apple-icon.png'), await render({
  mark, markHex, size: 180, contentFraction: APPLE_INSET, background,
})]);

// public/assets/icons/icon-maskable-512.png — Android/PWA, safe area respected.
await mkdir(p('public/assets/icons'), { recursive: true });
outputs.push([p('public/assets/icons/icon-maskable-512.png'), await render({
  mark, markHex, size: 512, contentFraction: MASKABLE_SAFE, background,
})]);

// app/favicon.ico — multi-layer, full-bleed, each layer rendered from vector
// rather than downsampled from one big raster.
const layers = [];
for (const size of ICO_LAYERS) {
  layers.push(await render({
    mark, markHex, size, contentFraction: FULL_BLEED, background,
    dilation: ICO_DILATION[size] ?? 0,
  }));
}
outputs.push([p('app/favicon.ico'), await pngToIco(layers)]);

for (const [file, buffer] of outputs) {
  await writeFile(file, buffer);
  console.log(`  wrote ${path.relative(ROOT, file).padEnd(42)} ${(buffer.length / 1024).toFixed(1)} kB`);
}

const ringPx = 16 * FULL_BLEED * (18.89 / mark.width);
console.log(`\nshield ring at the 16px layer: ${ringPx.toFixed(2)}px (was 0.64px maskable-safe; 1px is the survival threshold)`);
