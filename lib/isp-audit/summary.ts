import type { Answers, QuestionSet } from './types';

export type DomainScore = { id: string; name: string; score: number };

/**
 * Average of answered 0-5 scores per domain, scaled to 0-100. Ported 1:1
 * from the source prototype's domainScores() — a question left unanswered
 * is excluded from the average, but an answer of 0 is a real answer and
 * must be counted (`v !== undefined`, never a truthy check on v itself).
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
    return { id: d.id, name: d.name, score };
  });
}

export type Route = 'pedagogy' | 'procurement' | 'both';

export type RouteRecommendation = {
  route: Route;
  title: string;
  body: string;
};

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
 */
export function routeRecommendation(scores: DomainScore[]): RouteRecommendation {
  const get = (id: string) => scores.find((s) => s.id === id)?.score ?? 0;
  const pedagogySignal = (get('pedagogy') + get('leadership') + get('community') + get('eal-neurodiversity')) / 4;
  const hardwareSignal = (get('device') + get('environment')) / 2;

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
};
