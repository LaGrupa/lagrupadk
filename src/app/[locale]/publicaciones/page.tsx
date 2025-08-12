"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import styles from "./Publicaciones.module.css";

type Pub = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  pdfUrl: string;        // path or absolute URL to the PDF
  tags?: string[];
};

const pubs: Pub[] = [
  {
    id: "jo-herrera",
    title: "Entrevista a Jo Herrera",
    blurb: "La comunidad como forma de vida. Una charla sobre construcción colectiva y redes de apoyo.",
    image: "/artic/joherrera.jpg",
    pdfUrl: "/pdf/entrevista-jo-herrera.pdf",
    tags: ["entrevista", "comunidad"],
  },
  {
    id: "publicacion-2",
    title: "Publicación 2",
    blurb: "Colección de lecturas y recomendaciones de la comunidad, con apuntes prácticos.",
    image: "/site/recursero-libros.jpg",
    pdfUrl: "/pdf/publicacion-2.pdf",
    tags: ["lecturas", "recomendaciones"],
  },
];

export default function PublicacionesPage() {
  const [selected, setSelected] = useState<Pub | null>(null);

  const items = useMemo(() => pubs, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Publicaciones</h1>

        <div className={styles.cards}>
          {items.map((p) => (
            <button
              key={p.id}
              type="button"
              className={styles.card}
              onClick={() => setSelected(p)}
              aria-haspopup="dialog"
              aria-label={`Abrir detalles de ${p.title}`}
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
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <PubModal pub={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

/* ------------ Modal ------------- */

function PubModal({ pub, onClose }: { pub: Pub; onClose: () => void }) {
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
        <button className={styles.modalClose} onClick={onClose} aria-label="Cerrar">
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
              <span className={styles.modalLabel}>Resumen</span>
              <div className={styles.modalValue}>{pub.blurb}</div>
            </div>

            {pub.tags?.length ? (
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>Tags</span>
                <div className={styles.modalTags}>
                  {pub.tags.map((t) => (
                    <span key={t} className={styles.modalTag}>{t}</span>
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
            Descargar PDF
          </a>
          <button className={styles.secondaryBtn} onClick={onClose}>
            Cerrar
          </button>
        </footer>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
