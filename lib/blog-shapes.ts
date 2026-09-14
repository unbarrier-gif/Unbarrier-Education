// Five "shapes" the blog uses to label posts. Each is a category, but
// also a tone signal for the reader. Ported verbatim from the inbound
// design at _inbound/blog/BlogPrimitives.jsx — colours map to CSS
// variables defined in app/globals.css. Names are lowercase: the website
// rule (README, "Type tiers and the lowercase rule") applies to the tag and
// the filter chips as much as to any other copy, so the casing lives here,
// not in a text-transform.

export type Shape =
  | 'out-loud'
  | 'reality-check'
  | 'honestly'
  | 'stories'
  | 'invitations';

export type ShapeMeta = {
  name: string;
  color: string;
  blurb: string;
};

export const SHAPES: Record<Shape, ShapeMeta> = {
  'out-loud': {
    name: 'out loud',
    color: 'var(--spring-green)',
    blurb: 'short. said out loud first, typed second.',
  },
  'reality-check': {
    name: 'reality check',
    color: 'var(--princeton-orange)',
    blurb: 'a belief about send or inclusion, examined properly.',
  },
  honestly: {
    name: 'honestly',
    color: 'var(--orchid-mist)',
    blurb: 'the slower, truer ones. allowed to be emotional.',
  },
  stories: {
    name: 'stories',
    color: 'var(--pearl-aqua)',
    blurb: 'lived experience from people who get it.',
  },
  invitations: {
    name: 'invitations',
    color: 'var(--school-bus-yellow)',
    blurb: 'a door, gently opened. you’re welcome inside.',
  },
};

export const SHAPE_KEYS: readonly Shape[] = [
  'out-loud',
  'reality-check',
  'honestly',
  'stories',
  'invitations',
];

export function isShape(value: string | null | undefined): value is Shape {
  return value != null && (SHAPE_KEYS as readonly string[]).includes(value);
}
