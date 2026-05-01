import type { CSSProperties, ReactNode } from 'react';
import styles from './PullQuote.module.css';

type Props = {
  children: ReactNode;
  cite?: string;
  color?: string;
};

export function PullQuote({
  children,
  cite,
  color = 'var(--spring-green)',
}: Props) {
  return (
    <figure
      className={styles.quote}
      style={{ '--c': color } as CSSProperties}
    >
      <blockquote className={styles.body}>{children}</blockquote>
      {cite && <figcaption className={styles.cite}>— {cite}</figcaption>}
    </figure>
  );
}
