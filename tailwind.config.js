module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        zoomIn: 'zoomIn 250ms',
      },
      colors: {
        green: '#C8FC03',
        black: '#070911',
        'black-light': '#111827',
        'black-50': 'rgba(0, 0, 0, 0.50)',
        'black-75': 'rgba(0, 0, 0, 0.75)',
        'black-70': 'rgba(0, 0, 0, 0.70)',
        gray: '#9CA3AF',
        'gray-light': '#F9FAFB',
        'gray-lighter': '#F3F4F6',
        'gray-dark': '#1F2937',
      },
      transitionDuration: {
        250: '250ms',
      },
      backgroundImage: {
        error: "url('/img/bgError.png')",
      },
    },
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1180px',
    },
    container: {
      center: true,
    },
  },
};
