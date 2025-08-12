import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.media}>
          <Image
            src="/site/hero.jpg"                   // moved into /public/site
            alt="Grupo de mujeres en picnic"
            fill
            priority
            sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 640px"
            className={styles.img}
          />
        </div>

        <div className={styles.content}>
          <h2 id="hero-title" className={styles.title}>
            Comunidad Feminista de Mujeres Migrantes
          </h2>
          <p className={styles.lead}>
            <strong>La Grupa</strong> es un espacio seguro y político creado por y para
            mujeres y disidencias migrantes en Dinamarca. Nos organizamos colectivamente
            para resistir, sanar y transformar nuestras realidades.
          </p>
          <Link href="/quienes-somos" className={styles.button} aria-label="Conocé más de La Grupa">
            Conocé más de La Grupa
          </Link>
        </div>
      </div>
    </section>
  );
}



