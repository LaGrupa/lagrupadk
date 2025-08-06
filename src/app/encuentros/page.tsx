import Image from "next/image";
import styles from "./Encuentros.module.css";

export default function EncuentrosPage() {
  const photos = ["/enc-1.jpg", "/enc-2.jpg", "/enc-3.jpg"]; // put these in /public

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Emprendedoras</h1>

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
