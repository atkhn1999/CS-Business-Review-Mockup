/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        'ink-2': '#334155',
        'ink-3': '#64748b',
        responsive: {
          teal: '#14b8a6',
          'teal-dark': '#0d9488',
          'teal-light': '#5eead4',
        },
        light: {
          bg: '#fafafa',
        },
        card: {
          bg: '#ffffff',
        },
        border: {
          DEFAULT: '#e5e7eb',
        },
        text: {
          primary: '#111827',
          secondary: '#6b7280',
          tertiary: '#9ca3af',
        },
        accent: {
          purple: '#8b5cf6',
          blue: '#3b82f6',
          indigo: '#6366f1',
          pink: '#ec4899',
          orange: '#f97316',
        },
      },
      boxShadow: {
        smx: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        brand: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
        brandMd: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        brandLg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        brandXl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)',
        'success-gradient': 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
        'danger-gradient': 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
        'warning-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'info-gradient': 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      }
    },
  },
  plugins: [],
}

