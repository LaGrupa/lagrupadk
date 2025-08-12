"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import styles from "./Emprendedoras.module.css";
import GoBackRow from "@/components/GoBackRow";


type Biz = {
  name: string;
  tagline: string;
  url: string;
  image?: string;
  tags?: string[];

  // extra (optional) fields for the modal
  contact?: string;       // phone/email
  description?: string;   // long description
  owner?: string;         // emprendedora
  socials?: { label: string; href: string }[];
  location?: string;
  rating?: number;        // 0–5
};

const businesses: Biz[] = [
  {
    name: "Dharma",
    tagline: "Arreglos de ropa / bordados / customizaciones",
    url: "https://instagram.com/…",
    image: "/biz/dharma.jpg",
    tags: ["moda", "custom"],
    contact: "+45 71415119",
    owner: "Camila",
    description:
      "Todo tipo de arreglos y también ropa a medida. Customización de prendas para darles una segunda vida.",
    socials: [{ label: "Instagram", href: "https://instagram.com/…" }],
    location: "Østerbro, a 2 cuadras de la estación",
    rating: 5,
  },
  { name: "Erhhardt’s Alfajores", tagline: "Alfajores artesanales", url: "https://instagram.com/…", image: "/biz/ehrhardt.jpg", tags: ["alimentos"] },
  { name: "Nebula | Tatuajes de línea fina", tagline: "Tatuajes", url: "https://instagram.com/…", image: "/biz/nebula.jpg", tags: ["arte", "tatuajes"] },
  { name: "Menkauraskin", tagline: "Cosmetología, limpiezas faciales", url: "https://instagram.com/…", image: "/biz/menkaura.jpg", tags: ["bienestar", "estética"] },
  { name: "The Hexican", tagline: "Lectura de cartas", url: "https://instagram.com/…", image: "/biz/hexican.jpg", tags: ["lectura", "arte"] },
  { name: "Lic. Katja Braunroth Dupuy", tagline: "Osteopatía y Fisioterapia", url: "https://instagram.com/…", image: "/biz/katjabraunroth.jpg", tags: ["salud"] },
  { name: "Florencia Cinquemani Psychology", tagline: "Psicología", url: "https://linkedin.com/…", image: "/biz/florencia.cinquemani.jpg", tags: ["salud"] },
  { name: "Be Gluten Free", tagline: "Pastelería Gluten Free", url: "https://instagram.com/…", image: "/biz/be.glutenfree.jpg", tags: ["alimentos"] },
  { name: "Portrayal", tagline: "Upcycling de indumentaria", url: "https://instagram.com/…", image: "/biz/portrayal.jpg", tags: ["moda", "sustentable"] },
  { name: "Praga", tagline: "Pastelería", url: "https://instagram.com/…", image: "/biz/praga.jpg", tags: ["alimentos"] },
  { name: "Choki Choki Lab", tagline: "Collage análogo", url: "https://instagram.com/…", image: "/biz/chokichokilab.jpg", tags: ["arte"] },
  { name: "Ps. Paula Cantarini", tagline: "Psicóloga clínica", url: "https://instagram.com/…", image: "/biz/Paula.cantarini.jpg", tags: ["salud"] },
];

function initials(text: string) {
  const words = text.replace(/\|/g, " ").split(" ").filter(Boolean).slice(0, 2);
  return words.map(w => w[0]?.toUpperCase()).join("");
}

export default function EmprendedorasPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<Biz | null>(null);

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
            src="/site/recursero-emprendedoras.jpg"
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
            <button
              key={idx}
              type="button"
              className={styles.card}
              onClick={() => setSelected(biz)}
              aria-haspopup="dialog"
              aria-label={`Abrir detalles de ${biz.name}`}
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
                <span className={styles.cardLinkHint}>Ver más</span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className={styles.empty}>No se encontraron resultados.</p>
          )}
        </div>
      </section>

      {selected && <BizModal biz={selected} onClose={() => setSelected(null)} />}
        
     <GoBackRow />

    </main>
    
  );
}

/* ============ Modal ============ */

function BizModal({ biz, onClose }: { biz: Biz; onClose: () => void }) {
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
        aria-labelledby="biz-title"
        onMouseDown={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <button className={styles.modalClose} onClick={onClose} aria-label="Cerrar">✕</button>

        <header className={styles.modalHeader}>
          <h2 id="biz-title" className={styles.modalTitle}>{biz.name}</h2>
        </header>

        <div className={styles.modalBody}>
          <ModalRow label="Descripción">
            {biz.description ?? biz.tagline}
          </ModalRow>

          {biz.owner && <ModalRow label="Emprendedora">{biz.owner}</ModalRow>}

          {biz.contact && (
            <ModalRow label="Contacto">
              <a className={styles.modalLink}
                 href={`tel:${biz.contact.replace(/\s+/g, "")}`}>{biz.contact}</a>
            </ModalRow>
          )}

          {!!biz.socials?.length && (
            <ModalRow label="Redes">
              <div className={styles.modalList}>
                {biz.socials.map(s => (
                  <a key={s.href} className={styles.modalLink} href={s.href} target="_blank" rel="noreferrer noopener">
                    {s.label}
                  </a>
                ))}
              </div>
            </ModalRow>
          )}

          {biz.location && <ModalRow label="Ubicación">{biz.location}</ModalRow>}

          {typeof biz.rating === "number" && (
            <ModalRow label="Valoración" aria-label={`${biz.rating} de 5`}>
              {"★".repeat(biz.rating)}{"☆".repeat(5 - biz.rating)}
            </ModalRow>
          )}
        </div>

        <footer className={styles.modalFooter}>
          <a href={biz.url} target="_blank" rel="noreferrer noopener" className={styles.primaryBtn}>
            Visitar
          </a>
          <button className={styles.secondaryBtn} onClick={onClose}>Cerrar</button>
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

