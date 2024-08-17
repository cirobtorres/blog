import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "base-100": "#faf7f5",
        "base-200": "#efeae6",
        "base-300": "#e7d6d1",
        "dark-base-100": "#2a303c",
        "dark-base-200": "#232731",
        "dark-base-300": "#1d2129",
        neutral: "#291334",
        "dark-neutral": "#a6adbb",
        placeholder: "#a6adbb",
        "dark-placeholder": "#585c66",
        // green
        "base-green": "#2ec78f",
        "base-green-hover": "#5bebb6",
        "dark-base-green": "#40b88c",
        "dark-base-green-hover": "#51bb94",
        // blue
        "base-blue": "#3abff8",
        "base-blue-hover": "#15b7fd",
        "dark-base-blue": "#3abff8",
        "dark-base-blue-hover": "#15b7fd",
        // yellow
        "base-yellow": "#eeaf3a",
        "dark-base-yellow": "#fbbf24",
        // red
        "base-red": "#f87272",
        "dark-base-red": "#f87272",
        // pink
        "base-pink": "#ef9fbc",
        "dark-base-pink": "#d926a9",
        // purple
        "base-purple": "#8560c5",
        "dark-base-purple": "#661ae6",
      },
      maxWidth: {
        webpage: "var(--webpage-max-width)",
      },
    },
  },
  plugins: [],
};
export default config;
