import Link from "next/link";
import Image from "next/image";
import styles from "./Recursero.module.css";

export default function RecurseroPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Recursero</h1>

        <div className={styles.cards}>
          {/* Card: Emprendedoras */}
          <Link href="/emprendedoras" className={styles.card}>
            <div className={styles.media}>
              <Image
                src="/site/recursero-emprendedoras.jpg"   // put in /public or swap for placeholder
                alt="Emprendedoras de La Grupa"
                width={480}
                height={300}
                className={styles.image}
              />
            </div>
            <h2 className={styles.cardTitle}>Emprendedoras</h2>
            <p className={styles.cardText}>
              Catálogo de emprendimientos de mujeres de La Grupa.
            </p>
          </Link>

          {/* Card: Libros */}
          <Link href="/libros" className={styles.card}>
            <div className={styles.media}>
              <Image
                src="/site/recursero-libros.jpg"          // put in /public or use placeholder
                alt="Libros recomendados"
                width={480}
                height={300}
                className={styles.image}
              />
            </div>
            <h2 className={styles.cardTitle}>Libros</h2>
            <p className={styles.cardText}>
              Colección de lecturas y recomendaciones de la comunidad.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

