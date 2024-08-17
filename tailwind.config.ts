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
      backgroundColor: {
        header: "var(--background-header-color)",
        main: "var(--background-main-color)",
        footer: "var(--background-footer-color)",
        "dark-header": "var(--dark-background-header-color)",
        "dark-main": "var(--dark-background-main-color)",
        "dark-footer": "var(--dark-background-footer-color)",
      },
      maxWidth: {
        webpage: "var(--webpage-max-width)",
      },
    },
  },
  plugins: [],
};
export default config;
