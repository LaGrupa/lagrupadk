"use client";

import { useRouter } from "next/navigation";
import styles from "./GoBackButton.module.css";

interface GoBackButtonProps {
  label?: string;
}

export default function GoBackButton({ label = "← Volver" }: GoBackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.goBack}
      onClick={() => router.back()}
    >
      {label}
    </button>
  );
}
