import Image from 'next/image';
import { Button } from './Button';
import { Eyebrow } from './Eyebrow';
import { Glow } from './Glow';
import { SectionBar } from './SectionBar';
import styles from './HomeLoopTease.module.css';

export function HomeLoopTease() {
  return (
    <>
      <SectionBar color="var(--school-bus-yellow)" />
      <section id="loop" className={styles.section}>
        <Glow
          color="var(--school-bus-yellow)"
          left="60%"
          top="0%"
          size={500}
          opacity={0.07}
        />
        <div className={styles.grid}>
          <div className={styles.illustrationWrap}>
            <span aria-hidden="true" className={styles.figureGlow} />
            <Image
              src="/assets/illustrations/nonbinary-figure.png"
              alt=""
              width={840}
              height={840}
              className={styles.figure}
              sizes="(max-width: 768px) 70vw, 420px"
            />
          </div>
          <div className={styles.copy}>
            <Eyebrow color="var(--school-bus-yellow)">
              Neurodivergent Community
            </Eyebrow>
            <h2 className={styles.heading}>
              This work is personal.
              <br />
              <span className={styles.accent}>You are my why.</span>
            </h2>
            <p className={styles.body}>
              I&apos;m part of this community, not just serving it. My ADHD
              coaching and Loop Breakers sessions are for neurodivergent
              people — founders, professionals, anyone who is brilliant and
              exhausted in equal measure.
            </p>
            <p className={styles.body}>
              Loop Breakers lives separately — its own space, its own energy.
              It starts here, with this belief: you don&apos;t have to figure
              it out alone.
            </p>
            <Button
              href="https://loop.unbarrier.me"
              color="var(--school-bus-yellow)"
            >
              Visit Loop Breakers →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
