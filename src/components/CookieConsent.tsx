"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n";
import { I18nLink as Link } from "@/i18nLink";
import styles from "./CookieConsent.module.css";

type Value = "accepted" | "rejected" | null;

export default function CookieConsent({ initialValue }: { initialValue: Value }) {
  const { t, locale } = useT();
  const [value, setValue] = useState<Value>(initialValue);

  useEffect(() => {
    // allow footer link to reopen banner
    (window as any).showCookieBanner = () => setValue(null);
  }, []);

  if (value) return null;

  const setCookie = (v: "accepted" | "rejected") => {
    // 6 months
    document.cookie = `lg_consent=${v}; Max-Age=${60 * 60 * 24 * 30 * 6}; Path=/; SameSite=Lax; Secure`;
    setValue(v);
    // optional: reload to mount/unmount scripts based on consent
    location.reload();
  };

  return (
    <div className={styles.banner} role="dialog" aria-live="polite">
      <div className={styles.inner}>
        <div className={styles.text}>
          <strong>{t("cookies.title") as string}</strong>
          <p>{t("cookies.text") as string}</p>
          <Link href={`/${locale}/privacy`} className={styles.link}>
            {t("cookies.learnMore") as string}
          </Link>
        </div>
        <div className={styles.actions}>
          <button className={styles.reject} onClick={() => setCookie("rejected")}>
            {t("cookies.reject") as string}
          </button>
          <button className={styles.accept} onClick={() => setCookie("accepted")}>
            {t("cookies.accept") as string}
          </button>
        </div>
      </div>
    </div>
  );
}
