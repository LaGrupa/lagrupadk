import { defineField, defineType } from "sanity";

export const publicationsPage = defineType({
  name: "publicationsPage",
  title: "Publicaciones page",
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
      name: "featuredPosts",
      title: "Featured posts (optional)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
    }),
  ],
});
