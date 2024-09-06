/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx}",
    "./src/layout/**/*.{js,jsx}",
    "./src/layout/**/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        pastel: {
          pink: "#F9A8D4",
          blue: "#93C5FD",
          green: "#A7F3D0",
          yellow: "#FDE68A",
          purple: "#C4B5FD",
          gray: "#F3F4F6",
        },
      },
    },
  },
  plugins: [],
};
