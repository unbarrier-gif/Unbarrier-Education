import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { CredentialStrip } from '@/components/CredentialStrip';
import { Eyebrow } from '@/components/Eyebrow';
import { Footer } from '@/components/Footer';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { SectionBar } from '@/components/SectionBar';
import { PRICE_ACCESS_ADVISORY, PRICE_DISCOVERY_DAY } from '@/lib/pricing';
import styles from '@/app/route-page.module.css';

// /faq — a standalone route with its own url, not a shared component and not
// an accordion embedded in another page. It needs a url someone can be sent.
//
// Copy verbatim from the approved page drafts (28 Aug 2026). Cross-cutting
// questions only; per-offer questions stay on /audit, /access and /voice.
//
// THE FAQPage JSON-LD IS GENERATED FROM `FAQ` BELOW, the same array the page
// renders. It is not a hand-written parallel list, because a hand-written one
// drifts from the visible page the first time an answer is edited and then
// Google is being served copy nobody reviewed.
//
// TWO DELIBERATE DEPARTURES FROM THE APPROVED DRAFT, both ruled by Nici on
// 29 Aug 2026 and both removals rather than rewrites:
//
//  1. "the tiers are published IN FULL on the access page" — "in full" is gone.
//     After the trust-tier hold, /access publishes two tiers with numbers,
//     names the trust route without one, and says edtech has no public price.
//     "a partnership year starts at £2,250" is untouched and still true:
//     advisory is the entry tier and it is published.
//  2. The hero said "before they email ME". The copy pack's own rule is "we",
//     with /about as the single exception; this line had escaped it and every
//     answer below it already said "we".

const CANONICAL = 'https://www.unbarrier.me/faq';

export const metadata: Metadata = {
  title: 'faq — the things people ask before they email us | unbarrier.me',
  description:
    'how we work, who we work with, how long things take, where we can work, what it costs, what happens to the data, and how accessible the work itself is.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'faq — the things people ask before they email us',
    description:
      'how we work, who we work with, what it costs, what happens to the data, and how accessible the work itself is.',
    url: CANONICAL,
    type: 'website',
    images: [
      {
        url: '/assets/og-hello.png',
        width: 1200,
        height: 630,
        alt: 'Unbarrier — designed for difference.',
      },
    ],
  },
};

// A block is either a paragraph or a bulleted list. Both the rendered page and
// the JSON-LD are built from this, so they cannot disagree.
type Block = { kind: 'p'; text: string } | { kind: 'ul'; items: string[] };

const FAQ: Array<{ id: string; question: string; answer: Block[] }> = [
  {
    id: 'how-do-you-work',
    question: 'how do you actually work?',
    answer: [
      {
        kind: 'p',
        text: 'we start with what is already there. you have bought the devices, paid the licences and written a strategy. our first job is to find out what is reaching your learners and what isn’t — not to tell you what to buy next.',
      },
      {
        kind: 'p',
        text: 'after that the work runs on one cycle: notice, design, try, embed. notice what is really happening. design the change with your team. try it and model it in real classrooms. embed it so it holds after we have gone.',
      },
    ],
  },
  {
    id: 'who-do-you-work-with',
    question: 'who do you work with?',
    answer: [
      {
        kind: 'p',
        text: 'schools, multi-academy trusts and edtech companies. mostly where inclusion and send are the point rather than an afterthought. we work across primary, secondary, special and international settings.',
      },
    ],
  },
  {
    id: 'how-long',
    question: 'how long do things take?',
    answer: [
      {
        kind: 'ul',
        items: [
          'a discovery day is one day in your setting, and the write-up comes back within two weeks.',
          'a partnership is a year — quoted as a year, invoiced by term.',
          'anything in between is scoped in conversation.',
        ],
      },
      {
        kind: 'p',
        text: 'we take a small number of engagements at a time, on purpose. so the honest answer on start dates is: ask, and we’ll tell you the truth about when we can start, rather than the answer that keeps you interested.',
      },
    ],
  },
  {
    id: 'where-can-you-work',
    question: 'where can you work?',
    answer: [
      {
        kind: 'p',
        text: 'we’re based in cardiff and we travel. across wales and england, and internationally where it makes sense. travel and subsistence are billed separately at hmrc rates from cardiff, always as their own line — never folded into the fee so it looks smaller than it is.',
      },
    ],
  },
  {
    id: 'what-does-it-cost',
    question: 'what does it cost?',
    answer: [
      {
        kind: 'ul',
        items: [
          `a discovery day is ${PRICE_DISCOVERY_DAY}. that is the whole commitment, and there is no lock-in after it.`,
          // "in full" deleted (Nici, 29 Aug 2026) — after the trust-tier
          // hold on /access it was no longer true. The matching line on
          // /access had the same deletion.
          `a partnership year starts at ${PRICE_ACCESS_ADVISORY}. the tiers are published on the access page.`,
          'everything else is quoted as a package: one number for a defined outcome, not a stack of day invoices.',
          '50% on order, 50% at the midpoint.',
          'we don’t do free scoping. the discovery day is the scoping, and it is priced honestly rather than given away and recovered somewhere you can’t see.',
        ],
      },
    ],
  },
  {
    id: 'what-happens-to-the-data',
    question: 'what happens to the data?',
    answer: [
      {
        kind: 'ul',
        items: [
          'whatever unbarrier.voice collects about your setting is yours. your picture, for you.',
          'separately, and only if you opt in, an anonymised layer builds a sector-level picture of what is reaching learners and what isn’t.',
          'those are two different things, so they take two consents. bundling them would make neither one valid.',
          // "children" here is the second of the two deliberate exceptions to
          // the "learners" rule — safeguarding language. Do not change.
          'children are never named publicly. adults only with written agreement. schools and trusts named for delivery work only.',
        ],
      },
    ],
  },
  {
    id: 'after-i-get-in-touch',
    question: 'what happens after i get in touch?',
    answer: [
      {
        kind: 'p',
        text: 'you email us and tell us what you’re working with. we reply with either how we can help, or the name of someone who would help you better. if it is a yes, we have a short call, we send a written scope with one number on it, and you decide.',
      },
      {
        kind: 'p',
        text: 'no pipeline. no chasing. if you go quiet, we’ll assume the timing was wrong and leave you alone.',
      },
    ],
  },
  {
    id: 'how-accessible',
    question: 'how accessible is the work itself?',
    answer: [
      {
        kind: 'p',
        text: 'unbarrier is led by a dyslexic, adhd and dyscalculic educator. accessibility here isn’t a policy bolted on at the end, it is how the work has to be built.',
      },
      {
        kind: 'ul',
        items: [
          'everything we write for you comes in plain language and short sections.',
          'slides and packs are set in lexend, high contrast, and readable from the back of the hall.',
          'this site has reading controls and a high-contrast toggle.',
          'if you need something in another format, ask.',
        ],
      },
    ],
  },
];

/** Flatten an answer into the single string schema.org wants. */
function answerText(blocks: Block[]): string {
  return blocks
    .map((block) => (block.kind === 'p' ? block.text : block.items.join(' ')))
    .join(' ');
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: answerText(item.answer) },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* No `active` key: /faq is reachable from the footer, not the nav,
          so there is no nav item to mark as the current page. */}
      <Nav />

      <main
        className={styles.main}
        style={{ '--route-accent': 'var(--spring-green)' } as CSSProperties}
      >
        <Glow color="var(--spring-green)" left="-120px" top="4%" size={620} opacity={0.1} />
        <Glow color="var(--pearl-aqua)" right="-100px" top="48%" size={460} opacity={0.07} />

        <header className={styles.hero}>
          <Eyebrow color="var(--spring-green)">faq</Eyebrow>
          <h1 className={styles.heading}>
            the things people ask{' '}
            <span className={styles.accent}>before they email us.</span>
          </h1>
          <p className={styles.lede}>
            schools decide before the first conversation, so these are answered
            here rather than kept for a call. if what you need isn&rsquo;t here,
            ask us and we&rsquo;ll add it.
          </p>
          <CredentialStrip />
        </header>

        <SectionBar color="var(--spring-green)" />

        <div className={styles.section}>
          <div className={styles.qaList}>
            {FAQ.map((item) => (
              <section key={item.id} aria-labelledby={item.id}>
                <h2 id={item.id} className={styles.qaQuestion}>
                  {item.question}
                </h2>
                {item.answer.map((block, i) =>
                  block.kind === 'p' ? (
                    <p key={i} className={styles.body}>
                      {block.text}
                    </p>
                  ) : (
                    <ul key={i} className={styles.list}>
                      {block.items.map((line) => (
                        <li key={line} className={styles.listItem}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </section>
            ))}
          </div>
        </div>

        <Footer variant="full" />
      </main>
    </>
  );
}
