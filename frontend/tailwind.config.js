/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeColor: "#FFD666",
        textColor: "#FFFFFF",
        primaryBlack: "#2B292E",
        secondaryBlack: "#222125",
      },
    },
  },
  plugins: [],
};
