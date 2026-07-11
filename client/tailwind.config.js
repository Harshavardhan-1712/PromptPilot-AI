/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          hover: '#6366F1',
          dim: '#3730A3',
        },
        accent: {
          DEFAULT: '#22C55E',
          hover: '#4ADE80',
        },
        bg: {
          DEFAULT: '#0F172A',
          raised: '#141E33',
        },
        card: {
          DEFAULT: '#1E293B',
          border: '#2A3A54',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(79, 70, 229, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(79, 70, 229, 0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.35s ease-out',
        blink: 'blink 1s step-start infinite',
        pulseGlow: 'pulseGlow 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
