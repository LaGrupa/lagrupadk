import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { I18nProvider } from "../../i18n";
import es from "../../messages/es.json";
import da from "../../messages/da.json";
import CloudflareAnalytics from "@/components/CloudflareAnalytics";

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

  return (
    // Set per-locale language to enable correct hyphenation/justification
    <div lang={locale}>
      <I18nProvider locale={locale} dict={dict}>
        <Navbar />
        <main>{children}</main>
        <Footer locale={locale} />

        <CloudflareAnalytics />
      </I18nProvider>
    </div>
  );
}
