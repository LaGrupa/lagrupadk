import { I18nLink as Link } from "@/i18nLink";
import styles from "./ThreeColumns.module.css";

export type HomeCard = {
  title?: string | null;
  body?: string | null;
  buttonLabel?: string | null;
  href?: string | null;
};

export default function ThreeColumnsSanity({ cards }: { cards: HomeCard[] }) {
  const safeCards = (cards ?? []).filter((c) => c && c.title);

  return (
    <section className={styles.section} aria-labelledby="home-sections">
      <div className={styles.container}>
        <div className={styles.grid}>
          {safeCards.map((card, idx) => (
            <article key={idx} className={styles.card}>
              <h2
                className={styles.title}
                id={idx === 0 ? "home-sections" : undefined}
              >
                {card.title}
              </h2>

              {card.body ? <p className={styles.body}>{card.body}</p> : null}

              {card.href ? (
                <Link className={styles.link} href={card.href}>
                  {card.buttonLabel ?? "Læs mere"}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
