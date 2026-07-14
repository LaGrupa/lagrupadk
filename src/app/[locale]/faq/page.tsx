import FaqI18n from "./FaqI18n";
import FaqSanity from "./FaqSanity";

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_FAQ === "true";
  return useSanity ? <FaqSanity locale={locale} /> : <FaqI18n />;
}
