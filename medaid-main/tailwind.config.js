/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
        },
        accent: {
          500: '#10b981',
          600: '#059669',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        'hindi': ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        'telugu': ['Noto Sans Telugu', 'system-ui', 'sans-serif'],
        'kannada': ['Noto Sans Kannada', 'system-ui', 'sans-serif'],
        'malayalam': ['Noto Sans Malayalam', 'system-ui', 'sans-serif'],
        'tamil': ['Noto Sans Tamil', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}