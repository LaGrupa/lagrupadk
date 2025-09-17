import type { Metadata } from "next";
import styles from "@/components/Blog.module.css";
import { getPostBySlug } from "@/content/posts";
import { I18nLink as Link } from "@/i18nLink";

// Use your real domain in .env.local
// Example: NEXT_PUBLIC_SITE_URL=https://lagrupa.dk
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "es" | "da"; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);

  const title = post ? post.title : "Publicación";
  const description = post?.blurb ?? "Publicación";
  const url = `${siteUrl}/${locale}/publicaciones/${slug}`;
  const ogImage = post?.cover
    ? `${siteUrl}${post.cover}`
    : `${siteUrl}/site/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      locale,
      images: [{ url: ogImage }],
    },
  };
}

export default async function PublicacionPage({
  params,
}: {
  params: Promise<{ locale: "es" | "da"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);

  if (!post) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.empty}>No encontrada.</p>
          <p>
            <Link href={`/${locale}/publicaciones`}>
              ← Volver a Publicaciones
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <article className={styles.article}>
      <header className={styles.articleHeader}>
        <p style={{ margin: 0 }}>
          <Link href={`/${locale}/publicaciones`}>← Publicaciones</Link>
        </p>
        <h1 className={styles.articleTitle}>{post.title}</h1>
        <p className={styles.articleMeta}>
          {new Date(post.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
          {post.tags?.length ? ` • ${post.tags.join(", ")}` : ""}
        </p>
        <img
          src={post.cover}
          alt={post.title}
          className={styles.articleCover}
        />
      </header>

      <section
        className={styles.articleBody}
        dangerouslySetInnerHTML={{ __html: post.body || "" }}
      />

      <footer className={styles.articleFooter}>
        {post.pdfUrl && (
          <a
            href={post.pdfUrl}
            className={styles.primaryBtn}
            target="_blank"
            rel="noreferrer noopener"
            download
          >
            Descargar PDF
          </a>
        )}
      </footer>
    </article>
  );
}
