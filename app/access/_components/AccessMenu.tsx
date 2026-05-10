import { Eyebrow } from '@/components/Eyebrow';
import { ModuleTile } from './ModuleTile';
import styles from '../page.module.css';

// Band 4 — "The menu — pick your modules" (D37). Source of truth:
// workshops Notion doc (35bbbd60-0b3f-8129-a161-f6d42dec0de4),
// "# The menu — pick your modules" section.
//
// Anchor target #menu — landed by the route 1 ("See the menu →") CTA on
// /access. tabindex="-1" + scroll-margin-top: var(--nav-height) so
// keyboard / screen-reader users land on the section heading after a
// hash jump, not skipped past.
//
// Audience tags per D37 — facilitator names deliberately absent.

const MODULES = [
  {
    number: 2,
    title: 'Accessibility on iPad for Teaching Assistants',
    duration: '90 minutes',
    audience: 'TAs · HLTAs',
    body:
      "TAs and HLTAs spend more one-to-one time with children with additional needs than anyone else in the building, and receive the least training on the tools that could help. This session shows TAs how to set up and use iPad accessibility features for the specific learners they support — practical, hands-on, no jargon. Goes home with a Monday-morning takeaway pack.",
    audienceFor: 'TAs, HLTAs, one-to-one support staff',
  },
  {
    number: 3,
    title:
      'Strategic Inclusion: accessibility as ordinarily available provision',
    duration: '90 minutes',
    audience: 'SLT · SENCOs',
    body:
      'Inclusion is now a shared responsibility across all staff, and the role of the SENCO is becoming more strategic. This session helps leaders see accessibility tools as policy infrastructure — how built-in iPad features support ordinarily available provision, evidence Individual Support Plans, contribute to evacuation and safeguarding obligations, and demonstrate ROI on EHCP-funded devices. Frames the why before the what.',
    audienceFor: 'SLT, SENCOs, trust leads, governors',
  },
  {
    number: 4,
    title: 'Parents, governors and trustees: what your iPad already does',
    duration: '60 minutes',
    audience: 'Stakeholders',
    body:
      'Schools spend EHCP, SEND and pupil premium money on devices, but families and governors rarely see what those devices can do. This session translates accessibility provision into language parents and trustees understand: belonging, attainment, transitions, value for money. Especially useful for schools with active parent forums, or trusts preparing for the new annual parental forum requirement.',
    audienceFor: 'parent groups, governing bodies, trust boards, key stakeholders',
  },
] as const;

const M5 = {
  number: 5,
  title: 'Accessibility audit clinic',
  duration: 'half-day, small group',
  audience: 'SENCOs · TAs · inclusion leads',
  body:
    "A working session for SENCOs, TAs and inclusion leads to triage accessibility provision across a group of learners. Bring your cohort — the EHCPs, the Individual Support Plans, the children you're worried about — and leave with a needs map: which barriers cluster, which iPad tools answer them, and where provision is already in place but underused. Output is a documented plan that feeds directly into Individual Support Plans and ordinarily available provision.",
  audienceFor: 'SENCOs, TAs, inclusion leads',
  linkOut: { href: '/audits' },
} as const;

export function AccessMenu() {
  return (
    <section
      id="menu"
      tabIndex={-1}
      aria-labelledby="menu-heading"
      className={styles.menu}
    >
      <div className={styles.menuHead}>
        <Eyebrow color="var(--princeton-orange)">Bookable modules</Eyebrow>
        <h2 id="menu-heading" className={styles.h2}>
          The menu — pick your modules.
        </h2>
        <p className={styles.menuLede}>
          Book one as a standalone session, or pick and mix to build your INSET
          day.
        </p>
      </div>

      <ul className={styles.menuList}>
        {MODULES.map((m) => (
          <ModuleTile key={m.number} {...m} />
        ))}
        <ModuleTile {...M5} />
      </ul>

      <div className={styles.menuCta}>
        <a className={styles.menuBridgeLink} href="#inset">
          Build your full INSET day →
        </a>
      </div>
    </section>
  );
}
