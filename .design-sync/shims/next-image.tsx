// design-sync host adapter for `next/image`. Outside a Next.js app there is
// no /_next/image optimiser, so Image is a plain <img> that keeps the same
// props (`fill`, `priority`, `sizes`, `unoptimized` are accepted and mapped or
// dropped). Site-relative sources (`/assets/…`, the files under public/)
// resolve against the live site, since nothing serves public/ here. The
// site's own components are untouched.

import aplsWhite from '../../public/assets/Apple_Prof_Learning_Specialist_1ln_wht_061623.svg';
import aplsBlack from '../../public/assets/Apple_Prof_Learning_Specialist_1ln_blk_061623.svg';

const SITE_ORIGIN = 'https://www.unbarrier.me';

// The two files a component references by fixed path (AplsBadge). They ship
// inside the bundle byte-for-byte as data URLs, so a design never depends on
// the network for Apple's mark; everything else under public/ loads from the
// live site.
const BUNDLED: Record<string, string> = {
  '/assets/Apple_Prof_Learning_Specialist_1ln_wht_061623.svg': aplsWhite as unknown as string,
  '/assets/Apple_Prof_Learning_Specialist_1ln_blk_061623.svg': aplsBlack as unknown as string,
};

function resolveSrc(src: string): string {
  if (BUNDLED[src]) return BUNDLED[src];
  return src.startsWith('/') && !src.startsWith('//') ? `${SITE_ORIGIN}${src}` : src;
}
import { forwardRef, type CSSProperties, type ImgHTMLAttributes } from 'react';

type StaticImport = { src: string; width?: number; height?: number };

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height' | 'loading'> & {
  src: string | StaticImport;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number | string;
  unoptimized?: boolean;
  loader?: unknown;
  placeholder?: string;
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  overrideSrc?: string;
};

const FILL_STYLE: CSSProperties = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  color: 'transparent',
};

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, width, height, fill, priority, quality, unoptimized, loader, placeholder, blurDataURL, loading, overrideSrc, style, alt = '', ...rest },
  ref,
) {
  const resolved = resolveSrc(typeof src === 'string' ? src : src.src);
  return (
    <img
      ref={ref}
      src={overrideSrc ?? resolved}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? 'eager' : loading ?? 'lazy'}
      decoding="async"
      style={fill ? { ...FILL_STYLE, ...style } : style}
      {...rest}
    />
  );
});

export default Image;
