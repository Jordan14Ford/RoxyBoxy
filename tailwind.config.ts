import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cash-app-green': '#00D632',
        'warning-amber': '#FFB800',
        'dark-bg': '#1C1C1E',
        'light-bg': '#F2F2F7',
        'text-primary': '#000000',
        'text-secondary': '#6B6B6B',
      },
      fontFamily: {
        heading: ['SF Pro Display', '-apple-system', 'sans-serif'],
        body: ['SF Pro Text', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        h1: '24px',
        h2: '20px',
        body: '16px',
        small: '14px',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
      },
      borderRadius: {
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
