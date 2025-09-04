import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { I18nProvider } from "../../i18n";
import es from "../../messages/es.json";
import da from "../../messages/da.json";

const dictionaries = { es, da } as const;

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "da" }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: "es" | "da" };
}) {
  const { locale } = params;
  const dict = dictionaries[locale];

  return (
    <I18nProvider locale={locale} dict={dict}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </I18nProvider>
  );
}














 

