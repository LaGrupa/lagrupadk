import styles from "@/components/Blog.module.css";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { I18nLink as Link } from "@/i18nLink";
import { PortableText } from "@portabletext/react";

type SanityPost = {
  title: string;
  excerpt?: string | null;
  tags?: string[] | null;
  publishedAt?: string | null;
  _createdAt?: string;
  coverImage?: any;
  coverImageAlt?: string | null;
  body?: any[] | null;
  pdfFile?: { asset?: { url?: string } } | null;
  pdfLabel?: string | null;
};

const query = `
*[_type=="post" && locale==$locale && slug.current==$slug][0]{
  title,
  excerpt,
  tags,
  publishedAt,
  _createdAt,
  coverImage,
  coverImageAlt,
  body,
  pdfLabel,
  "pdfFile": pdfFile{asset->{url}}
}
`;

export default async function PublicacionSanity({
  locale,
  slug,
}: {
  locale: "es" | "da";
  slug: string;
}) {
  const post: SanityPost | null = await client.fetch(query, { locale, slug });

  if (!post) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.empty}>No encontrada.</p>
          <p>
            <Link href={`/${locale}/publicaciones`}>← Volver a Publicaciones</Link>
          </p>
        </div>
      </section>
    );
  }

  const dateStr =
    post.publishedAt ?? post._createdAt ?? new Date().toISOString();

  return (
    <article className={styles.article}>
      <header className={styles.articleHeader}>
        <p style={{ margin: 0 }}>
          <Link href={`/${locale}/publicaciones`}>← Publicaciones</Link>
        </p>

        <h1 className={styles.articleTitle}>{post.title}</h1>

        <p className={styles.articleMeta}>
          {new Date(dateStr).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
          {post.tags?.length ? ` • ${post.tags.join(", ")}` : ""}
        </p>

        {post.coverImage && (
          <img
            src={urlFor(post.coverImage).width(1600).url()}
            alt={post.coverImageAlt ?? post.title}
            className={styles.articleCover}
          />
        )}
      </header>

      {post.body?.length ? (
        <section className={styles.articleBody}>
          <PortableText value={post.body} />
        </section>
      ) : null}

      <footer className={styles.articleFooter}>
        {post.pdfFile?.asset?.url && (
          <a
            href={post.pdfFile.asset.url}
            className={styles.primaryBtn}
            target="_blank"
            rel="noreferrer noopener"
          >
            {post.pdfLabel ?? "Descargar PDF"}
          </a>
        )}
      </footer>
    </article>
  );
}
