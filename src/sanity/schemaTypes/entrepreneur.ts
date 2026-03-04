import { defineField, defineType } from "sanity";

export const entrepreneur = defineType({
  name: "entrepreneur",
  title: "Entrepreneur",
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
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "url",
      title: "Website / Instagram URL",
      type: "url",
    }),
    defineField({
      name: "legacyImagePath",
      title: "Legacy image path (temp)",
      type: "string",
      description:
        'Temporary: keeps old "/biz/..." path for bulk import mapping.',
    }),

    defineField({
      name: "image",
      title: "Card image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "imageAlt",
      title: "Image alt",
      type: "string",
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    // Optional fields used in the modal
    defineField({
      name: "owner",
      title: "Owner",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "contact",
      title: "Contact",
      type: "string",
      description: "Phone/email text as shown to users (optional).",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),

    defineField({
      name: "rating",
      title: "Rating (0–5)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),

    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "locale",
      media: "image",
    },
  },
});
