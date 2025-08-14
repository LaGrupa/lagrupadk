import Link from "next/link";
import Image from "next/image";
import styles from "./QueHacemos.module.css";

const encuentrosImg = "/site/encuentros.jpg";
const talleresImg   = "/site/talleres.jpg";

export default function QueHacemosPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¿Qué hacemos?</h1>

      <div className={styles.cards}>
        <Link href="/talleres" className={styles.card}>
          <div className={styles.media}>
            <Image
              src={talleresImg}
              alt="Talleres"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>Talleres</h2>
          </div>
        </Link>

        <Link href="/encuentros" className={styles.card}>
          <div className={styles.media}>
            <Image
              src={encuentrosImg}
              alt="Encuentros"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
          <div className={styles.body}>
            <h2 className={styles.cardTitle}>Encuentros</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}




