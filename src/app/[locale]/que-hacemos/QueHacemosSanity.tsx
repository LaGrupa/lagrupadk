import Link from "next/link";
import Image from "next/image";
import styles from "./QueHacemos.module.css";

type Card = {
  title?: string | null;
  href?: string | null;
  imageAlt?: string | null;
  imageUrl?: string | null;
  fileUrl?: string | null;
};

const KNOWN_HREF_FALLBACK_IMAGES: Record<string, string> = {
  "/talleres": "/site/talleres-port.jpg",
  "/encuentros": "/site/quienes2.jpg",
  "/eventos": "/site/quienes1.jpg",
};

export default function QueHacemosSanity({
  title,
  locale,
  cards,
}: {
  title: string;
  locale: string;
  cards: Card[];
}) {
  const safeCards = (cards ?? []).filter(
    (
      c,
    ): c is {
      title: string;
      href?: string | null;
      imageAlt?: string | null;
      imageUrl?: string | null;
      fileUrl?: string | null;
    } =>
      typeof c?.title === "string" &&
      c.title.trim().length > 0 &&
      ((typeof c?.href === "string" && c.href.trim().length > 0) ||
        (typeof c?.fileUrl === "string" && c.fileUrl.trim().length > 0)),
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.cards}>
        {safeCards.map((c, idx) => {
          if (c.fileUrl) {
            return (
              <div key={idx} className={styles.card}>
                {c.imageUrl ? (
                  <div className={styles.media}>
                    <Image
                      src={c.imageUrl}
                      alt={c.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.img}
                    />
                  </div>
                ) : null}

                <div className={styles.bodyStack}>
                  <h2 className={styles.cardTitle}>{c.title}</h2>
                  <a
                    href={c.fileUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className={styles.downloadBtn}
                  >
                    Descargar PDF
                  </a>
                </div>
              </div>
            );
          }

          const href = c.href as string;
          const cleanHref = href.startsWith("/") ? href : `/${href}`;

          const localizedHref = cleanHref.startsWith(`/${locale}/`)
            ? cleanHref
            : `/${locale}${cleanHref}`;

          const imgSrc = c.imageUrl ?? KNOWN_HREF_FALLBACK_IMAGES[cleanHref];

          return (
            <Link key={idx} href={localizedHref} className={styles.card}>
              {imgSrc ? (
                <div className={styles.media}>
                  <Image
                    src={imgSrc}
                    alt={c.imageAlt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.img}
                  />
                </div>
              ) : null}

              <div className={styles.body}>
                <h2 className={styles.cardTitle}>{c.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
