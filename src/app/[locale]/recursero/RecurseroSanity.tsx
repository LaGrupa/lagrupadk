import Link from "next/link";
import Image from "next/image";
import styles from "./Recursero.module.css";

type Card = {
  title?: string | null;
  href?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export default function RecurseroSanity({
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
      href: string;
      imageUrl?: string | null;
      imageAlt?: string | null;
    } =>
      typeof c?.title === "string" &&
      c.title.trim().length > 0 &&
      typeof c?.href === "string" &&
      c.href.trim().length > 0,
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.cards}>
        {safeCards.map((c, idx) => {
          const cleanHref = c.href.startsWith("/") ? c.href : `/${c.href}`;
          const localizedHref = `/${locale}${cleanHref}`;

          return (
            <Link key={idx} href={localizedHref} className={styles.card}>
              <div className={styles.media}>
                {c.imageUrl ? (
                  <Image
                    src={c.imageUrl}
                    alt={c.imageAlt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.bannerImg}
                    priority={idx === 0}
                  />
                ) : null}
              </div>

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
