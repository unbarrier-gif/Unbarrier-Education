import type { ReactNode } from 'react';
import styles from './KitEasyNo.module.css';

type Props = {
  title: string;
  children: ReactNode;
};

export function KitEasyNo({ title, children }: Props) {
  return (
    <div className={styles.easyNo}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
