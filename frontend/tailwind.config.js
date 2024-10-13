/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D92F4',
        secondary: '#FCA311',
        warning: '#F95454',
        background: '#0E0E0E'
      },
      keyframes: {
        'spin-around': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'spin-fast': 'spin-around 1.5s linear infinite',
        'spin-slow': 'spin-around 6s linear infinite'
      }
    }
  },
  plugins: []
}
