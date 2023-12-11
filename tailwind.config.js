/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard'],
        batang: ['Gowun Batang'],
      },
    },
    colors: {
      bg: '#DDD8D3',
      black: '#000000',
      white: '#FFFFFF',
      gray: {
        10: '#FAFAFA',
        50: '#F5F5F5',
        200: '#E2E2E2',
        400: '#A0A0A0',
        700: '#444444',
        900: '#121314',
      },
      red: '#FF2C20',
      blue: '#386DE8',
      green: '#3BC344',
    },
  },
  plugins: [],
};
