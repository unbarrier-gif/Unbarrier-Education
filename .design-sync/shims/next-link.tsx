// design-sync host adapter for `next/link`. Outside a Next.js app there is no
// router, so Link is a plain anchor that forwards every attribute it is given.
// The site's own components are untouched; only this import is redirected
// (see .design-sync/tsconfig.json).
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string | { pathname?: string; query?: Record<string, string> };
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
  passHref?: boolean;
  children?: ReactNode;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, prefetch, replace, scroll, shallow, locale, legacyBehavior, passHref, children, ...rest },
  ref,
) {
  const url = typeof href === 'string' ? href : href?.pathname ?? '#';
  return (
    <a ref={ref} href={url} {...rest}>
      {children}
    </a>
  );
});

export default Link;
