import type { CSSProperties, ReactNode } from 'react';
import styles from './Eyebrow.module.css';

type Props = {
  children: ReactNode;
  /** Override the eyebrow colour. Defaults to spring-green via --action. */
  color?: string;
  as?: 'p' | 'span' | 'div';
};

export function Eyebrow({ children, color, as: Tag = 'p' }: Props) {
  const style: CSSProperties | undefined = color ? { color } : undefined;
  return (
    <Tag className={styles.eyebrow} style={style}>
      {children}
    </Tag>
  );
}
