import { defineType, defineField } from 'sanity';
import { basePortableTextFields } from '../../fields';
import { MdNavigation } from "react-icons/md";

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
