/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.njk",
    "src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#85D847",
        subColor: "#6C6D6E",
      },
      screens:{
        xs:"410px",
      }
      ,
      container: {
        center: true,
        padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
            '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require("tailwindcss-animate"),
  ],
}

