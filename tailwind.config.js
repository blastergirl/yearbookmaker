/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#FFE1F9',
          200: '#FFB1FF',
          300: '#FF7AF5',
          400: '#FF42EA',
          500: '#FF00E1',
        },
      },
    },
  },
  plugins: [],
}