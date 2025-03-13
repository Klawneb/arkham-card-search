/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arno: ["ArnoPro-Regular", "serif"],
        teutonic: ["Teutonic", "serif"],
        wolgast: ["Wolgast Script", "serif"],
      },
    },
  },
};
