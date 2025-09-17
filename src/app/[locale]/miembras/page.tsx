"use client";

import styles from "./Miembras.module.css";
import { useT } from "@/i18n";

export default function MiembrasPage() {
  const { t } = useT("miembras");
  const s = (k: string) => (t(k) as string | undefined) ?? "";

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{s("title") || "Área de Miembras"}</h1>
      <p className={styles.lead}>
        {s("intro") || "Iniciá sesión para acceder al formulario y pago."}
      </p>

      <div className={styles.placeholder}>
        <div className={styles.card}>
          <p>Acá van el acceso y el pago — / Her kommer login og betaling.</p>
        </div>
      </div>
    </main>
  );
}
