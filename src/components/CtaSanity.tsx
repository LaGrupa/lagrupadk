import Image from "next/image";
import { I18nLink as Link } from "@/i18nLink";
import styles from "./Cta.module.css";

const CTA_IMAGE_SRC = "/site/cta.jpg"; // keep static for now

export type CtaSanityProps = {
  title?: string | null; // can include "\n" for line break
  lead?: string | null;
  buttonLabel?: string | null;
  href?: string | null;
  imageAlt?: string | null;
};

export default function CtaSanity({
  title,
  lead,
  buttonLabel,
  href,
  imageAlt,
}: CtaSanityProps) {
  const cleanTitle = (title ?? "").trim();
  const [l1, l2] = cleanTitle.includes("\n")
    ? cleanTitle.split("\n")
    : [cleanTitle, ""];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.text}>
            <h2 className={styles.title}>
              {l1}
              {l2 ? <br /> : null}
              {l2}
            </h2>

            {lead ? <p className={styles.lead}>{lead}</p> : null}

            {href && buttonLabel ? (
              <Link className={styles.btn} href={href}>
                {buttonLabel}
              </Link>
            ) : null}
          </div>

          <div className={styles.media}>
            <Image
              src={CTA_IMAGE_SRC}
              alt={imageAlt ?? "La Grupa"}
              fill
              sizes="(max-width: 900px) 100vw, 540px"
              className={styles.img}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
