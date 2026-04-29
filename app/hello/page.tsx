import type { Metadata } from 'next';
import Link from 'next/link';
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
              href="/guest-stage/nicki-hambleton-sketch-noting"
              external={false}
            />
            <CtaCard
              card="coaching"
              title="Coaching for women holding it all"
              meta="£100/month · with Nici · book a free chat first"
              href={TIDYCAL_LINKS.coaching}
            />
            <CtaCard
              card="ehcp_fit_call"
              title="EHCP & Section 7 reports"
              meta="for families fighting for the right provision · book a free 15-min fit call"
              href={TIDYCAL_LINKS.ehcpFitCall}
            />
            <CtaCard
              card="template"
              title="The One Thing Template"
              meta="free download · 2 pages · bring it to a session"
              href="/one-thing-template.html"
              external={true}
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

        <section className={styles.dataNote} aria-label="how we handle your data">
          <p>A note on what happens with your data:</p>
          <p>
            If you book a discovery call, sign up to the newsletter, or send
            a hello, your details are handled per our{' '}
            <Link href="/legal/privacy">Privacy Policy</Link>. You can
            unsubscribe, ask what we hold, or ask us to delete it any time —
            just email <a href="mailto:nici@unbarrier.me">nici@unbarrier.me</a>.
          </p>
        </section>

        <Footer />
      </main>
    </>
  );
}
