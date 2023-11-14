import { defineType, defineField } from 'sanity';
import { basePortableTextFields } from '../fields';

export default defineType({
  name: 'newsletterContent',
  title: 'Generic Content',
  type: 'object',
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
});
