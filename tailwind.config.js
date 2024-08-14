/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eae6f1",
          100: "#cbc0dd",
          200: "#a997c6",
          300: "#876eb0",
          400: "#6f51a0",
          500: "#583590",
          600: "#50308b",
          700: "#452982",
          800: "#3b2379",
          900: "#2b186c",
        },
        accent: {
          50: "#fffde6",
          100: "#fff8c1",
          200: "#fff497",
          300: "#ffef6c",
          400: "#feea47",
          500: "#fce51a",
          600: "#ffd51c",
          700: "#febd13",
          800: "#fda409",
          900: "#fa7900",
        },
      },
    },
  },
  plugins: [],
};
