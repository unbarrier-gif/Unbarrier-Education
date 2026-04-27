import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Override the primary background. Defaults to spring-green. */
  color?: string;
  external?: boolean;
};

export function Button({
  href,
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

  const isExternal =
    external ?? (href.startsWith('http') || href.startsWith('mailto:'));

  if (isExternal) {
    const externalProps = href.startsWith('http')
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return (
      <a href={href} className={className} style={style} {...externalProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}
