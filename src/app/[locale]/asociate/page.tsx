// src/app/[locale]/asociate/page.tsx
"use client";

import styles from "./Asociate.module.css";
import { useT } from "@/i18n";

export default function AsociatePage() {
  const { t } = useT("asociate");

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        {(t("title") as string) ?? "Área de Socias"}
      </h1>
      <p className={styles.lead}>
        {(t("intro") as string) ??
          "Iniciá sesión para acceder al formulario y pago."}
      </p>

      {/* We’ll add login + payment buttons here in the next steps */}
      <div className={styles.placeholder}>
        <div className={styles.card}>
          <p>Acá van el acceso y el pago — / Her kommer login og betaling.</p>
        </div>
      </div>
    </main>
  );
}
