import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'openGraphProperties',
  title: 'Open Graph Properties',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Social Title'
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Social Description',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Social Image',
    }),
  ],
});
