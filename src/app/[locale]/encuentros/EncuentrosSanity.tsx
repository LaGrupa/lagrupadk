import SanityEventPage from "@/components/SanityEventPage";

export default async function EncuentrosSanity({
  locale,
}: {
  locale: "es" | "da";
}) {
  return (
    <SanityEventPage
      locale={locale}
      type="encuentro"
      labels={{
        pageTitle: { es: "Encuentros", da: "Møder" },
        upcomingTitle: { es: "Próximos", da: "Kommende" },
        pastTitle: { es: "Anteriores", da: "Tidligere" },
        emptyUpcomingTitle: {
          es: "No hay próximos encuentros",
          da: "Ingen kommende møder",
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
