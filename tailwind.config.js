/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary))',
        secondary: 'rgb(var(--secondary))',
        accent: 'rgb(var(--accent))',
        success: 'rgb(var(--success))',
        warning: 'rgb(var(--warning))',
        error: 'rgb(var(--error))',
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        card: 'rgb(var(--card))',
        'card-foreground': 'rgb(var(--card-foreground))',
        muted: 'rgb(var(--muted))',
        'muted-foreground': 'rgb(var(--muted-foreground))',
        border: 'rgb(var(--border))',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};