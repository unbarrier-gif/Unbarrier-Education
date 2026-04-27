import type { ReactNode } from 'react';
import styles from './KitDealBox.module.css';

type Phase = {
  label: ReactNode;
  body: ReactNode;
  accent: 'yellow' | 'aqua' | 'green';
};

type Props = {
  intro: ReactNode;
  phases: Phase[];
  footer?: ReactNode;
};

export function KitDealBox({ intro, phases, footer }: Props) {
  return (
    <div className={styles.deal}>
      <h3 className={styles.heading}>Money — said honestly, by phase</h3>
      <p className={styles.intro}>{intro}</p>
      {phases.map((p, i) => (
        <div key={i} className={styles.line} data-phase={p.accent}>
          <div className={styles.phaseLabel}>{p.label}</div>
          <div className={styles.phaseBody}>{p.body}</div>
        </div>
      ))}
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  );
}
