import { client } from "@/sanity/lib/client";
import QueHacemosSanity from "../QueHacemosSanity";

const QUERY = `
*[_type == "whatWeDoPage" && locale == $locale][0]{
  locale,
  title,
  cards[]{ title, href, imageAlt }
}
`;

type Data = {
  locale: string;
  title: string;
  cards: { title?: string; href?: string; imageAlt?: string }[];
};

export default async function QueHacemosSanityPreviewPage(props: {
  params?: { locale?: string };
}) {
  const locale = props.params?.locale;

  if (!locale) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Missing locale</h1>
        <p>Open /es/que-hacemos/sanity or /da/que-hacemos/sanity</p>
      </main>
    );
  }

  const data: Data | null = await client.fetch(QUERY, { locale });

  if (!data) {
    return (
      <main style={{ padding: 24 }}>
        <h1>No whatWeDoPage found</h1>
        <p>Locale: {locale}</p>
      </main>
    );
  }

  return (
    <QueHacemosSanity
      title={data.title}
      locale={locale}
      cards={data.cards ?? []}
    />
  );
}
