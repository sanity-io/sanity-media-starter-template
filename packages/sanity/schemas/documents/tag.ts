import { defineType, defineField } from 'sanity';
import { IoPricetagOutline } from 'react-icons/io5'

interface PrepareReturnType {
  title: string;
  media: any;
}

export default defineType({
  type: 'document',
  name: 'tag',
  title: 'Tag',
  icon: IoPricetagOutline,
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
        media: IoPricetagOutline,
      };
    },
  },
});
