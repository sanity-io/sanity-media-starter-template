import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'documentMetaProperties',
  title: 'Meta Properties',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    }),
    defineField({
      name: 'keywords',
      type: 'string',
      title: 'Keywords',
      description:
        'Comma separated list of keywords. While these are only used by few search engines, they can be useful for SEO.',
    }),
  ],
})
