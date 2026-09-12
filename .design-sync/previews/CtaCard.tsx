import { CtaCard } from 'unbarrier-education';

/** A linked card, as /hello lists the question sets. Tinted initial tile. */
export const Linked = () => (
  <div style={{ maxWidth: 560 }}>
    <CtaCard
      card="the_seven_questions"
      title="the seven questions"
      meta="the instrument, on one page. take it into your next planning meeting."
      href="/the-takeaway.html"
      external={false}
    />
  </div>
);

/** The accent order is locked: green, pink, aqua, orange, yellow, pink mist. */
export const AccentLadder = () => (
  <div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
    <CtaCard card="seven_questions" title="the seven questions" meta="the instrument, on one page." href="/the-takeaway.html" external={false} />
    <CtaCard card="belonging_check" title="the belonging check" meta="ten minutes with a class you already teach." href="/belonging-check" external={false} />
    <CtaCard card="receipts" title="the receipts" meta="what the evidence actually says, with sources." href="/the-receipts.html" external={false} />
    <CtaCard card="one_read" title="one read" meta="the one thing to read before you buy anything." href="/the-takeaway.html" external={false} />
    <CtaCard card="conversation" title="a conversation" meta="forty-five minutes, no pitch." href="https://calendar.app.google/WEZqBDRFhPFzsqUw5" />
    <CtaCard card="three_questions" title="three questions" meta="ask these before you sign the order." href="/three-questions.html" external={false} />
  </div>
);

/** A dated session card with no destination yet: a static panel, no arrow. */
export const DatedPanel = () => (
  <div style={{ maxWidth: 560 }}>
    <CtaCard
      card="inclusion_beyond_send"
      title="Inclusion Beyond SEND"
      meta="Prompting for inclusion — getting more out of the AI you already have."
      detail="University of Surrey, Guildford · Thursday 17 September 2026"
      accent="var(--spring-green)"
      accentRgb="56, 255, 153"
      initial="I"
    />
  </div>
);

/** A Notion-driven card passing its own accent. */
export const CustomAccent = () => (
  <div style={{ maxWidth: 560 }}>
    <CtaCard
      card="goodnotes_training"
      title="goodnotes for schools"
      meta="the training one-pager from today's session."
      href="/goodnotes-training.html"
      external={false}
      accent="var(--school-bus-yellow)"
      accentRgb="255, 194, 3"
    />
  </div>
);
