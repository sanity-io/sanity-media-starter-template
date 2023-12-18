import { defineType, defineField } from 'sanity';
import { DocumentsIcon } from '@sanity/icons'
import authorDocument from './author'
import tagDocument from './tag'
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
  icon: DocumentsIcon,
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
      name: 'tags',
      title: 'Tag(s)',
      type: 'array',
      of: [{ type: 'reference', to: { type: tagDocument.name } }],
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
      title: 'headline',
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
