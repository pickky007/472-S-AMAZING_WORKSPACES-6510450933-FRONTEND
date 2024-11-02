/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}",];
export const theme = {
  extend: {
    colors: {
      primary: '#448386', // Primary Color
      secondary: '#9ABCA9', // Secondary Color
      accent: '#384638', // Accent Color
      background: '#F9F6F2', // Background Color
      foreground: '#323232', // Foreground Color
    },
  },
};
export const future = {
  hoverOnlyWhenSupported: true,
  respectDefaultRingColorOpacity: true,
  disableColorOpacityUtilitiesByDefault: true,
  enableHas: true,
};
export const plugins = [];
