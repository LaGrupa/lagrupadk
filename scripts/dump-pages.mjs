import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

const pageTypes = [
  "homePage",
  "aboutPage",
  "whatWeDoPage",
  "publicationsPage",
  "recurseroPage",
  "faqPage",
  "membersPage",
  "contactPage",
  "entrepreneursPage",
  "resourcesPage",
  "booksPage",
];

const locales = ["es", "da"];

const query = `
*[_type in $types && locale in $locales] | order(_type asc, locale asc) {
  _id,
  _type,
  locale,
  title,

  // dump everything else too (so we can see what's missing)
  ...
}
`;

const res = await client.fetch(query, { types: pageTypes, locales });

// Print a compact summary first:
const summary = res.map((d) => ({
  _type: d._type,
  locale: d.locale,
  _id: d._id,
  hasTitle: !!d.title,
  keys: Object.keys(d).length,
}));

console.log("SUMMARY:");
console.log(JSON.stringify(summary, null, 2));

console.log("\nFULL DOCS:");
console.log(JSON.stringify(res, null, 2));
