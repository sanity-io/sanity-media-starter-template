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
    extend: {
      keyframes: {
        'slide-up': {
          '0%': {transform: 'translateY(100%)'},
          '100%': {transform: 'translateY(0)'},
        },
      },
      animation: {
        'slide-up': '.75s slide-up 1s ease-in-out forwards',
      },
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
