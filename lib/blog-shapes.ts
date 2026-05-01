// Five "shapes" the blog uses to label posts. Each is a category, but
// also a tone signal for the reader. Ported verbatim from the inbound
// design at _inbound/blog/BlogPrimitives.jsx — colours map to CSS
// variables defined in app/globals.css.

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
    name: 'Out loud',
    color: 'var(--spring-green)',
    blurb: 'Short. Said out loud first, typed second.',
  },
  'reality-check': {
    name: 'Reality check',
    color: 'var(--princeton-orange)',
    blurb: 'A belief about SEND or inclusion, examined properly.',
  },
  honestly: {
    name: 'Honestly',
    color: 'var(--orchid-mist)',
    blurb: 'The slower, truer ones. Allowed to be emotional.',
  },
  stories: {
    name: 'Stories',
    color: 'var(--pearl-aqua)',
    blurb: 'Lived experience from people who get it.',
  },
  invitations: {
    name: 'Invitations',
    color: 'var(--school-bus-yellow)',
    blurb: 'A door, gently opened. You’re welcome inside.',
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
