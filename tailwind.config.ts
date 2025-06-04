import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // or 'media' or 'selector'
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If you use a pages directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'], // Matches the font in layout.tsx
      },
      // Example of extending colors (optional)
      // colors: {
      //   primary: {
      //     DEFAULT: '#0070f3',
      //     dark: '#0056b3',
      //   },
      // },
    },
  },
  plugins: [],
};

export default config;
