import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Loop Breakers · designed for difference.',
  description:
    'Small-room, neurodivergent-led coaching: Tuesday Loop Breakers, Wednesday Guest Stage, and Accessible Coaching with Nici Foote.',
};

export const viewport: Viewport = {
  themeColor: '#210a33',
};

export default function LoopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
