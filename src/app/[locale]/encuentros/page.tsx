import Image from "next/image";
import styles from "./Encuentros.module.css";

export default function EncuentrosPage() {
  const photos = ["/site/enc-1.jpg", "/site/enc-2.jpg", "/site/enc-3.jpg"]; // put these in /public

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Encuentros</h1>

        <div className={styles.grid}>
          {photos.map((src, i) => (
            <article key={i} className={styles.card}>
              <Image
                src={src}
                alt={`Encuentro ${i + 1}`}
                width={360}
                height={220}
                className={styles.image}
                priority={i === 0}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
