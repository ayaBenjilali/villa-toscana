import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bordeaux: {
          DEFAULT: "#5C1A28",
          deep: "#2E0D14",
          light: "#7A2D3B",
          muted: "#8C4556",
          glow: "rgba(122, 45, 59, 0.15)",
        },
        cream: {
          DEFAULT: "#FAF7F2",
          warm: "#F0EBE1",
          dark: "#E5DFD3",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#DBBF6E",
          dark: "#A88A36",
          muted: "rgba(201, 168, 76, 0.15)",
        },
        charcoal: "#1A1A1A",
        smoke: "#3A3530",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        luxury: "0 20px 60px rgba(46, 13, 20, 0.18), 0 8px 24px rgba(46, 13, 20, 0.08)",
        "luxury-lg": "0 32px 100px rgba(46, 13, 20, 0.25)",
        soft: "0 2px 16px rgba(28, 28, 28, 0.05)",
        gold: "0 12px 40px rgba(201, 168, 76, 0.10)",
        "gold-glow": "0 0 40px rgba(201, 168, 76, 0.12)",
        "inner-gold": "inset 0 1px 0 rgba(201, 168, 76, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
