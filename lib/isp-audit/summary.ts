import type { Answers, AuditResponse, QuestionSet } from './types';

export type DomainScore = { id: string; name: string; score: number; answered: number; total: number };

/**
 * Average of answered 0-5 scores per domain, scaled to 0-100. Ported from the
 * source prototype's domainScores() — a question left unanswered (or marked
 * "can't answer this") is excluded from the average, but an answer of 0 is a
 * real answer and must be counted (`v !== undefined`, never a truthy check on
 * v itself).
 *
 * `answered`/`total` are exposed alongside `score` so callers can tell a
 * domain with a genuine low score apart from one nobody has touched yet —
 * `score` alone can't distinguish "rated 0" from "no data," and both read as
 * 0 (decisions log, 25 July 2026 — the multi-respondent workflow means a
 * single submission routinely leaves whole domains untouched, which isn't
 * the same thing as a bad score).
 */
export function domainScores(questionSet: QuestionSet, answers: Answers): DomainScore[] {
  return questionSet.domains.map((d) => {
    let sum = 0;
    let n = 0;
    for (const q of d.questions) {
      const v = answers.scores[q.id];
      if (v !== undefined) {
        sum += v;
        n += 1;
      }
    }
    const score = n ? Math.round((sum / n) * 20) : 0;
    return { id: d.id, name: d.name, score, answered: n, total: d.questions.length };
  });
}

/**
 * Estate-agnostic overall readiness for one response: the mean of the
 * domains that have at least one answered question, 0-100. Domains nobody has
 * touched are excluded (same reasoning as signalFor) so a part-completed
 * submission isn't dragged toward 0 by its blank domains. `answered` is the
 * count of domains that fed the average, so a caller can say "0" honestly
 * when nothing's been answered rather than printing a confident 0/100.
 */
export function overallReadiness(scores: DomainScore[]): { score: number; answered: number } {
  const withData = scores.filter((s) => s.answered > 0);
  if (withData.length === 0) return { score: 0, answered: 0 };
  const mean = withData.reduce((sum, s) => sum + s.score, 0) / withData.length;
  return { score: Math.round(mean), answered: withData.length };
}

/** Score band for the on-screen/print bars and score colours (AA on white). */
export type ScoreBand = 'low' | 'medium' | 'high';

export function scoreBand(score: number): ScoreBand {
  if (score >= 65) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

export type Route = 'pedagogy' | 'procurement' | 'both' | 'insufficient';

export type RouteRecommendation = {
  route: Route;
  title: string;
  body: string;
};

const PEDAGOGY_DOMAIN_IDS = ['pedagogy', 'leadership', 'community', 'eal-neurodiversity'];
const HARDWARE_DOMAIN_IDS = ['device', 'environment'];

/** Average of only the domains in `ids` that have at least one answered
 *  question — a domain nobody has touched is excluded from the average
 *  rather than dragging it down to a false 0. Returns null if none of the
 *  domains in the group have any data at all. */
function signalFor(scores: DomainScore[], ids: string[]): number | null {
  const withData = ids
    .map((id) => scores.find((s) => s.id === id))
    .filter((s): s is DomainScore => s !== undefined && s.answered > 0);
  if (withData.length === 0) return null;
  return withData.reduce((sum, s) => sum + s.score, 0) / withData.length;
}

/**
 * Ported from the source prototype's routeRecommendation() — compares a
 * pedagogy signal against a hardware signal and recommends what conversation
 * the school needs next, before any procurement decision.
 *
 * Pedagogy signal = pedagogy + leadership + community + EAL/neurodiversity.
 * The EAL/neurodiversity domain was added after the original port (decisions
 * log, 25 July 2026) — it's about practice and culture around how devices
 * are configured and used for specific learners, not about hardware or
 * infrastructure, so it belongs alongside the other pedagogy-adjacent
 * domains rather than the hardware signal.
 *
 * Either signal can come back with no data at all (nobody's answered
 * anything in that domain group yet — routine given the multi-respondent
 * workflow). Rather than reading that as a 0 and confidently routing
 * "pedagogy-led discovery" on an empty submission, this returns an
 * 'insufficient' route instead — comparing a real signal against an unknown
 * one isn't a real comparison.
 */
export function routeRecommendation(scores: DomainScore[]): RouteRecommendation {
  const pedagogySignal = signalFor(scores, PEDAGOGY_DOMAIN_IDS);
  const hardwareSignal = signalFor(scores, HARDWARE_DOMAIN_IDS);

  if (pedagogySignal === null || hardwareSignal === null) {
    return {
      route: 'insufficient',
      title: 'Not enough answered yet.',
      body:
        'Comparing pedagogy/governance against device/infrastructure needs at least one answered question on ' +
        'both sides. Come back and add more, or check whether another respondent at this school has covered ' +
        'the rest.',
    };
  }

  if (pedagogySignal < 60 && pedagogySignal <= hardwareSignal) {
    return {
      route: 'pedagogy',
      title: 'Recommended next step: pedagogy-led discovery.',
      body:
        "Governance, teacher confidence and community readiness are the weaker areas here — not the hardware. " +
        'More devices won’t fix this. This school needs a discovery conversation about how technology is meant to ' +
        'support teaching before any further procurement, plus a look at EAL and neurodiversity-inclusive access to devices.',
    };
  }

  if (hardwareSignal < 60 && hardwareSignal < pedagogySignal) {
    return {
      route: 'procurement',
      title: 'Recommended next step: infrastructure & procurement conversation.',
      body:
        'Pedagogy and governance are relatively solid — the gap is device readiness and environment ' +
        '(charging, Wi-Fi, MDM, lifecycle). This is a device/infrastructure conversation.',
    };
  }

  return {
    route: 'both',
    title: 'Recommended next step: full discovery workshop.',
    body:
      'Both pedagogy/governance and device/environment need attention here — worth a joined-up discovery ' +
      'session covering both before committing budget either way.',
  };
}

export const ROUTE_LABEL: Record<Route, string> = {
  pedagogy: 'Pedagogy-led discovery',
  procurement: 'Infrastructure & procurement',
  both: 'Full discovery workshop',
  insufficient: 'Not enough answered yet',
};

// ---- estate-wide aggregates (admin dashboard) ----

/** Estate readiness per domain: the mean domain score across every response
 *  that answered anything in that domain. `answered` counts contributing
 *  responses so an untouched domain reads as no-data rather than a false 0. */
export function estateReadinessByDomain(
  questionSet: QuestionSet,
  responses: AuditResponse[],
): DomainScore[] {
  const perResponse = responses.map((r) => domainScores(questionSet, r.answers));
  return questionSet.domains.map((d, di) => {
    let sum = 0;
    let n = 0;
    for (const ds of perResponse) {
      const s = ds[di];
      if (s.answered > 0) {
        sum += s.score;
        n += 1;
      }
    }
    return { id: d.id, name: d.name, score: n ? Math.round(sum / n) : 0, answered: n, total: d.questions.length };
  });
}

/** How many responses land on each recommended route. */
export function routeCounts(questionSet: QuestionSet, responses: AuditResponse[]): Record<Route, number> {
  const counts: Record<Route, number> = { pedagogy: 0, procurement: 0, both: 0, insufficient: 0 };
  for (const r of responses) {
    counts[routeRecommendation(domainScores(questionSet, r.answers)).route] += 1;
  }
  return counts;
}

/** Estate overall readiness: mean of each response's own overall (responses
 *  with no answered domain at all are excluded). */
export function estateOverall(questionSet: QuestionSet, responses: AuditResponse[]): number {
  const overalls = responses
    .map((r) => overallReadiness(domainScores(questionSet, r.answers)))
    .filter((o) => o.answered > 0)
    .map((o) => o.score);
  return overalls.length ? Math.round(overalls.reduce((a, b) => a + b, 0) / overalls.length) : 0;
}

/** Catalogue-priority tallies across all responses, most-picked first. */
export function catalogueCounts(responses: AuditResponse[]): { label: string; count: number }[] {
  const map = new Map<string, number>();
  for (const r of responses) {
    for (const c of r.answers.catalogue) map.set(c, (map.get(c) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}
