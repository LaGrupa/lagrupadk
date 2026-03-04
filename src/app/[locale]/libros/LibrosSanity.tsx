import LibrosClient, { type SanityBook } from "./LibrosClient";
import { client } from "@/sanity/lib/client";

const query = `
*[_type=="book" && locale==$locale] | order(title asc) {
  _id,
  title,
  author,
  genre,
  tags,
  coverImage,
  coverAlt,
  excerpt,
  link
}
`;

export default async function LibrosSanity({
  locale,
}: {
  locale: "es" | "da";
}) {
  const books = await client.fetch<SanityBook[]>(query, { locale });
  return <LibrosClient books={books} />;
}
