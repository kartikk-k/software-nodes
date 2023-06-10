/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      colors: {
        "primary": "#055FFC",
        "primary-dark": "#033DA3",
        "dark-1": "#1A1C1E",
        "dark-2": "#131517",
        "gray-1": "#131517",
        "gray-2": "#394049",
        "gray-3": "#A0A6B1",
      }
    },
  },
  plugins: [],
}
