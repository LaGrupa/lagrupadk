"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import styles from "./Libros.module.css";
import GoBackRow from "@/components/GoBackRow";
import { useT } from "@/i18n";
import { urlFor } from "@/sanity/lib/image";

export type SanityBook = {
  _id: string;
  title: string;
  author?: string | null;
  genre?: string | null; // used for filter chips
  tags?: string[] | null;
  coverImage?: any;
  coverAlt?: string | null;
  excerpt?: string | null;
  link?: string | null;
};

function tx(v: unknown, fb: string) {
  return typeof v === "string" && v.trim() ? v : fb;
}

export default function LibrosClient({ books }: { books: SanityBook[] }) {
  const { t } = useT();

  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState<string>("Todos");
  const [selected, setSelected] = useState<SanityBook | null>(null);

  const genres = useMemo(() => {
    const set = new Set<string>();
    for (const b of books) {
      if (b.genre && b.genre.trim()) set.add(b.genre.trim());
    }
    return ["Todos", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [books]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return books.filter((b) => {
      const matchesGenre = activeGenre === "Todos" || b.genre === activeGenre;
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        (b.author ?? "").toLowerCase().includes(q) ||
        (b.excerpt ?? "").toLowerCase().includes(q) ||
        (b.tags ?? []).some((x) => x.toLowerCase().includes(q));
      return matchesGenre && matchesSearch;
    });
  }, [books, search, activeGenre]);

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
            {genres.map((g) => (
              <button
                key={g}
                className={`${styles.tag} ${activeGenre === g ? styles.activeTag : ""}`}
                onClick={() => setActiveGenre(g)}
              >
                {/* If you want translations later, we can map keys. For now: show text as stored in Sanity */}
                {g}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryInner}>
          {filtered.map((b) => (
            <button
              key={b._id}
              type="button"
              className={styles.card}
              onClick={() => setSelected(b)}
              aria-haspopup="dialog"
              aria-label={`${tx(t("libros.aria.openDetailsPrefix"), "Abrir detalles de")} ${b.title}`}
            >
              <div className={styles.media}>
                {b.coverImage ? (
                  <img
                    src={urlFor(b.coverImage).width(600).height(840).fit("crop").url()}
                    alt={b.coverAlt ?? b.title}
                    className={styles.cardImg}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>{b.title}</span>
                  </div>
                )}
              </div>

              <div className={styles.meta}>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                {b.author ? <p className={styles.cardSubtitle}>{b.author}</p> : null}
                {b.genre ? <p className={styles.cardCategory}>{b.genre}</p> : null}
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <p className={styles.empty}>{tx(t("libros.empty"), "No se encontraron resultados.")}</p>
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

function BookModal({ book, onClose }: { book: SanityBook; onClose: () => void }) {
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
          <h2 id="book-title" className={styles.modalTitle}>
            {book.title}
          </h2>
          {book.author ? <p className={styles.modalSubtitle}>{book.author}</p> : null}
        </header>

        <div className={styles.modalBody}>
          {book.coverImage ? (
            <div className={styles.modalCover}>
              <img
                src={urlFor(book.coverImage).width(720).height(1040).fit("crop").url()}
                alt={book.coverAlt ?? book.title}
                className={styles.modalCoverImg}
              />
            </div>
          ) : null}

          <div className={styles.modalInfo}>
            {book.genre ? (
              <ModalRow label={tx(t("libros.modal.category"), "Categoría")}>{book.genre}</ModalRow>
            ) : null}

            {book.excerpt ? (
              <ModalRow label={tx(t("libros.modal.description"), "Descripción")}>{book.excerpt}</ModalRow>
            ) : null}

            {book.tags?.length ? (
              <ModalRow label={"Tags"}>
                <div className={styles.modalLinks}>
                  {book.tags.map((tag) => (
                    <span key={tag} className={styles.modalLink}>
                      {tag}
                    </span>
                  ))}
                </div>
              </ModalRow>
            ) : null}
          </div>
        </div>

        <footer className={styles.modalFooter}>
          {book.link ? (
            <a
              href={book.link}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.primaryBtn}
            >
              {tx(t("libros.modal.visit"), "Visitar")}
            </a>
          ) : null}
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
