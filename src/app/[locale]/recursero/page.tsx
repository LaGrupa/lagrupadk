"use client";

import { I18nLink as Link } from "@/i18nLink";
import Image from "next/image";
import { useT } from "@/i18n";
import styles from "./Recursero.module.css";

// Static imports from /public
import emprendedorasImg from "/public/site/recursero-emprendedoras.jpg";
import librosImg from "/public/site/recursero-libros.jpg";

export default function RecurseroPage() {
  const { t } = useT("recursero");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("title")}</h1>

      <div className={styles.cards}>
        <Link href="/emprendedoras" className={styles.card}>
          <div className={styles.media}>
            <Image
              src={emprendedorasImg}
              alt={t("entrepreneursAlt")}
              className={styles.bannerImg}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>{t("entrepreneurs")}</h2>
          </div>
        </Link>

        <Link href="/libros" className={styles.card}>
          <div className={styles.media}>
            <Image
              src={librosImg}
              alt={t("booksAlt")}
              className={styles.bannerImg}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>{t("books")}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}




