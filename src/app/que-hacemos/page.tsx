import Link from "next/link";
import styles from "./QueHacemos.module.css";
import Image from "next/image";
import talleresImg from "../../../public/talleres.jpg";
import encuentrosImg from "../../../public/encuentros.jpg";

export default function QueHacemosPage() {
  return (
    <div className={styles.container}>
      <h1>¿Qué hacemos?</h1>
      <div className={styles.cards}>
        <Link href="/talleres" className={styles.card}>
          <Image src={talleresImg} alt="Talleres" />
          <h2>Talleres</h2>
        </Link>
        <Link href="/encuentros" className={styles.card}>
          <Image src={encuentrosImg} alt="Encuentros" />
          <h2>Encuentros</h2>
        </Link>
      </div>
    </div>
  );
}
