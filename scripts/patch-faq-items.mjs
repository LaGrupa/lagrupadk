import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import fs from "node:fs";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

// IMPORTANT: requires a write token in env
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

const es = JSON.parse(fs.readFileSync("./src/messages/es.json", "utf8"));
const da = JSON.parse(fs.readFileSync("./src/messages/da.json", "utf8"));

const itemsByLocale = {
  es: es?.faq?.items ?? [],
  da: da?.faq?.items ?? [],
};

async function patchLocale(locale) {
  const doc = await client.fetch(
    `*[_type=="faqPage" && locale==$locale][0]{_id, locale, title, items}`,
    { locale }
  );

  if (!doc?._id) {
    console.error(`No faqPage doc found for locale=${locale}`);
    return;
  }

  const items = itemsByLocale[locale];

  const res = await client
    .patch(doc._id)
    .set({ items })
    .commit({ autoGenerateArrayKeys: true });

  console.log(`? Patched faqPage ${locale}: ${doc._id}`);
  console.log(`   items: ${items.length}`);
  return res;
}

await patchLocale("es");
await patchLocale("da");
