import { defineType, defineField } from 'sanity';
import { UserIcon, UsersIcon } from '@sanity/icons'

interface PrepareReturnType {
  title: string;
  subtitle: string;
  media: any;
}

export default defineType({
  type: 'document',
  name: 'author',
  title: 'Authors',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'headshot',
      title: 'Head Shot',
      type: 'image'
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter Handle',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'Linkedin Handle',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      headshot: 'headshot',
      byline: 'byline',
    },
    prepare({ name, headshot, byline }): PrepareReturnType {
      return {
        title: name,
        subtitle: byline,
        media: headshot ?? UserIcon,
      };
    },
  },
});
