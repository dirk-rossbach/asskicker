module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Source Sans Pro", "Helvetica", "Arial", "sans-serif"],
      body: ["Source Sans Pro", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        vita: {
          50: "#fcfcfb",
          100: "#faf1f1",
          200: "#f5d3e2",
          300: "#e7a8c2",
          400: "#e0789b",
          500: "#ce5379",
          600: "#b33958",
          700: "#8a2a40",
          800: "#681437",
          900: "#381217",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
