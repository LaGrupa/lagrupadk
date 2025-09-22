"use client";

import { I18nLink as Link } from "@/i18nLink";
import Image from "next/image";
import styles from "./QueHacemos.module.css";
import { useT } from "../../../i18n";

const encuentrosImg = "/site/quienes2.jpg";
const talleresImg = "/site/talleres-port.jpg";

export default function QueHacemosPage() {
  const { t, locale } = useT("quehacemos");

  // Coerce translations to string for alt attributes
  const workshopsAlt = (t("workshopsAlt") as string | undefined) ?? "";
  const meetingsAlt = (t("meetingsAlt") as string | undefined) ?? "";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("title") as string}</h1>

      <div className={styles.cards}>
        <Link href={`/${locale}/talleres`} className={styles.card}>
          <div className={styles.media}>
            <Image
              src={talleresImg}
              alt={workshopsAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>{t("workshops") as string}</h2>
          </div>
        </Link>

        <Link href={`/${locale}/encuentros`} className={styles.card}>
          <div className={styles.media}>
            <Image
              src={encuentrosImg}
              alt={meetingsAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>{t("meetings") as string}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
