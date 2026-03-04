import fs from "node:fs";
import path from "node:path";

const outPath = path.resolve("scripts/book-import.es.ndjson");

/**
 * Update this import path to wherever your hardcoded books list lives.
 * We will parse it manually below to avoid fighting Next/Image imports.
 *
 * For now, paste the books data directly in this file in the next step.
 */

const books = [
  {
    title: "Amiga, hablemos de plata",
    subtitle: "Finanzas con perspectiva",
    category: "ensayo",
    author: "Autora desconocida",
    year: 2024,
    description: "Guía práctica y directa sobre dinero.",
    rating: 5,
    imagePath: "/biblioteca/amiga-hablemosdeplata.jpg",
  },
  {
    title: "Calibán y la bruja",
    category: "historia",
    author: "Silvia Federici",
    year: 2004,
    description: "Trabajo clásico sobre acumulación y caza de brujas.",
    rating: 5,
    imagePath: "/biblioteca/calibanylabruja.jpg",
  },
  {
    title: "Científicas",
    category: "biografía",
    author: "Varios",
    year: 2020,
    description: "Historias de mujeres que hicieron ciencia.",
    rating: 4,
    imagePath: "/biblioteca/cientificas.jpg",
  },
  {
    title: "Feminismo para todo el mundo",
    category: "ensayo",
    author: "Bell Hooks",
    year: 2000,
    description: "Introducción clara al feminismo interseccional.",
    rating: 5,
    imagePath: "/biblioteca/feminismo-para-todo-el-mundo.jpg",
  },
  {
    title: "La culpa es de la vaca",
    category: "ensayo",
    author: "Varios",
    year: 1996,
    description: "Relatos y reflexiones para el cambio personal.",
    rating: 3,
    imagePath: "/biblioteca/laculpaesdelavaca.jpg",
  },
  {
    title: "Marrón",
    category: "memorias",
    author: "Varios",
    year: 2021,
    description:
      "Miradas sobre racialización y pertenencia. Memorias de la autora",
    rating: 4,
    imagePath: "/biblioteca/marron.jpg",
  },
  {
    title: "Mujeres en ingeniería",
    category: "ensayo",
    author: "Varios",
    year: 2019,
    description: "Experiencias y referentes en STEM.",
    rating: 4,
    imagePath: "/biblioteca/mujereseningenieria.png",
  },
  {
    title: "Palabras hieren",
    category: "cuento",
    author: "Autora desconocida",
    year: 2018,
    description: "Colección de relatos cortos.",
    rating: 3,
    imagePath: "/biblioteca/palabrashieren.jpg",
  },
  {
    title: "Servir a los ricos",
    category: "ensayo",
    author: "Varios",
    year: 2017,
    description: "Trabajo, clase y desigualdad contemporánea.",
    rating: 4,
    imagePath: "/biblioteca/serviralosricos.jpg",
  },
  {
    title: "Sexismo cotidiano",
    category: "ensayo",
    author: "Varios",
    year: 2014,
    description: "Pequeñas agresiones, gran impacto.",
    rating: 4,
    imagePath: "/biblioteca/sexismocotidiano.jpg",
  },
  {
    title: "Todos deberíamos ser feministas",
    category: "ensayo",
    author: "Chimamanda Ngozi Adichie",
    year: 2014,
    description: "Ensayo breve y potente.",
    rating: 5,
    imagePath: "/biblioteca/todosdeberiamosserfeministas.jpg",
  },
  {
    title: "La vida inmortal de Henrietta",
    category: "biografía",
    author: "Rebecca Skloot",
    year: 2010,
    description: "La historia detrás de las células HeLa.",
    rating: 5,
    imagePath: "/biblioteca/vidainmortaldehenrietta.jpg",
  },
];

function idFromTitle(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const docs = books.map((b) => {
  const doc = {
    _id: `book_es_${idFromTitle(b.title)}`,
    _type: "book",
    locale: "es",
    title: b.title,
    author: b.author ?? undefined,
    genre: b.category ?? undefined,
    excerpt: b.description ?? undefined,
    link: b.url ?? undefined,
    // NOTE: we’ll handle coverImage later (Sanity assets). Keep legacy path for now.
    legacyImagePath: b.imagePath ?? undefined,
  };

  // remove undefined keys
  Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k]);
  return doc;
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
  outPath,
  docs.map((d) => JSON.stringify(d)).join("\n") + "\n",
  "utf8",
);

console.log(`Wrote ${docs.length} docs -> ${outPath}`);
