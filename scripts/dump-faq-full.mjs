import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

const res = await client.fetch(`
*[_type == "faqPage" && locale in ["es","da"]]{
  _id,
  _type,
  locale,
  title,
  items,
  ...,
}
`);

console.log(JSON.stringify(res, null, 2));
