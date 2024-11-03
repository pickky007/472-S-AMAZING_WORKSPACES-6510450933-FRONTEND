import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#448386',
        secondary: '#9ABCA9',
        accent: '#384638',
        background: '#F9F6F2',
        foreground: '#323232',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    enableHas: true,
  },
  plugins: [
    tailwindScrollbar,
  ],
};

