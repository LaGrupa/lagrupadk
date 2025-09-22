"use client";

import Image from "next/image";
import styles from "./Talleres.module.css";
import { useT } from "@/i18n";

type Workshop = {
  id: string; // used for i18n keys
  dateISO: string; // sortable date
  img: string; // /public path
};

const workshops: Workshop[] = [
  { id: "hatha", dateISO: "2025-04-19", img: "/site/encuentros.jpg" },
  { id: "acuarelas", dateISO: "2025-05-25", img: "/site/taller-acuarelas.jpg" },
  { id: "circulo", dateISO: "2025-06-22", img: "/site/taller-circulo.jpg" },
  { id: "yoga_facial", dateISO: "2025-07-13", img: "/site/taller-hatha.jpg" },
  { id: "dibujar", dateISO: "2025-08-19", img: "/site/talleres.jpg" },
  // Nuevo taller feminista
  { id: "feminista", dateISO: "2025-08-18", img: "/site/taller-feminista.jpg" },
];

export default function TalleresPage() {
  const { t, locale } = useT();
  const now = new Date();

  // split by upcoming/past
  const upcoming = workshops
    .filter((w) => new Date(w.dateISO) >= new Date(now.toDateString()))
    .sort((a, b) => +new Date(a.dateISO) - +new Date(b.dateISO));

  const past = workshops
    .filter((w) => new Date(w.dateISO) < new Date(now.toDateString()))
    .sort((a, b) => +new Date(b.dateISO) - +new Date(a.dateISO));

  const featured = upcoming[0];
  const moreUpcoming = upcoming.slice(1);

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));

  const fallbacks: Record<string, { title: string; desc: string }> = {
    hatha: {
      title: "Hatha Yoga",
      desc: "Yoga para dar paso a un post taller en el bar, compartiendo unas cervezas.",
    },
    acuarelas: {
      title: "Acuarelas",
      desc: "El segundo taller a cargo de Lucía...",
    },
    circulo: {
      title: "Círculo de mujeres",
      desc: "Espacios íntimos para la escucha...",
    },
    yoga_facial: { title: "Yoga Facial", desc: "Practicamos Yoga Facial..." },
    dibujar: {
      title: "Dibujar para encontrarse",
      desc: "Un espacio para explorar...",
    },
    feminista: {
      title: "Taller de pensamiento feminista",
      desc: 'En agosto tuvimos nuestro sexto taller, esta vez, un taller de pensamiento feminista a cargo de Javiera Aguirre (@filosofiaklub), bajo la consigna "Comunidades rotas: el costo político y social del discurso de odio". Una invitación a la reflexión filosófica sobre el presente del feminismo y el colectivismo en el marco del auge de los discursos misóginos y fascistas. Un encuentro para recuperar nuestros roles de actoras sociales, superar las visiones apocalípticas y empezar a organizar futuros posibles con Nosotras como motor de cambio.',
    },
  };
  const tx = (k: string, fb: string) => {
    const v = t(k) as string | undefined;
    return v && typeof v === "string" ? v : fb;
  };
  const title = (id: string) =>
    tx(`workshops.items.${id}.title`, fallbacks[id].title);
  const desc = (id: string) =>
    tx(`workshops.items.${id}.desc`, fallbacks[id].desc);

  return (
    <>
      {/* Intro band */}
      <section className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1>{t("workshops.title") as string}</h1>
          <p>{t("workshops.intro") as string}</p>
        </div>
      </section>

      {/* Upcoming */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            {t("workshops.upcoming") as string}
          </h2>

          {upcoming.length === 0 ? (
            <div className={styles.empty}>
              <h3 className={styles.emptyTitle}>
                {t("workshops.empty.title") as string}
              </h3>
              <p className={styles.emptyDesc}>
                {t("workshops.empty.desc") as string}
              </p>
            </div>
          ) : (
            <>
              {/* Featured */}
              <article className={styles.featured}>
                <div className={styles.featuredMedia}>
                  <Image
                    src={featured!.img}
                    alt={title(featured!.id)}
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    className={styles.mediaImg}
                    priority
                  />
                </div>
                <div className={styles.featuredBody}>
                  <h3 className={styles.featuredTitle}>
                    {title(featured!.id)}
                  </h3>
                  <small className={styles.date}>
                    {fmt(featured!.dateISO)}
                  </small>
                  <p className={styles.desc}>{desc(featured!.id)}</p>
                </div>
              </article>

              {/* Any additional upcoming */}
              {moreUpcoming.length > 0 && (
                <div className={styles.grid}>
                  {moreUpcoming.map((w) => (
                    <article key={w.id} className={styles.card}>
                      <div className={styles.thumb}>
                        <Image
                          src={w.img}
                          alt={title(w.id)}
                          fill
                          sizes="(max-width: 420px) 100vw, 420px"
                          className={styles.thumbImg}
                        />
                      </div>
                      <div className={styles.body}>
                        <h3 className={styles.cardTitle}>{title(w.id)}</h3>
                        <small className={styles.date}>{fmt(w.dateISO)}</small>
                        <p className={styles.desc}>{desc(w.id)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Past workshops */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            {t("workshops.past") as string}
          </h2>
          <div className={styles.grid}>
            {past.map((w) => (
              <article key={w.id} className={styles.card}>
                <div className={styles.thumb}>
                  <Image
                    src={w.img}
                    alt={title(w.id)}
                    fill
                    sizes="(max-width: 420px) 100vw, 420px"
                    className={styles.thumbImg}
                  />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{title(w.id)}</h3>
                  <small className={styles.date}>{fmt(w.dateISO)}</small>
                  <p className={styles.desc}>{desc(w.id)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
