import HeroSanity from "@/components/HeroSanity";
import ThreeColumnsSanity from "@/components/ThreeColumnsSanity";
import CtaSanity from "@/components/CtaSanity";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

const HOME_QUERY = `
*[_type == "homePage" && locale == $locale][0]{
  locale,
  hero{title, lead, ctaLabel, ctaHref},
  cards[]{title, body, buttonLabel, href},
  cta{title, lead, buttonLabel, href}
}
`;

type HomePageData = {
  locale: string;
  hero?: {
    title?: string;
    lead?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  cards?: {
    title?: string;
    body?: string;
    buttonLabel?: string;
    href?: string;
  }[];
  cta?: {
    title?: string;
    lead?: string;
    buttonLabel?: string;
    href?: string;
  };
};

export default async function HomeSanityPreviewPage({
  params,
}: {
  params: Promise<{ locale: "es" | "da" }>;
}) {
  const { locale } = await params;

  const data: HomePageData | null = await client.fetch(HOME_QUERY, { locale });

  if (!data) {
    return (
      <main style={{ padding: 24 }}>
        <h1>No homePage found</h1>
        <p>Locale: {locale}</p>
      </main>
    );
  }

  return (
    <main style={{ display: "grid", gap: 24 }}>
      <HeroSanity
        title={data.hero?.title ?? ""}
        lead={data.hero?.lead ?? null}
        ctaLabel={data.hero?.ctaLabel ?? null}
        ctaHref={data.hero?.ctaHref ?? null}
      />

      <ThreeColumnsSanity cards={data.cards ?? []} />

      <CtaSanity
        title={data.cta?.title ?? null}
        lead={data.cta?.lead ?? null}
        buttonLabel={data.cta?.buttonLabel ?? null}
        href={data.cta?.href ?? null}
      />
    </main>
  );
}
