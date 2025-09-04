import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { I18nProvider } from "../../i18n";
import es from "../../messages/es.json";
import da from "../../messages/da.json";
import { cookies } from "next/headers";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import CookieConsent from "@/components/CookieConsent";

const dictionaries = { es, da } as const;

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "da" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  // params must be awaited in Next 15 dev
  params: Promise<{ locale: "es" | "da" }>;
}) {
  // await params before using it
  const { locale } = await params;
  const dict = dictionaries[locale];

  // await cookies() before reading values
  const cookieStore = await cookies();
  const consent = cookieStore.get("lg_consent")?.value as
    | "accepted"
    | "rejected"
    | undefined;

  return (
    <I18nProvider locale={locale} dict={dict}>
      <Navbar />
      <main>{children}</main>
      <Footer />

      {/* Load analytics only if user accepted */}
      <AnalyticsScripts enabled={consent === "accepted"} />

      {/* Show bilingual cookie banner when no choice yet */}
      <CookieConsent initialValue={consent ?? null} />
    </I18nProvider>
  );
}
















 

