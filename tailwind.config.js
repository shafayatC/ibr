/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
    colors: {
      "light-black": "#343541",
      "black-shade": "#202123",
      "gray-shade": "#444654",
      "theme-shade": "#02B989",
    },
  },
  plugins: [require("flowbite/plugin")],
};
