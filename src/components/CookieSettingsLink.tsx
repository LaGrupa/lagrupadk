"use client";
import { useT } from "@/i18n";

export function CookieSettingsLink({ className }: { className?: string }) {
  const { t } = useT();
  return (
    <button
      className={className}
      onClick={() => {
        document.cookie = "lg_consent=; Max-Age=0; Path=/";
        (window as any).showCookieBanner?.();
      }}
    >
      {t("cookies.manage") as string}
    </button>
  );
}
