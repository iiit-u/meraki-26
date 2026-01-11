/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5B21B6", // deep purple
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        accent: {
          DEFAULT: "#06B6D4", // cyan
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        dark: {
          50: "#050505", // Body background
          DEFAULT: "#0A0A0A", // Main background (merged 080808/0c0c0c)
          100: "#1A1A1A", // Card background
          200: "#2A2A2A", // Interactive/Hover
          300: "#3A3A3A", // Borders
          400: "#4A4A4A", // Secondary backgrounds
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        minecraft: ['"Press Start 2P"', 'cursive'],
        terminal: ['"VT323"', 'monospace'],
        pixel: ['"Silkscreen"', 'cursive'],
        playball: ['"Playball"', 'cursive'],
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
