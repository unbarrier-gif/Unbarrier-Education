import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms · Unbarrier',
  description: 'Terms of service for Unbarrier Education Ltd.',
};

export default function TermsPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.head}>
        <Wordmark size="md" href="/hello" />
        <p className={styles.eyebrowYellow}>03 · terms</p>
        <h1 className={styles.title}>terms of service</h1>
        <p className={styles.meta}>Last updated: 24 April 2026 · Version 1.0</p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.h3}>the deal, short version</h2>
        <p>
          if you book a session, you&rsquo;re agreeing to these terms.
          they&rsquo;re plain-English on purpose. if anything here is unclear,
          email{' '}
          <a href="mailto:nici@unbarrier.me">nici@unbarrier.me</a> before
          booking &mdash; not after.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>who we are</h2>
        <p>
          <strong>Unbarrier Education Ltd</strong> (Company
          No.&nbsp;16603630), trading as Unbarrier.Me. registered office:
          45&ndash;47 The Triangle, Malmesbury, Wiltshire, SN16 0AH. contact:{' '}
          <a href="mailto:nici@unbarrier.me">nici@unbarrier.me</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>what we offer</h2>
        <ul>
          <li>
            <strong>Loop Breakers sessions</strong> &mdash; small-group or 1:1
            coaching, 90-minute format, delivered via Google Meet.
          </li>
          <li>
            <strong>Unbarrier services</strong> &mdash; audit, access, and
            voice consultancy packages described on the site.
          </li>
          <li>
            <strong>Writing &amp; community</strong> &mdash; free newsletter,
            blog posts, WhatsApp cohort spaces.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>booking &amp; payment</h2>
        <ul>
          <li>
            you book via TidyCal. prices are shown at the point of booking.
          </li>
          <li>
            payment is taken via Stripe at booking, unless otherwise agreed.
          </li>
          <li>invoices for services are issued separately via Xero.</li>
          <li>
            all prices are in GBP unless stated. we are not VAT-registered at
            the time of writing.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>cancellation, rescheduling, refunds</h2>
        <ul>
          <li>
            <strong>48+ hours before</strong> &mdash; full refund, or
            reschedule free. email us.
          </li>
          <li>
            <strong>24&ndash;48 hours before</strong> &mdash; 50% refund, or
            reschedule with no fee.
          </li>
          <li>
            <strong>Less than 24 hours</strong> &mdash; no refund, but
            we&rsquo;ll reschedule once as a goodwill gesture where possible.
          </li>
          <li>
            <strong>No-show</strong> &mdash; no refund. we&rsquo;ll still
            reach out to check you&rsquo;re ok.
          </li>
          <li>
            <strong>If we cancel</strong> &mdash; full refund or reschedule,
            your choice.
          </li>
        </ul>
        <p>
          neurodivergent reality check: if you&rsquo;re mid-meltdown,
          mid-crisis, or genuinely can&rsquo;t make it for reasons outside
          your control, email us. we&rsquo;re human and we read context.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>what sessions are, and aren&rsquo;t</h2>
        <ul>
          <li>
            coaching and consultancy sessions are{' '}
            <strong>not therapy</strong> and{' '}
            <strong>not clinical advice</strong>. if you need mental-health
            support, see your GP, a registered therapist, or the{' '}
            <a
              href="https://www.samaritans.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Samaritans
            </a>{' '}
            (call 116 123 any time).
          </li>
          <li>
            educational consultancy is not a substitute for statutory SEND
            assessment or legal advice.
          </li>
          <li>
            we don&rsquo;t guarantee specific outcomes &mdash; coaching
            supports your work, it doesn&rsquo;t do it for you.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>intellectual property</h2>
        <ul>
          <li>
            worksheets, templates, written materials and recordings we
            provide remain our copyright. you may use them personally; please
            don&rsquo;t republish or resell without permission.
          </li>
          <li>anything you create using our tools is yours.</li>
          <li>
            testimonials you give us may be quoted (with your name or
            anonymously &mdash; your choice) on the site and in marketing.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>confidentiality &amp; safeguarding</h2>
        <ul>
          <li>
            what&rsquo;s shared in sessions stays in sessions. we don&rsquo;t
            share your content with other clients.
          </li>
          <li>
            exception: if we believe you or someone else is at serious risk,
            we may break confidentiality to get appropriate support.
            we&rsquo;ll tell you if we do.
          </li>
          <li>
            group sessions: we ask all participants to respect the same
            principle. we can&rsquo;t guarantee other participants&rsquo;
            behaviour &mdash; but we will address it.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>accessibility</h2>
        <p>
          we build the site to WCAG 2.2 AA. sessions can be adjusted for
          sensory, cognitive, or access needs &mdash; just tell us what
          works.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>limitation of liability</h2>
        <p>
          we take care in what we do, but we&rsquo;re a microbusiness and our
          liability is limited. we&rsquo;re not liable for: indirect or
          consequential losses, loss of profits, or things outside our
          reasonable control. nothing in these terms limits our liability for
          death, personal injury caused by negligence, or fraud &mdash;
          things the law doesn&rsquo;t let us limit.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>governing law</h2>
        <p>
          these terms are governed by the laws of England and Wales. disputes
          will be resolved in the courts of England and Wales. before going
          to court, let&rsquo;s talk &mdash; email first, we mean it.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>changes</h2>
        <p>
          we may update these terms. if they change materially, we&rsquo;ll
          notify existing clients by email and update the date above.
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
