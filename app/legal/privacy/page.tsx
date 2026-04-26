import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy · Unbarrier',
  description:
    'Privacy policy and cookie statement for Unbarrier Education Ltd.',
};

export default function PrivacyPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.head}>
        <Wordmark size="md" href="/hello" />
        <p className={styles.eyebrow}>01 · privacy</p>
        <h1 className={styles.title}>privacy policy</h1>
        <p className={styles.meta}>Last updated: 24 April 2026 · Version 2.0</p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.h3}>our approach</h2>
        <p>
          unbarrier.me is designed to reduce friction, not create it &mdash;
          including when it comes to your data. we collect only what we need,
          use it with care, name every tool we pass it to, and never sell it.
          if you want the short version: one email if you subscribe, card
          details if you pay (handled by Stripe, we never see them), and
          anonymous page counts so we know which posts get read.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>who we are</h2>
        <p>
          the data controller is{' '}
          <strong>Unbarrier Education Ltd</strong> (Company No.&nbsp;16603630),
          trading as Unbarrier.Me, registered in England and Wales. registered
          office: 45&ndash;47 The Triangle, Malmesbury, Wiltshire, SN16 0AH.
          contact:{' '}
          <a href="mailto:nici@unbarrier.me">nici@unbarrier.me</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>what we collect and why</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>What</th>
                <th>When</th>
                <th>Why (lawful basis)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Email address</td>
                <td>You subscribe to the newsletter</td>
                <td>Consent (UK GDPR Art. 6(1)(a))</td>
              </tr>
              <tr>
                <td>Name &amp; email</td>
                <td>You book a session</td>
                <td>Contract (Art. 6(1)(b))</td>
              </tr>
              <tr>
                <td>Payment info</td>
                <td>You pay for a session</td>
                <td>
                  Contract &mdash; handled by Stripe, we never see card numbers
                </td>
              </tr>
              <tr>
                <td>Message content</td>
                <td>You email us directly</td>
                <td>Legitimate interest &mdash; replying to you</td>
              </tr>
              <tr>
                <td>Page-visit counts (anonymous)</td>
                <td>You visit the site</td>
                <td>Legitimate interest &mdash; improving the site</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          we do not collect sensitive personal data. we do not profile or
          advertise to you. we do not make automated decisions about you.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>the tools we use (our processors)</h2>
        <p>
          we pass specific bits of your data to these services so the site and
          business can work. each has its own privacy policy:
        </p>
        <ul>
          <li>
            <strong>MailerLite</strong> &mdash; newsletter delivery. Stores
            your email and subscription source. US-hosted under Standard
            Contractual Clauses.
          </li>
          <li>
            <strong>Stripe</strong> &mdash; payments. Handles card details
            entirely on their systems.
          </li>
          <li>
            <strong>Google Workspace</strong> &mdash; email
            (nici@unbarrier.me), calendar, bookings (Appointment Schedule),
            video (Meet). EU region where possible.
          </li>
          <li>
            <strong>Plausible Analytics</strong> &mdash; anonymous page-visit
            counts. Cookie-free, EU-hosted.
          </li>
          <li>
            <strong>Vercel</strong> &mdash; site hosting. Serves pages, logs
            basic request info.
          </li>
          <li>
            <strong>Xero</strong> &mdash; accounting. Holds invoice records as
            required by HMRC.
          </li>
          <li>
            <strong>WhatsApp</strong> &mdash; optional community group for
            Loop Breakers cohorts. You join voluntarily.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>how long we keep it</h2>
        <ul>
          <li>
            <strong>Newsletter</strong> &mdash; until you unsubscribe, then
            deleted within 30 days.
          </li>
          <li>
            <strong>Session bookings &amp; invoices</strong> &mdash; 6 years
            (HMRC requirement).
          </li>
          <li>
            <strong>Direct emails</strong> &mdash; 2 years, then deleted unless
            part of an ongoing relationship.
          </li>
          <li>
            <strong>Analytics</strong> &mdash; anonymous; no individual
            retention.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>your rights</h2>
        <p>
          under UK GDPR you can: access the data we hold about you, ask us to
          correct it, ask us to delete it, withdraw consent, or complain to
          the{' '}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ICO
          </a>
          . email{' '}
          <a href="mailto:nici@unbarrier.me">nici@unbarrier.me</a> &mdash;
          we&rsquo;ll respond within 30 days.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>children</h2>
        <p>
          this service is for adults. we don&rsquo;t knowingly collect data
          from anyone under 16. if a child has submitted data, email us and
          we&rsquo;ll delete it.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>cookies &amp; tracking</h2>
        <p>
          this site sets <strong>no tracking cookies</strong>. we use
          Plausible for analytics, which doesn&rsquo;t use cookies or collect
          personal data. you don&rsquo;t need to click a banner. there
          isn&rsquo;t one.
        </p>
        <p>
          when you click &ldquo;book&rdquo; and are taken to Stripe&rsquo;s
          checkout, Stripe sets its own cookies for payment security on{' '}
          <code>stripe.com</code> &mdash; not on unbarrier.me. you can block,
          clear, or manage cookies in your browser settings;{' '}
          <a
            href="https://www.aboutcookies.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutcookies.org
          </a>{' '}
          has step-by-step guides.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>changes</h2>
        <p>
          when this policy changes meaningfully, we&rsquo;ll update the date
          at the top and &mdash; if you&rsquo;re on the newsletter &mdash;
          mention it in the next letter.
        </p>
      </section>

      <p className={styles.back}>
        <Link href="/hello" className={styles.backLink}>
          &larr; back to /hello
        </Link>
      </p>
    </main>
  );
}
