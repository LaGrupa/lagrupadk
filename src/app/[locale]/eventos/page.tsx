import EventosI18n from "./EventosI18n";
import EventosSanity from "./EventosSanity";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_EVENTOS === "true";

  return useSanity ? <EventosSanity locale={locale} /> : <EventosI18n />;
}
