"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import styles from "./Publicaciones.module.css";
import { useT } from "@/i18n";

type Pub = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  pdfUrl: string;
  tags?: string[];
};

const pubs: Pub[] = [
  {
    id: "jo-herrera",
    title: "Entrevista a Jo Herrera",
    blurb:
      "La comunidad como forma de vida. Una charla sobre construcción colectiva y redes de apoyo.",
    image: "/artic/joherrera.jpg",
    pdfUrl: "/pdf/entrevista-jo-herrera.pdf",
    tags: ["entrevista", "comunidad"],
  },
  {
    id: "publicacion-2",
    title: "Publicación 2",
    blurb:
      "Colección de lecturas y recomendaciones de la comunidad, con apuntes prácticos.",
    image: "/site/recursero-libros.jpg",
    pdfUrl: "/pdf/publicacion-2.pdf",
    tags: ["lecturas", "recomendaciones"],
  },
];

// ensure non-empty strings for critical UI
function tx(v: unknown, fb: string) {
  return typeof v === "string" && v.trim() ? v : fb;
}

export default function PublicacionesPage() {
  const { t } = useT();

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<Pub | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    pubs.forEach(p => p.tags?.forEach(tag => s.add(tag)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pubs.filter(p => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q));
      const matchesTag = !activeTag || p.tags?.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>{tx(t("publicaciones.title"), "Publicaciones")}</h1>

        {/* Filters */}
        <section className={styles.filters}>
          <div className={styles.filtersInner}>
            <input
              type="search"
              placeholder={tx(t("publicaciones.searchPlaceholder"), "Buscar por título o tag…")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.search}
              aria-label={tx(t("publicaciones.searchAria"), "Buscar publicaciones")}
            />

            <div className={styles.tags}>
              <button
                className={`${styles.tag} ${!activeTag ? styles.tagActive : ""}`}
                onClick={() => setActiveTag(null)}
              >
                {tx(t("publicaciones.allTags"), "Todos")}
              </button>

              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`${styles.tag} ${activeTag === tag ? styles.tagActive : ""}`}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                >
                  {tx(t(`publicaciones.tags.${tag}`), tag)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cards */}
        <div className={styles.cards}>
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              className={styles.card}
              onClick={() => setSelected(p)}
              aria-haspopup="dialog"
              aria-label={`${tx(t("publicaciones.aria.openDetailsPrefix"), "Abrir detalles de")} ${p.title}`}
            >
              <div className={styles.media}>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={480}
                  height={300}
                  className={styles.image}
                />
              </div>
              <h2 className={styles.cardTitle}>{p.title}</h2>
              <p className={styles.cardText}>{p.blurb}</p>

              {p.tags?.length ? (
                <div className={styles.cardTags}>
                  {p.tags.map(tag => (
                    <span key={tag} className={styles.cardTag}>
                      {tx(t(`publicaciones.tags.${tag}`), tag)}
                    </span>
                  ))}
                </div>
              ) : null}
            </button>
          ))}

          {filtered.length === 0 && (
            <p className={styles.empty}>
              {tx(t("publicaciones.empty"), "No se encontraron resultados.")}
            </p>
          )}
        </div>
      </div>

      {selected && <PubModal pub={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

/* ------------ Modal ------------- */

function PubModal({ pub, onClose }: { pub: Pub; onClose: () => void }) {
  const { t } = useT();
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!mounted) return null;

  const node = (
    <div className={styles.modalBackdrop} onMouseDown={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pub-title"
        onMouseDown={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label={tx(t("publicaciones.modal.close"), "Cerrar")}
        >
          ✕
        </button>

        <header className={styles.modalHeader}>
          <h2 id="pub-title" className={styles.modalTitle}>{pub.title}</h2>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.modalThumb}>
            <Image
              src={pub.image}
              alt={pub.title}
              width={520}
              height={320}
              className={styles.modalThumbImg}
            />
          </div>

          <div className={styles.modalInfo}>
            <div className={styles.modalRow}>
              <span className={styles.modalLabel}>
                {tx(t("publicaciones.modal.summary"), "Resumen")}
              </span>
              <div className={styles.modalValue}>{pub.blurb}</div>
            </div>

            {pub.tags?.length ? (
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>
                  {tx(t("publicaciones.modal.tags"), "Tags")}
                </span>
                <div className={styles.modalTags}>
                  {pub.tags.map(tag => (
                    <span key={tag} className={styles.modalTag}>
                      {tx(t(`publicaciones.tags.${tag}`), tag)}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <footer className={styles.modalFooter}>
          <a
            href={pub.pdfUrl}
            className={styles.primaryBtn}
            target="_blank"
            rel="noreferrer noopener"
            download
          >
            {tx(t("publicaciones.modal.downloadPdf"), "Descargar PDF")}
          </a>
          <button className={styles.secondaryBtn} onClick={onClose}>
            {tx(t("publicaciones.modal.close"), "Cerrar")}
          </button>
        </footer>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}


