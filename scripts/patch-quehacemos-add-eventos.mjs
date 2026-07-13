import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN in .env.local (needs write access).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const newCardByLocale = {
  es: { _type: "card", title: "Eventos", href: "/eventos" },
  da: { _type: "card", title: "Begivenheder", href: "/eventos" },
};

async function patchLocale(locale) {
  const doc = await client.fetch(
    `*[_type=="whatWeDoPage" && locale==$locale][0]{_id, locale, title, cards}`,
    { locale },
  );

  if (!doc?._id) {
    console.error(`No whatWeDoPage doc found for locale=${locale}`);
    return;
  }

  if ((doc.cards ?? []).some((c) => c.href === "/eventos")) {
    console.log(`Skipping ${locale}: /eventos card already present`);
    return;
  }

  const cards = [...(doc.cards ?? []), newCardByLocale[locale]];

  await client
    .patch(doc._id)
    .set({ cards })
    .commit({ autoGenerateArrayKeys: true });

  console.log(`Patched whatWeDoPage ${locale}: ${doc._id} (${cards.length} cards)`);
}

await patchLocale("es");
await patchLocale("da");
