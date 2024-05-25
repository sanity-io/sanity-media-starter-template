import { MdNavigation } from "react-icons/md";
import { defineField, defineType } from 'sanity';

export default defineType({
  title: 'Global Navigation',
  name: 'web.globalNavigation',
  type: 'document',
  icon: MdNavigation,
  fields: [
    defineField({
      title: 'items',
      name: 'items',
      type: 'array',
      of: [
        {type: 'dropdownItem'},
        {type: 'singleItem'},
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Navigation',
        media: MdNavigation,
      };
    },
  },
});
