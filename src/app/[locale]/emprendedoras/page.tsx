"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import styles from "./Emprendedoras.module.css";
import GoBackRow from "@/components/GoBackRow";
import { useT } from "@/i18n";

type Biz = {
  name: string;
  tagline: string;
  url: string;
  image?: string;
  tags?: string[];

  // extra (optional) fields for the modal
  contact?: string; // phone/email
  description?: string; // long description
  owner?: string; // emprendedora
  socials?: { label: string; href: string }[];
  location?: string;
  rating?: number; // 0–5
};

const businesses: Biz[] = [
  {
    name: "Dharma",
    tagline: "Arreglos de ropa / bordados / customizaciones",
    url: "https://www.instagram.com/dharma.designdk/",
    image: "/biz/dharma.jpg",
    tags: ["moda", "custom"],
    contact: "+45 71415119",
    owner: "Camila",
    description:
      "Todo tipo de arreglos y también ropa a medida. Customización de prendas para darles una segunda vida.",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/dharma.designdk/",
      },
    ],
    location: "Østerbro, a 2 cuadras de la estación",
    rating: 5,
  },
  {
    name: "Erhhardt’s Alfajores",
    tagline: "Alfajores artesanales",
    url: "https://www.instagram.com/ehrhardts.alfajores?igsh=Z2tpbTBnYjY4dThi",
    image: "/biz/ehrhardt.jpg",
    tags: ["alimentos"],
    contact: "+45 91484983",
    owner: "Lola Ehrhardt ",
    description:
      "Ehrhardt’s Alfajores, la primera alfajorería en Dinamarca” es una apuesta gastronómica que vino a poner al Alfajor en el lugar que se merece en Dinamarca. Ofrecemos alfajores artesanales, elaborados sin conservantes y con métodos refinados que resaltan los sabores naturales de cada ingrediente, proporcionando una experiencia superior a los productos industrializados. ",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/ehrhardts.alfajores?igsh=Z2tpbTBnYjY4dThi",
      },
    ],
    location: "Nordvest, Copenhague",
    rating: 5,
  },
  {
    name: "Nebula | Tatuajes de línea fina",
    tagline: "Tatuajes",
    url: "http://instagram.com/nebula.ttt",
    image: "/biz/nebula.jpg",
    tags: ["arte", "tatuajes"],
    //contact: ,
    owner: "Carolina",
    description:
      "Hago tatuajes de línea fina y diseños delicados. Tengo diseños propios pero siempre puedo trabajar en algo nuevo adaptado a tu cuerpo. :) Trabajo en un hermoso estudio femenino en el centro de Copenhague.",
    socials: [
      {
        label: "Instagram",
        href: "http://instagram.com/nebula.ttt",
      },
    ],
    location: "Østerbro, a 2 cuadras de la estación",
    rating: 5,
  },
  {
    name: "Menkauraskin",
    tagline: "Cosmetología, limpiezas faciales",
    url: "https://www.instagram.com/menkauraskin/",
    image: "/biz/menkaura.jpg",
    tags: ["bienestar", "estética"],
    //contact: "+45 71415119",
    owner: "Julieta",
    description:
      "Soy Julieta, Cosmetóloga y Cosmiatra Holística. Mi enfoque en el cuidado de la piel se basa en la conexión entre el bienestar interior y la belleza exterior, priorizando la relajación profunda del cuerpo y la mente. Trabajo con productos elaborados en Argentina, de origen consciente, y diseño cada protocolo de forma personalizada, adaptándome a las necesidades únicas de cada piel.",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/menkauraskin/",
      },
    ],
    location: "Frederiksberg",
    rating: 5,
  },
  {
    name: "The Hexican",
    tagline: "Lectura de cartas",
    url: "https://www.instagram.com/the.hexican?igsh=dmt0dDFtM2Zjbndv",
    image: "/biz/hexican.jpg",
    tags: ["lectura", "arte"],
    contact: "+45 91193803",
    owner: "Mariel",
    description:
      "Lectura de Tarot, Vera Sibilla, Lenormand, Mildred Payne, etc... En linea o en mi depa en Nørrebro.  200 dkk la lectura corta y 450 la larga",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/the.hexican?igsh=dmt0dDFtM2Zjbndv",
      },
    ],
    location: "En linea o Nørrebro ",
    rating: 5,
  },
  {
    name: "Efficia",
    tagline: "Servicio en Administracion y Gestion de Contratos",
    url: "",
    image: "/biz/efficia.jpg",
    tags: ["administración", "contratos"],
    contact: "mailto:info@efficiadk",
    owner: "María Lucila Villanueva",
    description:
      "Servicio integral de administración y gestión contractual para impulsar el desarrollo de empresas, con asesoramiento en cumplimiento legal e institucional, contratación de seguros y proveedores, y manejo de sistemas financieros y liquidacion de sueldos.",
    location: "Copenhagen",
    rating: 5,
  },
  {
    name: "Tu Espacio Fénix",
    tagline: "Masajes, onstelaciones familiares, Reiki, Registros Akashicos",
    url: "https://www.instagram.com/dharma.designdk/",
    image: "/biz/fenix.jpg",
    tags: ["masajes", "reiki"],
    contact: "+45 71672369",
    owner: "Florencia",
    description:
      "FÉNIX es un espacio de bienestar holístico que integra masajes terapéuticos, constelaciones familiares y terapias energéticas. Su propósito es acompañar a cada persona en procesos de sanación, autoconocimiento y transformación, ofreciendo un lugar seguro donde cuerpo, mente y espíritu se reconectan para renacer con más equilibrio y vitalidad.",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/tuespacio.fenix",
      },
    ],
    location: "Nørrebro",
    rating: 5,
  },
  {
    name: "Danzas Folklórikas Argentinas",
    tagline: "Clases de danzas folclóricas argentinas",
    url: "https://www.facebook.com/pamroldantangoyfolk",
    image: "/biz/Folklore-Pam-Padme.jpg",
    tags: ["danza", "folklore"],
    contact: "+45 52110132",
    owner: "Pamela",
    description:
      "Ofrezco clases de danzas Folklóricas Argentinas para principiantes e intermedios. A través de talleres semanales e intensivos de fin de semana, en eventos culturales, público y privados. ",
    socials: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/pamroldantangoyfolk",
      },
    ],
    location: "Copenhagen",
    rating: 5,
  },
  {
    name: "Tango Argentino",
    tagline: "Clases de tango argentino",
    url: "https://www.facebook.com/tango2be2",
    image: "/biz/tango-Pam-Padme.jpg",
    tags: ["danza", "tango"],
    contact: "+45 52110132",
    owner: "Pamela",
    description:
      "Ofrezco clases de Tango Argentino, grupales semanales, talleres intensivos de fin de semana, y clases privadas. Dedicadas a principiantes que quieran aprender a bailar, intermedios que quieran refinar su técnica de baile, y parejas que deseen armar una coreografía para su boda o algún evento especial.",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/tango2be/",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/tango2be2",
      },
    ],
    location: "Frederiksberg",
    rating: 5,
  },
  {
    name: "Zumba Fitness",
    tagline: "Clases de Zumba Fitness",
    url: "https://www.instagram.com/dharma.designdk/",
    image: "/biz/zumba-Pam-Padme.jpg",
    tags: ["zumba", "fitness"],
    contact: "+45 52110132",
    owner: "Camila",
    description:
      "Ofrezco clase semanales de Zumba. Durante Agosto, al aire libre los días sábados a las 11 am. en Dansekapellet (gratis). Entre Septiembre y Diciembre, los sábados a las 10 en Bellahøj, Copenhague (pagas). Las clases son para todos los niveles, basadas en diferentes estilos de baile Latino.  ",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/fitfunpam/",
      },
      {
        label: "Facebook",
        href: "//www.facebook.com/padmedance/",
      },
    ],
    location: "Copenhague",
    rating: 5,
  },
  {
    name: "Pilates en español",
    tagline: "clases de Pilates en español",
    url: "https://www.instagram.com/dharma.designdk/",
    image: "/biz/Pilates-Pame.jpg",
    tags: ["pilates", "fitness"],
    contact: "+45 52110132",
    owner: "Pamela",
    description:
      "Ofrezco clases de Mat Pilates en Español y a precios accesibles. Las clases son para grupos reducidos, lo que garantiza que cada participante pueda trabajar los ejercicios adaptados a su nivel, con buena supervisión de la técnica y el alineamiento para prevenir lesiones. ",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/fitfunpam/",
      },
      {
        label: "facebook",
        href: "https://www.facebook.com/padmedance/",
      },
    ],
    location: "Frederiksberg",
    rating: 5,
  },
  {
    name: "Lic. Katja Braunroth Dupuy",
    tagline: "Osteopatía y Fisioterapia",
    url: "https://www.instagram.com/osteo.dk/",
    image: "/biz/katjabraunroth.jpg",
    tags: ["salud", "fisioterapia"],
    contact: "+45 71829055",
    owner: "Lic. Katja Braunroth Dupuy ",
    description:
      "Osteopatía estructural, visceral, craneosacral / Fisioterapia (Disfunciones Temporomandibulares -bruxismo, mal oclusión-, ventosas, Microelectrolisis Percutánea -MEP-, taping neuromuscular, ondas de choque, etc)",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/osteo.dk/",
      },
    ],
    location: "Studiestræde 43 ",
    rating: 5,
  },
  {
    name: "Florencia Cinquemani Psychology",
    tagline: "Psicología",
    url: "http://linkedin.com/in/florencia-cinquemani-754252114",
    image: "/biz/florencia.cinquemani.jpg",
    tags: ["salud"],
    contact: "+45 50300276",
    owner: "Florencia Cinquemani",
    description:
      "Psicoterapia en Copenhague 🏳️‍🌈 , en español e inglés. Hola, soy psicóloga clínica argentina y vivo en la zona de Copenhague desde hace más de cuatro años. Trabajo acompañando a personas que quieren iniciar un proceso terapéutico o de autoconocimiento, ya sea desde un enfoque psicoanalítico, a través del arte o con herramientas centradas en la emoción y el trauma.  Me formé en psicoanálisis lacaniano, y también en Arte Terapia y Sexología . Actualmente me estoy especializando en terapia de pareja (EFT) y trauma (EMDR). Atiendo en un consultorio internacional en Copenhague y también ofrezco sesiones online (a un valor más accesible). Además, coordino un taller de lectura en inglés en la Nueva Escuela Lacaniana CPH.  Si querés saber más sobre cómo trabajo, podés encontrarme en Instagram o en LinkedIn, o escribirme directamente para charlar y definir cómo podemos trabajar juntxs.",
    socials: [
      {
        label: "LinkedIn",
        href: "linkedin.com/in/florencia-cinquemani-754252114",
      },
    ],
  },
  {
    name: "Be Gluten Free",
    tagline: "Pastelería Gluten Free",
    url: "http://instagram.com/be.glutenfreefood/",
    image: "/biz/be.glutenfree.jpg",
    tags: ["alimentos", "gluten-free"],
    contact: "+45 752732833",
    owner: "vanesa",
    description:
      "Pastelería Gluten Free con opciones baby friendly, veganas y sin lactosa. Tortas, Tartas y Box Desayuno! ",
    socials: [
      {
        label: "Instagram",
        href: "http://instagram.com/be.glutenfreefood/",
      },
    ],
    location: "Vestamager/ Nørreport ",
    rating: 5,
  },
  {
    name: "Portrayal",
    tagline: "Upcycling de indumentaria",
    url: "https://www.instagram.com/portrayal.design/",
    image: "/biz/portrayal.jpg",
    tags: ["moda", "sustentable"],
    contact: "+45 91453870",
    owner: "Vicky Longo ",
    description:
      "Transformo ropa descartada con técnicas como bordado y pintura. También hago servicios de customización o tailoring a pedido.",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/portrayal.design/",
      },
    ],

    rating: 5,
  },
  {
    name: "Praga",
    tagline: "Pastelería",
    url: "https://www.instagram.com/praga.dk?igsh=MWt6aGZsMDJ0czdnOA==",
    image: "/biz/praga.jpg",
    tags: ["alimentos"],
    //contact: "+45 71415119",
    owner: "Belén",
    description:
      "Tortas para eventos/personalizadas y otros productos de cocina pasteleria",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/praga.dk?igsh=MWt6aGZsMDJ0czdnOA==",
      },
    ],
    location: "Islands Brygge",
    rating: 5,
  },
  {
    name: "Choki Choki Lab",
    tagline: "Collage análogo",
    url: "https://www.instagram.com/chokichokilab",
    image: "/biz/chokichokilab.jpg",
    tags: ["arte"],
    //contact: "+45 71415119",
    owner: "Nicole",
    description:
      "Hago distintos tipos de collage para tener de decoración y otros articulos como cartas e imanes.",
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/chokichokilab",
      },
    ],
    location: "Copenhague",
    rating: 5,
  },
  {
    name: "Ps. Paula Cantarini",
    tagline: "Psicóloga clínica",
    url: "https://www.instagram.com/paula.cantarini.psicologa/",
    description:
      "Espacio de psicología clínica- educacional con modalidad tanto virtual como presencial en Copenhague,",
    owner: "Paula Cantarini",
    image: "/biz/Paula.Cantarini.jpg",
    tags: ["salud"],
    contact: "+45 31819360",
    location: "Theklavej 36",
    rating: 5,
  },
];

function initials(text: string) {
  const words = text.replace(/\|/g, " ").split(" ").filter(Boolean).slice(0, 2);
  return words.map((w) => w[0]?.toUpperCase()).join("");
}

// tiny helper to ensure we always return a non-empty string
function tx(get: unknown, fallback: string) {
  const v = typeof get === "string" ? get : "";
  return v.trim() || fallback;
}

export default function EmprendedorasPage() {
  const { t } = useT();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<Biz | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    businesses.forEach((b) => b.tags?.forEach((tag) => set.add(tag)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return businesses.filter((b) => {
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        (b.tags && b.tags.some((tag) => tag.toLowerCase().includes(q)));
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
            alt={tx(t("emprendedoras.bannerAlt"), "Emprendedoras de La Grupa")}
            width={1600}
            height={360}
            className={styles.banner}
            priority
          />
        </div>
      </section>

      <section className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>{t("emprendedoras.title") as string}</h1>
          <p className={styles.subtitle}>
            {t("emprendedoras.subtitle") as string}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filters}>
        <div className={styles.filtersInner}>
          <input
            type="search"
            placeholder={t("emprendedoras.searchPlaceholder") as string}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
            aria-label={t("emprendedoras.searchAria") as string}
          />

          <div className={styles.tags}>
            <button
              className={`${styles.tag} ${!activeTag ? styles.tagActive : ""}`}
              onClick={() => setActiveTag(null)}
            >
              {t("emprendedoras.allTags") as string}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`${styles.tag} ${
                  activeTag === tag ? styles.tagActive : ""
                }`}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              >
                {t(`emprendedoras.tags.${tag}`) as string}
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
              aria-label={`${
                t("emprendedoras.aria.openDetailsPrefix") as string
              } ${biz.name}`}
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
                    <span className={styles.placeholderText}>
                      {initials(biz.name)}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.meta}>
                <h3 className={styles.cardTitle}>{biz.name}</h3>
                <p className={styles.cardTagline}>{biz.tagline}</p>
                {biz.tags && (
                  <div className={styles.cardTags}>
                    {biz.tags.map((tag) => (
                      <span key={tag} className={styles.cardTag}>
                        {t(`emprendedoras.tags.${tag}`) as string}
                      </span>
                    ))}
                  </div>
                )}
                <span className={styles.cardLinkHint}>
                  {t("emprendedoras.card.more") as string}
                </span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className={styles.empty}>{t("emprendedoras.empty") as string}</p>
          )}
        </div>
      </section>

      {selected && (
        <BizModal biz={selected} onClose={() => setSelected(null)} />
      )}

      <GoBackRow />
    </main>
  );
}

/* ============ Modal ============ */

function BizModal({ biz, onClose }: { biz: Biz; onClose: () => void }) {
  const { t } = useT();
  const [mounted, setMounted] = useState(false);
  const portalEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Find or create a stable portal root (survives HMR)
    let root = document.getElementById("emprendedoras-portal");
    if (!root) {
      root = document.createElement("div");
      root.id = "emprendedoras-portal";
      document.body.appendChild(root);
    }
    portalEl.current = root;

    // esc to close
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      // NOTE: do NOT remove the portal root; keep it around to avoid
      // React trying to remove from a parent that got replaced by HMR.
      portalEl.current = null;
    };
  }, [onClose]);

  if (!mounted || !portalEl.current) return null;

  const node = (
    <div className={styles.modalBackdrop} onMouseDown={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="biz-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label={t("emprendedoras.modal.close") as string}
        >
          ✕
        </button>

        <header className={styles.modalHeader}>
          <h2 id="biz-title" className={styles.modalTitle}>
            {biz.name}
          </h2>
        </header>

        <div className={styles.modalBody}>
          <ModalRow label={t("emprendedoras.modal.description") as string}>
            {biz.description ?? biz.tagline}
          </ModalRow>

          {biz.owner && (
            <ModalRow label={t("emprendedoras.modal.owner") as string}>
              {biz.owner}
            </ModalRow>
          )}

          {biz.contact && (
            <ModalRow label={t("emprendedoras.modal.contact") as string}>
              <a
                className={styles.modalLink}
                href={`tel:${biz.contact.replace(/\s+/g, "")}`}
              >
                {biz.contact}
              </a>
            </ModalRow>
          )}

          {!!biz.socials?.length && (
            <ModalRow label={t("emprendedoras.modal.socials") as string}>
              <div className={styles.modalList}>
                {biz.socials.map((s) => (
                  <a
                    key={s.href}
                    className={styles.modalLink}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </ModalRow>
          )}

          {biz.location && (
            <ModalRow label={t("emprendedoras.modal.location") as string}>
              {biz.location}
            </ModalRow>
          )}

          {typeof biz.rating === "number" && (
            <ModalRow
              label={t("emprendedoras.modal.rating") as string}
              aria-label={`${biz.rating} ${
                t("emprendedoras.modal.of5") as string
              }`}
            >
              {"★".repeat(biz.rating)}
              {"☆".repeat(5 - biz.rating)}
            </ModalRow>
          )}
        </div>

        <footer className={styles.modalFooter}>
          <a
            href={biz.url}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.primaryBtn}
          >
            {t("emprendedoras.modal.visit") as string}
          </a>
          <button className={styles.secondaryBtn} onClick={onClose}>
            {t("emprendedoras.modal.close") as string}
          </button>
        </footer>
      </div>
    </div>
  );

  return createPortal(node, portalEl.current);
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
