"use client";

import { I18nLink as Link } from "@/i18nLink"
import Image from "next/image";
import styles from "./QueHacemos.module.css";
import { useT } from "../../../i18n";

const encuentrosImg = "/site/encuentros.jpg";
const talleresImg = "/site/talleres.jpg";

export default function QueHacemosPage() {
  const { t, locale } = useT("quehacemos");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("title")}</h1>

      <div className={styles.cards}>
        <Link href={`/${locale}/talleres`} className={styles.card}>
          <div className={styles.media}>
            <Image
              src={talleresImg}
              alt={t("workshopsAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>{t("workshops")}</h2>
          </div>
        </Link>

        <Link href={`/${locale}/encuentros`} className={styles.card}>
          <div className={styles.media}>
            <Image
              src={encuentrosImg}
              alt={t("meetingsAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>{t("meetings")}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}




