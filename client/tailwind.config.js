/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        Sherpa_Blue: {
          500: '#034752',
        },
        Dark_Salmon: {
          500: '#D47863',
        },
        Avocado_Green: {
          500: '#64A803',
        },
        
      }
    },
        fontFamily: {
      sans: ["Roboto", "ui-sans-serif", "system-ui", "-apple-system"],
    },
  },
  plugins: [],
}