import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const query = `
*[_type=="book" && locale=="es"]{
  title,
  legacyImagePath,
  "hasCover": defined(coverImage.asset._ref)
}
`;

const res = await client.fetch(query);

const withCover = res.filter((x) => x.hasCover).length;
console.log(`${withCover} with cover out of ${res.length}`);
console.log(res);
