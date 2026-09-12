import { PullQuote } from 'unbarrier-education';

/** The default: spring green rule, no attribution. This is how a Notion quote block renders. */
export const Default = () => (
  <div style={{ maxWidth: 720 }}>
    <PullQuote>
      the dashboard said every child had logged in. nobody asked whether any
      of them had read a word.
    </PullQuote>
  </div>
);

/** With a cite line. */
export const WithCite = () => (
  <div style={{ maxWidth: 720 }}>
    <PullQuote cite="a teaching assistant, year 8">
      he read the whole chapter on his phone at the back of the bus. first
      time in three years. nobody had told him he was allowed.
    </PullQuote>
  </div>
);

/** A strand colour: orchid mist for an honestly post. */
export const StrandColour = () => (
  <div style={{ maxWidth: 720 }}>
    <PullQuote color="var(--orchid-mist)" cite="Nici">
      i am dyslexic. i run an education company. most of what you read here
      was said into my phone first.
    </PullQuote>
  </div>
);

/** The remaining strand colours side by side, for the record. */
export const OtherStrands = () => (
  <div style={{ display: 'grid', gap: 8, maxWidth: 720 }}>
    <PullQuote color="var(--princeton-orange)">
      licences are not access.
    </PullQuote>
    <PullQuote color="var(--pearl-aqua)">
      it became a tuesday.
    </PullQuote>
    <PullQuote color="var(--school-bus-yellow)">
      you&rsquo;re welcome inside.
    </PullQuote>
  </div>
);
