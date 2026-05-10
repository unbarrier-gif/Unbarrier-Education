import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import styles from '../page.module.css';

// Worked-example INSET day. Source of truth: workshops Notion doc
// (35bbbd60-0b3f-8129-a161-f6d42dec0de4). Behaviour locked by decision
// log entries D30–D34 (10 May 2026):
//   D30 — facilitator names removed from row tags; replaced with
//         role-shaped tags (who's being trained, not who's delivering).
//         Each module row gains a one-paragraph context sentence.
//   D31 — "PARALLEL ROOMS ×2" reframed as "two specialists, two rooms"
//         in the audience tag, with capacity-building framing in the
//         body copy.
//   D32 — close session reframed as goal-setting ("one tool, one
//         learner, one week") with multi-stakeholder outcomes.
//   D33 — SEO terms layered into the prose (Speak Selection, Live
//         Listen, Sound Recognition, dictation, ordinarily available
//         provision, individual support plans, INSET day, twilight,
//         parent forum, HLTA).

type Row = {
  time: string;
  audience: string;
  audienceColor: string;
  module?: string;
  context?: string;
  detail?: string;
  parallel?: boolean;
};

const ROWS: Row[] = [
  {
    time: '08:45 — 09:00',
    audience: 'Arrival',
    audienceColor: 'var(--text-subtle)',
    detail: 'Coffee & set up · SLT 1:1s',
  },
  {
    time: '09:00 — 10:30',
    audience: 'Whole staff',
    audienceColor: 'var(--princeton-orange)',
    module: 'Module 01 — Essentials',
    context:
      'The accessibility tools already on every iPad in the building, walked through in classroom context. Every member of staff leaves with the same baseline. One room, one session, no one gets missed.',
  },
  {
    time: '11:00 — 12:00',
    audience: 'TAs · HLTAs · parallel session',
    audienceColor: 'var(--pearl-aqua)',
    module: 'Module 02 — Teaching Assistants',
    context:
      "While the rest of the school continues their day, TAs and HLTAs work hands-on with the iPad accessibility tools that change the shape of their week — Speak Selection, Live Listen, Sound Recognition, dictation. Practical, specific, set up for the children they actually support.",
    parallel: true,
  },
  {
    time: '13:00 — 14:30',
    audience: 'Leadership · two specialists, two rooms',
    audienceColor: 'var(--princeton-orange)',
    module: 'Module 03 — SLT · SENCOs',
    context:
      'Two trainers running parallel sessions for two cohorts at once — strategic inclusion in one room, ordinarily available provision in the other. Twice the capacity in the same window. Brings senior staff together rather than peeling them off across a half-term of twilights.',
    parallel: true,
  },
  {
    time: '15:00 — 15:30',
    audience: 'Debrief',
    audienceColor: 'var(--text-subtle)',
    detail: 'SLT feedback · refining the plan',
  },
  {
    time: '15:45 — 17:00',
    audience: 'Whole staff · commitments',
    audienceColor: 'var(--spring-green)',
    module: 'Module 06 — Close',
    context:
      'Whole staff back in one room. Each member of staff names one tool, one learner, one week — written, visible, owned. SLT take the cohort-level commitments forward. SENCOs leave with a documented record for evidencing ordinarily available provision and individual support plans.',
  },
];

const ENQUIRY_CTA =
  'mailto:access@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20INSET%20day';

export function AccessInsetExample() {
  return (
    <section id="access-inset-example" className={styles.timelineSection}>
      <div className={styles.timelineHead}>
        <Eyebrow color="var(--school-bus-yellow)">Pick and mix</Eyebrow>
        <h2 className={styles.h2}>What a day looks like.</h2>
        <p className={styles.timelineSubLine}>
          Yours won&apos;t look identical — that&apos;s the point. Different
          audiences, different priorities, same shape.
        </p>
        <div className={styles.timelinePillRow}>
          <span className={styles.pillYellow}>
            Worked example · one INSET day
          </span>
          <span className={styles.timelineMeta}>
            6 sessions · 1 day · whatever the size of your setting
          </span>
        </div>
      </div>

      <ol className={styles.timelinePanel}>
        {ROWS.map((row, i) => (
          <li
            key={i}
            className={`${styles.timelineRow} ${row.parallel ? styles.timelineRowParallel : ''}`}
          >
            <span className={styles.timelineTime}>{row.time}</span>
            <div className={styles.timelineBody}>
              <span
                className={styles.timelineAudience}
                style={{ color: row.audienceColor }}
              >
                {row.audience}
              </span>
              {row.module ? (
                <h3 className={styles.timelineModule}>{row.module}</h3>
              ) : null}
              {row.context ? (
                <p className={styles.timelineContext}>{row.context}</p>
              ) : null}
              {row.detail ? (
                <p className={styles.timelineDetail}>{row.detail}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <p className={styles.timelineCaveat}>
        Module 04 (parents, governors and trustees) typically runs as a
        separate evening or twilight session — not shown on this day. Schools
        with active parent forums often combine it with the INSET day to
        brief the wider community in the same week.
      </p>

      <div className={styles.timelineCta}>
        <Button href={ENQUIRY_CTA} color="var(--princeton-orange)">
          Tell us what you need →
        </Button>
      </div>
    </section>
  );
}
