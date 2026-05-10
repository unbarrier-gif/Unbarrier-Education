import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { ScheduleRow } from './ScheduleRow';
import styles from '../page.module.css';

// Band 5 — "Build your full INSET day" (D37). Source of truth:
// workshops Notion doc (35bbbd60-0b3f-8129-a161-f6d42dec0de4),
// "# Build your full INSET day" section. Subsection "What a day
// looks like" carries the worked-example timeline (D30/D31/D32/D33
// copy locked, source doc updated D34).
//
// Anchor target #inset — landed by the route 2 ("Build your day →")
// CTA on /access. tabindex="-1" + scroll-margin-top: var(--nav-height).
//
// Component composition per D35:
//   - Six <ScheduleRow> rows
//   - <ParallelRooms> pill on row 4 (13:00 leadership) ONLY
//   - Row 3 (11:00 TAs) keeps "· parallel session" inline plain text
//     and the tinted background — it signals concurrency, not
//     capacity-building.

type RowSpec = Parameters<typeof ScheduleRow>[0];

const ROWS: RowSpec[] = [
  {
    time: '08:45 — 09:00',
    roleLabel: 'Arrival',
    roleColor: 'var(--text-subtle)',
    detail: 'Coffee & set up · SLT 1:1s',
  },
  {
    time: '09:00 — 10:30',
    roleLabel: 'Whole staff',
    roleColor: 'var(--princeton-orange)',
    moduleTitle: 'Module 01 — Essentials',
    body:
      'The accessibility tools already on every iPad in the building, walked through in classroom context. Every member of staff leaves with the same baseline. One room, one session, no one gets missed.',
  },
  {
    time: '11:00 — 12:00',
    roleLabel: 'TAs · HLTAs · parallel session',
    roleColor: 'var(--pearl-aqua)',
    moduleTitle: 'Module 02 — Teaching Assistants',
    body:
      'While the rest of the school continues their day, TAs and HLTAs work hands-on with the iPad accessibility tools that change the shape of their week — Speak Selection, Live Listen, Sound Recognition, dictation. Practical, specific, set up for the children they actually support.',
    tag: 'parallel',
  },
  {
    time: '13:00 — 14:30',
    roleLabel: 'Leadership',
    roleColor: 'var(--princeton-orange)',
    moduleTitle: 'Module 03 — SLT · SENCOs',
    body:
      'Two trainers running parallel sessions for two cohorts at once — strategic inclusion in one room, ordinarily available provision in the other. Twice the capacity in the same window. Brings senior staff together rather than peeling them off across a half-term of twilights.',
    tag: 'parallel-rooms',
  },
  {
    time: '15:00 — 15:30',
    roleLabel: 'Debrief',
    roleColor: 'var(--text-subtle)',
    detail: 'SLT feedback · refining the plan',
  },
  {
    time: '15:45 — 17:00',
    roleLabel: 'Whole staff · commitments',
    roleColor: 'var(--spring-green)',
    moduleTitle: 'Module 06 — Close',
    body:
      'Whole staff back in one room. Each member of staff names one tool, one learner, one week — written, visible, owned. SLT take the cohort-level commitments forward. SENCOs leave with a documented record for evidencing ordinarily available provision and individual support plans.',
  },
];

const ENQUIRY_CTA =
  'mailto:access@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20INSET%20day';

export function AccessInsetExample() {
  return (
    <section
      id="inset"
      tabIndex={-1}
      aria-labelledby="inset-heading"
      className={styles.timelineSection}
    >
      <div className={styles.timelineHead}>
        <Eyebrow color="var(--school-bus-yellow)">Pick and mix</Eyebrow>
        <h2 id="inset-heading" className={styles.h2}>
          Build your full INSET day.
        </h2>
        <p className={styles.timelineIntro}>
          Schools pick any combination of modules to shape a full day. We
          bring everything. You provide the room and the staff.
        </p>
        <p className={styles.timelineIntro}>
          A day typically combines a whole-staff session in the morning with
          focused work for specific groups in the afternoon — TAs in one
          room, leadership in another. The shape is yours to set.
        </p>
      </div>

      <div className={styles.workedExample}>
        <h3 className={styles.workedExampleHeading}>What a day looks like.</h3>
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

        <ol className={styles.timelinePanel}>
          {ROWS.map((row, i) => (
            <ScheduleRow key={i} {...row} />
          ))}
        </ol>

        <p className={styles.timelineCaveat}>
          Module 04 (parents, governors and trustees) typically runs as a
          separate evening or twilight session — not shown on this day.
          Schools with active parent forums often combine it with the INSET
          day to brief the wider community in the same week.
        </p>
      </div>

      <div className={styles.timelineCta}>
        <Button href={ENQUIRY_CTA} color="var(--princeton-orange)">
          Tell us what you need →
        </Button>
      </div>
    </section>
  );
}
