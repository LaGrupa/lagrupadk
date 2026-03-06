import SanityEventPage from "@/components/SanityEventPage";

export default async function TalleresSanity({
  locale,
}: {
  locale: "es" | "da";
}) {
  return (
    <SanityEventPage
      locale={locale}
      type="taller"
      labels={{
        pageTitle: { es: "Talleres", da: "Workshops" },
        upcomingTitle: { es: "Próximos", da: "Kommende" },
        pastTitle: { es: "Anteriores", da: "Tidligere" },
        emptyUpcomingTitle: {
          es: "No hay próximos talleres",
          da: "Ingen kommende workshops",
        },
        emptyUpcomingDesc: {
          es: "Volvé más tarde para nuevas fechas.",
          da: "Kom tilbage senere for nye datoer.",
        },
        archiveLabel: {
          es: (n) => `Ver archivo (${n})`,
          da: (n) => `Se arkiv (${n})`,
        },
      }}
    />
  );
}
