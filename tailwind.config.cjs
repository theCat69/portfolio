/** @type {import('tailwindcss').Config} */
// import plugin from 'tailwindcss/plugin';

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        salsa: ['Salsa', 'cursive'],
        baskerville: ['Libre Baskerville', 'serif']
      },
      colors: {
        'primary': "#fef9f5",
        "light-1": "#ffe7dd",
        "light-2": "#ffc4b2",
        "middle": "#cd9e42",
        "dark-2": "#dc8132",
        "dark-1": "#b46e29"
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'hero': "url('media/images/collection-background.svg')",
        'card': "url('media/images/thumbnail-background.svg')",
      },
      screens: {
        "wide": "1440px"
      }
    },
  },
};
