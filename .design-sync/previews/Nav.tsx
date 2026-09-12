import { Nav } from 'unbarrier-education';

/** The site nav as it sits on the home page: wordmark, the six links, contrast, the Email Nici pill. It is position: fixed. */
export const Default = () => <Nav />;

/** On /audit the audit link is the current page (aria-current), with its pearl-aqua dot. */
export const AuditActive = () => <Nav active="audit" />;
