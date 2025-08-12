import Image from "next/image";
import styles from "./QuienesSomos.module.css";

export default function QuienesSomosPage() {
  return (
    <>
      {/* FULL-WIDTH HERO (pastel background) */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.media}>
            <Image
              src="/site/quienes1.jpg" 
              alt="La Grupa en marcha en Copenhague"
              className={styles.image}
              width={550}
              height={366}
              priority
              sizes="(max-width: 899px) 100vw, 48vw"
            />
          </div>

          <div className={styles.text}>
            <h2>Quiénes Somos</h2>
            <p>
              <strong>La Grupa nació en febrero de 2020</strong>, como una forma de
              encontrarnos para marchar juntas el 8 de marzo en Copenhague. Fue un
              gesto simple, pero poderoso: una invitación a reconocernos entre mujeres
              hispanohablantes migrantes, con historias diversas, ganas de organizarnos
              y la necesidad compartida de sentirnos menos solas.
            </p>
            <p>
              Ese primer encuentro encendió algo. Con el tiempo, La Grupa dejó de ser
              solo un espacio para organizar actividades puntuales, y se transformó en
              una red viva: un lugar donde compartimos información útil, acompañamos
              emergencias, transitamos juntas la vida diaria en Dinamarca y, sobre todo,
              <strong> nos cuidamos entre todas</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* REST OF PAGE (contained) */}
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Block 2 */}
          <div className={styles.block}>
            <div className={styles.text}>
              <p>
                En julio de 2023 decidimos dar un paso más y consolidarnos como una
                comunidad organizada. Lo hicimos con una convicción firme:
                <strong> La Grupa no es un grupo más</strong>. Es un espacio seguro y
                feminista, construido colectivamente, donde el respeto, la escucha, la
                empatía y la sororidad son principios fundamentales.
              </p>
              <p>
                Desde entonces, funcionamos como una comunidad autogestiva con un
                equipo de administradoras voluntarias que sostienen y cuidan el
                espacio. <strong>Hoy La Grupa es una red que acompaña y abraza</strong>.
                Un lugar donde compartimos desde dudas triviales hasta situaciones
                complejas; donde se puede preguntar por productos de nuestros países,
                pedir ayuda con un trámite o encontrar apoyo en una crisis. También es
                un espacio que se ha movido frente a casos de violencia, emergencias
                diversas y tantas otras situaciones que marcan nuestras vidas como
                mujeres migrantes.
              </p>
              <p>
                Queremos seguir creciendo de manera colectiva, cuidada y comprometida.
                Por eso, es importante que quienes se suman comprendan nuestra historia,
                nuestros valores y el lugar que queremos seguir construyendo juntas.
              </p>
            </div>

            <div className={styles.media}>
              <Image
                src="/site/quienes2.jpg"
                alt="Integrantes de La Grupa"
                className={styles.image}
                width={550}
                height={366}
                sizes="(max-width: 899px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Misión / Visión */}
          <div className={styles.missionVision}>
            <div>
              <h3>Nuestra Misión</h3>
              <p>
                La misión de La Grupa es la edificación de una comunidad feminista de
                mujeres hispanohablantes migrantes en Dinamarca. Se basa en principios
                de sororidad, escucha activa, horizontalidad, red y cuidado colectivo.
                Acompañamos con empatía en la vida cotidiana, en una urgencia o en
                emergencias, compartiendo recursos, información útil y apoyo mutuo.
              </p>
              <p>
                <strong>
                  Buscamos transformar la experiencia migrante en una vivencia
                  acompañada, digna y colectiva.
                </strong>
              </p>
            </div>

            <div>
              <h3>Nuestra Visión</h3>
              <p>
                Ser el espacio de referencia para mujeres hispanohablantes en Dinamarca
                que buscan una comunidad feminista, comprometida, cálida y solidaria.
                Queremos fortalecer el orgullo de pertenecer a una red que refleja
                nuestros valores y convicciones en su sostén real, emocional y práctico
                para enfrentar juntas los desafíos de migrar y vivir lejos de casa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

