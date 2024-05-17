import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Dropdown Item',
  name: 'dropdownItem',
  type: 'object',
  icon: '',
  fields: [
    defineField({
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'List',
      name: 'list',
      type: 'array',
      of: [
        {type: 'reference', name: 'Article', to: [{type: 'article'}]},
        {type: 'reference', name: 'Tag', to: [{type: 'tag'}]},
        {type: 'singleItem'},
      ],
    }),
  ],
})
