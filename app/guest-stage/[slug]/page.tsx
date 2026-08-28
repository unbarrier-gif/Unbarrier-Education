import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { GuestBio } from '@/components/guest-stage/GuestBio';
import { GuestStageBookingBlock } from '@/components/guest-stage/GuestStageBookingBlock';
import { GuestStageHero } from '@/components/guest-stage/GuestStageHero';
import { GuestStageHeroImage } from '@/components/guest-stage/GuestStageHeroImage';
import { SketchNoteGallery } from '@/components/guest-stage/SketchNoteGallery';
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

  // Split the journal gallery into two halves so the strongest visual proof
  // bookends the bio: first half pulls people in, bio explains who she is,
  // second half re-engages before the price.
  const sketchNotes = guest.guest.sketchNoteExamples ?? [];
  const half = Math.ceil(sketchNotes.length / 2);
  const sketchNotesFirst = sketchNotes.slice(0, half);
  const sketchNotesSecond = sketchNotes.slice(half);

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <GuestStageHero guest={guest} session={session} />

        {guest.guest.heroImage ? (
          <GuestStageHeroImage
            src={guest.guest.heroImage.src}
            alt={guest.guest.heroImage.alt}
          />
        ) : null}

        <section className={styles.summary}>
          <p className={styles.summaryBody}>{guest.session.longBlurb}</p>
        </section>

        {sketchNotesFirst.length > 0 ? (
          <SketchNoteGallery
            items={sketchNotesFirst}
            accent={guest.session.accent}
          />
        ) : null}

        <WhatYoullLeaveWith guest={guest} />
        <GuestBio guest={guest} />

        {sketchNotesSecond.length > 0 ? (
          <SketchNoteGallery
            items={sketchNotesSecond}
            accent={guest.session.accent}
            showHeading={false}
          />
        ) : null}

        <GuestStageBookingBlock guest={guest} session={session} />

        <Footer variant="full" />
      </main>
    </>
  );
}

