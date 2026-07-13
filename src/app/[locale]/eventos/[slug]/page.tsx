import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import styles from "@/components/EventGrid.module.css";
import ImageLightbox from "@/components/ImageLightbox";

type EventoPageData = {
  title: string;
  date: string;
  excerpt?: string | null;
  image?: any;
  imageDimensions?: { width: number; height: number } | null;
  imageAlt?: string | null;
  signupUrl?: string | null;
};

const QUERY = `
*[_type == "evento" && locale == $locale && slug.current == $slug][0]{
  title,
  date,
  excerpt,
  image,
  "imageDimensions": image.asset->metadata.dimensions{width, height},
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
          <div style={{ marginBottom: "1.5rem" }}>
            <ImageLightbox
              src={urlFor(data.image).width(1400).fit("max").url()}
              fullSrc={urlFor(data.image).width(2200).fit("max").url()}
              alt={data.imageAlt ?? data.title}
              width={data.imageDimensions?.width ?? 1400}
              height={data.imageDimensions?.height ?? 900}
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
