/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#FA9A9A',
        white: '#F7F7F7',
        black: '#2D2D2D',
        gray: '#61686B',
      },
    },
  },
  plugins: [],
};
