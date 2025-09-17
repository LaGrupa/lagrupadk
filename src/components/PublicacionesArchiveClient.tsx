"use client";

import { useMemo, useState } from "react";
import styles from "./Blog.module.css";
import { I18nLink as Link } from "@/i18nLink";
import { useT } from "@/i18n";
import { getAllPosts as _getAllPosts } from "@/content/posts";

// fallback helper (ensures non-empty string)
function tx(v: unknown, fb: string) {
  return typeof v === "string" && v.trim() ? v : fb;
}

export default function PublicacionesArchiveClient({
  locale,
  initialTags,
}: {
  locale: "es" | "da";
  initialTags: string[];
}) {
  const { t } = useT();
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const posts = useMemo(() => _getAllPosts(locale), [locale]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return posts.slice(2).filter((p) => {
      const inQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.blurb.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.toLowerCase().includes(query));
      const inTag = !activeTag || p.tags?.includes(activeTag);
      return inQuery && inTag;
    });
  }, [q, activeTag, posts]);

  return (
    <>
      <section className={styles.filters}>
        <div className={styles.filtersInner}>
          <input
            type="search"
            placeholder={tx(
              t("publicaciones.searchPlaceholder"),
              "Buscar por título o tag…"
            )}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className={styles.search}
            aria-label={tx(
              t("publicaciones.searchAria"),
              "Buscar publicaciones"
            )}
          />
          <div className={styles.tags}>
            <button
              className={`${styles.tag} ${!activeTag ? styles.tagActive : ""}`}
              onClick={() => setActiveTag(null)}
            >
              {tx(t("publicaciones.allTags"), "Todos")}
            </button>
            {initialTags.map((tag) => (
              <button
                key={tag}
                className={`${styles.tag} ${
                  activeTag === tag ? styles.tagActive : ""
                }`}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              >
                {tx(t(`publicaciones.tags.${tag}`), tag)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <h2 className={styles.sectionSubTitle}>
        {tx(t("publicaciones.archive"), "Archivo")}
      </h2>
      <ul className={styles.archiveList}>
        {filtered.map((p) => (
          <li key={p.slug} className={styles.archiveItem}>
            <Link
              href={`/${locale}/publicaciones/${p.slug}`}
              className={styles.archiveLink}
            >
              <span className={styles.archiveTitle}>{p.title}</span>
              <span className={styles.archiveMeta}>
                {new Date(p.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
                {p.tags?.length ? ` • ${p.tags.join(", ")}` : ""}
              </span>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className={styles.empty}>
            {tx(t("publicaciones.empty"), "No se encontraron resultados.")}
          </li>
        )}
      </ul>
    </>
  );
}
