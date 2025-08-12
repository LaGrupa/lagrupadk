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
          <a className={`${styles.button} u-btnWideMobile`} href="/contact">Contactanos</a>
        </div>

        {/* Image */}
        <div className={styles.imageWrap}>
          <Image
            src="/site/cta.jpg"
            alt="Miembros de La Grupa"
            fill
            sizes="(max-width: 899px) 100vw, 44vw"
            className={styles.image}
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}



