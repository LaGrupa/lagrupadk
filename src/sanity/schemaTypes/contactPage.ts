import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
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
      title: "Intro",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "image",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "imageAlt",
      title: "Image alt text",
      type: "string",
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
