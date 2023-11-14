import { defineType, defineField } from 'sanity';
import { basePortableTextFields } from '../fields';

import articleDocument from '../documents/article'

export default defineType({
  name: 'newsletterArticle',
  title: 'Article',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Article Title Override',
      description: "If not defined, the article's original title will be used.",
    }),
    defineField({
      name: 'articleReference',
      title: 'Linked Article',
      type: 'reference',
      to: [{ type: articleDocument.name }],
    }),
    defineField({
      name: 'content',
      title: 'Content Override',
      description: "If left blank, the article content will be used.",
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
