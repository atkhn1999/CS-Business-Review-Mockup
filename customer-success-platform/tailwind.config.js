/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        'ink-2': '#334155',
        'ink-3': '#64748b',
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
      },
      animation: {
        'slide-in': 'slideIn 0.2s ease',
        'fade-in': 'fadeIn 0.15s ease',
        'slide-up': 'slideUp 0.3s ease',
        'sparkle': 'sparkle 3s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateX(-50%) translateY(1rem)' },
          to: { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}