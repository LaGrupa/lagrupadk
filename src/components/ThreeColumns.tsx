"use client";

import { I18nLink as Link } from "@/i18nLink";
import { useT } from "@/i18n";
import styles from "./ThreeColumns.module.css";

export default function ThreeColumns() {
  const { t } = useT("home.cards");

  // Safe getter: shows fallback text if a key is missing
  const g = (k: string, fb: string) => {
    try {
      const v = t(k) as string;
      return typeof v === "string" && v.trim().length ? v : fb;
    } catch {
      return fb;
    }
  };

  return (
    <section className={styles.section} aria-labelledby="home-sections">
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Workshops */}
          <article className={styles.card}>
            <h2 className={styles.title} id="home-sections">
              {g("workshops.title", "Talleres")}
            </h2>
            <p className={styles.body}>
              {g(
                "workshops.body",
                "Organizamos talleres para mujeres donde compartimos herramientas, experiencias y conocimientos."
              )}
            </p>
            <Link className={styles.link} href="/talleres">
              {g("workshops.btn", "Ver nuestros talleres")}

            </Link>
          </article>

          {/* Meetups */}
          <article className={styles.card}>
            <h2 className={styles.title}>{g("meetups.title", "Encuentros")}</h2>
            <p className={styles.body}>
              {g(
                "meetups.body",
                "Encuentros abiertos para conversar, descansar y pensar en comunidad."
              )}
            </p>
            <Link className={styles.link} href="/encuentros">
              {g("meetups.btn", "Fecha del próximo encuentro")}
            </Link>
          </article>

          {/* Support */}
          <article className={styles.card}>
            <h2 className={styles.title}>
              {g("support.title", "Acompañamientos")}
            </h2>
            <p className={styles.body}>
              {g(
                "support.body",
                "Acompañamos y escuchamos en situaciones difíciles, compartimos recursos y buscamos juntas formas de sostener."
              )}
            </p>
            <Link className={styles.link} href="/contact">
              {g("support.btn", "Contáctanos")}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}





