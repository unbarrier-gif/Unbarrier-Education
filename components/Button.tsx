import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

type Props = {
  /** Where the button goes. Omit it (and pass `onClick`) for an in-page action. */
  href?: string;
  /**
   * In-page action. With no `href` the component renders a real
   * <button type="button"> in the same clothes, so "show all" style
   * controls don't have to hand-build one (added 14 Sep 2026 for /blog).
   */
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  /** Override the primary background. Defaults to spring-green. */
  color?: string;
  external?: boolean;
};

export function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  color,
  external,
}: Props) {
  const style: CSSProperties | undefined = color
    ? ({ '--btn-color': color } as CSSProperties)
    : undefined;

  const className =
    variant === 'primary' ? `${styles.btn} ${styles.primary}` : `${styles.btn} ${styles.ghost}`;

  if (!href) {
    return (
      <button type="button" onClick={onClick} className={className} style={style}>
        {children}
      </button>
    );
  }

  const isExternal =
    external ?? (href.startsWith('http') || href.startsWith('mailto:'));

  if (isExternal) {
    const externalProps = href.startsWith('http')
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return (
      <a href={href} className={className} style={style} onClick={onClick} {...externalProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style} onClick={onClick}>
      {children}
    </Link>
  );
}
