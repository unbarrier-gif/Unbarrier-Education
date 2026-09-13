import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { Section } from '@/components/Section';
import { TodayBlock } from '@/components/TodayBlock';
import AdminLoginForm from '@/components/isp-audit/AdminLoginForm';
import { isAdminAuthed } from '@/lib/isp-audit/adminAuth';
import { HELLO_NOTION_URL, getHelloLinks, getTodayRows, isTodayGroup } from '@/lib/hello-links';
import { HELLO_SHELF, type ShelfStatus } from '@/lib/hello-shelf';
import { DEFAULT_TODAY_HEADING, fallbackTodayLinks } from '../today-fallback';
import { TodayEditor } from './TodayEditor';
import ia from '@/app/isp-audit/layout.module.css';
import styles from './page.module.css';

// /hello/admin — the two non-public states of the stage page (13 Sep 2026).
//
//   login      the light gate: the isp-audit layout's tokens wrapping the
//              existing AdminLoginForm. It POSTs to /api/isp-audit/login (the
//              existing auth: one passcode, Nici's), then refreshes into the
//              signed-in state. /hello/sign-out clears the cookie and comes
//              back here.
//   signed in  edit today's heading, reorder today's links, see the standing
//              shelf with its status pills. Heading + order persist to the
//              Notion "hello links" table (the source of truth).
//
// Never indexed; never linked from the public page.

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'hello — signed in | unbarrier.me',
  robots: { index: false, follow: false },
};

const PILL: Record<ShelfStatus, string> = {
  live: 'var(--spring-green)',
  'live · revamp pending': 'var(--school-bus-yellow)',
  'held for blog': 'var(--princeton-orange)',
  'live · url to confirm': 'var(--school-bus-yellow)',
};

export default async function HelloAdminPage() {
  if (!isAdminAuthed()) {
    return (
      <>
        <Nav />
        <div className={`${ia.root} ${styles.gate}`}>
          <main className={styles.gateMain}>
            <AdminLoginForm />
            <p className={styles.gateNote}>
              the same passcode as the dashboard. sign in to edit what /hello
              shows today.
            </p>
          </main>
        </div>
      </>
    );
  }

  const links = await getHelloLinks();
  const todayRows = (await getTodayRows()) ?? [];
  const todayLinks = links?.filter((l) => isTodayGroup(l.group)) ?? [];
  const heading = todayRows[0]?.meta || DEFAULT_TODAY_HEADING;
  const liveCount = HELLO_SHELF.filter((i) => i.live).length;

  return (
    <>
      <Nav />
      <main className={styles.main}>
        {/* e-admin — hero */}
        <div id="e-admin" className={styles.hero}>
          <Glow color="var(--orchid-mist)" left="60%" top="-10%" size={480} opacity={0.1} />
          <header className={styles.heroInner}>
            <Eyebrow color="var(--orchid-mist)">signed in · nici</Eyebrow>
            <h1 className={styles.heading}>what /hello shows right now.</h1>
            <p className={styles.lede}>
              the rows ticked <em>today</em> in notion → hello links land in
              this block. everything else sits on the standing shelf below it.
            </p>
          </header>
        </div>

        <div id="e-admin-today" className={styles.todayWrap}>
          <div className={styles.todayInner}>
            <TodayBlock
              heading={heading}
              links={todayLinks.length > 0 ? todayLinks : fallbackTodayLinks()}
            />
            <TodayEditor heading={heading} rows={todayRows} canPersist={links !== null} />
            <div className={styles.ctaRow}>
              <Button href={HELLO_NOTION_URL} color="var(--orchid-mist)" external>
                edit today&rsquo;s links in notion →
              </Button>
              <Button href="/hello" variant="ghost">
                view as a visitor
              </Button>
              <Button href="/hello/sign-out" variant="ghost" external>
                sign out
              </Button>
            </div>
          </div>
        </div>

        {/* e-admin-shelf */}
        <Section id="e-admin-shelf" measure="route" ground="second" labelledBy="admin-shelf">
          <h2 id="admin-shelf" className={styles.sectionHeading}>
            the standing shelf.
          </h2>
          <p className={styles.sectionLine}>
            {liveCount} of {HELLO_SHELF.length} cards live. the held ones stay
            here with their status until nici decides in notion.
          </p>
          <ul className={styles.shelf}>
            {HELLO_SHELF.map((item) => (
              <li key={item.card} className={styles.shelfRow}>
                <span className={styles.shelfTitle}>{item.title}</span>
                <span className={styles.shelfStatus} style={{ color: PILL[item.status] }}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </>
  );
}
