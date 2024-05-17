import { defineType, defineField } from 'sanity';
import { basePortableTextFields } from '../../fields';
import { MdOutlinePrivacyTip } from "react-icons/md";

export default defineType({
  title: 'Privacy Policy',
  name: 'web.privacyPolicy',
  type: 'document',
  icon: MdOutlinePrivacyTip,
  fields: [
    defineField({
      title: 'Effective Date',
      name: 'effectiveDate',
      type: 'date',
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [...basePortableTextFields],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Privacy Policy',
        media: MdOutlinePrivacyTip,
      };
    },
  },
});
