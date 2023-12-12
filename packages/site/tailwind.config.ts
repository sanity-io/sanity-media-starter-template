import type {Config} from 'tailwindcss'
import {theme} from '@sanity/demo/tailwind'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    ...theme,
    colors: {
      ...theme.colors,
      brand: '#ec5c52',
    },
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      title: 'var(--font-title)',
      sans: 'Helvetica, Arial, sans-serif;',
      serif: 'Georgia,Times,Times New Roman,serif',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
