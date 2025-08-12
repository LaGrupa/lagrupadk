import Link from "next/link";
import Image from "next/image";
import styles from "./QueHacemos.module.css";

const encuentrosImg = "/site/encuentros.jpg";
const talleresImg = "/site/talleres.jpg";

export default function QueHacemosPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¿Qué hacemos?</h1>

      <div className={styles.cards}>
        <Link href="/talleres" className={styles.card}>
          <Image
            src={talleresImg}
            alt="Talleres"
            width={480}
            height={300}
            className={styles.image}
          />
          <h2 className={styles.cardTitle}>Talleres</h2>
        </Link>

        <Link href="/encuentros" className={styles.card}>
          <Image
            src={encuentrosImg}
            alt="Encuentros"
            width={480}
            height={300}
            className={styles.image}
          />
          <h2 className={styles.cardTitle}>Encuentros</h2>
        </Link>
      </div>
    </div>
  );
}



