import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import styles from "@/components/EventGrid.module.css";

type EventoPageData = {
  title: string;
  date: string;
  excerpt?: string | null;
  image?: any;
  imageAlt?: string | null;
  signupUrl?: string | null;
};

const QUERY = `
*[_type == "evento" && locale == $locale && slug.current == $slug][0]{
  title,
  date,
  excerpt,
  image,
  imageAlt,
  signupUrl
}
`;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da"; slug: string }>;
}) {
  const { locale, slug } = await params;

  const data: EventoPageData | null = await client.fetch(QUERY, {
    locale,
    slug,
  });

  if (!data) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat(
    locale === "da" ? "da-DK" : "es-ES",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  ).format(new Date(data.date));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.date}>{formattedDate}</p>

        {data.image ? (
          <div
            className={styles.thumb}
            style={{ maxWidth: "760px", marginBottom: "1.5rem" }}
          >
            <Image
              src={urlFor(data.image).width(1400).height(900).fit("crop").url()}
              alt={data.imageAlt ?? data.title}
              fill
              sizes="(max-width: 768px) 100vw, 760px"
              className={styles.thumbImg}
              priority
            />
          </div>
        ) : null}

        {data.excerpt ? (
          <div className={styles.body} style={{ maxWidth: "760px" }}>
            <p
              className={styles.desc}
              style={{ display: "block", WebkitLineClamp: "unset" as any }}
            >
              {data.excerpt}
            </p>
          </div>
        ) : null}

        {data.signupUrl ? (
          <p style={{ marginTop: "1.5rem" }}>
            <a
              href={data.signupUrl}
              target="_blank"
              rel="noreferrer noopener"
              style={{
                display: "inline-block",
                padding: "0.85rem 1.2rem",
                borderRadius: "10px",
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {locale === "da" ? "Tilmeld dig" : "Inscribirme"}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
