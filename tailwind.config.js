/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.njk",
    "src/**/*.js",
    "src/**/*.ts",
    "src/**/*.jsx",
    "src/**/*.tsx",
    "src/**/*.md",
    "src/**/*.mdx",
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx,scss}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",  

  ],
  theme: {
    extend: {
      colors: {
        mainColor:'var(--mainColor)',
        subColor: "var(--subColor)",
        customBlack:"#333333"
      },
      order: {
        '13': '13'
      },
      screens:{
        xs:"410px",
        sm:"576px",
        md:"768px",
        lg:"992px",
        xl:"1200px",
        "2xl":"1400px",
      }
      ,
      container: {
        center: true,
        padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '4.5rem',
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

