/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT ({
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

  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
});