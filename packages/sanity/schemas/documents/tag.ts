import { defineType, defineField } from 'sanity';
import { TagsIcon, TagIcon } from '@sanity/icons'

interface PrepareReturnType {
  title: string;
  media: any;
}

export default defineType({
  type: 'document',
  name: 'tag',
  title: 'Tags',
  icon: TagsIcon,
  readOnly: ({ currentUser }) => {
    return !currentUser.roles.find(({ name }) => name === 'administrator');
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }): PrepareReturnType {
      return {
        title,
        media: TagIcon,
      };
    },
  },
});
