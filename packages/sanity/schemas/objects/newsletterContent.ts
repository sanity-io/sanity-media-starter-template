import { defineType, defineField } from 'sanity';
import { basePortableTextFields } from '../fields';
import { DocumentTextIcon } from '@sanity/icons';

interface PrepareReturnType {
  title: string;
  subtitle: string;
  media: any;
}

export default defineType({
  name: 'newsletterContent',
  title: 'Newsletter Exclusive Content',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Content Title'
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Image Link',
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
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
    prepare({ title, image }): PrepareReturnType {
      return {
        title: title,
        subtitle: 'Newsletter Exclusive Content',
        media: image,
      };
    },
  },
});
