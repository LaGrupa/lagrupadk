import Image from "next/image";
import styles from "./Talleres.module.css";

type Taller = {
  title: string;
  date: string;
  img: string;
  desc: string;
};

const talleres: Taller[] = [
  {
    title: "Hatha Yoga",
    date: "19 Abril de 2025",
    img: "/taller-hatha.jpg",
    desc:
      "Yoga para dar paso a un post taller en el bar, compartiendo unas cervezas.",
  },
  {
    title: "Acuarelas",
    date: "25 Mayo de 2025",
    img: "/taller-acuarelas.jpg",
    desc:
      "El segundo taller a cargo de Lucía. Nos llevó del día a la noche para poder frenar la magia de los pinceles.",
  },
  {
    title: "Círculo de mujeres",
    date: "22 Junio de 2025",
    img: "/taller-circulo.jpg",
    desc:
      "El tercer taller fue un Círculo de Mujeres: espacios íntimos para la escucha, reflexión y red.",
  },
  {
    title: "Yoga Facial",
    date: "13 Julio de 2025",
    img: "/taller-yoga-facial.jpg",
    desc:
      "En el último taller antes del verano, practicamos Yoga Facial y meditación facial.",
  },
  {
    title: "Dibujar para encontrarse",
    date: "19 Agosto de 2025",
    img: "/taller-dibujar.jpg",
    desc:
      "El quinto taller nos encontró dibujando juntas. Un espacio para explorar y compartir procesos creativos.",
  },
];

export default function TalleresPage() {
  return (
    <>
      {/* Top green band */}
      <section className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1>Talleres</h1>
          <p>
            El principal objetivo de los talleres de La Grupa es que ninguna mujer de
            nuestra comunidad se quede aislada, sin referentes y afrontando en soledad
            situaciones machistas. Queremos que todas cuenten con un espacio donde
            puedan ser escuchadas y contenidas, donde tengan herramientas prácticas y
            una red que las entienda y acompañe.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.cards}>
            {talleres.map((t, i) => (
              <article key={i} className={styles.card}>
                <Image
                  src={t.img}
                  alt={t.title}
                  width={360}
                  height={200}
                  className={styles.image}
                  priority={i === 0}
                />
                <div className={styles.body}>
                  <h2 className={styles.cardTitle}>{t.title}</h2>
                  <small className={styles.date}>{t.date}</small>
                  <p className={styles.desc}>{t.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
