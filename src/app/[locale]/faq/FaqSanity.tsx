import { client } from "@/sanity/lib/client";
import FaqClient from "./FaqClient";

type FaqItem = { question: string; answer: string };

const query = `
*[_type == "faqPage" && locale == $locale][0]{
  title,
  items[]{ question, answer }
}
`;

export default async function FaqSanity({ locale }: { locale: string }) {
  const data = await client.fetch(query, { locale });

  const title: string = data?.title ?? "FAQ";
  const items: FaqItem[] = Array.isArray(data?.items) ? data.items : [];

  return <FaqClient title={title} items={items} />;
}
