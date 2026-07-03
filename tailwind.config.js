/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soc: {
          bg:       'rgb(var(--color-bg) / <alpha-value>)',
          surface:  'rgb(var(--color-surface) / <alpha-value>)',
          elevated: 'rgb(var(--color-elevated) / <alpha-value>)',
          border:   'rgb(var(--color-border) / <alpha-value>)',
          primary:  'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary:'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted:    'rgb(var(--color-text-muted) / <alpha-value>)',
          inverse:  'rgb(var(--color-text-inverse) / <alpha-value>)',
        },
        accent: {
          green:  '#00FF88',
          blue:   '#3B82F6',
          cyan:   '#22D3EE',
          amber:  '#F59E0B',
          red:    '#EF4444',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'radar': 'radar 4s linear infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'border-rotate': 'border-rotate 4s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 5px rgba(0,255,136,0.2)' },
          '50%':      { opacity: '1',   boxShadow: '0 0 20px rgba(0,255,136,0.4)' },
        },
        radar: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'border-rotate': {
          '0%':   { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
        typing: {
          'from': { width: '0' },
          'to':   { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%':      { borderColor: '#00FF88' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, #1E3A5F 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}