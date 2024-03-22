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
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'feedback',
      title: 'Feedback',
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
      name: 'authors',
      title: 'Author(s)',
      type: 'array',
      of: [{type: 'reference', to: {type: authorDocument.name}}],
      group: 'content',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          type: 'text',
          name: 'alt',
          title: 'Alternative text',
          description: 'Image description for screen readers and search engines',
          rows: 2,
        }),
        defineField({
          type: 'text',
          name: 'promptForImage',
          title: 'Image prompt',
          rows: 2,
        }),
      ],
      options: {
        aiAssist: {
          imageDescriptionField: 'alt',
          imageInstructionField: 'promptForImage',
        },
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'headline',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
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
        aiAssist: {exclude: true},
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
            defineField({
              type: 'text',
              name: 'promptForImage',
              title: 'Image prompt',
              rows: 2,
            }),
          ],
          options: {
            aiAssist: {
              imageDescriptionField: 'alt',
              imageInstructionField: 'promptForImage',
            },
          },
        },
        {
          type: 'file',
        },
        {
          type: 'premiumContent',
          options: {
            aiAssist: {exclude: true},
          },
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'meta',
      type: 'documentMetaProperties',
      description: 'HTML meta content used for SEO and social media metadata',
      group: 'seo',
    }),
    defineField({
      name: 'og',
      title: 'Open Graph Properties',
      type: 'openGraphProperties',
      description: '(Optional)',
      group: 'seo',
      options: {
        aiAssist: {exclude: true},
      },
    }),
    defineField({
      name: 'aiEditorFeedback',
      title: 'AI Feedback',
      type: 'array',
      of: basePortableTextFields,
      group: 'feedback',
      readOnly: (ctx) => {
        /**
         * `readOnly` fields are excluded from AI Assist generation.
         * By setting it to true, we can prevent the field from being auto-populated
         * during initial article creation.
         */
        return Array.isArray(ctx.document?.content) && ctx.document?.content.length <= 2
      },
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
        subtitle: publishDate ?? 'No publish date',
        media: image,
      }
    },
  },
})
