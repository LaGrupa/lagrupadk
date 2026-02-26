import Image from "next/image";
import styles from "./QuienesSomos.module.css";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const ABOUT_QUERY = `*[_type == "aboutPage" && locale == $locale][0]{
  hero{title, p1, p2, image, imageAlt},
  block2{p3, p4, p5, image, imageAlt},
  mission{title, p1, strongLine},
  vision{title, p1}
}`;

export default async function QuienesSomosSanityPage({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;
  const data = await client.fetch(ABOUT_QUERY, { locale });

  const heroAlt = data?.hero?.imageAlt ?? "";
  const secondAlt = data?.block2?.imageAlt ?? "";

  const heroImg = data?.hero?.image
    ? urlFor(data.hero.image).width(1100).height(732).url()
    : "/site/quienes1.jpg";

  const secondImg = data?.block2?.image
    ? urlFor(data.block2.image).width(1100).height(732).url()
    : "/site/quienes2.jpg";

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.media}>
            <Image
              src={heroImg}
              alt={heroAlt}
              className={styles.image}
              width={550}
              height={366}
              priority
              sizes="(max-width: 899px) 100vw, 48vw"
            />
          </div>

          <div className={styles.text}>
            <h2>{data?.hero?.title ?? ""}</h2>
            {data?.hero?.p1 ? <p>{data.hero.p1}</p> : null}
            {data?.hero?.p2 ? <p>{data.hero.p2}</p> : null}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.block}>
            <div className={styles.text}>
              {data?.block2?.p3 ? <p>{data.block2.p3}</p> : null}
              {data?.block2?.p4 ? <p>{data.block2.p4}</p> : null}
              {data?.block2?.p5 ? <p>{data.block2.p5}</p> : null}
            </div>

            <div className={styles.media}>
              <Image
                src={secondImg}
                alt={secondAlt}
                className={styles.image}
                width={550}
                height={366}
                sizes="(max-width: 899px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className={styles.missionVision}>
            <div>
              <h3>{data?.mission?.title ?? ""}</h3>
              {data?.mission?.p1 ? <p>{data.mission.p1}</p> : null}
              {data?.mission?.strongLine ? (
                <p>
                  <strong>{data.mission.strongLine}</strong>
                </p>
              ) : null}
            </div>

            <div>
              <h3>{data?.vision?.title ?? ""}</h3>
              {data?.vision?.p1 ? <p>{data.vision.p1}</p> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
