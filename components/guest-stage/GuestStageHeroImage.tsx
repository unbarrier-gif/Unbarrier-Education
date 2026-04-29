import Image from 'next/image';
import styles from './GuestStageHeroImage.module.css';

type Props = {
  src: string;
  alt: string;
};

export function GuestStageHeroImage({ src, alt }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <Image
          src={src}
          alt={alt}
          width={4574}
          height={3380}
          priority
          sizes="(max-width: 1080px) 100vw, 1080px"
          className={styles.image}
        />
      </div>
    </section>
  );
}
