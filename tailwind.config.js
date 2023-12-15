/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      'weather': "url('./public/images/weather.png')",
      'nature': "url('./public/images/nature.png)",
      'food': "url('./public/images/food.png)",
      'accommodation': "url('./public/images/accommodation.png)",
      'culture': "url('./public/images/culture.png)",
      'budget':"url('./public/images/money.png')"
    },
  },
  plugins: [],
};
