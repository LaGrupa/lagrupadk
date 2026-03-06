import TalleresI18n from "./TalleresI18n";
import TalleresSanity from "./TalleresSanity";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_TALLERES === "true";

  return useSanity ? <TalleresSanity locale={locale} /> : <TalleresI18n />;
}
