"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./Emprendedoras.module.css";

type Biz = {
  name: string;
  tagline: string;
  url: string;
  image?: string;
  tags?: string[]; // optional tags for filtering
};

const businesses: Biz[] = [
  { name: "Dharma", tagline: "Arreglos de ropa / bordados / customizaciones", url: "https://instagram.com/…", tags: ["moda", "custom"] },
  { name: "Erhhardt’s Alfajores", tagline: "Alfajores artesanales", url: "https://instagram.com/…", tags: ["alimentos"] },
  { name: "Nebula | Tatuajes de línea fina", tagline: "Tatuajes", url: "https://instagram.com/…", tags: ["arte", "tatuajes"] },
  { name: "Menkauraskin", tagline: "Cosmetología, limpiezas faciales", url: "https://instagram.com/…", tags: ["bienestar", "estética"] },
  { name: "The Hexican", tagline: "Lectura de cartas", url: "https://instagram.com/…", tags: ["lectura", "arte"] },
  { name: "Lic. Katja Braunroth Dupuy", tagline: "Osteopatía y Fisioterapia", url: "https://instagram.com/…", tags: ["salud"] },
  { name: "Florencia Cinquemani Psychology", tagline: "Psicología", url: "https://linkedin.com/…", tags: ["salud"] },
  { name: "Be Gluten Free", tagline: "Pastelería Gluten Free", url: "https://instagram.com/…", tags: ["alimentos"] },
  { name: "Portrayal", tagline: "Upcycling de indumentaria", url: "https://instagram.com/…", tags: ["moda", "sustentable"] },
  { name: "Praga", tagline: "Pastelería", url: "https://instagram.com/…", tags: ["alimentos"] },
  { name: "Choki Choki Lab", tagline: "Collage análogo", url: "https://instagram.com/…", tags: ["arte"] },
  { name: "Ps. Paula Cantarini", tagline: "Psicóloga clínica", url: "https://instagram.com/…", tags: ["salud"] },
];

function initials(text: string) {
  const words = text.replace(/\|/g, " ").split(" ").filter(Boolean).slice(0, 2);
  return words.map(w => w[0]?.toUpperCase()).join("");
}

export default function EmprendedorasPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    businesses.forEach(b => b.tags?.forEach(t => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return businesses.filter(b => {
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        (b.tags && b.tags.some(t => t.toLowerCase().includes(q)));

      const matchesTag = !activeTag || (b.tags && b.tags.includes(activeTag));
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <main className={styles.page}>
      <section className={styles.bannerWrap}>
        <div className={styles.bannerInner}>
          <Image
            src="/emprendedoras-banner.jpg"
            alt="Emprendedoras de La Grupa"
            width={1600}
            height={360}
            className={styles.banner}
            priority
          />
        </div>
      </section>

      <section className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Emprendedoras de La Grupa</h1>
          <p className={styles.subtitle}>
            Explorá el catálogo y conocé a las grandes mujeres de La Grupa que se animaron
            a dedicarse a lo que les gusta y a compartirlo.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filters}>
        <div className={styles.filtersInner}>
          <input
            type="search"
            placeholder="Buscar por nombre, categoría o tag…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
            aria-label="Buscar emprendimientos"
          />

          <div className={styles.tags}>
            <button
              className={`${styles.tag} ${!activeTag ? styles.tagActive : ""}`}
              onClick={() => setActiveTag(null)}
            >
              Todos
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`${styles.tag} ${activeTag === tag ? styles.tagActive : ""}`}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={styles.gallery}>
        <div className={styles.galleryInner}>
          {filtered.map((biz, idx) => (
            <a
              key={idx}
              href={biz.url}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.card}
            >
              <div className={styles.media}>
                {biz.image ? (
                  <Image
                    src={biz.image}
                    alt={biz.name}
                    width={460}
                    height={260}
                    className={styles.cardImg}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>{initials(biz.name)}</span>
                  </div>
                )}
              </div>

              <div className={styles.meta}>
                <h3 className={styles.cardTitle}>{biz.name}</h3>
                <p className={styles.cardTagline}>{biz.tagline}</p>
                {biz.tags && (
                  <div className={styles.cardTags}>
                    {biz.tags.map(t => (
                      <span key={t} className={styles.cardTag}>{t}</span>
                    ))}
                  </div>
                )}
                <span className={styles.cardLinkHint}>Visitar</span>
              </div>
            </a>
          ))}
          {filtered.length === 0 && (
            <p className={styles.empty}>No se encontraron resultados.</p>
          )}
        </div>
      </section>
    </main>
  );
}

