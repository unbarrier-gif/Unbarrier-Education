import { ShapeTag } from 'unbarrier-education';
import { SHAPE_KEYS } from '@/lib/blog-shapes';

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 10, alignItems: 'center' };

/** The outline tag at its default size, one per shape. This is the PostMeta tag. */
export const Outline = () => (
  <div style={row}>
    {SHAPE_KEYS.map((k) => (
      <ShapeTag key={k} shape={k} />
    ))}
  </div>
);

/** The solid fill the cards use: shape colour ground, amethyst text. */
export const Solid = () => (
  <div style={row}>
    {SHAPE_KEYS.map((k) => (
      <ShapeTag key={k} shape={k} solid />
    ))}
  </div>
);

/** The three sizes, outline, on a reality check. */
export const Sizes = () => (
  <div style={row}>
    <ShapeTag shape="reality-check" size="sm" />
    <ShapeTag shape="reality-check" size="md" />
    <ShapeTag shape="reality-check" size="lg" />
  </div>
);

/** The three sizes, solid, as the card variants use them (sm standard, md hero). */
export const SolidSizes = () => (
  <div style={row}>
    <ShapeTag shape="stories" size="sm" solid />
    <ShapeTag shape="stories" size="md" solid />
    <ShapeTag shape="stories" size="lg" solid />
  </div>
);
