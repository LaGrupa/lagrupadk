import EmprendedorasI18n from "./EmprendedorasI18n";
import { client } from "@/sanity/lib/client";

const query = `
*[_type == "entrepreneur" && locale == "es"] | order(name asc) {
  _id,
  name,
  tagline,
  url,
  tags,
  owner,
  description,
  contact,
  location,
  rating,
  socials,
  legacyImagePath
}
`;

export default async function EmprendedorasSanity() {
  const data = await client.fetch(query);

  const businesses = (data ?? []).map((d: any) => ({
    name: d.name ?? "",
    tagline: d.tagline ?? "",
    url: d.url ?? "",
    tags: d.tags ?? [],
    owner: d.owner,
    description: d.description,
    contact: d.contact,
    location: d.location,
    rating: d.rating,
    socials: d.socials ?? [],
    image: d.legacyImagePath, // ? reuse existing UI field
  }));

  return <EmprendedorasI18n businesses={businesses} />;
}
