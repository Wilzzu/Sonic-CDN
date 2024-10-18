/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#363636',
        accent: '#0D92F4',
        warning: '#F95454',
        background: '#0E0E0E'
      },
      dropShadow: {
        text: '0 1px 1px var(--tw-shadow-color)',
        'centered-sm': '0 0 4px var(--tw-shadow-color)',
        'centered-base': '0 0 10px var(--tw-shadow-color)',
        'centered-lg': '0 0 16px var(--tw-shadow-color)',
        'centered-xl': '0 0 24px var(--tw-shadow-color)',
        'centered-2xl': '0 0 32px var(--tw-shadow-color)'
      },
      boxShadow: {
        'centered-sm': '0 0 4px var(--tw-shadow-color)',
        'centered-base': '0 0 10px var(--tw-shadow-color)',
        'centered-lg': '0 0 16px var(--tw-shadow-color)',
        'centered-xl': '0 0 24px var(--tw-shadow-color)',
        'centered-2xl': '0 0 32px var(--tw-shadow-color)'
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
