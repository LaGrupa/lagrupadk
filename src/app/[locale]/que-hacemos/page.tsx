import { client } from "@/sanity/lib/client";
import QueHacemosSanity from "./QueHacemosSanity";
import QueHacemosI18n from "./QueHacemosI18n";

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

export default async function Page({ params }: { params: { locale: string } }) {
  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_QUE_HACEMOS === "true";

  // If feature flag OFF → render existing i18n page
  if (!useSanity) {
    return <QueHacemosI18n />;
  }

  // If feature flag ON → render Sanity version
  const data: Data | null = await client.fetch(QUERY, {
    locale: params.locale,
  });

  if (!data) {
    return (
      <main style={{ padding: 24 }}>
        <h1>No whatWeDoPage found</h1>
        <p>Locale: {params.locale}</p>
      </main>
    );
  }

  return (
    <QueHacemosSanity
      title={data.title}
      locale={params.locale}
      cards={data.cards ?? []}
    />
  );
}
