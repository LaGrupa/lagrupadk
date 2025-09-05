"use client";

import { I18nLink as Link } from "@/i18nLink";
import Image from "next/image";
import { useT } from "@/i18n";
import styles from "./Recursero.module.css";

// Static imports from /public (auto width/height metadata)
import emprendedorasImg from "/public/site/recursero-emprendedoras.jpg";
import librosImg from "/public/site/recursero-libros.jpg";

export default function RecurseroPage() {
  const { t, locale } = useT("recursero");

  // safe translator helper -> always returns a non-empty string
  const tx = (k: string, fb: string) => {
    const v = t(k) as unknown;
    return typeof v === "string" && v.trim() ? v : fb;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("title") as string}</h1>

      <div className={styles.cards}>
        <Link href="/emprendedoras" className={styles.card}>
          <div className={styles.media}>
            <Image
              src={emprendedorasImg}
              alt={tx(
                "entrepreneursAlt",
                locale === "da"
                  ? "Kvinde-iværksættere — produkter skabt af migrantkvinder"
                  : "Emprendedoras — productos creados por mujeres migrantes"
              )}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.bannerImg}
              priority
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>{t("entrepreneurs") as string}</h2>
          </div>
        </Link>

        <Link href="/libros" className={styles.card}>
          <div className={styles.media}>
            <Image
              src={librosImg}
              alt={tx(
                "booksAlt",
                locale === "da"
                  ? "Anbefalede bøger og ressourcer"
                  : "Libros recomendados y recursos"
              )}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.bannerImg}
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>{t("books") as string}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}




