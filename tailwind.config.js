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
  // plugins: [
  //   plugin(function({ addUtilities }) {
  //     addUtilities({
  //       '.padding': {
  //         '@apply sm:px-16 px-8 sm:py-24 py-12': {},
  //       },
  //       '.allo': {
  //         '@apply bg-black': {},
  //       },
  //       '.padding-x': {
  //         '@apply sm:px-16 px-8': {},
  //       },
  //       '.padding-y': {
  //         '@apply sm:py-24 py-12': {},
  //       },
  //       '.padding-l': {
  //         '@apply sm:pl-16 pl-8': {},
  //       },
  //       '.padding-r': {
  //         '@apply sm:pr-16 pr-8': {},
  //       },
  //       '.padding-t': {
  //         '@apply sm:pt-24 pt-12': {},
  //       },
  //       '.padding-b': {
  //         '@apply sm:pb-24 pb-12': {},
  //       },
  //       '.info-text': {
  //         '@apply font-montserrat text-slate-gray text-lg leading-7': {},
  //       },
  //       '.max-container': {
  //         'max-width': '1440px',
  //         'margin': '0 auto',
  //       },
  //       '.input': {
  //         '@apply sm:flex-1 max-sm:w-full text-base leading-normal text-slate-gray pl-5 max-sm:p-5 outline-none sm:border-none border max-sm:border-slate-gray max-sm:rounded-full': {},
  //       },
  //     })
  //   })
  // ],
};
