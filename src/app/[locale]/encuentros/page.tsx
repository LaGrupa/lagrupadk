"use client";

import Image from "next/image";
import styles from "./Encuentros.module.css";
import { useT } from "@/i18n";

type Meetup = {
  id: string;        // i18n key
  dateISO: string;   // sortable date (YYYY-MM-DD)
  img: string;       // /public path
};

const meetups: Meetup[] = [
  { id: "abril",   dateISO: "2025-04-15", img: "/site/enc-1.jpg" },
  { id: "mayo",    dateISO: "2025-05-20", img: "/site/enc-2.jpg" },
  { id: "junio",   dateISO: "2025-06-18", img: "/site/enc-3.jpg" },
  // add more as needed
];

export default function EncuentrosPage() {
  const { t, locale } = useT();
  const now = new Date();

  const upcoming = meetups
    .filter(m => new Date(m.dateISO) >= new Date(now.toDateString()))
    .sort((a, b) => +new Date(a.dateISO) - +new Date(b.dateISO));

  const past = meetups
    .filter(m => new Date(m.dateISO) < new Date(now.toDateString()))
    .sort((a, b) => +new Date(b.dateISO) - +new Date(a.dateISO));

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));

  const title = (id: string) => t(`meetups.items.${id}.title`) as string;
  const desc  = (id: string) => t(`meetups.items.${id}.desc`) as string;

  // Safely coerce intro to string for JSX
  const intro = (t("meetups.intro") as string | undefined) ?? "";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("meetups.title") as string}</h1>

        {intro ? <p className={styles.lead}>{intro}</p> : null}

        {/* Upcoming */}
        <h2 className={styles.sectionTitle}>{t("meetups.upcoming") as string}</h2>
        {upcoming.length === 0 ? (
          <div className={styles.empty}>
            <h3 className={styles.emptyTitle}>{t("meetups.empty.title") as string}</h3>
            <p className={styles.emptyDesc}>{t("meetups.empty.desc") as string}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {upcoming.map((m, i) => (
              <article key={m.id} className={styles.card}>
                <div className={styles.thumb}>
                  <Image
                    src={m.img}
                    alt={title(m.id)}
                    fill
                    sizes="(max-width: 420px) 100vw, 420px"
                    className={styles.thumbImg}
                    priority={i === 0}
                  />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{title(m.id)}</h3>
                  <small className={styles.date}>{fmt(m.dateISO)}</small>
                  <p className={styles.desc}>{desc(m.id)}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Past */}
        <h2 className={styles.sectionTitle}>{t("meetups.past") as string}</h2>
        <div className={styles.grid}>
          {past.map((m) => (
            <article key={m.id} className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={m.img}
                  alt={title(m.id)}
                  fill
                  sizes="(max-width: 420px) 100vw, 420px"
                  className={styles.thumbImg}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{title(m.id)}</h3>
                <small className={styles.date}>{fmt(m.dateISO)}</small>
                <p className={styles.desc}>{desc(m.id)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
