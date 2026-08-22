/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F6F5F1',
          soft: '#EFEEE8',
          dark: '#E7E5DD',
        },
        ink: {
          DEFAULT: '#16181D',
          soft: '#4A4E58',
          faint: '#8A8E99',
        },
        night: {
          DEFAULT: '#0F1115',
          panel: '#181B22',
          soft: '#22262F',
          border: '#2C3038',
        },
        signal: {
          50: '#EEF1FF',
          100: '#DCE2FF',
          300: '#93A4FF',
          400: '#5D74FF',
          500: '#3454D1',
          600: '#2A44AA',
          700: '#213585',
        },
        coral: {
          400: '#E8735A',
          500: '#C4432B',
          600: '#A3341F',
        },
        moss: {
          400: '#8AA05C',
          500: '#6B7A4F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(22,24,29,0.04), 0 8px 24px -12px rgba(22,24,29,0.12)',
        'card-hover': '0 2px 6px rgba(22,24,29,0.06), 0 16px 36px -14px rgba(22,24,29,0.20)',
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(22,24,29,0.06) 1px, transparent 0)",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease both',
        'pop': 'pop 0.35s ease',
      },
    },
  },
  plugins: [],
}
