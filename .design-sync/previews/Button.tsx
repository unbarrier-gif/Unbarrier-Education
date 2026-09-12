import { Button } from 'unbarrier-education';

const BOOKING_URL = 'https://calendar.app.google/WEZqBDRFhPFzsqUw5';

/** The primary button as the home page closes on it. */
export const Primary = () => (
  <Button href={BOOKING_URL} color="var(--spring-green)" external>
    book a discovery call →
  </Button>
);

/** A strand page's primary takes its strand colour. Text stays amethyst. */
export const StrandColours = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    <Button href="/readiness-check" color="var(--pearl-aqua)">
      take the free readiness check →
    </Button>
    <Button href={BOOKING_URL} color="var(--princeton-orange)" external>
      book a discovery call →
    </Button>
    <Button href={BOOKING_URL} color="var(--orchid-mist)" external>
      book a discovery call →
    </Button>
  </div>
);

/** The ghost button: the secondary action beside a primary. */
export const Ghost = () => (
  <Button href="/faq" variant="ghost">
    questions before you get in touch? → the faq
  </Button>
);

/** The closing pair every page ends on: one primary, one ghost. */
export const ClosingPair = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    <Button href={BOOKING_URL} color="var(--spring-green)" external>
      book a discovery call →
    </Button>
    <Button href="/faq" variant="ghost">
      questions before you get in touch? → the faq
    </Button>
  </div>
);
