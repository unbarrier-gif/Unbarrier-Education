// In-memory rate limiter. Resets on server restart / cold start.
// Phase 1 only — see Spec §06. Move to Upstash if abused.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_HITS = 5;

type Entry = { hits: number; resetAt: number };

const store: Map<string, Entry> = (globalThis as any).__sayHiRateLimit__ ??
  ((globalThis as any).__sayHiRateLimit__ = new Map<string, Entry>());

export function rateLimit(key: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { hits: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (entry.hits >= MAX_HITS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.hits += 1;
  return { ok: true };
}

export function clientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return headers.get('x-real-ip') ?? 'unknown';
}
