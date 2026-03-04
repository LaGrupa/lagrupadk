import { defineField, defineType } from "sanity";

export const encuentro = defineType({
  name: "encuentro",
  title: "Encuentro",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Spanish (es)", value: "es" },
          { title: "Danish (da)", value: "da" },
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
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "imageAlt",
      title: "Image alt",
      type: "string",
    }),

    defineField({
      name: "isUpcoming",
      title: "Upcoming event",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
