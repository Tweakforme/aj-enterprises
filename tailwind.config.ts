import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#00F0FF", // Electric cyan - dark mode
          dark: "#00C5D1",
          light: "#006B7D", // Deep ocean teal - light mode
        },
        accent: {
          DEFAULT: "#FFE500", // Vibrant yellow - dark mode
          dark: "#FFD700",
          light: "#FF6B35", // Coral orange - light mode
        },
        dark: {
          100: "#0A0A0A",
          200: "#121212",
          300: "#1A1A1A",
          400: "#242424",
        },
        light: {
          100: "#F8FAFB", // Soft blue-tinted white
          200: "#EDF2F7", // Light blue-gray
          300: "#E2E8F0", // Cool gray
          400: "#CBD5E0", // Medium gray
        },
        ocean: {
          50: "#E6F7F9",
          100: "#B3E5EC",
          200: "#80D3DF",
          300: "#4DC1D2",
          400: "#1AAFC5",
          500: "#006B7D", // Primary ocean
          600: "#005563",
          700: "#003F4A",
          800: "#002A31",
          900: "#001418",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-display)"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 10vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "slide-down": "slide-down 0.8s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;