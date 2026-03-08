import { defineField, defineType } from "sanity";

export const taller = defineType({
  name: "taller",
  title: "Taller",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      initialValue: "es",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
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
      name: "signupUrl",
      title: "Signup URL",
      type: "url",
      description:
        "Link to the registration form (Google Form, Typeform, etc.)",
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
      title: "Upcoming workshop",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
