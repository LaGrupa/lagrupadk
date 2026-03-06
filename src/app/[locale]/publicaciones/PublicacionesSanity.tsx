import styles from "@/components/Blog.module.css";
import BlogCard from "@/components/BlogCard";
import PublicacionesArchiveClient from "@/components/PublicacionesArchiveClient";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type SanityPost = {
  title: string;
  slug: { current: string };
  excerpt?: string | null;
  coverImage?: any;
  tags?: string[] | null;
  publishedAt?: string | null;
  _createdAt?: string;
};

type ArchivePost = {
  slug: string;
  title: string;
  blurb: string;
  date: string;
  tags?: string[];
  cover: string;
};

const query = `
*[_type == "post" && locale == $locale] | order(publishedAt desc, _createdAt desc) {
  title,
  slug,
  excerpt,
  coverImage,
  tags,
  publishedAt,
  _createdAt
}
`;

export default async function PublicacionesSanity({
  locale,
}: {
  locale: "es" | "da";
}) {
  const sanityPosts: SanityPost[] = await client.fetch(query, { locale });

  const posts: ArchivePost[] = sanityPosts.map((p) => ({
    slug: p.slug.current,
    title: p.title,
    blurb: p.excerpt ?? "",
    date: (p.publishedAt ?? p._createdAt ?? new Date().toISOString()) as string,
    tags: (p.tags ?? []).map((t) => t.trim().toLowerCase()).filter(Boolean),
    cover: p.coverImage
      ? urlFor(p.coverImage).width(1200).url()
      : "/images/placeholder.jpg",
  }));

  const latest = posts.slice(0, 2);

  // derive tags from posts
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
  const tags = ["archivo", "entrevista", "lecturas", "recomendaciones"];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Publicaciones</h1>

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

        <PublicacionesArchiveClient
          locale={locale}
          initialTags={tags}
          posts={posts}
        />
      </div>
    </section>
  );
}
