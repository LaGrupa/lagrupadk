// src/content/posts.ts
export type Post = {
  slug: string;
  locale: "es" | "da";
  title: string;
  blurb: string;
  cover: string; // image path under /public
  tags?: string[];
  date: string; // ISO string
  pdfUrl?: string;
  body?: string; // simple HTML for now (MD/MDX later)
};

const posts: Post[] = [
  {
    slug: "la-comunidad-como-forma-de-vida",
    locale: "es",
    title: "La comunidad como forma de vida",
    blurb: "Entrevista a Jose Herrera, co-creadora de La Grupa.",
    cover: "/artic/joherrera.jpg", // put the image at public/site/images/joherrera.jpg
    pdfUrl: "/artic/jo-herrera.pdf", // put the PDF at public/artic/jo-herrera.pdf
    tags: ["archivo", "entrevista"],
    date: "2025-10-10",
    body: `

    <h2>La comunidad como forma de vida</h2>

    <h3>La necesidad de organizarse</h3>
    <p>La necesidad de encontrar algún espacio donde organizarse para marchar por el 8M, por la IVE (Interrupción Voluntaria del Embarazo) y por todas las causas feministas impulsaron a Jose a buscar compañeras de lucha en un grupo de “argentinos en Dinamarca” en Facebook. Así fue que encontró, entre otras, a Juli y a Lara, quienes respondieron a su mensaje.</p>
    <p>Llegó a Copenhague apenas unas semanas antes de que comenzara la cuarentena por COVID-19, algo que describe como un hecho de “mucha suerte” en referencia a los aires de incertidumbre, aislamiento y paralización que dominarían la época que estaba comenzando en Dinamarca y el mundo.</p>
    <p>Dejó Argentina en 2020, un año significativo para el movimiento feminista. Las movilizaciones en pos de la legalización del aborto colmaban las calles de las principales ciudades de su país, y la llamada “marea verde” se replicaba también en otras capitales del mundo, impulsadas por argentinas migrantes apoyando la misma lucha.</p>

    <hr />

    <h2>No nacimos de un repollo</h2>
    <p>Nacimos del fuego colectivo, de la necesidad del encuentro, de unir fuerzas, de sostenernos en la lucha feminista. Por eso decidimos entrevistar a las creadoras de La Grupa, las que nos regalaron este espacio.</p>
    <p>María José “Jose” Herrera es argentina. Nació en la provincia de San Juan. Vivió y estudió en la ciudad de Rosario (Arg), y en 2020 llegó a Copenhague. Vivió en París y ahora en Bruselas, aunque no descarta volver a Dinamarca algún día.</p>
    <p>Jose es una de las creadoras de La Grupa y, en esta charla, nos cuenta cómo nació el proyecto y cuáles eran los planes que tenían para esta comunidad cuando la pensaron.</p>

    <hr />

    <h2>Entrevista a "Jose" Herrera, co-creadora de La Grupa</h2>
    <blockquote><p>“No sé qué esperaba cuando creamos La Grupa. Me parece que funciona muy bien, y que ha crecido incluso mucho más de lo que me hubiera imaginado en su momento que podía ser, que podía alcanzar. Fue tomando su propia forma”.</p></blockquote>
    <p>En ese entonces, la idea era simplemente organizarse para sumarse a la movilización del 8M, hacer pancartas, dar visibilidad. “Al año siguiente hicimos pañuelos con Pame y los repartimos por la ciudad y en la embajada.”</p>
    <p>Hoy ve en La Grupa una experiencia que merece ser replicada:</p>
    <blockquote><p>“Para mujeres migrantes, en un país tan diferente, con un idioma y una burocracia que rara vez entendemos, es muy valioso que exista un espacio así.”</p></blockquote>
    <p>Jose cuenta que intentó replicar el modelo de La Grupa en ciudades como Bruselas o París, pero que no tuvo el mismo resultado.</p>
    <blockquote><p>“Hay momentos de auge y de retroceso en la lucha feminista y creo que en ese momento se dieron muchas condiciones a favor.”</p></blockquote>
    <p>Más allá del contexto político en torno a la IVE, destaca la coincidencia generacional: “Un perfil de pibas parecido y un auge de organización feminista que nos ayudó a reunirnos; el esplendor de las visas working holidays y la necesidad compartida de construir red, de saber que no estás sola.”</p>

    <hr />

    <h2>El nacimiento de La Grupa</h2>
    <p>—Éramos cinco, empezamos a hablar, no sabíamos muy bien cómo queríamos hacer. Creo que fue Juli, que había visto algún flyer de un espacio por Nørrebro para una pintada de carteles. Así que nos juntamos para hacerlos y prepararnos para la marcha.</p>
    <p>Habíamos hecho ya un grupo. Fue increíble. Nos juntamos con un grupo de chilenas que iban a hacer el flashmob de “El violador eres tú”, así que hicimos una mini marcha, mini movilización por nuestra parte y terminamos en una placita que está atrás del Torvehallerne. Éramos un montón, como 100 pibas con nuestros carteles y los pañuelos. Y desde ahí empezó a crecer.</p>
    <p>Jose recuerda que aunque al principio no estaba del todo claro el carácter distintivo de La Grupa, pronto fue encontrando su consolidación como espacio político y afectivo con una identidad definida: una red de cuidado y acompañamiento para mujeres migrantes en Dinamarca.</p>
    <blockquote><p>“Sirvió para organizarnos, pero también para compartir información importante sobre trámites, salud, vivienda, trabajo y situaciones sensibles como abortos o casos de chicas en situación migratoria irregular.”</p></blockquote>

    <hr />

    <h2>La Grupa como organismo vivo</h2>
    <blockquote><p>“La Grupa es un organismo vivo que va a ir tomando la forma que necesite y que sus integrantes le van dando. Mi consejo es realmente abrirse, ofrecer y pedir ayuda. Que sea un espacio diferencial, más generador de comunidad que un compra y venta.”</p></blockquote>
    <p>Incluso como grupo de intercambio, le parece que ha mantenido una identidad diferente:</p>
    <blockquote><p>“Con más confianza, compromiso, dar la cara, responsabilidad de qué estoy vendiendo, en qué condiciones, en qué precio. Y hay algo de esa responsabilidad que tenemos entre nosotras, que no está en los otros grupos.”</p></blockquote>

    <hr />

    <h2>El futuro de la comunidad</h2>
    <blockquote><p>“Para el futuro de La Grupa, todo, la verdad. Que se pueda multiplicar. Para mí, construir comunidades es una de las cosas más fundamentales, casi como una democracia radical, activa. Estar cerca de lo que nos interesa, de lo que nos preocupa; darnos una mano, tejer redes, construir con el conocimiento y herramientas que tenemos para resolver problemas reales de cada una de nosotras.”</p></blockquote>
    <p>Retomando el concepto de organismo vivo, Jose enfatiza:</p>
    <blockquote><p>“También les deseo paciencia. Cada organización toma el carácter y la forma de la gente que la compone. Hay que tomárselo con calma. Poner reglas puede ser complejo. Tal vez hay que dejar que fluya como pueda.”</p></blockquote>
    <p>Cuenta el valor del encuentro presencial:</p>
    <blockquote><p>“Yo a veces he hablado o he solucionado problemas de chicas que jamás vi en mi vida. A veces en el encuentro surgen otras cosas o una tiene más confianza.”</p></blockquote>

    <hr />

    <h2>El siguiente paso</h2>
    <p>Por último, hablamos con Jose sobre la posibilidad de institucionalizar a La Grupa como una asociación:</p>
    <blockquote><p>“Las asociaciones te generan una plataforma, puede ser muy interesante. A veces para crecer o para solidificar hay que sacrificar algunas cosas, pero no hay que tener miedo. Hay que poder escuchar también qué está pasando.”</p></blockquote>
    <p>Asegura que cada miembro tiene diferentes perspectivas y necesidades dentro de la comunidad, y finaliza:</p>
    <blockquote><p>“Creo que el contexto se va a poner un poco más difícil y que va a ser súper necesario tener redes. Lo importante es la solidaridad, el sostén, la escucha, la confidencialidad también, para poder confiar. Y poner el conocimiento que cada una tiene y que ha ido recabando al servicio de las que vienen, para que ellas no tengan que pasar por lo mismo.”</p></blockquote>

    <hr />

    <h2>Cierre</h2>
    <p>Como todo lo vivo, <strong>La Grupa sigue creciendo, cambiando, latiendo.</strong> Lo importante, como dice Jose, <strong>es no soltar la red.</strong></p>
    <p>Gracias, Jose, por encender esa chispa, y gracias a todas las que la mantienen viva.</p>
  `,
  },

  {
    slug: "publicacion-2",
    locale: "es",
    title: "Publicación 2",
    blurb:
      "Colección de lecturas y recomendaciones de la comunidad, con apuntes prácticos.",
    cover: "/site/recursero-libros.jpg",
    pdfUrl: "/pdf/publicacion-2.pdf",
    tags: ["lecturas", "recomendaciones"],
    date: "2025-08-20",
    body: `
      <p>Una selección curada de lecturas con notas breves y propuestas para llevar a la práctica.</p>
      <ul><li>Cómo organizar un club de lectura.</li><li>Herramientas para notas colectivas.</li></ul>
    `,
  },
];
console.log("posts loaded");
export function getAllPosts(locale: "es" | "da") {
  return posts
    .filter((p) => p.locale === locale)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(locale: "es" | "da", slug: string) {
  return getAllPosts(locale).find((p) => p.slug === slug) || null;
}

export function getAllTags(locale: "es" | "da") {
  const set = new Set<string>();
  getAllPosts(locale).forEach((p) => p.tags?.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
