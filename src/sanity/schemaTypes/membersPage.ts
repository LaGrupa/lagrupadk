import { defineField, defineType } from "sanity";

export const membersPage = defineType({
  name: "membersPage",
  title: "Members page",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Danish (da)", value: "da" },
          { title: "Spanish (es)", value: "es" },
        ],
      },
    }),

    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "intro",
      title: "Intro text",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "formUrl",
      title: "Form URL (optional)",
      type: "url",
      description: "Preferred option. Link to the membership form (Typeform/Google Forms/etc).",
    }),

    defineField({
      name: "formEmbed",
      title: "Form embed iframe (optional)",
      type: "text",
      rows: 6,
      description:
        "Optional. Paste ONLY an <iframe ...></iframe>. If set, it will be embedded on the page.",
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "ctaLabel",
      title: "CTA label (optional)",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA link (optional)",
      type: "string",
    }),
  ],
});
