// design-sync host adapter for `next/navigation`. Outside a Next.js app there
// is no App Router; these hooks return an inert router and the current
// location so the components that read them still render.
export type AppRouterInstance = {
  push: (href: string) => void;
  replace: (href: string) => void;
  refresh: () => void;
  back: () => void;
  forward: () => void;
  prefetch: (href: string) => void;
};

const noop = () => {};

const ROUTER: AppRouterInstance = {
  push: noop,
  replace: noop,
  refresh: noop,
  back: noop,
  forward: noop,
  prefetch: noop,
};

export function useRouter(): AppRouterInstance {
  return ROUTER;
}

export function usePathname(): string {
  return typeof window !== 'undefined' ? window.location.pathname : '/';
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
}

export function useParams<T extends Record<string, string | string[]> = Record<string, string | string[]>>(): T {
  return {} as T;
}

export function redirect(href: string): never {
  throw new Error(`redirect(${href}) is not available outside Next.js`);
}

export function notFound(): never {
  throw new Error('notFound() is not available outside Next.js');
}
