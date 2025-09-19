"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { createPortal } from "react-dom";
import styles from "./Libros.module.css";

import GoBackRow from "@/components/GoBackRow";
import { useT } from "@/i18n";

/* ---------------------------------------------
   Importa todas las portadas desde /public/biblioteca
   (variables en camelCase, sin guiones)
---------------------------------------------- */
// from: src/app/[locale]/libros/page.tsx
// go up 4 levels -> root -> public/biblioteca/...
// src/app/[locale]/libros/page.tsx  →  up to project root → public/biblioteca/...
import amigaHablemosDePlata from "../../../../public/biblioteca/amiga-hablemosdeplata.jpg";
import calibanYLaBruja from "../../../../public/biblioteca/calibanylabruja.jpg";
import cientificas from "../../../../public/biblioteca/cientificas.jpg";

// ⬇️ Make SURE this filename matches EXACTLY what’s on disk
import feminismoParaTodoElMundo from "../../../../public/biblioteca/feminismo-para-todo-el-mundo.jpg";

import laCulpaEsDeLaVaca from "../../../../public/biblioteca/laculpaesdelavaca.jpg";
import marron from "../../../../public/biblioteca/marron.jpg";
import mujeresEnIngenieria from "../../../../public/biblioteca/mujereseningenieria.png";
import palabrasHerjen from "../../../../public/biblioteca/palabrashieren.jpg";
import servirALosRicos from "../../../../public/biblioteca/serviralosricos.jpg";
import sexismoCotidiano from "../../../../public/biblioteca/sexismocotidiano.jpg";
import todosDeberiamosSerFeministas from "../../../../public/biblioteca/todosdeberiamosserfeministas.jpg";
import vidaInmortalDeHenrietta from "../../../../public/biblioteca/vidainmortaldehenrietta.jpg";

/* ---------------------------------------------
   Tipos
---------------------------------------------- */
type Book = {
  title: string;
  subtitle?: string;
  category: string; // usa los valores de 'categories'
  image?: StaticImageData; // ← SOLO imports estáticos (opción B)
  url?: string; // enlace externo (opcional)
  author?: string;
  description?: string;
  year?: number | string;
  rating?: number; // 0–5
  links?: { label: string; href: string }[];
};

// mantenemos las claves internas; se traducen al renderizar
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

/* ---------------------------------------------
   Libros (ejemplos usando SOLO imports)
---------------------------------------------- */
const books: Book[] = [
  {
    title: "Amiga, hablemos de plata",
    subtitle: "Finanzas con perspectiva",
    category: "ensayo",
    author: "Autora desconocida",
    year: 2024,
    description: "Guía práctica y directa sobre dinero.",
    rating: 5,
    image: amigaHablemosDePlata,
  },
  {
    title: "Calibán y la bruja",
    category: "historia",
    author: "Silvia Federici",
    year: 2004,
    description: "Trabajo clásico sobre acumulación y caza de brujas.",
    rating: 5,
    image: calibanYLaBruja,
  },
  {
    title: "Científicas",
    category: "biografía",
    author: "Varios",
    year: 2020,
    description: "Historias de mujeres que hicieron ciencia.",
    rating: 4,
    image: cientificas,
  },
  {
    title: "Feminismo para todo el mundo",
    category: "ensayo",
    author: "Bell Hooks",
    year: 2000,
    description: "Introducción clara al feminismo interseccional.",
    rating: 5,
    image: feminismoParaTodoElMundo,
  },
  {
    title: "La culpa es de la vaca",
    category: "ensayo",
    author: "Varios",
    year: 1996,
    description: "Relatos y reflexiones para el cambio personal.",
    rating: 3,
    image: laCulpaEsDeLaVaca,
  },
  {
    title: "Marrón",
    category: "ensayo",
    author: "Varios",
    year: 2021,
    description: "Miradas sobre racialización y pertenencia.",
    rating: 4,
    image: marron,
  },
  {
    title: "Mujeres en ingeniería",
    category: "ensayo",
    author: "Varios",
    year: 2019,
    description: "Experiencias y referentes en STEM.",
    rating: 4,
    image: mujeresEnIngenieria,
  },
  {
    title: "Palabras herjen",
    category: "cuento",
    author: "Autora desconocida",
    year: 2018,
    description: "Colección de relatos cortos.",
    rating: 3,
    image: palabrasHerjen,
  },
  {
    title: "Servir a los ricos",
    category: "ensayo",
    author: "Varios",
    year: 2017,
    description: "Trabajo, clase y desigualdad contemporánea.",
    rating: 4,
    image: servirALosRicos,
  },
  {
    title: "Sexismo cotidiano",
    category: "ensayo",
    author: "Varios",
    year: 2014,
    description: "Pequeñas agresiones, gran impacto.",
    rating: 4,
    image: sexismoCotidiano,
  },
  {
    title: "Todos deberíamos ser feministas",
    category: "ensayo",
    author: "Chimamanda Ngozi Adichie",
    year: 2014,
    description: "Ensayo breve y potente.",
    rating: 5,
    image: todosDeberiamosSerFeministas,
  },
  {
    title: "La vida inmortal de Henrietta",
    category: "biografía",
    author: "Rebecca Skloot",
    year: 2010,
    description: "La historia detrás de las células HeLa.",
    rating: 5,
    image: vidaInmortalDeHenrietta,
  },
];

// tiny helper para asegurar string no vacío
function tx(v: unknown, fb: string) {
  return typeof v === "string" && v.trim() ? v : fb;
}

export default function LibrosPage() {
  const { t } = useT();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selected, setSelected] = useState<Book | null>(null);

  const sortedCats = useMemo(
    () =>
      categories
        .slice()
        .sort((a, b) => (a === "Todos" ? -1 : a.localeCompare(b))),
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
            placeholder={tx(
              t("libros.searchPlaceholder"),
              "Buscar por título, autora…"
            )}
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
              aria-label={`${tx(
                t("libros.aria.openDetailsPrefix"),
                "Abrir detalles de"
              )} ${b.title}`}
            >
              <div className={styles.media}>
                {b.image ? (
                  <Image
                    src={b.image}
                    alt={b.title}
                    width={300}
                    height={420}
                    className={styles.cardImg}
                    placeholder="blur" // compatible con imports estáticos
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>{b.title}</span>
                  </div>
                )}
              </div>
              <div className={styles.meta}>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                {b.subtitle && (
                  <p className={styles.cardSubtitle}>{b.subtitle}</p>
                )}
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

      {selected && (
        <BookModal book={selected} onClose={() => setSelected(null)} />
      )}

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
          <h2 id="book-title" className={styles.modalTitle}>
            {book.title}
          </h2>
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
                placeholder="blur"
              />
            </div>
          )}

          <div className={styles.modalInfo}>
            <ModalRow label={tx(t("libros.modal.category"), "Categoría")}>
              {tx(t(`libros.cats.${book.category}`), book.category)}
            </ModalRow>

            {book.year && (
              <ModalRow label={tx(t("libros.modal.year"), "Año")}>
                {book.year}
              </ModalRow>
            )}

            {typeof book.rating === "number" && (
              <ModalRow
                label={tx(t("libros.modal.rating"), "Valoración")}
                aria-label={`${book.rating} ${tx(
                  t("libros.modal.of5"),
                  "de 5"
                )}`}
              >
                {"★".repeat(book.rating)}
                {"☆".repeat(5 - book.rating)}
              </ModalRow>
            )}

            {book.description && (
              <ModalRow
                label={tx(t("libros.modal.description"), "Descripción")}
              >
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
}: React.PropsWithChildren<
  { label: string } & React.HTMLAttributes<HTMLDivElement>
>) {
  return (
    <div className={styles.modalRow} {...rest}>
      <span className={styles.modalLabel}>{label}</span>
      <div className={styles.modalValue}>{children}</div>
    </div>
  );
}
