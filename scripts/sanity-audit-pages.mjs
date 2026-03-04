import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in your env (.env.local).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const pageTypes = [
  "aboutPage",
  "whatWeDoPage",
  "publicationsPage",
  "recurseroPage",
  "faqPage",
  "membersPage",
  "contactPage",
  "homePage",
  "entrepreneursPage",
  "resourcesPage",
  "booksPage",
];

const locales = ["es", "da"];

async function run() {
  const results = [];

  for (const type of pageTypes) {
    for (const locale of locales) {
      const count = await client.fetch(
        `count(*[_type == $type && locale == $locale])`,
        { type, locale }
      );
      results.push({ type, locale, count });
    }

    const countNoLocale = await client.fetch(
      `count(*[_type == $type && !defined(locale)])`,
      { type }
    );
    results.push({ type, locale: "(no locale)", count: countNoLocale });
  }

  const grouped = results.reduce((acc, r) => {
    acc[r.type] ??= [];
    acc[r.type].push(r);
    return acc;
  }, {});

  for (const [type, rows] of Object.entries(grouped)) {
    console.log(`\n=== ${type} ===`);
    rows.forEach((r) =>
      console.log(`${String(r.locale).padEnd(12)} : ${r.count}`)
    );
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
