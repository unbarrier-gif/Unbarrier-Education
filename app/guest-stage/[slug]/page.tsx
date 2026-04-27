import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { GuestBio } from '@/components/guest-stage/GuestBio';
import { GuestStageBookingBlock } from '@/components/guest-stage/GuestStageBookingBlock';
import { GuestStageHero } from '@/components/guest-stage/GuestStageHero';
import { WhatYoullLeaveWith } from '@/components/guest-stage/WhatYoullLeaveWith';
import {
  findGuestBySlug,
  findSessionForGuest,
  liveGuests,
} from '@/content/loop-breakers/guests';
import styles from './page.module.css';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return liveGuests().map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: Params },
): Promise<Metadata> {
  const guest = findGuestBySlug(params.slug);
  if (!guest) return {};
  const desc = guest.session.longBlurb.slice(0, 155);
  return {
    title: `${guest.session.title} · Guest Stage · Loop Breakers`,
    description: desc,
    alternates: { canonical: `/guest-stage/${guest.slug}` },
  };
}

export default function GuestStagePage({ params }: { params: Params }) {
  const guest = findGuestBySlug(params.slug);
  if (!guest) notFound();
  const session = findSessionForGuest(guest);

  return (
    <>
      <Nav active="loop-breakers" />
      <main className={styles.main}>
        <GuestStageHero guest={guest} session={session} />

        <section className={styles.summary}>
          <p className={styles.summaryBody}>{guest.session.longBlurb}</p>
        </section>

        <WhatYoullLeaveWith guest={guest} />
        <GuestBio guest={guest} />
        <GuestStageBookingBlock guest={guest} session={session} />

        <Footer variant="full" />
      </main>
    </>
  );
}

