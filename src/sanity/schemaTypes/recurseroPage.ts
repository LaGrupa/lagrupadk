import { defineField, defineType } from "sanity";

export const recurseroPage = defineType({
  name: "recurseroPage",
  title: "Recursero (landing)",
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
      name: "cards",
      title: "Cards (2)",
      type: "array",
      validation: (Rule) => Rule.required().min(2).max(2),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: 'Example: "/emprendedoras" or "/libros"',
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "imageAlt",
              title: "Image alt",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
});
