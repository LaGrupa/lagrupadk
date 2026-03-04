"use client";

import styles from "./Miembras.module.css";

function extractIframe(embed?: string | null) {
  const raw = (embed ?? "").trim();
  if (!raw) return null;

  // Allow ONLY a single iframe tag (basic safety)
  const match = raw.match(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/i);
  return match ? match[0] : null;
}

export default function MiembrasClient({
  title,
  intro,
  formUrl,
  formEmbed,
}: {
  title: string;
  intro?: string | null;
  formUrl?: string | null;
  formEmbed?: string | null;
}) {
  const iframe = extractIframe(formEmbed);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      {intro && <p className={styles.lead}>{intro}</p>}

      <div className={styles.placeholder}>
        <div className={styles.card}>
          {iframe ? (
            <div
              className={styles.embedWrap}
              dangerouslySetInnerHTML={{ __html: iframe }}
            />
          ) : formUrl ? (
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              Open Membership Form
            </a>
          ) : (
            <p>No form configured yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
