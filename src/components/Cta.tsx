import Image from "next/image";
import styles from "./Cta.module.css";

export default function Cta() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Text */}
        <div className={styles.text}>
          <h3>Fortalecé tu camino migrante<br/>junto a La Grupa</h3>
          <ul className={styles.list}>
            <li>Sumate como miembra en nuestra comunidad feminista</li>
            <li>Participá en encuentros para compartir, sanar y organizarnos</li>
            <li>Construí con nosotras un espacio seguro y colectivo</li>
          </ul>
          <a href="#" className={styles.button}>Contactanos</a>
        </div>

        {/* Image */}
        <div className={styles.imageWrap}>
          <Image
            src="/cta.jpg"  // put this file in /public
            alt="Miembros de La Grupa"
            width={560}
            height={360}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
