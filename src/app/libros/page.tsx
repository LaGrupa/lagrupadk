"use client";
import { useState } from "react";
import styles from "./Libros.module.css";

type Book = {
  title: string;
  subtitle?: string;
  category: string;
  image?: string;
  url?: string;
};

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
}));

export default function LibrosPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "Todos" || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      (book.subtitle?.toLowerCase() || "").includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className={styles.page}>
      {/* Placeholder Banner */}
      <div className={styles.banner}>
        <h1 className={styles.bannerTitle}>Libros</h1>
      </div>

      {/* Subtitle */}
      <section className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.subtitle}>
            Explora nuestra colección de libros recomendados por la comunidad.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className={styles.filters}>
        <div className={styles.filtersInner}>
          <input
            type="text"
            placeholder="Buscar por título o autora"
            className={styles.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.tags}>
            {categories
              .slice()
              .sort((a, b) => (a === "Todos" ? -1 : a.localeCompare(b)))
              .map((cat) => (
                <button
                  key={cat}
                  className={`${styles.tag} ${
                    selectedCategory === cat ? styles.activeTag : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={styles.gallery}>
        <div className={styles.galleryInner}>
          {filteredBooks.map((b, idx) => (
            <article key={idx} className={styles.card}>
              <div className={styles.media}>
                <div className={styles.placeholder}>
                  <span className={styles.placeholderText}>{b.title}</span>
                </div>
              </div>
              <div className={styles.meta}>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                {b.subtitle && (
                  <p className={styles.cardSubtitle}>{b.subtitle}</p>
                )}
                <p className={styles.cardCategory}>{b.category}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}



