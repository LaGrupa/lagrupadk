"use client";

import type { ReactNode } from "react";
import { use } from "react";
import Navbar from "../../components/Navbar";
import { I18nProvider } from "../../i18n";
import es from "../../messages/es.json";
import da from "../../messages/da.json";

const dictionaries = { es, da } as const;

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = use(params);   // <-- unwrap the params Promise
  const dict = dictionaries[locale];

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="site">
        <I18nProvider locale={locale} dict={dict}>
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}









 

