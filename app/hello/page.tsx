import type { Metadata } from 'next';
import { CtaCard } from '@/components/CtaCard';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { HelloHero } from '@/components/HelloHero';
import { HelloNickiFeature } from '@/components/HelloNickiFeature';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { SayHiForm } from '@/components/SayHiForm';
import { TIDYCAL_LINKS } from '@/lib/tidycal';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Unbarrier · designed for difference.',
  description:
    "I'm Nici. I help schools, neurodivergent humans, and the people who love them find clearer ways through. Loop Breakers is where we get unstuck together.",
  alternates: { canonical: '/hello' },
};

const SCHOOLS_MAILTO = 'mailto:hello@unbarrier.me?subject=Schools%20%26%20orgs';

export default function HelloPage() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <HelloHero />

        <section className={styles.cards} aria-labelledby="next-sessions">
          <h2 id="next-sessions" className={styles.eyebrow}>
            Next sessions
          </h2>
          <div className={styles.list}>
            <CtaCard
              card="tuesday"
              title="Tuesday Loop Breakers"
              meta="90 min · £10 · weekly · vision & launch"
              href={TIDYCAL_LINKS.tuesday}
            />
            <CtaCard
              card="guest"
              title="Wed Guest Stage · Sketch-noting"
              meta="20 May · with Nicki Hambleton · £15 · 90 min"
              href={TIDYCAL_LINKS.guest}
            />
            <CtaCard
              card="coaching"
              title="1:1 with Nici · Accessible Coaching"
              meta="monthly subscription · 1 hour"
              href={TIDYCAL_LINKS.coaching}
            />
            <CtaCard
              card="schools"
              title="Schools & organisations"
              meta="audit · access · voice — get in touch"
              href={SCHOOLS_MAILTO}
              external={false}
            />
          </div>
        </section>

        <HelloNickiFeature />

        <section className={styles.bandWrap}>
          <Glow
            color="var(--school-bus-yellow)"
            top="-80px"
            right="-100px"
            size={420}
            opacity={0.08}
            blur={160}
          />
          <NewsletterBand />
        </section>

        <section className={styles.bandWrap}>
          <Glow
            color="var(--orchid-mist)"
            top="-60px"
            left="-120px"
            size={420}
            opacity={0.08}
            blur={160}
          />
          <SayHiForm />
        </section>

        <Footer />
      </main>
    </>
  );
}
