import { client } from "@/sanity/lib/client";
import ContactClient from "./ContactClient";

const query = `
*[_type == "contactPage" && locale == $locale][0]{
  title,
  intro,
  image,
  imageAlt
}
`;

export default async function ContactSanity({ locale }: { locale: string }) {
  const data = await client.fetch(query, { locale });

  const title = data?.title ?? (locale === "da" ? "Kontakt" : "Contacto");
  const lead = data?.intro ?? "";
  const image = data?.image ?? null;
  const imageAlt = data?.imageAlt ?? null;

  return (
    <ContactClient
      title={title}
      lead={lead}
      image={image}
      imageAlt={imageAlt}
    />
  );
}
