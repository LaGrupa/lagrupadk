import Image from "next/image";
import Link from "next/link";
import styles from "@/components/EventGrid.module.css";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type BaseEvent = {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  excerpt?: string | null;
  image?: any;
  imageAlt?: string | null;
  isUpcoming?: boolean | null;
};

type Labels = {
  pageTitle: { es: string; da: string };
  upcomingTitle: { es: string; da: string };
  pastTitle: { es: string; da: string };
  emptyUpcomingTitle: { es: string; da: string };
  emptyUpcomingDesc: { es: string; da: string };
  archiveLabel: { es: (n: number) => string; da: (n: number) => string };
};

const buildQuery = (type: string) => `
*[_type=="${type}" && locale==$locale] | order(date desc){
  _id,
  title,
  slug,
  date,
  excerpt,
  image,
  imageAlt,
  isUpcoming
}
`;

export default async function SanityEventPage({
  locale,
  type,
  labels,
}: {
  locale: "es" | "da";
  type: "encuentro" | "taller";
  labels: Labels;
}) {
  const query = buildQuery(type);
  const items = await client.fetch<BaseEvent[]>(query, { locale });

  const upcoming = items
    .filter((e) => e.isUpcoming)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

  const past = items
    .filter((e) => !e.isUpcoming)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const pastCards = past.slice(0, 6);
  const pastArchive = past.slice(6);

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));

  const t = <T,>(obj: { es: T; da: T }) => (locale === "da" ? obj.da : obj.es);

  const basePath = type === "encuentro" ? "encuentros" : "talleres";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t(labels.pageTitle)}</h1>

        <h2 className={styles.sectionTitle}>{t(labels.upcomingTitle)}</h2>

        {upcoming.length === 0 ? (
          <div className={styles.empty}>
            <h3 className={styles.emptyTitle}>
              {t(labels.emptyUpcomingTitle)}
            </h3>
            <p className={styles.emptyDesc}>{t(labels.emptyUpcomingDesc)}</p>
          </div>
        ) : (
          <div className={styles.featuredList}>
            {upcoming.map((e, i) => (
              <Link
                key={e._id}
                href={`/${locale}/${basePath}/${e.slug.current}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <article className={styles.featuredCard}>
                  <div className={styles.featuredThumb}>
                    {e.image ? (
                      <Image
                        src={urlFor(e.image)
                          .width(1200)
                          .height(800)
                          .fit("crop")
                          .url()}
                        alt={e.imageAlt ?? e.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={styles.thumbImg}
                        priority={i === 0}
                      />
                    ) : null}
                  </div>

                  <div className={styles.featuredBody}>
                    <small className={styles.date}>{fmt(e.date)}</small>
                    <h3 className={styles.cardTitle}>{e.title}</h3>
                    {e.excerpt ? (
                      <p className={styles.desc}>{e.excerpt}</p>
                    ) : null}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        <h2 className={styles.sectionTitle}>{t(labels.pastTitle)}</h2>

        {past.length === 0 ? null : (
          <>
            <div className={styles.grid}>
              {pastCards.map((e) => (
                <Link
                  key={e._id}
                  href={`/${locale}/${basePath}/${e.slug.current}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <article className={styles.card}>
                    <div className={styles.thumb}>
                      {e.image ? (
                        <Image
                          src={urlFor(e.image)
                            .width(1200)
                            .height(800)
                            .fit("crop")
                            .url()}
                          alt={e.imageAlt ?? e.title}
                          fill
                          sizes="(max-width: 420px) 100vw, 420px"
                          className={styles.thumbImg}
                        />
                      ) : null}
                    </div>

                    <div className={styles.body}>
                      <h3 className={styles.cardTitle}>{e.title}</h3>
                      <small className={styles.date}>{fmt(e.date)}</small>
                      {e.excerpt ? (
                        <p className={styles.desc}>{e.excerpt}</p>
                      ) : null}
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {pastArchive.length > 0 ? (
              <details className={styles.archive}>
                <summary className={styles.archiveSummary}>
                  {locale === "da"
                    ? labels.archiveLabel.da(pastArchive.length)
                    : labels.archiveLabel.es(pastArchive.length)}
                </summary>

                <ul className={styles.archiveList}>
                  {pastArchive.map((e) => (
                    <li key={e._id} className={styles.archiveItem}>
                      <span className={styles.archiveTitle}>{e.title}</span>
                      <span className={styles.archiveMeta}>{fmt(e.date)}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
