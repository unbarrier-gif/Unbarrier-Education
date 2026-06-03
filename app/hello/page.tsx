import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaCard } from '@/components/CtaCard';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { HelloHero } from '@/components/HelloHero';
import { Nav } from '@/components/Nav';
import { NewsletterBand } from '@/components/NewsletterBand';
import { SayHiForm } from '@/components/SayHiForm';
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

        <section className={styles.cards} aria-labelledby="start-here">
          <h2 id="start-here" className={styles.eyebrow}>
            Start here
          </h2>
          <div className={styles.list}>
            <CtaCard
              card="seven_questions"
              title="The seven questions"
              meta="The talk, on one page. Pick one. Ask it Monday."
              href="/the-takeaway.html"
              external={true}
            />
            <CtaCard
              card="belonging_check"
              title="The belonging check"
              meta="A prompt to build a 5-minute form for your people. Does your setting have a belonging problem?"
              href="/belonging-check"
              external={false}
            />
            <CtaCard
              card="receipts"
              title="The receipts"
              meta="Six numbers under the talk. The belonging fact sheet."
              href="/the-receipts.html"
              external={true}
            />
            <CtaCard
              card="one_read"
              title="One read"
              meta="The system wasn't built for the 60% in the middle. I'm building it differently."
              href="https://www.unbarrier.me/blog/the-system-wasnt-built-for-the-60-percent-in-the-middle"
              external={true}
            />
            <CtaCard
              card="conversation"
              title="Start a conversation"
              meta="Tell me what's happening. No forms, no funnels."
              href="https://tidycal.com/nici/chat-with-nici"
              external={true}
            />
          </div>
        </section>

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
