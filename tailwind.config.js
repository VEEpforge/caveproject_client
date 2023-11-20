/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#005740",
        dimBlack: "#0D0C22",
        dimWhite: "#F5FAFF",
      },
      fontFamily: {
        // poppins: ["Poppins", "sans-serif"],
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};