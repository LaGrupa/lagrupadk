import MiembrasI18n from "./MiembrasI18n";
import MiembrasSanity from "./MiembrasSanity";

export default function Page({
  params,
}: {
  params: { locale: string };
}) {
  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_MIEMBRAS === "true";
  return useSanity ? <MiembrasSanity locale={params.locale} /> : <MiembrasI18n />;
}
