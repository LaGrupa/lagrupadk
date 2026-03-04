// scripts/delete-entrepreneurs-es.mjs
import {createClient} from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "mr2m5xpu",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_TOKEN, // required
  useCdn: false,
});

if (!process.env.SANITY_TOKEN) {
  console.error("Missing SANITY_TOKEN env var. Create a token in Sanity Manage with write access, then set it in PowerShell:");
  console.error('$env:SANITY_TOKEN="YOUR_TOKEN_HERE"');
  process.exit(1);
}

const query = `*[_type == "entrepreneur" && locale == "es" && _id match "entrepreneur_es_*"]._id`;
const ids = await client.fetch(query);

console.log(`Found ${ids.length} entrepreneur ES docs to delete.`);
if (ids.length === 0) process.exit(0);

// delete in batches to avoid huge transactions
const batchSize = 50;
for (let i = 0; i < ids.length; i += batchSize) {
  const batch = ids.slice(i, i + batchSize);
  let tx = client.transaction();
  for (const id of batch) tx = tx.delete(id);
  await tx.commit({visibility: "async"});
  console.log(`Deleted ${Math.min(i + batchSize, ids.length)}/${ids.length}`);
}

console.log("Done.");