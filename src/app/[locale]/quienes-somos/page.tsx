"use client";

import Image from "next/image";
import styles from "./QuienesSomos.module.css";
import { useT } from "../../../i18n";

export default function QuienesSomosPage() {
  const { t } = useT("quienes");

  // Ensure alt texts are strings
  const heroAlt = (t("heroImgAlt") as string | undefined) ?? "";
  const secondAlt = (t("secondImgAlt") as string | undefined) ?? "";

  return (
    <>
      {/* FULL-WIDTH HERO (pastel background) */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.media}>
            <Image
              src="/site/quienes1.jpg"
              alt={heroAlt}
              className={styles.image}
              width={550}
              height={366}
              priority
              sizes="(max-width: 899px) 100vw, 48vw"
            />
          </div>

          <div className={styles.text}>
            <h2>{t("title") as string}</h2>
            <p>{t("p1") as string}</p>
            <p>{t("p2") as string}</p>
          </div>
        </div>
      </section>

      {/* REST OF PAGE (contained) */}
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Block 2 */}
          <div className={styles.block}>
            <div className={styles.text}>
              <p>{t("p3") as string}</p>
              <p>{t("p4") as string}</p>
              <p>{t("p5") as string}</p>
            </div>

            <div className={styles.media}>
              <Image
                src="/site/quienes2.jpg"
                alt={secondAlt}
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
              <h3>{t("missionTitle") as string}</h3>
              <p>{t("missionP1") as string}</p>
              <p>
                <strong>{t("missionStrong") as string}</strong>
              </p>
            </div>

            <div>
              <h3>{t("visionTitle") as string}</h3>
              <p>{t("visionP1") as string}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



