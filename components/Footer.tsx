import Link from 'next/link';
import { ContrastToggle } from './ContrastToggle';
import { Wordmark } from './Wordmark';
import styles from './Footer.module.css';

type Variant = 'simple' | 'full';

type Props = {
  variant?: Variant;
};

// .voice and .access have shipped as live routes; .audit still anchors
// to /#services until that page lands in Phase 3.
const FOOTER_LINK_GROUPS = [
  {
    heading: 'Services',
    links: [
      { label: 'unbarrier.audit', href: '/#services' },
      { label: 'unbarrier.access', href: '/access' },
      { label: 'unbarrier.voice', href: '/voice' },
      { label: 'Notes from Nici (blog)', href: '/blog' },
    ],
  },
  {
    heading: 'Get in touch',
    links: [
      { label: 'Hello →', href: '/hello' },
      { label: 'nici@unbarrier.me', href: 'mailto:nici@unbarrier.me' },
      { label: 'Loop Breakers →', href: '/loop-breakers' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/legal/privacy' },
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
            privacy
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
          <Wordmark size="lg" />
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
