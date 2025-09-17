"use client";

import Image from "next/image";
import styles from "./Blog.module.css";
import { I18nLink as Link } from "@/i18nLink";

type Props = {
  href: string;
  title: string;
  blurb: string;
  cover: string;
  tags?: string[];
};

export default function BlogCard({ href, title, blurb, cover, tags }: Props) {
  return (
    <Link href={href} className={styles.card} aria-label={`Abrir: ${title}`}>
      <div className={styles.media}>
        <Image
          src={cover}
          alt={title}
          width={480}
          height={300}
          className={styles.image}
        />
      </div>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardText}>{blurb}</p>
      {!!tags?.length && (
        <div className={styles.cardTags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.cardTag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
