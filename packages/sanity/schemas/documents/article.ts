import { defineType, defineField } from 'sanity';
import { ComposeIcon } from '@sanity/icons'

import authorDocument from './author'
import { basePortableTextFields } from '../fields';

interface PrepareReturnType {
  title: string;
  subtitle: string;
  media: any;
}

export default defineType({
  type: 'document',
  name: 'article',
  title: 'Articles',
  icon: ComposeIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'social',
      title: 'Social',
    },
  ],
  fields: [
    defineField({
      name: 'headline',
      title: 'Hed',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'subHeadline',
      title: 'Dek',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'og',
      title: 'Open Graph Properties',
      type: 'openGraphProperties',
      description: '(Optional)',
      group: 'social',
    }),
    defineField({
      name: 'authors',
      title: 'Author(s)',
      type: 'array',
      of: [{ type: 'reference', to: { type: authorDocument.name } }],
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
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
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        ...basePortableTextFields,
        {
          type: 'image'
        },
      ],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishDate: 'publishDate',
      image: 'coverImage',
    },
    prepare({ title, publishDate, image }): PrepareReturnType {
      return {
        title: title,
        subtitle: publishDate
          ? new Date(publishDate).toDateString()
          : 'No publish date',
        media: image
      };
    },
  },
});
