import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Single Item',
  name: 'singleItem',
  type: 'object',
  icon: '',
  fields: [
    defineField({
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
