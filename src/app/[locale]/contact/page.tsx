import Contact from "@/components/Contact";
import ContactSanity from "./ContactSanity";

export default function Page({
  params,
}: {
  params: { locale: string };
}) {
  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_CONTACT === "true";
  return useSanity ? <ContactSanity locale={params.locale} /> : <Contact />;
}
