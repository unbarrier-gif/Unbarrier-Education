import type { CSSProperties, ReactNode } from 'react';
import styles from './KitSection.module.css';

type Props = {
  number: string;
  eyebrow: string;
  heading: ReactNode;
  accent: string;
  children: ReactNode;
};

export function KitSection({
  number,
  eyebrow,
  heading,
  accent,
  children,
}: Props) {
  return (
    <section
      className={styles.section}
      style={{ ['--c' as string]: accent } as CSSProperties}
    >
      <span aria-hidden="true" className={styles.rail} />
      <p className={styles.eyebrow}>
        {number} · {eyebrow}
      </p>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
