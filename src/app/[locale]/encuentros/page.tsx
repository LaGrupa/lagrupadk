import EncuentrosI18n from "./EncuentrosI18n";
import EncuentrosSanity from "./EncuentrosSanity";

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_ENCUENTROS === "true";

  return useSanity ? <EncuentrosSanity locale={locale} /> : <EncuentrosI18n />;
}
