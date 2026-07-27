import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy notice · ISP Learning & Device Compass',
};

// Scoped, respondent-facing privacy notice for the ISP Compass assessment.
// The full company-wide notice lives at /legal/privacy and is linked at the
// foot of this page — this short version covers only the assessment and the
// phase-two engagement it belongs to.
export default function IspAuditPrivacyPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Privacy notice</h1>
        <p className={styles.lede}>
          What we hold for ISP&rsquo;s phase-two work, why, and how to ask us to
          change or delete it.
        </p>
        <div className={styles.chips}>
          <span className={styles.chip}>plain english</span>
          <span className={styles.chip}>UK &amp; EU GDPR</span>
          <span className={styles.chip}>🔒 we never sell your data</span>
        </div>
      </div>

      <div className={styles.card}>
        <h2>Our approach</h2>
        <p>
          We collect only what this assessment and the wider ISP review need,
          name every tool we pass it to, and never sell it. You can ask us to
          see, correct or delete your data at any time.
        </p>
      </div>

      <div className={styles.card}>
        <h2>Who we are</h2>
        <p>
          <strong>Unbarrier Education Ltd</strong> (Company No. 16603630),
          trading as Unbarrier.Me, registered in England and Wales. Registered
          office: 45&ndash;47 The Triangle, Malmesbury, Wiltshire, SN16 0AH.
          Registered with the ICO, reference <strong>ZC038215</strong>. Contact:{' '}
          <a href="mailto:privacy@unbarrier.me">privacy@unbarrier.me</a>.
        </p>
        <p className={styles.note}>
          We are the data controller for this work, carried out for
          International Schools Partnership.
        </p>
      </div>

      <div className={styles.card}>
        <h2>What this notice covers</h2>
        <p>
          Two kinds of information we hold for ISP&rsquo;s phase-two planning:
        </p>
        <ol>
          <li>your answers to this online assessment</li>
          <li>
            recordings, transcripts and notes from ISP meetings and workshops we
            take part in
          </li>
        </ol>
      </div>

      <div className={styles.card}>
        <h2>What we collect &amp; why</h2>
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
                <td>Your name and role</td>
                <td>You complete the assessment</td>
                <td>
                  Legitimate interest — running ISP&rsquo;s phase-two review
                </td>
              </tr>
              <tr>
                <td>School or region</td>
                <td>You complete the assessment</td>
                <td>Legitimate interest — same</td>
              </tr>
              <tr>
                <td>Your ratings, answers and any notes you add</td>
                <td>You complete the assessment</td>
                <td>Legitimate interest — same</td>
              </tr>
              <tr>
                <td>Device platform and catalogue preferences</td>
                <td>You complete the assessment</td>
                <td>Legitimate interest — same</td>
              </tr>
              <tr>
                <td>Your email address</td>
                <td>You complete the assessment</td>
                <td>
                  Legitimate interest — sending your results and following up
                </td>
              </tr>
              <tr>
                <td>Meeting and workshop recordings and transcripts</td>
                <td>When you attend a meeting we record, with your knowledge</td>
                <td>Consent / legitimate interest</td>
              </tr>
              <tr>
                <td>Notes we take in meetings</td>
                <td>During the engagement</td>
                <td>Legitimate interest — planning the review</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.note}>
          We do not collect special-category (sensitive) data through the
          assessment — please don&rsquo;t enter it in the free-text boxes.
        </p>
      </div>

      <div className={styles.card}>
        <h2>Who sees it</h2>
        <p>
          Your individual answers are visible only to you and ISP&rsquo;s
          phase-two planning team. Everything is combined into an estate-wide
          picture — no school is singled out publicly.
        </p>
        <p>
          We pass specific data to these tools so the work can run. Each has its
          own privacy terms and a data processing agreement:
        </p>
        <ul>
          <li>
            <strong>Vercel / Neon</strong> — secure hosting and database for
            assessment responses
          </li>
          <li>
            <strong>Plaud</strong> (uk.plaud.ai) — meeting recording and
            transcription
          </li>
          <li>
            <strong>Notion</strong> — project notes and storage
          </li>
          <li>
            <strong>Google Workspace</strong> — email and files
          </li>
          <li>
            <strong>Plausible</strong> — anonymised, cookie-free website
            analytics (no individual tracking)
          </li>
        </ul>
      </div>

      <div className={styles.card}>
        <h2>Where your data is held</h2>
        <p>
          ISP schools are in many countries, so responses may be submitted from
          outside the UK. We are a UK controller; assessment responses are
          stored with our hosting provider (Vercel / Neon). Where data leaves
          the UK or EEA, transfers are covered by the UK IDTA or Standard
          Contractual Clauses.
        </p>
        <p>
          If you&rsquo;re in a country with its own data protection law — for
          example the EU, Brazil, the UAE or India — that law may give you
          additional rights. Contact us and we&rsquo;ll honour them.
        </p>
      </div>

      <div className={styles.card}>
        <h2>How long we keep it</h2>
        <p>
          For the length of ISP&rsquo;s phase-two engagement and up to{' '}
          <strong>6 years</strong> after it ends, to match our accounting and
          insurance requirements, unless you ask us to delete it sooner. Test
          and sample entries are deleted as soon as they&rsquo;re no longer
          needed.
        </p>
      </div>

      <div className={styles.card}>
        <h2>Your rights</h2>
        <p>
          You can ask us to show you a copy of your data, correct it, delete it,
          or stop using it. Email{' '}
          <a href="mailto:privacy@unbarrier.me">privacy@unbarrier.me</a> and
          we&rsquo;ll action it. It&rsquo;s free, and we&rsquo;ll respond within
          one month.
        </p>
      </div>

      <div className={styles.card}>
        <h2>Automated decisions</h2>
        <p>
          We do not make automated decisions about you, and we do not profile
          you. The recommendation you see is a guide for the planning
          conversation, not a decision made about you.
        </p>
      </div>

      <div className={styles.card}>
        <h2>Complaints</h2>
        <p>
          Come to us first — we&rsquo;d rather fix it. But you have the right to
          complain directly to the regulator:
        </p>
        <p>
          <strong>Information Commissioner&rsquo;s Office</strong>
          <br />
          Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF
          <br />
          0303 123 1113 ·{' '}
          <a
            href="https://ico.org.uk/make-a-complaint"
            target="_blank"
            rel="noopener noreferrer"
          >
            ico.org.uk/make-a-complaint
          </a>
        </p>
      </div>

      <div className={`${styles.card} ${styles.fullLink}`}>
        <p>
          <strong>This is the short version, for the assessment.</strong> Our
          full privacy notice — covering everything Unbarrier does — lives at{' '}
          <Link href="/legal/privacy">unbarrier.me/legal/privacy</Link>.
        </p>
      </div>

      <p className={styles.backRow}>
        <Link href="/isp-audit" className={styles.backLink}>
          &larr; back to the assessment
        </Link>
      </p>
    </main>
  );
}
