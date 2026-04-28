import styles from './Glow.module.css';

type Props = {
  color: string;
  /** Position from top, accepts CSS values: '10%', '-120px', '0' */
  top?: string;
  /** Position from left, accepts CSS values: '-120px', '42%' */
  left?: string;
  /** Position from right, accepts CSS values */
  right?: string;
  /** Position from bottom */
  bottom?: string;
  /** Size in px (square). Default 480 */
  size?: number;
  /** 0–1. Default 0.08 */
  opacity?: number;
  /** Blur radius in px. Default 160 */
  blur?: number;
};

export function Glow({
  color,
  top,
  left,
  right,
  bottom,
  size = 480,
  opacity = 0.08,
  blur = 160,
}: Props) {
  return (
    <span
      aria-hidden="true"
      className={styles.glow}
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        background: color,
        // Multiplier comes from globals.css — `1` by default, `0` in
        // high-contrast mode. Lets the contrast toggle disable ambient
        // orbs without changing every Glow callsite.
        opacity: `calc(${opacity} * var(--glow-opacity-multiplier, 1))`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
