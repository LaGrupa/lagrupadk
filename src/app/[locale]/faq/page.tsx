import FaqI18n from "./FaqI18n";
import FaqSanity from "./FaqSanity";

export default function Page({
  params,
}: {
  params: { locale: string };
}) {
  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_FAQ === "true";

  return useSanity ? <FaqSanity locale={params.locale} /> : <FaqI18n />;
}
