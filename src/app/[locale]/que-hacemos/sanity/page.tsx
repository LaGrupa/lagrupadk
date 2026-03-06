import { client } from "@/sanity/lib/client";
import QueHacemosSanity from "../QueHacemosSanity";

const QUERY = `
*[_type == "whatWeDoPage" && locale == $locale][0]{
  title,
  cards[]{
    title,
    href,
    imageAlt,
    "imageUrl": image.asset->url
  }
}
`;

type Data = {
  title: string;
  cards: {
    title?: string | null;
    href?: string | null;
    imageAlt?: string | null;
    imageUrl?: string | null;
  }[];
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const data: Data | null = await client.fetch(QUERY, { locale });

  if (!data) {
    return (
      <main style={{ padding: 24 }}>
        <h1>No whatWeDoPage found</h1>
        <p>Locale: {locale}</p>
      </main>
    );
  }

  return <QueHacemosSanity title={data.title} locale={locale} cards={data.cards ?? []} />;
}
