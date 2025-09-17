// src/content/posts.ts
export type Post = {
  slug: string;
  locale: "es" | "da";
  title: string;
  blurb: string;
  cover: string; // image path under /public
  tags?: string[];
  date: string; // ISO string
  pdfUrl?: string;
  body?: string; // simple HTML for now (MD/MDX later)
};

const posts: Post[] = [
  {
    slug: "jo-herrera",
    locale: "es",
    title: "Entrevista a Jo Herrera",
    blurb:
      "La comunidad como forma de vida. Una charla sobre construcción colectiva y redes de apoyo.",
    cover: "/artic/joherrera.jpg",
    pdfUrl: "/pdf/entrevista-jo-herrera.pdf",
    tags: ["entrevista", "comunidad"],
    date: "2025-09-01",
    body: `
      <p><strong>La comunidad como forma de vida</strong>. En esta entrevista hablamos con Jo Herrera
      sobre construcción colectiva, cuidados y redes de apoyo.</p>
      <p>— “Las comunidades se sostienen en prácticas cotidianas: cocinar juntas, escucharnos,
      y documentar lo que aprendemos”.</p>
    `,
  },
  {
    slug: "publicacion-2",
    locale: "es",
    title: "Publicación 2",
    blurb:
      "Colección de lecturas y recomendaciones de la comunidad, con apuntes prácticos.",
    cover: "/site/recursero-libros.jpg",
    pdfUrl: "/pdf/publicacion-2.pdf",
    tags: ["lecturas", "recomendaciones"],
    date: "2025-08-20",
    body: `
      <p>Una selección curada de lecturas con notas breves y propuestas para llevar a la práctica.</p>
      <ul><li>Cómo organizar un club de lectura.</li><li>Herramientas para notas colectivas.</li></ul>
    `,
  },
];
console.log("posts loaded");
export function getAllPosts(locale: "es" | "da") {
  return posts
    .filter((p) => p.locale === locale)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(locale: "es" | "da", slug: string) {
  return getAllPosts(locale).find((p) => p.slug === slug) || null;
}

export function getAllTags(locale: "es" | "da") {
  const set = new Set<string>();
  getAllPosts(locale).forEach((p) => p.tags?.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
