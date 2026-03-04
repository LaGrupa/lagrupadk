import PublicacionSanity from "./PublicacionSanity";
import PublicacionFs from "./PublicacionFs";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da"; slug: string }>;
}) {
  const { locale, slug } = await params;

  const useSanity =
    process.env.NEXT_PUBLIC_USE_SANITY_PUBLICACIONES === "true";

  return useSanity ? (
    <PublicacionSanity locale={locale} slug={slug} />
  ) : (
    <PublicacionFs params={Promise.resolve({ locale, slug })} />
  );
}
