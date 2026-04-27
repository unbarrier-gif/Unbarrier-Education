import type { CSSProperties } from 'react';
import styles from './LBPriceCard.module.css';

type Props = {
  color: string;
  tag: string;
  title: string;
  price: string;
  priceSub: string;
  items: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
};

export function LBPriceCard({
  color,
  tag,
  title,
  price,
  priceSub,
  items,
  cta,
  ctaHref,
  featured,
}: Props) {
  const style = { '--c': color } as CSSProperties;
  const isExternal = ctaHref.startsWith('http');
  const externalProps = isExternal
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <div
      className={styles.card}
      style={style}
      data-featured={featured ? 'true' : undefined}
    >
      {featured ? <span className={styles.recommend}>Recommended</span> : null}
      <p className={styles.tag}>{tag}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>{price}</p>
      <p className={styles.priceSub}>{priceSub}</p>
      <ul className={styles.items}>
        {items.map((it) => (
          <li key={it} className={styles.item}>
            <span aria-hidden="true" className={styles.dot} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <a href={ctaHref} className={styles.cta} {...externalProps}>
        {cta} →
      </a>
    </div>
  );
}
