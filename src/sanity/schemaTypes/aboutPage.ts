import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Quiénes somos',
  type: 'document',
  fields: [
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Danish (da)', value: 'da'},
          {title: 'Spanish (es)', value: 'es'},
        ],
      },
    }),

    defineField({
      name: 'hero',
      title: 'Hero block',
      type: 'object',
      fields: [
        defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'imageAlt', title: 'Image alt', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'p1', title: 'Paragraph 1', type: 'text'}),
        defineField({name: 'p2', title: 'Paragraph 2', type: 'text'}),
      ],
    }),

    defineField({
      name: 'block2',
      title: 'Second block',
      type: 'object',
      fields: [
        defineField({name: 'p3', title: 'Paragraph 3', type: 'text'}),
        defineField({name: 'p4', title: 'Paragraph 4', type: 'text'}),
        defineField({name: 'p5', title: 'Paragraph 5', type: 'text'}),
        defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'imageAlt', title: 'Image alt', type: 'string'}),
      ],
    }),

    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'p1', title: 'Paragraph', type: 'text'}),
        defineField({name: 'strongLine', title: 'Bold line', type: 'string'}),
      ],
    }),

    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'p1', title: 'Paragraph', type: 'text'}),
      ],
    }),
  ],
})
