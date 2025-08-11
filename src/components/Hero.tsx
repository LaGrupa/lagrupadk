import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* Image */}
        <div className={styles.media}>
          <Image
            src="/hero.jpg"
            alt="Grupo de mujeres en picnic"
            fill
            priority
            sizes="(min-width: 1200px) 640px, (min-width: 900px) 50vw, 100vw"
            className={styles.img}
          />
        </div>

        {/* Text */}
        <div className={styles.content}>
          <h2 className={styles.title}>Comunidad Feminista de Mujeres Migrantes</h2>
          <p className={styles.lead}>
            <strong>La Grupa</strong> es un espacio seguro y político creado por y para
            mujeres y disidencias migrantes en Dinamarca. Nos organizamos colectivamente
            para resistir, sanar y transformar nuestras realidades.
          </p>
          <a href="#" className={styles.button}>Conocé más de La Grupa</a>
        </div>
      </div>
    </section>
  );
}


