// The today block when Notion cannot answer — the three live resources, in
// the order the 13 Sep 2026 prototype gives them. Stale beats absent on the
// page Nici reads out from a stage.

import type { HelloLink } from '@/lib/hello-links';
import { HELLO_SHELF } from '@/lib/hello-shelf';

/** The heading the prototype ships as the `todayHeading` tweak default. */
export const DEFAULT_TODAY_HEADING =
  'inclusion beyond send — university of surrey, 17 september';

const TODAY_ORDER = ['belonging_check', 'seven_questions', 'receipts'];

const ACCENT: Record<string, [string, string]> = {
  belonging_check: ['var(--orchid-mist)', '219, 125, 204'],
  seven_questions: ['var(--pearl-aqua)', '105, 217, 209'],
  receipts: ['var(--princeton-orange)', '255, 138, 28'],
};

export function fallbackTodayLinks(): HelloLink[] {
  return TODAY_ORDER.flatMap((card, i) => {
    const item = HELLO_SHELF.find((s) => s.card === card);
    if (!item || !item.live) return [];
    const [accent, accentRgb] = ACCENT[card];
    return [
      {
        id: `fallback-${card}`,
        title: item.title,
        meta: item.meta,
        href: item.href,
        group: 'today' as const,
        order: i + 1,
        accent,
        accentRgb,
        external: true,
        image: '',
        initial: item.title.trim().charAt(0).toUpperCase(),
        slug: card,
      },
    ];
  });
}
