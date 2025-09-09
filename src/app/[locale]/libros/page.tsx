"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import styles from "./Libros.module.css";

import GoBackRow from "@/components/GoBackRow";
import { useT } from "@/i18n";

type Book = {
  title: string;
  subtitle?: string;
  category: string;
  image?: string;   // cover
  url?: string;     // external link

  // optional for the modal
  author?: string;
  description?: string;
  year?: number | string;
  rating?: number;  // 0–5
  links?: { label: string; href: string }[];
};

// keep internal keys as-is; we translate when rendering
const categories = [
  "Todos",
  "novela",
  "cuento",
  "ensayo",
  "poesía",
  "historia",
  "biografía",
  "infantil",
  "ficción",
];

const books: Book[] = Array.from({ length: 12 }).map((_, i) => ({
  title: `Libro ${i + 1}`,
  subtitle: "Descripción breve o autora",
  category: categories[(i % (categories.length - 1)) + 1],
  author: "Autora Demo",
  year: 2024,
  description:
    "Pequeña sinopsis del libro. Puedes ampliar este texto para ver el scroll del modal.",
  rating: (i % 5) + 1,
  links: [{ label: "Más info", href: "https://example.com" }],
  // image: "/covers/book-01.jpg",
}));

// tiny helper to ensure we always render a non-empty string
function tx(v: unknown, fb: string) {
  return typeof v === "string" && v.trim() ? v : fb;
}

export default function LibrosPage() {
  const { t } = useT();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selected, setSelected] = useState<Book | null>(null);

  const sortedCats = useMemo(
    () => categories.slice().sort((a, b) => (a === "Todos" ? -1 : a.localeCompare(b))),
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return books.filter((b) => {
      const matchesCategory =
        selectedCategory === "Todos" || b.category === selectedCategory;
      const matchesSearch =
        b.title.toLowerCase().includes(q) ||
        (b.subtitle?.toLowerCase() ?? "").includes(q) ||
        (b.author?.toLowerCase() ?? "").includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <main className={styles.page}>
      <section className={styles.bannerWrap}>
        <div className={styles.bannerInner}>
          <Image
            src="/site/recursero-libros.jpg"
            alt={tx(t("libros.bannerAlt"), "Nuestra biblioteca")}
            width={1600}
            height={360}
            className={styles.banner}
            priority
          />
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filters}>
        <div className={styles.filtersInner}>
          <input
            type="text"
            placeholder={tx(t("libros.searchPlaceholder"), "Buscar por título, autora…")}
            className={styles.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={tx(t("libros.searchAria"), "Buscar libros")}
          />
          <div className={styles.tags}>
            {sortedCats.map((cat) => (
              <button
                key={cat}
                className={`${styles.tag} ${
                  selectedCategory === cat ? styles.activeTag : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {tx(t(`libros.cats.${cat}`), cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={styles.gallery}>
        <div className={styles.galleryInner}>
          {filtered.map((b, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.card}
              onClick={() => setSelected(b)}
              aria-haspopup="dialog"
              aria-label={`${tx(t("libros.aria.openDetailsPrefix"), "Abrir detalles de")} ${b.title}`}
            >
              <div className={styles.media}>
                {b.image ? (
                  <Image
                    src={b.image}
                    alt={b.title}
                    width={300}
                    height={420}
                    className={styles.cardImg}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>{b.title}</span>
                  </div>
                )}
              </div>
              <div className={styles.meta}>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                {b.subtitle && <p className={styles.cardSubtitle}>{b.subtitle}</p>}
                <p className={styles.cardCategory}>
                  {tx(t(`libros.cats.${b.category}`), b.category)}
                </p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className={styles.empty}>
              {tx(t("libros.empty"), "No se encontraron resultados.")}
            </p>
          )}
        </div>
      </section>

      {selected && <BookModal book={selected} onClose={() => setSelected(null)} />}

      <div className={styles.row}>
        <GoBackRow />
      </div>
    </main>
  );
}

/* ------------ Modal ------------- */

function BookModal({ book, onClose }: { book: Book; onClose: () => void }) {
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
        aria-labelledby="book-title"
        onMouseDown={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label={tx(t("libros.modal.close"), "Cerrar")}
        >
          ✕
        </button>

        <header className={styles.modalHeader}>
          <h2 id="book-title" className={styles.modalTitle}>{book.title}</h2>
          {book.author && <p className={styles.modalSubtitle}>{book.author}</p>}
        </header>

        <div className={styles.modalBody}>
          {book.image && (
            <div className={styles.modalCover}>
              <Image
                src={book.image}
                alt={book.title}
                width={360}
                height={520}
                className={styles.modalCoverImg}
              />
            </div>
          )}

          <div className={styles.modalInfo}>
            <ModalRow label={tx(t("libros.modal.category"), "Categoría")}>
              {tx(t(`libros.cats.${book.category}`), book.category)}
            </ModalRow>

            {book.year && (
              <ModalRow label={tx(t("libros.modal.year"), "Año")}>{book.year}</ModalRow>
            )}

            {typeof book.rating === "number" && (
              <ModalRow
                label={tx(t("libros.modal.rating"), "Valoración")}
                aria-label={`${book.rating} ${tx(t("libros.modal.of5"), "de 5")}`}
              >
                {"★".repeat(book.rating)}
                {"☆".repeat(5 - book.rating)}
              </ModalRow>
            )}

            {book.description && (
              <ModalRow label={tx(t("libros.modal.description"), "Descripción")}>
                {book.description}
              </ModalRow>
            )}

            {book.links?.length ? (
              <ModalRow label={tx(t("libros.modal.links"), "Enlaces")}>
                <div className={styles.modalLinks}>
                  {book.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={styles.modalLink}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </ModalRow>
            ) : null}
          </div>
        </div>

        <footer className={styles.modalFooter}>
          {book.url && (
            <a
              href={book.url}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.primaryBtn}
            >
              {tx(t("libros.modal.visit"), "Visitar")}
            </a>
          )}
          <button className={styles.secondaryBtn} onClick={onClose}>
            {tx(t("libros.modal.close"), "Cerrar")}
          </button>
        </footer>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}

function ModalRow({
  label,
  children,
  ...rest
}: React.PropsWithChildren<{ label: string } & React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={styles.modalRow} {...rest}>
      <span className={styles.modalLabel}>{label}</span>
      <div className={styles.modalValue}>{children}</div>
    </div>
  );
}





