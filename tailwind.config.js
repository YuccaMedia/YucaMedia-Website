/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html", // Include all HTML files in the public folder
    "./src/**/*.{js,jsx,ts,tsx,css}", // Include all JS, JSX, TS, TSX, and CSS files in the src folder
    "./src/styles/**/*.css", // Include all CSS files in the styles folder
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: "#1a2b21",
        lightGray: "#c2c8c4",
      },
    },
  },
  plugins: [],
};

