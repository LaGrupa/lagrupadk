import Link from "next/link";
import styles from "./ThreeColumns.module.css";

export default function ThreeColumns() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.col}>
          <h3>Talleres</h3>
          <p>
            Organizamos talleres de mujeres y para mujeres, donde compartimos
            herramientas, experiencias y conocimientos. Han pasado por nuestros
            espacios talleres de yoga, dibujo, círculo de mujeres, acuarelas y más.
          </p>
          <Link href="/talleres" className={styles.link}>Ver nuestros talleres</Link>
        </div>

        <div className={styles.col}>
          <h3>Encuentros</h3>
          <p>
            También hacemos encuentros abiertos para conversar, descansar y pensar en
            comunidad. Esos espacios son tan importantes como cualquier otra actividad:
            nos ayudan a sentirnos menos solas.
          </p>
          <Link href="/encuentros" className={styles.link}>Fecha del próximo encuentro</Link>
        </div>

        <div className={styles.col}>
          <h3>Acompañamientos</h3>
          <p>
            Cuando alguna mujer está atravesando una situación difícil (como violencia,
            discriminación, o un momento de crisis) acompañamos y escuchamos, compartimos
            recursos y buscamos juntas formas de sostener.
          </p>
          <Link href="/contact" className={styles.link}>Contactanos</Link>
        </div>
      </div>
    </section>
  );
}
