import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      description: 'E.g. "da" or "es"',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Danish (da)", value: "da" },
          { title: "Spanish (es)", value: "es" },
        ],
      },
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: "lead", title: "Lead", type: "text" }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({ name: "imageAlt", title: "Image alt", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA link", type: "string" }),
      ],
    }),

    defineField({
      name: "cards",
      title: "Three cards",
      type: "array",
      validation: (Rule) => Rule.max(6),
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
            defineField({ name: "body", title: "Body", type: "text" }),
            defineField({
              name: "buttonLabel",
              title: "Button label",
              type: "string",
            }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
        },
      ],
    }),

    defineField({
      name: "cta",
      title: "CTA section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "lead", title: "Lead", type: "text" }),
        defineField({
          name: "buttonLabel",
          title: "Button label",
          type: "string",
        }),
        defineField({ name: "href", title: "Link", type: "string" }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({ name: "imageAlt", title: "Image alt", type: "string" }),
      ],
    }),
  ],
});
