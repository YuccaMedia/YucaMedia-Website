/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Yuca Media original palette
        'yuca-media': {
          'dark': '#1a2b21',
          'light': '#c2c8c4',
          'bg-light': '#f5f8f6'
        },
        // Yuca Studios palette (for studio components only)
        'yuca': {
          'green': '#1A4D2E',
          'cream': '#F5F0E1',
          'green-light': '#2A6D3E',
          'green-dark': '#143D24',
          'cream-dark': '#E5D0C1'
        }
      },
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
