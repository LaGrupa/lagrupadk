import PublicacionesSanity from "./PublicacionesSanity";
import PublicacionesFs from "./PublicacionesFs";

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const useSanity =
    process.env.NEXT_PUBLIC_USE_SANITY_PUBLICACIONES === "true";

  return useSanity ? (
    <PublicacionesSanity locale={locale} />
  ) : (
    <PublicacionesFs params={Promise.resolve({ locale })} />
  );
}
