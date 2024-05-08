import {defineField, defineType} from 'sanity'
import {BinaryDocumentIcon, TrendUpwardIcon} from '@sanity/icons'

export const buttonLinkBlock = defineType({
  name: 'buttonLink',
  type: 'object',
  title: 'Button - Link',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'url',
      name: 'url',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^https?:\/\/.+/),
    }),
  ],
})

export const buttonFileBlock = defineType({
  name: 'buttonFile',
  type: 'object',
  title: 'Button - File',
  icon: BinaryDocumentIcon,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'File',
      name: 'file',
      type: 'file',
    }),
  ],
})
