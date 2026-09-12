import { NewsletterBand } from 'unbarrier-education';

/** `full` weight — /hello, /blog, a post: the reader has just been given something free, so the decorative notice banner rides above the heading. */
export const Full = () => <NewsletterBand route="/hello" weight="full" />;

/** `standard` weight — the default for offer pages (/, /audit, /access). No banner: it must not outweigh the page's own call to action. */
export const Standard = () => <NewsletterBand route="/audit" weight="standard" />;
