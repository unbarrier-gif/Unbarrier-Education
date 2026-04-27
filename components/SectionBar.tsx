import type { CSSProperties } from 'react';
import styles from './SectionBar.module.css';

type Props = {
  /** CSS colour for the bar (accepts var() or hex). */
  color: string;
};

export function SectionBar({ color }: Props) {
  const style = {
    '--section-bar-color': color,
  } as CSSProperties;
  return <div aria-hidden="true" className={styles.bar} style={style} />;
}
