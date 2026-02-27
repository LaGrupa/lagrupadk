import Image from "next/image";
import styles from "./Hero.module.css";
import { I18nLink as Link } from "../i18nLink";

export type HeroSanityProps = {
  title: string;
  lead?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  imageAlt?: string | null;
};

export default function HeroSanity({
  title,
  lead,
  ctaLabel,
  ctaHref,
  imageAlt,
}: HeroSanityProps) {
  const alt = imageAlt ?? "La Grupa";

  const hasCTA = Boolean(ctaHref && ctaLabel);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.media}>
          <Image
            src="/site/hero.jpg"
            alt={alt}
            fill
            priority
            sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 640px"
            className={styles.img}
          />
        </div>

        <div className={styles.content}>
          <h2 id="hero-title" className={styles.title}>
            {title}
          </h2>

          {lead && (
            <p className={styles.lead}>
              <strong>La Grupa</strong> {lead}
            </p>
          )}

          {hasCTA && (
            <Link
              href={ctaHref!}
              className={styles.button}
              aria-label={ctaLabel!}
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
