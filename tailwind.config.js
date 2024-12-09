/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "roboto mono , monospace",
    },
    extend: {
      colors: {
        pizza: "#1a1a1a",
      },
      fontSize: {
        veryBig: ["20rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
