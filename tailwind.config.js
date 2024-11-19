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
            'background-size': '400% 400%',
            'background-position': '0% 50%'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': '100% 50%'
          }
        },
        'shine-move': {
          '0%': {
            transform: 'translateY(-100%) translateX(-100%) rotate(25deg)',
          },
          '100%': {
            transform: 'translateY(200%) translateX(100%) rotate(25deg)',
          }
        }
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'shine-move': 'shine-move 2s linear infinite',
      },
      backgroundImage: {
        'shine': 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
      }
    }
  },
  plugins: [],
}

