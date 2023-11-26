/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        LatoLight: 'Lato-Light ',
        Lato: "'Lato', sans-serif",
      },
      ringColor: {
        'blue-500': '#3b82f6',
      },
    },
    colors: {
      azul: 'hsl(191, 89%, 31%)',
      white: '#ffffff',
      'blue-500': 'rgb(59 130 246)',
      verde: '#7DCBB6',
      gris: '#636363',
    },
  },
  plugins: [],
}
