import React from 'react';

export const styles = [
  { title: 'Normal', value: 'normal' },
  { title: 'H1', value: 'h1' },
  { title: 'H2', value: 'h2' },
  { title: 'H3', value: 'h3' },
  { title: 'H4', value: 'h4' },
  { title: 'Quote', value: 'blockquote' },
];

export const lists = [
  { title: 'Bulleted', value: 'bullet' },
  { title: 'Numbered', value: 'number' },
];

export const decorators = [
  { title: 'Bold', value: 'strong' },
  { title: 'Emphasis', value: 'em' },
  { title: 'Code', value: 'code' },
  { title: 'Underline', value: 'underline' },
  { title: 'Strike', value: 'strike-through' },
  {
    title: 'Superscript',
    value: 'sup',
    icon: () => (
      <small>
        x<sup>2</sup>
      </small>
    ),
    component: ({ children }: { children: any }) => (
      <span>
        <sup>{children}</sup>
      </span>
    ),
  },
];

const basePortableTextFields = [
  {
    title: 'Block',
    type: 'block',
    styles,
    lists,
    marks: {
      decorators,
    },
  },
];

export default basePortableTextFields;
