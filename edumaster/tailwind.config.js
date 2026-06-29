/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#eef2ff',
          100: '#dce4ff',
          200: '#b9c9ff',
          300: '#8ba8ff',
          400: '#5a7dff',
          500: '#3457D5',
          600: '#2744b0',
          700: '#1e348c',
          800: '#162668',
          900: '#0e1a44',
        },
        navy: {
          50: '#f0f1f5',
          100: '#d8dbe6',
          200: '#b1b7cd',
          300: '#8a93b4',
          400: '#636f9b',
          500: '#3c4b82',
          600: '#2d3963',
          700: '#1e2844',
          800: '#141b2f',
          900: '#0a0e1a',
        },
        surface: {
          50: '#f8f9fc',
          100: '#f1f3f7',
          200: '#e4e7ee',
          300: '#d1d5de',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Manrope', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-xl': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-xs': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 10px 20px -2px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 4px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 40px -5px rgba(0, 0, 0, 0.03)',
        'soft-xl': '0 8px 40px -8px rgba(0, 0, 0, 0.08), 0 20px 60px -8px rgba(0, 0, 0, 0.04)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        'glow-royal': '0 0 40px -10px rgba(52, 87, 213, 0.25)',
        'glow-royal-lg': '0 0 60px -15px rgba(52, 87, 213, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'gradient': 'gradient 8s ease infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
