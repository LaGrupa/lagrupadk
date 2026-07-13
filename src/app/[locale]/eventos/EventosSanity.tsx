import SanityEventPage from "@/components/SanityEventPage";

export default async function EventosSanity({
  locale,
}: {
  locale: "es" | "da";
}) {
  return (
    <SanityEventPage
      locale={locale}
      type="evento"
      labels={{
        pageTitle: { es: "Eventos", da: "Begivenheder" },
        upcomingTitle: { es: "Próximos", da: "Kommende" },
        pastTitle: { es: "Anteriores", da: "Tidligere" },
        emptyUpcomingTitle: {
          es: "No hay próximos eventos",
          da: "Ingen kommende begivenheder",
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
