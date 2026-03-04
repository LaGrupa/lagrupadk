import { defineField, defineType } from "sanity";

export const entrepreneursPage = defineType({
  name: "entrepreneursPage",
  title: "Emprendedoras (page)",
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
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "heroAlt",
      title: "Hero image alt",
      type: "string",
    }),

    defineField({
      name: "searchPlaceholder",
      title: "Search placeholder",
      type: "string",
    }),

    defineField({
      name: "categories",
      title: "Categories (chips)",
      type: "array",
      of: [{ type: "string" }],
      description: 'Example: ["Todas", "Administración", "Alimentos", ...]',
    }),
  ],
});
