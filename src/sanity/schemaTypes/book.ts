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
      name: "subtitle",
      title: "Subtitle (optional)",
      type: "string",
    }),

    defineField({
      name: "author",
      title: "Author (optional)",
      type: "string",
    }),

    defineField({
      name: "category",
      title: "Category (for filter chips)",
      type: "string",
      description: "Examples: ensayo, cuento, biografía, historia, infantil…",
    }),

    defineField({
      name: "year",
      title: "Year (optional)",
      type: "string",
    }),

    defineField({
      name: "rating",
      title: "Rating (0–5, optional)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),

    defineField({
      name: "description",
      title: "Description (optional)",
      type: "text",
      rows: 4,
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
      name: "url",
      title: "External link (optional)",
      type: "url",
    }),

    defineField({
      name: "links",
      title: "Extra links (optional)",
      type: "array",
      of: [
        {
          type: "object",
          name: "bookLink",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "url", title: "URL" },
          ],
        },
      ],
    }),
  ],
});
