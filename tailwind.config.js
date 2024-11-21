/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme color palette
        dark: {
          50: '#1a1a1a',
          100: '#2c2c2c',
          200: '#3f3f3f',
          300: '#525252',
          400: '#666666',
          500: '#7a7a7a',
          600: '#8e8e8e',
          700: '#a3a3a3',
          800: '#b8b8b8',
          900: '#cccccc',
        },
        brand: {
          50: '#ffe0f0',
          100: '#ffb3cc',
          200: '#ff80ab',
          300: '#ff4081',
          400: '#f50057',
          500: '#c51162',
          600: '#9c27b0',
          700: '#6a1b9a',
          800: '#4a148c',
          900: '#2e0d61',
        },
      },
      keyframes: {
        // Existing gradient animation
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
        // Floating animation
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Glow effect animation
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 128, 171, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 128, 171, 0.6)' },
        },
        // Pulse animation for gradients
        pulseGradient: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      animation: {
        // Extend animations
        gradient: "gradient 15s ease infinite",
        floating: "floating 3s ease-in-out infinite",
        glowPulse: "glowPulse 2s ease-in-out infinite",
        pulseGradient: "pulseGradient 2s ease infinite",
      },
      boxShadow: {
        // Custom shadows for dark theme
        'dark-glow': '0 0 15px rgba(255, 128, 171, 0.3)',
        'dark-intense': '0 0 25px rgba(255, 128, 171, 0.5)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],

}
