import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

const locale = process.argv[2] || "es";

const q = `*[_type=="post" && locale==$locale]{title, "slug": slug.current, tags}`;

const res = await client.fetch(q, { locale });

const tags = new Map();
for (const p of res) {
  for (const t of p.tags || []) {
    const norm = String(t).trim().toLowerCase();
    if (!norm) continue;
    tags.set(norm, (tags.get(norm) || 0) + 1);
  }
}

console.log("Posts:", res.length);
console.log("Unique tags:", tags.size);
console.log(
  Array.from(tags.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([t, n]) => `${t} (${n})`)
    .join("\n")
);
