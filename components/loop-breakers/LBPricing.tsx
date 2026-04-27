import { Eyebrow } from '../Eyebrow';
import { SectionBar } from '../SectionBar';
import { TIDYCAL } from '@/content/loop-breakers/sessions';
import { LBPriceCard } from './LBPriceCard';
import styles from './LBPricing.module.css';

// Founding link is intentionally a mailto until Nici gives the go-live signal
// (Source of Truth v1.4: "deliberately left blank pending Nici's go-live signal").
const FOUNDING_HREF = 'mailto:hello@unbarrier.me?subject=Founding';

export function LBPricing() {
  return (
    <>
      <SectionBar color="var(--school-bus-yellow)" />
      <section id="pricing" className={styles.section}>
        <div className={styles.inner}>
          <Eyebrow color="var(--school-bus-yellow)">Pricing</Eyebrow>
          <h2 className={styles.heading}>
            Pay-as-you-go.{' '}
            <span className={styles.accent}>No lock-in.</span>
          </h2>
          <p className={styles.lede}>
            That&apos;s the whole pricing. No upsell waiting behind it. £5
            access seats on request, no questions.
          </p>

          <div className={styles.grid}>
            <LBPriceCard
              color="var(--school-bus-yellow)"
              tag="Tuesday · 1st & last"
              title="Loop Breakers"
              price="£10"
              priceSub="per session"
              items={[
                '90 min · up to 10 people',
                'One idea, worked through',
                'Pay-as-you-go · skip any session',
                '£5 access seat on request',
              ]}
              cta="Book a Tuesday"
              ctaHref={TIDYCAL.tuesday}
            />
            <LBPriceCard
              color="var(--orchid-mist)"
              tag="Wednesday · off-cadence"
              title="Guest Stage"
              price="£25"
              priceSub="sliding · £15 / £25 / £40 tiers"
              items={[
                'Up to 40 people',
                'Invited neurodivergent practitioners',
                'You pick the tier at checkout',
                'Topic varies — see Upcoming',
              ]}
              cta="See next Guest Stage"
              ctaHref={TIDYCAL.guestStage}
            />
            <LBPriceCard
              color="var(--spring-green)"
              tag="Founding · capped at 20"
              title="Founding Member"
              price="£180"
              priceSub="lifetime · locked at signup"
              items={[
                'Every Tuesday Loop Breakers session, £0 at the door',
                'Wednesday Guest Stages at £15 sliding tier',
                'Slow-pace WhatsApp room with the cohort',
                'Voice on what Loop Breakers becomes',
              ]}
              cta="Claim a founding seat"
              ctaHref={FOUNDING_HREF}
              featured
            />
          </div>

          <p className={styles.outro}>
            Want 1:1 only?{' '}
            <a
              href="mailto:hello@unbarrier.me"
              className={styles.outroLink}
            >
              hello@unbarrier.me
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
