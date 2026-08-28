import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy notice · Unbarrier',
  description:
    'Privacy notice for Unbarrier Education Ltd — what we collect, why, who else sees it, and your rights.',
};

export default function PrivacyPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.head}>
        <Wordmark size="md" href="/hello" />
        <p className={styles.eyebrow}>01 · privacy</p>
        <h1 className={styles.title}>privacy notice</h1>
        <p className={styles.meta}>Last updated: 27 July 2026 · Version 1.0</p>
      </div>

      <section className={styles.section}>
        <p>
          written in plain english, built against UK &amp; EU GDPR (articles 13
          and 14) and the ICO&rsquo;s own guidance. this is our master notice;
          the ISP assessment has a short scoped version that links back here.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>the short version</h2>
        <ul>
          <li>we are a small uk consultancy. one person and a therapy dog</li>
          <li>we collect the least we can get away with</li>
          <li>we never sell your data, and we never will</li>
          <li>
            we work to <strong>UK and EU GDPR</strong> standards, and where your
            local law gives you extra rights, we honour those too
          </li>
          <li>
            when we work inside a school,{' '}
            <strong>pupil data stays with the school</strong>. we do not take it
            away
          </li>
          <li>
            you can ask us what we hold, ask us to correct it, or ask us to
            delete it. email us and we will do it within one month
          </li>
        </ul>
        <p>detail below.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>1 · who we are</h2>
        <ul>
          <li>
            <strong>Unbarrier Education Ltd</strong>, a company registered in
            England and Wales, company number{' '}
            <strong>16603630</strong>, trading as unbarrier.me
          </li>
          <li>
            registered office:{' '}
            <strong>
              45&ndash;47 The Triangle, Malmesbury, Wiltshire, SN16 0AH
            </strong>
          </li>
          <li>
            we are the <strong>data controller</strong> for the information
            described in this notice
          </li>
          <li>
            registered with the Information Commissioner&rsquo;s Office,
            reference <strong>ZC038215</strong>
          </li>
          <li>
            contact for anything in this notice:{' '}
            <a href="mailto:privacy@unbarrier.me">privacy@unbarrier.me</a>
          </li>
          <li>
            we are not required to appoint a data protection officer, and we
            have not appointed one. Nici Foote is accountable for data
            protection
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>2 · when this notice does not apply</h2>
        <p>
          when we deliver an audit or engagement inside a school, the school
          decides what data is collected and why. in that work we act as a{' '}
          <strong>data processor</strong> for the school, under a written
          agreement.
        </p>
        <ul>
          <li>
            <strong>
              pupil and staff data in that context is covered by your
              school&rsquo;s privacy notice, not ours
            </strong>
          </li>
          <li>
            our standing design position is that identifiable pupil data stays
            inside the school&rsquo;s own systems. we work from anonymised or
            aggregated information wherever possible
          </li>
          <li>
            if you are a parent or pupil with a question about that data, your
            school is the right first contact
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>3 · what we collect, and why</h2>

        <p>
          <strong>if you visit unbarrier.me</strong>
        </p>
        <ul>
          <li>
            what: anonymised page views and referrers via Plausible Analytics
          </li>
          <li>why: to understand which pages are useful</li>
          <li>lawful basis: legitimate interests · understanding site use</li>
          <li>
            note: Plausible does not use cookies and does not track individuals
            across sites
          </li>
        </ul>

        <p>
          <strong>if you enquire or fill in a form</strong>
        </p>
        <ul>
          <li>what: name, email, organisation, and whatever you tell us</li>
          <li>why: to answer you</li>
          <li>
            lawful basis: legitimate interests · responding to an enquiry you
            started
          </li>
        </ul>

        <p>
          <strong>if you become a client or partner</strong>
        </p>
        <ul>
          <li>
            what: name, work contact details, organisation, engagement notes,
            invoicing details
          </li>
          <li>why: to deliver the work and get paid</li>
          <li>
            lawful basis: contract, and legal obligation for accounting records
          </li>
        </ul>

        <p>
          <strong>
            if you complete an assessment or survey we run for a client project
          </strong>{' '}
          (for example the ISP Learning &amp; Device Compass)
        </p>
        <ul>
          <li>
            what: your name, email, role, organisation or region, and your
            answers
          </li>
          <li>
            why: to deliver that project for the client who commissioned it, and
            to send you your own results
          </li>
          <li>
            lawful basis: legitimate interests · delivering the client
            engagement
          </li>
          <li>
            note: these are professional responses from staff and leaders — we
            do not collect pupil data through these tools, and please don&rsquo;t
            enter special-category data in the free-text boxes
          </li>
        </ul>

        <p>
          <strong>if you join loopbreakers coaching or the community</strong>
        </p>
        <ul>
          <li>
            what: name, contact details, session notes, anything you choose to
            share in a session
          </li>
          <li>why: to coach you well and keep continuity between sessions</li>
          <li>lawful basis: contract</li>
          <li>
            coaching notes may include information about health, neurodivergence,
            or wellbeing. that is special category data. we rely on your{' '}
            <strong>explicit consent</strong> (article 9(2)(a)) and you can
            withdraw it at any time
          </li>
        </ul>

        <p>
          <strong>if you subscribe to the newsletter</strong>
        </p>
        <ul>
          <li>what: name and email</li>
          <li>why: to send you writing you asked for</li>
          <li>
            lawful basis: consent · withdrawable in one click from any email
          </li>
        </ul>

        <p>
          <strong>if you book a session</strong>
        </p>
        <ul>
          <li>what: name, email, chosen time, anything in the booking notes</li>
          <li>why: to hold the appointment</li>
          <li>lawful basis: contract or legitimate interests</li>
        </ul>

        <p>
          <strong>if you are a supplier or contact</strong>
        </p>
        <ul>
          <li>what: business contact details</li>
          <li>why: to work with you</li>
          <li>lawful basis: legitimate interests</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>4 · where we get it</h2>
        <p>almost always directly from you. occasionally from:</p>
        <ul>
          <li>a colleague or partner organisation who introduces us</li>
          <li>a school or client that books us on your behalf</li>
          <li>
            publicly available business sources such as a school website
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>5 · who else sees it</h2>
        <p>
          we use these services to run the business. each one is contracted, and
          each acts only on our instructions:
        </p>
        <ul>
          <li>
            <strong>Google Workspace</strong> · email, calendar, files
          </li>
          <li>
            <strong>Notion</strong> · notes and project records
          </li>
          <li>
            <strong>Xero</strong> · invoicing and accounts
          </li>
          <li>
            <strong>Stripe</strong> · payments · we never see your full card
            details
          </li>
          <li>
            <strong>MailerLite</strong> · newsletter
          </li>
          <li>
            <strong>Vercel</strong> · website hosting, and the database behind
            our assessment tools
          </li>
          <li>
            <strong>Resend</strong> · transactional email
          </li>
          <li>
            <strong>Plausible</strong> · anonymised analytics
          </li>
          <li>
            <strong>Plaud</strong> (uk.plaud.ai) · meeting recording and
            transcription, where a meeting is recorded with everyone&rsquo;s
            agreement
          </li>
          <li>
            <strong>WhatsApp</strong> · optional messaging and community groups ·
            you join voluntarily
          </li>
        </ul>
        <p>
          we also share with our accountant, and with HMRC or other authorities
          where the law requires it.
        </p>
        <p>
          <strong>
            we do not sell your data, and we do not share it for anyone
            else&rsquo;s marketing.
          </strong>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>
          6 · international transfers, and which law applies
        </h2>
        <p>
          we work to <strong>UK and EU GDPR</strong> standards. some of the
          services above store data outside the uk. where that happens we rely
          on:
        </p>
        <ul>
          <li>
            <strong>uk adequacy regulations</strong>, where the country has
            them, or
          </li>
          <li>
            the <strong>uk International Data Transfer Agreement</strong>, or the
            uk addendum to the eu standard contractual clauses
          </li>
        </ul>
        <p>
          if you&rsquo;re in a country with its own data protection law — for
          example the EU, Brazil, the UAE or India — that law may give you
          additional rights.{' '}
          <strong>contact us and we&rsquo;ll honour them.</strong>
        </p>
        <p>
          for work with international schools, our position is that{' '}
          <strong>data stays in the country it was collected in</strong> unless
          there is a written agreement saying otherwise.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>7 · how long we keep it</h2>
        <ul>
          <li>
            <strong>enquiries that go nowhere</strong>: 12 months
          </li>
          <li>
            <strong>client and engagement records</strong> (including responses
            to client assessment/survey tools): 6 years after the engagement
            ends, to match accounting and insurance requirements
          </li>
          <li>
            <strong>coaching notes</strong>: kept for the length of the coaching
            relationship plus 3 years after the last session, then securely
            deleted
          </li>
          <li>
            <strong>accounting records</strong>: 6 years plus the current year ·
            legal requirement
          </li>
          <li>
            <strong>newsletter</strong>: until you unsubscribe
          </li>
          <li>
            <strong>analytics</strong>: anonymised, so not tied to you at all
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>8 · how we keep it safe</h2>
        <ul>
          <li>multi-factor authentication on every business account</li>
          <li>encrypted devices, kept up to date</li>
          <li>access limited to the one person who runs the business</li>
          <li>suppliers chosen partly on their own security position</li>
          <li>
            a written breach procedure, and a duty to tell the ICO within 72
            hours where there is a risk to you
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>9 · your rights</h2>
        <p>you can ask us to:</p>
        <ul>
          <li>
            <strong>tell you</strong> what we hold about you
          </li>
          <li>
            <strong>correct</strong> anything wrong
          </li>
          <li>
            <strong>delete</strong> it
          </li>
          <li>
            <strong>restrict</strong> what we do with it
          </li>
          <li>
            <strong>hand it over</strong> in a portable format
          </li>
          <li>
            <strong>stop</strong> processing it, where we rely on legitimate
            interests
          </li>
          <li>
            <strong>withdraw consent</strong>, where we rely on consent · this
            does not undo what we did before you withdrew it
          </li>
        </ul>
        <p>
          email <a href="mailto:privacy@unbarrier.me">privacy@unbarrier.me</a>.
          we will respond <strong>within one month</strong>. it is free.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>10 · automated decisions</h2>
        <p>
          we do not make automated decisions about you, and we do not profile
          you. where a tool of ours shows a score or a recommendation, that is a
          guide for a human conversation — not a decision made about you by a
          machine.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>11 · cookies</h2>
        <p>
          this site sets <strong>no non-essential cookies</strong>. we use
          Plausible for analytics, which is cookie-free and does not identify you
          — so there is no cookie banner, because there is nothing to consent to.
        </p>
        <p>
          when you click &ldquo;book&rdquo; or &ldquo;pay&rdquo; and are taken to
          Stripe&rsquo;s checkout, Stripe sets its own cookies for payment
          security on <code>stripe.com</code> — not on unbarrier.me. you can
          block, clear or manage cookies in your browser settings.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>12 · children</h2>
        <p>
          our services are sold to adults and to organisations. we do not
          knowingly collect data directly from children through this website.
          where we encounter pupil data, we do so as a processor for a school, as
          described in section 2.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>13 · complaints</h2>
        <p>
          come to us first — we&rsquo;d rather fix it. but you have the right to
          complain directly to the regulator:
        </p>
        <ul>
          <li>
            <strong>Information Commissioner&rsquo;s Office</strong>
          </li>
          <li>Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
          <li>
            <strong>0303 123 1113</strong> ·{' '}
            <a
              href="https://ico.org.uk/make-a-complaint"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk/make-a-complaint
            </a>
          </li>
        </ul>
        <p>
          if you are in the EU or another country, you can also complain to your
          local data protection authority.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h3}>14 · changes</h2>
        <p>
          we will update this notice when what we do changes. the version and
          date at the top always tell you which one you are reading.
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
