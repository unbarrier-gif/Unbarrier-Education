import type { QuestionSet } from './types';

// ISP Learning & Device Compass v3 — transcribed verbatim from
// isp-learning-device-compass-v2.html (the handoff doc's DOMAINS /
// CATALOGUE_OPTIONS). Question ids follow the source's own `${domainId}-${i}`
// scheme (0-indexed) so exports stay comparable with the original prototype.
//
// device-0 was reworded from the source's vendor-naming parenthetical
// (Intune/Jamf/Google Admin) to capability language only — device-agnostic is
// a design rule for this tool, not just a framing choice (decisions log,
// 25 July 2026).
export const ispAuditQuestionSet: QuestionSet = {
  id: 'isp-compass-v3',
  title: 'ISP Learning & Device Compass',
  intro:
    'A seven-domain self-assessment for your school or region, part of ISP’s phase-two device planning — ' +
    'mapped against ISP’s five learning pillars: academic achievement, multilingualism, life competencies, ' +
    'international opportunities, and future pathways. Domains are tagged with who’s best placed to ' +
    'answer — split across roles if that’s easier than one person doing it all. Your individual answers ' +
    'are visible only to you and to ISP’s planning team.',
  estimatedMinutes: 30,
  domains: [
    {
      id: 'pedagogy',
      name: 'Pedagogy & teacher confidence',
      bestFor: 'teaching & learning lead',
      questions: [
        { id: 'pedagogy-0', prompt: 'Teachers feel confident using their current devices/tools to teach, not just to admin.' },
        { id: 'pedagogy-1', prompt: 'Technology use is planned against a learning outcome, not added for its own sake.' },
        { id: 'pedagogy-2', prompt: 'There is a clear example at this school of tech genuinely improving learning.' },
        {
          id: 'pedagogy-3',
          prompt:
            'Technology use here is clearly linked to at least one of ISP’s five learning pillars — academic achievement, multilingualism, life competencies, international opportunities, or future pathways — not just present because it’s expected.',
        },
        { id: 'pedagogy-4', prompt: 'There’s a clear policy for how staff and students use AI tools here, not an ad hoc or unofficial approach.' },
      ],
    },
    {
      id: 'impact',
      name: 'Student practice & impact evidence',
      bestFor: 'teaching & learning lead',
      questions: [
        { id: 'impact-0', prompt: 'Students use devices as an everyday part of learning, not an occasional add-on.' },
        { id: 'impact-1', prompt: 'We can point to evidence (not just anecdote) that our current tech investment made a difference.' },
        { id: 'impact-2', prompt: 'We know which tools are actually being used, and which were given but sit unused.' },
        {
          id: 'impact-3',
          prompt: 'Students themselves have been asked what’s working and what isn’t with the tech they use — this isn’t just staff opinion.',
        },
        {
          id: 'impact-4',
          prompt:
            'The digital content and apps we actually use are good quality and fit our curriculum and culture — not just whatever came pre-loaded.',
        },
        {
          id: 'impact-5',
          prompt: 'We have a regular process for checking whether our tech investment is working, not a one-off check when something goes wrong.',
        },
      ],
    },
    {
      id: 'device',
      name: 'Device & deployment readiness',
      bestFor: 'IT / deployment lead',
      questions: [
        {
          id: 'device-0',
          prompt: 'Our devices are managed through a mobile device management (MDM) system that’s clear and ready to use.',
        },
        { id: 'device-1', prompt: 'Devices arrive in a ready-to-use state — students/teachers aren’t doing the setup.' },
        { id: 'device-2', prompt: 'We have a plan for what happens to devices at end of life (resale, refurbishment, reuse).' },
        {
          id: 'device-3',
          prompt: 'We’d be open to consolidating the number of vendors we buy from if it meant better pricing and support.',
        },
        {
          id: 'device-4',
          prompt: 'An OpEx/device-as-a-service model (pay monthly, always-current kit) would suit us better than one-off purchases.',
        },
        {
          id: 'device-5',
          prompt: 'We have enough technical support staff and hours to keep devices running day to day — not just the systems in place to manage them.',
        },
      ],
    },
    {
      id: 'environment',
      name: 'Environment & infrastructure',
      bestFor: 'IT / deployment lead',
      questions: [
        { id: 'environment-0', prompt: 'Charging and storage are in place for a 1:1 model, not just for the devices we have now.' },
        { id: 'environment-1', prompt: 'Wi-Fi coverage is reliable across all the teaching spaces that need it.' },
        { id: 'environment-2', prompt: 'There are no local restrictions (legal, supply, or otherwise) on which device types we can use.' },
      ],
    },
    {
      id: 'leadership',
      name: 'Leadership, governance & voice',
      bestFor: 'head / regional leadership',
      questions: [
        { id: 'leadership-0', prompt: 'It is clear who owns the device decision — central, regional, or school level.' },
        { id: 'leadership-1', prompt: 'Our budget for this is committed, not provisional.' },
        { id: 'leadership-2', prompt: 'This school was consulted before devices were allocated, not just informed afterwards.' },
        {
          id: 'leadership-3',
          prompt: 'We have clear, documented safeguarding policies covering how students use these devices and any AI tools on them.',
        },
        {
          id: 'leadership-4',
          prompt: 'There are no local legal or regulatory restrictions on which vendors or devices we’re allowed to buy from.',
        },
      ],
    },
    {
      id: 'community',
      name: 'Community, culture & inclusion',
      bestFor: 'safeguarding / inclusion lead',
      questions: [
        { id: 'community-0', prompt: 'Staff and families feel comfortable with how technology change is being introduced here.' },
        { id: 'community-2', prompt: 'We have a way for teachers to feed practice and concerns back up, and be heard.' },
      ],
    },
    {
      id: 'eal-neurodiversity',
      name: 'EAL & Neurodiversity-Inclusive Practice',
      bestFor: 'inclusion / multilingualism lead',
      questions: [
        {
          id: 'eal-neurodiversity-0',
          prompt:
            'Students learning in a language that isn’t their first have real support built into the devices and software they use day to day — translation tools, text-to-speech, language scaffolding — not just extra worksheets alongside the same tech everyone else uses.',
        },
        {
          id: 'eal-neurodiversity-1',
          prompt: 'Teachers feel confident using the tech available to support EAL students, not just aware that support tools exist somewhere on the device.',
        },
        {
          id: 'eal-neurodiversity-2',
          prompt:
            'Assistive and inclusive features (text-to-speech, focus/reduced-distraction modes, predictable and consistent interfaces) are actually turned on and used, not just present in the settings menu.',
        },
        {
          id: 'eal-neurodiversity-3',
          prompt:
            'Individual students’ known learning needs are reflected in how their actual device is set up — not a generic setup that’s the same for every student regardless of need.',
        },
        {
          id: 'eal-neurodiversity-4',
          prompt:
            'We’ve asked neurodivergent and EAL students themselves what’s working and what isn’t with the tech they use — this isn’t just staff assumption.',
        },
      ],
    },
  ],
  catalogueOptions: [
    'Upfront cost',
    'Durability / build quality',
    'Accessibility features',
    'Local repair & support',
    'Software / ecosystem fit with what we already teach',
    'Resale value at end of life',
    'Familiarity — what staff already know',
  ],
  // RMD-tier names as suggestions only, not a forced list — self-described
  // region in the respondent's own words is useful data in itself (decisions
  // log, 25 July 2026).
  regionSuggestions: [
    'UK',
    'Europe',
    'Iberia',
    'Middle East & North Africa',
    'Latin America',
    'USA & Canada',
    'Asia/SE Asia & India',
  ],
  // Real ISP schools Nici named directly (2026-07-25) — suggestions only,
  // the field stays free text. No "cluster" entries: checked against source
  // material and confirmed not to be ISP's own term (decisions log, 25 July
  // 2026). Flagged to Nici as incomplete pending the full school list.
  schoolSuggestions: ['Reach British School', 'Newton College', 'Ecole Mosaic', 'Tenby Setia EcoHill'],
};
