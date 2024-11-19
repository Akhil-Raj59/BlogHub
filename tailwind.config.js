/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '300% 300%',
            'background-position': '0% 50%',
          },
          '50%': {
            'background-size': '300% 300%',
            'background-position': '100% 50%',
          },
        },
      },
      animation: {
        gradient: "gradient 15s ease infinite",
        pulseGradient: "pulseGradient 2s ease infinite",
      },
    },
  },
  plugins: [],
}
