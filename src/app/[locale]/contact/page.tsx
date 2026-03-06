import Contact from "@/components/Contact";
import ContactSanity from "./ContactSanity";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_CONTACT === "true";
  return useSanity ? <ContactSanity locale={locale} /> : <Contact />;
}
