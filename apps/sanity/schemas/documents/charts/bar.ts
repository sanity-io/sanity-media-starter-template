import { defineType, defineField } from 'sanity';
import { MdBarChart } from "react-icons/md";

export default defineType({
  type: 'document',
  name: 'chart.bar',
  title: 'Bar Chart',
  icon: MdBarChart,
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
      description: 'A CSV file with 2 columns (x, y). The first column will be used as the x-axis and the second column will be used as the y-axis.',
      options: {
        accept: 'text/csv',
      },
      group: 'data',
      fieldset: 'file',
    }),
    defineField({
      name: 'xAxisKey',
      title: 'X Axis Key',
      type: 'string',
      description: 'The column in the CSV file that will be used as the x-axis. This should match the column header in the CSV file.',
      group: 'data',
      fieldset: 'file',
    }),
    defineField({
      name: 'yAxisKey',
      title: 'Y Axis Key',
      type: 'string',
      description: 'The column in the CSV file that will be used as the y-axis. This should match the column header in the CSV file.',
      group: 'data',
      fieldset: 'file',
    }),
    defineField({
      name: 'verticalMargin',
      title: 'Vertical Margin',
      description: 'Margin from the top of the chart to the bottom of the chart.',
      type: 'number',
      initialValue: 120,
      group: 'styling',
      fieldset: 'sizing',
    }),
    defineField({
      name: 'barPadding',
      title: 'Bar Padding',
      type: 'number',
      description: 'Padding between bars. Any value between 0.1 and 0.9.',
      initialValue: 0.3,
      validation: (Rule: any) => Rule.min(0.1).max(0.9).precision(2),
      group: 'styling',
      fieldset: 'sizing',
    }),
    defineField({
      name: 'barColor',
      title: 'Bar Color',
      type: 'color',
      group: 'styling',
    }),
    defineField({
      name: 'backgroundColorFrom',
      title: 'Top Color',
      type: 'color',
      group: 'styling',
      fieldset: 'backgroundGradient',
    }),
    defineField({
      name: 'backgroundColorTo',
      title: 'Bottom Color',
      type: 'color',
      group: 'styling',
      fieldset: 'backgroundGradient',
    }),
  ],
  fieldsets: [
    { name: 'file', title: 'File' },
    { name: 'backgroundGradient', title: 'Background Gradient' },
    { name: 'sizing', title: 'Sizing' },
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
