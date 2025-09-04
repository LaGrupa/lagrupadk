"use client";

import Image from "next/image";
import { I18nLink as Link } from "@/i18nLink";
import styles from "./Cta.module.css";
import { useT } from "@/i18n";

const CTA_IMAGE_SRC = "/site/cta.jpg"; // ← replace if your CTA image has another name

export default function Cta() {
  const { t } = useT("cta");

  const title = ((t("title") as string) || "").trim();
  const [l1, l2] = title.includes("\n") ? title.split("\n") : [title, ""];

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
            <p className={styles.lead}>{t("lead") as string}</p>
            <Link className={styles.btn} href="/contact">
              {t("btn.label") as string}
            </Link>
          </div>

          <div className={styles.media}>
            <Image
              src={CTA_IMAGE_SRC}
              alt={(t("imgAlt") as string) || "La Grupa"}
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











