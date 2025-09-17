import type { Metadata } from "next";
import styles from "@/components/Blog.module.css";
import BlogCard from "@/components/BlogCard";
import { getAllPosts, getAllTags } from "@/content/posts";
import PublicacionesArchiveClient from "@/components/PublicacionesArchiveClient";

// Use your real domain in .env.local for correct absolute OG URLs.
// Example: NEXT_PUBLIC_SITE_URL=https://lagrupa.dk
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Publicaciones",
  description: "Últimas publicaciones, archivos, entrevistas y recursos.",
  openGraph: {
    type: "website",
    title: "Publicaciones",
    description: "Últimas publicaciones, archivos, entrevistas y recursos.",
    // Optional: add /public/site/og-default.jpg or change this path
    images: [{ url: `${siteUrl}/site/og-default.jpg` }],
  },
};

export default async function PublicacionesIndex({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  // Next 15 dev: params is a Promise
  const { locale } = await params;

  const posts = getAllPosts(locale);
  const tags = getAllTags(locale);

  const latest = posts.slice(0, 2);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Publicaciones</h1>

        {/* Featured: latest 2 posts as cards */}
        <div className={styles.featured}>
          {latest.map((p) => (
            <BlogCard
              key={p.slug}
              href={`/${locale}/publicaciones/${p.slug}`}
              title={p.title}
              blurb={p.blurb}
              cover={p.cover}
              tags={p.tags}
            />
          ))}
        </div>

        {/* Filters + Archive (client) */}
        <PublicacionesArchiveClient locale={locale} initialTags={tags} />
      </div>
    </section>
  );
}
