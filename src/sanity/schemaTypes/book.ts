import { defineField, defineType } from "sanity";

export const book = defineType({
  name: "book",
  title: "Libro (item)",
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
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),

    defineField({
      name: "genre",
      title: "Genre",
      type: "string",
      description: "Used for filter chips (e.g. Biografía, Cuento...)",
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "coverAlt",
      title: "Cover image alt",
      type: "string",
    }),

    defineField({
      name: "excerpt",
      title: "Short description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "link",
      title: "External link (optional)",
      type: "url",
    }),
  ],
});
