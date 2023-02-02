/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: () => ({
        header: "url('./assets/header.jpg')",
      }),
      colors: {
        primary: "#1423DC",
        background: "#A8998F",
      },
      fontFamily: {
        body: ["Solitreo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
