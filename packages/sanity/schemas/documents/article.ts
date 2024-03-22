import {defineType, defineField} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'
import authorDocument from './author'
import tagDocument from './tag'
import {basePortableTextFields} from '../fields'
import {validateHeadlineStyle} from '../../src/utils/validators'

interface PrepareReturnType {
  title: string
  subtitle: string
  media: any
}

export default defineType({
  type: 'document',
  name: 'article',
  title: 'Articles',
  icon: DocumentsIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true

          return validateHeadlineStyle(value) ? true : 'Headline must be title case'
        }),
    }),
    defineField({
      name: 'subHeadline',
      title: 'Subheading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'quip',
      title: 'Quip',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'og',
      title: 'Open Graph Properties',
      type: 'openGraphProperties',
      description: '(Optional)',
      group: 'seo',
    }),
    defineField({
      name: 'authors',
      title: 'Author(s)',
      type: 'array',
      of: [{type: 'reference', to: {type: authorDocument.name}}],
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      fields: [
        defineField({
          type: 'text',
          name: 'alt',
          title: 'Alternative text',
          description: 'Image description for screen readers and search engines',
          rows: 2,
        }),
      ],
      options: {
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Tag(s)',
      type: 'array',
      of: [{type: 'reference', to: {type: tagDocument.name}}],
      group: 'content',
    }),
    defineField({
      name: 'accessLevel',
      title: 'Article availability',
      description:
        'Public articles are always accessible to the public. Premium articles can only be viewed by logged in users. Auto will allow limit the number of free articles a user can view before requiring a login.',
      type: 'string',
      group: 'content',
      initialValue: 'auto',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {title: 'Auto', value: 'auto'},
          {title: 'Public', value: 'public'},
          {title: 'Premium', value: 'premium'},
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        ...basePortableTextFields,
        {
          type: 'image',
          fields: [
            defineField({
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: 'Image description for screen readers and search engines',
              rows: 2,
            }),
          ],
          options: {
            aiAssist: {
              imageDescriptionField: 'alt',
            },
          },
        },
        {
          type: 'file',
        },
        {type: 'premiumContent'},
      ],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      publishDate: 'publishDate',
      image: 'coverImage',
    },
    prepare({title, publishDate, image}): PrepareReturnType {
      return {
        title: title,
        subtitle: publishDate ? new Date(publishDate).toDateString() : 'No publish date',
        media: image,
      }
    },
  },
})
