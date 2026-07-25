import type { QuestionSet } from './types';

// ISP phase-two device & digital inclusion audit.
//
// Wording is locked — see the build brief. ISP is an explicitly mixed device
// estate (iPad / Windows / Chromebook, varies school to school by design and
// budget) and told us directly "we're not here to sell you a device." Do not
// reintroduce vendor/product names (Apple School Manager, Intune, Jamf, etc.)
// into any prompt, label, or placeholder here — those only ever appear in a
// respondent's own free-text answer, never in copy we author.
export const ispAuditQuestionSet: QuestionSet = {
  id: 'isp-phase-2',
  title: 'ISP device & digital inclusion audit',
  intro:
    "A short audit for your school or region, part of ISP's phase-two device planning. " +
    'Your individual answers are visible only to you and to ISP’s planning team — ' +
    'aggregated patterns across the estate are what surface which areas need support next.',
  estimatedMinutes: 20,
  sections: [
    {
      id: 's0',
      title: 'Current platform & device reality',
      description:
        'Start with what’s actually in place at your school today — there’s no right answer here.',
      scored: false,
      questions: [
        {
          id: 's0q1',
          type: 'text',
          prompt:
            'What device platform(s) are in use at your school, broken down by phase (primary / middle / secondary)?',
          hint: 'e.g. Primary: iPad. Middle: Windows. Secondary: Chromebook, mixed by budget.',
        },
        {
          id: 's0q2',
          type: 'text',
          prompt:
            'Why was that platform chosen — pedagogy, cost, availability, or historical/habit?',
        },
        {
          id: 's0q3',
          type: 'text',
          prompt: "Are there platforms you'd want but can't get, or can't get locally?",
        },
        {
          id: 's0q4',
          type: 'text',
          prompt: 'Has this decision ever been revisited, and what would trigger a review?',
        },
        {
          id: 's0q5',
          type: 'text',
          prompt:
            'If you could design your ideal device set with no legacy or budget constraint, what would it look like — and how far is that from what you can actually afford?',
        },
      ],
    },
    {
      id: 's1',
      title: 'Deployment leadership',
      scored: true,
      questions: [
        {
          id: 's1q1',
          type: 'score',
          prompt:
            'Have you assembled a dedicated deployment team with defined roles, and do you meet on a regular cadence?',
          nextStep: {
            low: 'No dedicated team yet — start by naming 2–3 people with clear roles and a fixed meeting slot, even monthly, before adding process.',
            medium:
              "A team exists but cadence is loose — pin a recurring meeting date and share it with stakeholders so momentum doesn't stall.",
          },
        },
        {
          id: 's1q2',
          type: 'text',
          prompt: "What's your school's current approach and strategic priority for this initiative?",
        },
        {
          id: 's1q3',
          type: 'score',
          prompt:
            'Have you chosen and documented a deployment model (1:1, shared, phased) — and is it written down anywhere schools can see?',
          nextStep: {
            low: 'No model chosen or nothing written down — pick 1:1 / shared / phased for this phase and put it on one page schools can actually find.',
            medium:
              'A model exists but visibility is patchy — publish it somewhere schools already look, rather than leaving it in a planning document.',
          },
        },
        {
          id: 's1q4',
          type: 'score',
          prompt:
            'What policies exist for inspecting accounts and restricting device features, and are they documented centrally?',
          nextStep: {
            low: 'No documented policy — draft a short one covering account inspection and feature restrictions before phase-two devices land.',
            medium: "Policy exists but isn't centralised — consolidate it into one place schools and IT can both reference.",
          },
        },
        {
          id: 's1q5',
          type: 'score',
          prompt:
            'Have you identified shared values, beliefs, and future goals for this initiative with stakeholders?',
          nextStep: {
            low: "Values and goals haven't been named with stakeholders — run one session to capture what 'success' looks like before procurement decisions lock in.",
            medium:
              "Some alignment exists but it hasn't been tested widely — check it against a broader stakeholder group before phase two.",
          },
        },
        {
          id: 's1q6',
          type: 'score',
          prompt: 'How do you communicate progress and share success stories with the wider community?',
          nextStep: {
            low: 'No regular communication loop — start with a simple termly update to the wider community.',
            medium: "Communication happens but inconsistently — set a fixed cadence so it doesn't rely on someone remembering.",
          },
        },
        {
          id: 's1q7',
          type: 'score',
          prompt: 'What time and resource is allocated to sustaining this beyond initial rollout?',
          nextStep: {
            low: 'Nothing allocated beyond initial rollout — flag this now, since unsustained deployments erode fastest in year two.',
            medium:
              'Some resource is allocated but may not cover the full lifecycle — check it stretches to training, support, and refresh, not just install.',
          },
        },
        {
          id: 's1q8',
          type: 'text',
          featured: true,
          prompt: "What's the single biggest challenge you're trying to tackle right now?",
        },
        {
          id: 's1q9',
          type: 'text',
          prompt:
            'Which schools/regions should be prioritised for phase two, and on what basis — biggest gap, easiest win, or existing learning labs?',
        },
      ],
    },
    {
      id: 's2',
      title: 'Teaching & learning',
      description: 'For educators — answer for your teaching staff as a whole.',
      scored: true,
      questions: [
        {
          id: 's2q1',
          type: 'text',
          prompt: 'How do teachers currently collaborate in their practice, and would better device access change that?',
        },
        {
          id: 's2q2',
          type: 'text',
          prompt: 'What would help teachers plan lessons more effectively today?',
        },
        {
          id: 's2q3',
          type: 'score',
          prompt: 'Are devices solving a real classroom problem, or were they imposed without consultation?',
          nextStep: {
            low: 'Devices were largely imposed without consultation — build a short feedback loop with teaching staff before the next rollout wave.',
            medium: 'Some consultation happened but not consistently — make it a standard step before future purchasing decisions.',
          },
        },
        {
          id: 's2q4',
          type: 'score',
          prompt:
            'How confident are teachers using their current devices, whatever the platform — where do the skill gaps sit?',
          nextStep: {
            low: 'Confidence is low — prioritise practical, device-agnostic training over policy documentation.',
            medium: 'Confidence is mixed — target training at the specific gaps rather than a blanket refresher.',
          },
        },
        {
          id: 's2q5',
          type: 'score',
          prompt:
            'Do you design accessible learning experiences and support diverse learning needs with the current device set, regardless of platform?',
          nextStep: {
            low: "Accessibility isn't yet designed in — start with the diverse learning needs already known in your cohort, not a generic checklist.",
            medium: 'Some accessible practice exists — audit it against your diverse needs list to close specific gaps.',
          },
        },
        {
          id: 's2q6',
          type: 'text',
          prompt: 'How is student work currently assessed and feedback given digitally, on whatever tools you have?',
        },
        {
          id: 's2q7',
          type: 'text',
          prompt: "What do your five learning pillars need from devices to actually succeed, not just be present?",
        },
        {
          id: 's2q8',
          type: 'score',
          prompt:
            "How do teaching leaders' voices currently feed into procurement decisions — do they get a seat before or after the spec is set?",
          nextStep: {
            low: "Teaching leaders aren't consulted before the spec is set — bring them in at the scoping stage for phase two, not after.",
            medium: 'Teaching leaders are consulted late — move the conversation earlier in the procurement timeline.',
          },
        },
      ],
    },
    {
      id: 's3',
      title: 'Purchasing / procurement',
      scored: true,
      questions: [
        {
          id: 's3q1',
          type: 'score',
          prompt:
            'Is there a centralised system for purchasing and distributing apps/content across your platform(s) — whatever those platforms are?',
          nextStep: {
            low: 'No centralised system — this is worth fixing before phase two scales the vendor count further.',
            medium: "A system exists but coverage is partial — extend it to the platforms it's currently missing.",
          },
        },
        {
          id: 's3q2',
          type: 'text',
          prompt: 'How many vendors are currently in your supply chain, and is there appetite to consolidate?',
        },
        {
          id: 's3q3',
          type: 'score',
          prompt:
            'Would a standardised catalogue of approved devices — chosen centrally, selected regionally, across price points and platforms — work for your schools?',
          nextStep: {
            low: 'No catalogue exists — a short centrally-chosen, regionally-selected list would reduce ad hoc purchasing risk.',
            medium: "A catalogue exists but isn't consistently used — reinforce it as the default route before phase-two purchasing opens.",
          },
        },
        {
          id: 's3q4',
          type: 'text',
          prompt: 'Is budget for phase two committed or provisional, and who owns sign-off?',
        },
        {
          id: 's3q5',
          type: 'score',
          prompt: 'Would an OpEx/device-as-a-service model suit your renewal cycle better than repeated CapEx purchases?',
          nextStep: {
            low: 'Renewal is pure CapEx with no OpEx model considered — worth modelling both against your actual refresh cycle.',
            medium: 'OpEx has been considered but not adopted — revisit the comparison now phase-two budget is in scope.',
          },
        },
        {
          id: 's3q6',
          type: 'text',
          prompt: 'What regional or legal constraints affect local purchasing in your area?',
        },
        {
          id: 's3q7',
          type: 'text',
          prompt: 'Where does cost sit versus platform preference when a decision actually gets made?',
        },
      ],
    },
    {
      id: 's4',
      title: 'IT / deployment & management',
      scored: true,
      questions: [
        {
          id: 's4q1',
          type: 'score',
          prompt: 'Is network infrastructure ready for increased device load — coverage, capacity, learner needs?',
          nextStep: {
            low: "Network isn't ready for increased load — get a capacity assessment done before device numbers increase.",
            medium: 'Network is partly ready — stress-test coverage in the areas phase two will affect most.',
          },
        },
        {
          id: 's4q2',
          type: 'text',
          prompt: 'Which device management solution(s) are in place, and how fragmented is device management across regions/schools?',
        },
        {
          id: 's4q3',
          type: 'score',
          prompt: 'Are devices enrolled and assigned through a single source of truth, across all platforms in use?',
          nextStep: {
            low: 'No single source of truth — fragmented enrollment is where lifecycle and support problems usually start.',
            medium: 'A source of truth exists for some platforms but not all — extend it across the full mixed estate.',
          },
        },
        {
          id: 's4q4',
          type: 'score',
          prompt: "What's the actual device setup experience — ready-to-use out of the box, or manual setup per device?",
          nextStep: {
            low: 'Setup is manual per device — this is the highest-leverage fix for IT time before phase two adds volume.',
            medium: "Some devices are ready-to-use, others aren't — standardise the process across platforms rather than per-device.",
          },
        },
        {
          id: 's4q5',
          type: 'text',
          prompt: "What's your current device lifecycle, and is there a refurbishment/resale programme?",
        },
        {
          id: 's4q6',
          type: 'score',
          prompt: 'Do IT staff sit in on academic/pedagogy planning meetings, or is IT planning separate from teaching and learning planning?',
          nextStep: {
            low: 'IT and teaching/learning planning run separately — get IT into even one planning meeting per term to close the gap early.',
            medium: "IT has some visibility into planning — make the seat standing, not occasional.",
          },
        },
        {
          id: 's4q7',
          type: 'score',
          prompt:
            'How do you currently support safeguarding, data protection, and content filtering across devices, on whatever platforms are in play?',
          nextStep: {
            low: 'Safeguarding/filtering coverage has gaps across platforms — this is a priority fix regardless of platform choice.',
            medium: 'Coverage exists but varies by platform — standardise the minimum bar across the whole estate.',
          },
        },
        {
          id: 's4q8',
          type: 'text',
          prompt:
            'How do teachers manage student accounts, classes, and devices day to day, on whatever tools you actually use — not what’s officially deployed?',
        },
      ],
    },
  ],
};
