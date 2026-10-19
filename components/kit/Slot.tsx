import type { Copy } from '@/lib/kit';
import styles from './Slot.module.css';

// One piece of /imf copy. Nici's words when they are in (lib/kit.ts), a
// clearly marked placeholder when they are not. The placeholder is a visible
// review aid, not a design: it comes out of the page the moment `text` is set.
export function Slot({ copy }: { copy: Copy }) {
  if (copy.text !== null) return <>{copy.text}</>;
  return <span className={styles.slot}>{copy.placeholder}</span>;
}
