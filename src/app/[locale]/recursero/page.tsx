import { client } from "@/sanity/lib/client";
import RecurseroSanity from "./RecurseroSanity";
import RecurseroI18n from "./RecurseroI18n";

const QUERY = `
*[_type == "recurseroPage" && locale == $locale][0]{
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
  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_RECURSERO === "true";

  if (!useSanity) {
    return <RecurseroI18n />;
  }

  const data: Data | null = await client.fetch(QUERY, {
    locale: params.locale,
  });

  if (!data) {
    return (
      <main style={{ padding: 24 }}>
        <h1>No recurseroPage found</h1>
        <p>Locale: {params.locale}</p>
      </main>
    );
  }

  return (
    <RecurseroSanity
      title={data.title}
      locale={params.locale}
      cards={data.cards ?? []}
    />
  );
}
