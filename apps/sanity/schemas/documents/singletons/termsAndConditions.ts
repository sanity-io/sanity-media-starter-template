import { defineType, defineField } from 'sanity';
import { basePortableTextFields } from '../../fields';
import { GoLaw } from "react-icons/go";

export default defineType({
  title: 'Terms and Conditions',
  name: 'web.termsAndConditions',
  type: 'document',
  icon: GoLaw,
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
        title: 'Terms and Conditions',
        media: GoLaw,
      };
    },
  },
});
