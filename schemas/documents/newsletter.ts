import { defineType, defineField } from 'sanity';
import { UserIcon, UsersIcon } from '@sanity/icons'
import { IoNewspaperOutline } from 'react-icons/io5'

import authorDocument from './author'

interface PrepareReturnType {
  title: string;
  subtitle: string;
  media: any;
}

export default defineType({
  type: 'document',
  name: 'newsletter',
  title: 'Newsletters',
  icon: IoNewspaperOutline,
  fields: [
    defineField({
      name: 'subjectLine',
      title: 'Subject Line',    
      type: 'string',
    }),
    defineField({
      name: 'previewText',
      title: 'Preview Text',
      type: 'string',
    }),
     defineField({
      name: 'og',
      title: 'Open Graph Properties',
      type: 'openGraphProperties',
      description: '(Optional)',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: { type: authorDocument.name } }],
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
    }),
    defineField({
      name: 'primaryImage',
      title: 'Primary Image',
      type: 'image',
      description: 'For Web',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      options: {
        modal: 'dialog',
      },
      of: [
        { type: 'newsletterArticle' },
        { type: 'newsletterContent' },
      ],
    })
  ],
  preview: {
    select: {
      subjectLine: 'subjectLine',
      publishDate: 'publishDate',
      image: 'primaryImage',
    },
    prepare({ subjectLine, publishDate, image }): PrepareReturnType {
      return {
        title: subjectLine ?? 'Untitled',
        subtitle: publishDate
          ? new Date(publishDate).toDateString()
          : 'No publish date',
        media: image ?? IoNewspaperOutline,
      };
    },
  },
});
