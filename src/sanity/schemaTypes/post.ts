import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "coverImageAlt",
      title: "Cover image alt",
      type: "string",
    }),

    defineField({
      name: "pdfFile",
      title: "PDF file (optional)",
      type: "file",
      options: { storeOriginalFilename: true },
    }),

    defineField({
      name: "pdfLabel",
      title: "PDF button label (optional)",
      type: "string",
    }),

    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
});
