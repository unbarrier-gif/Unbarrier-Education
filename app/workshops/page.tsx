import type { Metadata } from 'next';
import { AccessBreadcrumb } from '@/components/AccessBreadcrumb';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import styles from './workshops.module.css';
import { Band1Hero } from './_components/Band1Hero';
import { Band2HowToBook } from './_components/Band2HowToBook';
import { Band3Module1 } from './_components/Band3Module1';
import { Band4Menu } from './_components/Band4Menu';
import { Band5InsetDay } from './_components/Band5InsetDay';
import { Band6Bespoke } from './_components/Band6Bespoke';
import { Band7Pricing } from './_components/Band7Pricing';
import { Band8About } from './_components/Band8About';
import { Band9FooterCTA } from './_components/Band9FooterCTA';

// /workshops — child of the .access strand. Built to Workshops Page Spec
// v1.0 (9 May 2026). Composes 9 bands; Band 4 is the only client
// component (tile expansion state). Mailto CTAs fire Plausible events
// per spec §06.

export const metadata: Metadata = {
  title: 'Workshops · unbarrier.access',
  description:
    'Accessibility training that schools can actually book. Single workshops, full INSET days, or bespoke programmes — delivered by an Apple Professional Learning Specialist.',
  alternates: { canonical: 'https://www.unbarrier.me/workshops' },
  openGraph: {
    title: 'Workshops · unbarrier.access',
    description:
      'Accessibility training that schools can actually book. Single workshops, full INSET days, or bespoke programmes.',
    url: 'https://www.unbarrier.me/workshops',
    type: 'website',
    images: [
      {
        url: '/assets/og-hello.png',
        width: 1200,
        height: 630,
        alt: 'Unbarrier — designed for difference.',
      },
    ],
  },
};

export default function WorkshopsPage() {
  return (
    <>
      <Nav active="access" />
      <AccessBreadcrumb page="workshops" />
      <main className={styles.main}>
        <Band1Hero />
        <Band2HowToBook />
        <Band3Module1 />
        <Band4Menu />
        <Band5InsetDay />
        <Band6Bespoke />
        <Band7Pricing />
        <Band8About />
        <Band9FooterCTA />
        <Footer variant="full" />
      </main>
    </>
  );
}
