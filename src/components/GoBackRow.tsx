"use client";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n";
import styles from "./GoBackRow.module.css";

function tx(v: unknown, fb: string) {
  return typeof v === "string" && v.trim() ? v : fb;
}

export default function GoBackRow() {
  const router = useRouter();
  const { t } = useT();
  const label = tx(t("ui.back"), "Volver");
  const aria  = tx(t("ui.backAria"), "Volver atrás");

  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => router.back()}
        aria-label={aria}
      >
        <span className={styles.arrow} aria-hidden>←</span>
        {label}
      </button>
    </div>
  );
}

