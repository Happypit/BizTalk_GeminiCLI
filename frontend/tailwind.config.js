/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        'primary-hover': '#5A9EEE',
        secondary: '#F5F7FA',
        text: '#333333',
        background: '#F5F7FA',
        'card-background': '#FFFFFF',
        border: '#E0E6ED',
        success: '#50E3C2',
        error: '#D0021B',
        white: '#FFFFFF',
        blue: {
          50: '#f0f6ff',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
      },
      keyframes: {
        'spinner-border': {
          to: { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'spinner-border': 'spinner-border .75s linear infinite',
      }
    },
  },
  plugins: [],
}