import { client } from "@/sanity/lib/client";
import MiembrasClient from "./MiembrasClient";

const query = `
*[_type == "membersPage" && locale == $locale][0]{
  title,
  intro,
  formUrl,
  formEmbed
}
`;

export default async function MiembrasSanity({ locale }: { locale: string }) {
  const data = await client.fetch(query, { locale });

  return (
    <MiembrasClient
      title={data?.title ?? "Área de Miembras"}
      intro={data?.intro ?? null}
      formUrl={data?.formUrl ?? null}
      formEmbed={data?.formEmbed ?? null}
    />
  );
}
