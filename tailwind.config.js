/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        }
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-reverse': 'float 9s ease-in-out infinite reverse',
      }
    },
  },
  plugins: [],
}
