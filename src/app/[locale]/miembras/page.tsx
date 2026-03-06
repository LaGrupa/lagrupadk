import MiembrasI18n from "./MiembrasI18n";
import MiembrasSanity from "./MiembrasSanity";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_MIEMBRAS === "true";
  return useSanity ? <MiembrasSanity locale={locale} /> : <MiembrasI18n />;
}
