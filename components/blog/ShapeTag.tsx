import type { CSSProperties } from 'react';
import { SHAPES, type Shape } from '@/lib/blog-shapes';
import styles from './ShapeTag.module.css';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  shape: Shape;
  size?: Size;
};

export function ShapeTag({ shape, size = 'md' }: Props) {
  const s = SHAPES[shape];
  return (
    <span
      className={`${styles.tag} ${styles[size]}`}
      style={{ '--c': s.color } as CSSProperties}
    >
      <span className={styles.dot} aria-hidden="true" />
      {s.name}
    </span>
  );
}
