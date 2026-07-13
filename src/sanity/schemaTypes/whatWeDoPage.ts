import { defineField, defineType } from "sanity";

export const whatWeDoPage = defineType({
  name: "whatWeDoPage",
  title: "Qué hacemos / Hvad laver vi",
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
      title: "Cards (2–4)",
      type: "array",
      of: [
        {
          type: "object",
          name: "card",
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
              description: "Leave empty for a PDF-download card (use the PDF file field instead).",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { file?: unknown } | undefined;
                  if (!value && !parent?.file) {
                    return "Provide a Link or a PDF file";
                  }
                  return true;
                }),
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
              name: "file",
              title: "PDF file (optional)",
              type: "file",
              description: "If set, the card shows a download button for this PDF instead of linking to a page.",
              options: { accept: "application/pdf" },
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
  ],
});
