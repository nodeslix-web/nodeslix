/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        nodeslix: {
          primary: '#0A0A0A',
          accent: '#00D4FF',
          secondary: '#121212',
          card: '#151515',
          border: '#262626',
          text: '#FFFFFF',
          muted: '#B3B3B3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
