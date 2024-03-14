import {defineField, defineType} from 'sanity'
import basePortableTextFields from './basePortableText'
import {LockIcon} from '@sanity/icons'

export const premiumContent = defineType({
  title: 'Premium Content',
  name: 'premiumContent',
  type: 'object',
  icon: LockIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'CTA or description of the content',
      type: 'string',
    }),
    defineField({
      name: 'subHeadline',
      title: 'Subheading',
      description: 'CTA or description of the content',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        ...basePortableTextFields,
        {
          type: 'image',
        },
        {
          type: 'buttonLink',
        },
        {
          type: 'buttonFile',
        },
      ],
    }),
  ],
})
