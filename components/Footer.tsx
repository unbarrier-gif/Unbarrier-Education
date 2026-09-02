import Link from 'next/link';
import { ContrastToggle } from './ContrastToggle';
import { StraplineLockup } from './Lockup';
import styles from './Footer.module.css';

type Variant = 'simple' | 'full';

type Props = {
  variant?: Variant;
};

// D45 (10 May 2026): footer strand links updated to the dedicated routes.
// `unbarrier.audit` was removed entirely until the route shipped, because a
// broken footer link compounds per page view — the footer is global. The route
// is /audit (singular, not the /audits the old note guessed at) and it now
// exists, so the link is back in the Services group below.
//
// ⛔ `unbarrier.voice` REMOVED and must stay removed until legal signs off the
// retention period and the two-purpose privacy notice. The footer is global,
// so one entry here linked the unpublished route from every page on the site.
// See app/voice/page.tsx.
// 28 Aug 2026: `unbarrier.loop-breakers` removed from Services — the strand
// is retired and /loop-breakers is now a holding page. The route stays live
// and indexable so existing bookmarks don't 404; it just isn't advertised
// as a current service in the global footer any more.
const FOOTER_LINK_GROUPS = [
  {
    heading: 'Services',
    links: [
      { label: 'unbarrier.audit', href: '/audit' },
      { label: 'unbarrier.access', href: '/access' },
      { label: 'For EdTech companies', href: '/edtech' },
      { label: 'Notes from Nici (blog)', href: '/blog' },
    ],
  },
  {
    heading: 'Get in touch',
    links: [
      { label: 'About Nici', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Hello →', href: '/hello' },
      { label: 'nici@unbarrier.me', href: 'mailto:nici@unbarrier.me' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy notice', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
    ],
  },
] as const;

export function Footer({ variant = 'simple' }: Props) {
  if (variant === 'full') {
    return <FullFooter />;
  }
  return <SimpleFooter />;
}

function SimpleFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.line}>
          unbarrier.me &middot; Unbarrier Education Ltd &middot; Registered in
          England &amp; Wales (Co.&nbsp;No.&nbsp;16603630)
        </p>
        <p className={styles.links}>
          <Link href="/legal/privacy" className={styles.link}>
            privacy notice
          </Link>
          <span aria-hidden="true" className={styles.dot}>&middot;</span>
          <Link href="/legal/terms" className={styles.link}>
            terms
          </Link>
          <span aria-hidden="true" className={styles.dot}>&middot;</span>
          <span className={styles.copyright}>&copy; 2026</span>
        </p>
      </div>
    </footer>
  );
}

function FullFooter() {
  return (
    <footer className={styles.fullFooter}>
      <div className={styles.fullGrid}>
        <div className={styles.brandCol}>
          {/* The full lockup — mark, wordmark, "did it reach the child?" —
              and this is the one place on the site it belongs. Inlined; sized
              in Footer.module.css to the column, never wider than it. */}
          <StraplineLockup className={styles.lockup} />
          <p className={styles.tagline}>
            Removing barriers to learning and access — for schools, families,
            and the neurodivergent community.
          </p>
        </div>
        {FOOTER_LINK_GROUPS.map((group) => (
          <div key={group.heading} className={styles.linkCol}>
            <p className={styles.colHeading}>{group.heading}</p>
            <ul className={styles.colList}>
              {group.links.map((link) => (
                <li key={link.label} className={styles.colItem}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.fullBottom}>
        <p className={styles.bottomLine}>
          &copy; 2026 Nici Foote / unbarrier.me · Unbarrier Education Ltd ·
          Co.&nbsp;No.&nbsp;16603630
        </p>
        <div className={styles.bottomRow}>
          <ContrastToggle variant="footer" />
          <p className={styles.bottomLine}>Built with inclusion first.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const isExternalHttp = href.startsWith('http');
  const isMailto = href.startsWith('mailto:');

  if (isExternalHttp || isMailto) {
    return (
      <a
        href={href}
        className={styles.colLink}
        {...(isExternalHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={styles.colLink}>
      {label}
    </Link>
  );
}
