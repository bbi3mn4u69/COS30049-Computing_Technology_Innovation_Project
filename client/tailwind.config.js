/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'Noto': 'Noto Serif'
    },
    extend: {
      height: {
        '300': '330px',
        '390': '390px',
        '500': '470px',
        '600': '600px',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}



