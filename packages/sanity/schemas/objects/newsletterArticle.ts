import { defineType, defineField } from 'sanity';
import { basePortableTextFields } from '../fields';
import { LinkIcon } from '@sanity/icons';

import articleDocument from '../documents/article'

interface PrepareReturnType {
  title: string;
  subtitle: string;
  media: any;
}

export default defineType({
  name: 'newsletterArticle',
  title: 'Article',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'titleOverride',
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
      name: 'contentOverride',
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
  preview: {
    select: {
      articleTitle: 'articleReference.headline',
      titleOverride: 'overrideTitle',
      image: 'articleReference.coverImage',
    },
    prepare({ articleTitle, titleOverride, image }): PrepareReturnType {
      return {
        title: titleOverride ?? articleTitle,
        subtitle: 'Article Reference',
        media: image ?? LinkIcon,
      };
    },
  },
});
