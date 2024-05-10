import { defineType, defineField } from 'sanity';
import { basePortableTextFields } from '../fields';
import { SunIcon } from '@sanity/icons'

interface PrepareReturnType {
  title: string;
  media: any;
}

export default defineType({
  name: 'newsletterIntro',
  title: 'Intro',
  type: 'object',
  icon: SunIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        ...basePortableTextFields,
      ],
    }),
  ],
  preview: {
    prepare(): PrepareReturnType {
      return {
        title: 'Intro',
        media: SunIcon,
      };
    },
  },
});
