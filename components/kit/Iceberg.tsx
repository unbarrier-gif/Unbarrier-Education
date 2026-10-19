import Image from 'next/image';
import { ICEBERG } from '@/lib/kit';

// The iceberg, served as supplied (public/assets/iceberg.svg), never through
// the optimiser: it carries its own colours (green and white), so it takes no
// currentColor and no high-contrast drop — the same handling as AplsBadge.
//
// The CALLER sizes it (height) and places it so its waterline lands on a line:
// the waterline is 225 of 690 down, so the page's CSS puts the image's top at
// `line centre − height × 225 / 690`. Empty alt (the default) makes it
// decorative: aria-hidden, nothing announced.
export function Iceberg({
  className,
  alt = '',
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <Image
      src={ICEBERG.src}
      width={ICEBERG.width}
      height={ICEBERG.height}
      alt={alt}
      aria-hidden={alt === '' ? true : undefined}
      className={className}
      unoptimized
    />
  );
}
