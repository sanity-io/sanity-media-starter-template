import { defineType, defineField } from 'sanity';
import { FcHeatMap } from "react-icons/fc";

export default defineType({
  type: 'document',
  name: 'chart.heatmap',
  title: 'Heatmap',
  icon: FcHeatMap,
  groups: [
    {
      name: 'data',
      title: 'Data',
      default: true,
    },
    {
      name: 'styling',
      title: 'Styling',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'data',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      group: 'data',
    }),
    defineField({
      name: 'data',
      title: 'Data',
      type: 'file',
      description: 'A JSON file representing an array of objects. Each object should have a "bin" property representing the bin number, and a "bins" property which is an array of objects. Each object in the "bins" array should have a "count" property representing the count, and a "bin" property representing the bin number.',
      options: {
        accept: 'application/json',
      },
      group: 'data',
      fieldset: 'file',
    }),
    defineField({
      name: 'colorRange',
      title: 'Color Range',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Minimum Value Color',
          type: 'color',
          description: 'The color representing the minimum value in the heatmap.',
        },
        {
          name: 'max',
          title: 'Maximum Value Color',
          type: 'color',
          description: 'The color representing the maximum value in the heatmap.',
        },
      ],
      description: 'The color scale to use for the heatmap.',
      group: 'styling',
    }),
    defineField({
      name: 'opacityRange',
      title: 'Opacity Range',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Minimum Opacity',
          type: 'number',
          description: 'The minimum opacity of the heatmap. Should be a value between 0 and 1.',
          validation: (Rule: any) => Rule.min(0.1).max(1.0).precision(2),
        },
        {
          name: 'max',
          title: 'Maximum Opacity',
          type: 'number',
          description: 'The maximum opacity of the heatmap. Should be a value between 0 and 1.',
          validation: (Rule: any) => Rule.min(0.1).max(1.0).precision(2),
        },
      ],
      description: 'The opacity scale of the heatmap.',
      group: 'styling',
    }),
  ],
  fieldsets: [
    { name: 'file', title: 'File' },
  ],
  preview: {
    select: {
      title: 'title',
      caption: 'caption',
    },
    prepare({title, caption}: {title: string, caption: string}) {
      return {
        title: title,
        subtitle: caption
      };
    },
  },
});
