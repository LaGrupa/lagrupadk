import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <Image
            src="/hero.jpg"
            alt="Grupo de mujeres en picnic"
            width={500}
            height={400}
            className={styles.image}
          />
        </div>

        {/* Text */}
        <div className={styles.textWrapper}>
          <h2>Comunidad Feminista de Mujeres Migrantes</h2>
          <p>
            <strong>La Grupa</strong> es un espacio seguro y político creado por y para
            mujeres y disidencias migrantes en Dinamarca. Nos organizamos colectivamente
            para resistir, sanar y transformar nuestras realidades.
          </p>
          <a href="#" className={styles.button}>
            Conocé más de La Grupa
          </a>
        </div>
      </div>
    </section>
  );
}
