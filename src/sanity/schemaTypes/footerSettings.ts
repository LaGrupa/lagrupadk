import { defineField, defineType } from "sanity";

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer settings",
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
      name: "brandTitle",
      title: "Brand title",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "La Grupa DK",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "cvr",
      title: "CVR",
      type: "string",
      initialValue: "45871096",
    }),

    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Spotify", value: "spotify" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Facebook", value: "facebook" },
                ],
              },
            }),
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
          preview: {
            select: {
              title: "label",
              subtitle: "platform",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "brandTitle",
      subtitle: "locale",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Footer settings",
        subtitle: subtitle ? `Locale: ${subtitle}` : "No locale",
      };
    },
  },
});
