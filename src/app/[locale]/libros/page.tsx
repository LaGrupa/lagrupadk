import LibrosI18n from "./LibrosI18n";
import LibrosSanity from "./LibrosSanity";

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_LIBROS === "true";

  return useSanity ? <LibrosSanity locale={locale} /> : <LibrosI18n />;
}
