import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'openGraphProperties',
  title: 'Open Graph Properties',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Social Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Social Description',
      rows: 3,
      description: 'A short description shown when the article is shared on social media',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Social Image',
      description: "Overrides the article's cover image when shared on social media",
    }),
  ],
})
