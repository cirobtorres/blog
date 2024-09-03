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
      screens: {
        tablet: "900px",
        smartphone: "700px",
      },
      aria: {
        current: "current=page",
      },
      backgroundImage: {
        "profile-image-border-1":
          "conic-gradient(from var(--angle), #ff4545, #00ff99, #006aff, #ff0095, #ff4545)",
        "profile-image-border-2":
          "conic-gradient(from var(--angle), transparent, var(--base-green), var(--base-green))",
      },
      colors: {
        "base-100": "var(--base-100)",
        "base-150": "var(--base-150)",
        "base-200": "var(--base-200)",
        "base-200/90": "rgba(239, 234, 230, 0.8)",
        "base-300": "var(--base-300)",
        "dark-base-100": "var(--dark-base-100)",
        "dark-base-150": "var(--dark-base-150)",
        "dark-base-200": "var(--dark-base-200)",
        "dark-base-300": "var(--dark-base-300)",
        "dark-base-300/90": "rgba(10, 10, 10, 0.8)",
        "base-neutral": "var(--base-neutral)",
        "base-neutral-hover": "var(--base-neutral-hover)",
        "dark-base-neutral": "var(--dark-base-neutral)",
        "dark-base-neutral-hover": "var(--dark-base-neutral-hover)",
        "base-placeholder": "#a6adbb",
        "dark-base-placeholder": "#585c66",
        // border
        "base-border": "var(--base-border)",
        "dark-base-border": "var(--dark-base-border)",
        // green
        "base-green": "var(--base-green)",
        "base-green-hover": "var(--base-green-hover)",
        "dark-base-green": "var(--dark-base-green)",
        "dark-base-green-hover": "var(--dark-base-green-hover)",
        // blue
        "base-blue": "var(--base-blue)",
        "base-blue-hover": "var(--base-blue-hover)",
        "dark-base-blue": "var(--dark-base-blue)",
        "dark-base-blue-hover": "var(--dark-base-blue-hover)",
        // yellow
        "base-yellow": "var(--base-yellow)",
        "dark-base-yellow": "var(--dark-base-yellow)",
        // red
        "base-red": "var(--base-red)",
        "dark-base-red": "var(--dark-base-red)",
        // pink
        "base-pink": "var(--base-pink)",
        "dark-base-pink": "var(--dark-base-pink)",
        // purple
        "base-purple": "var(--base-purple)",
        "dark-base-purple": "var(--dark-base-purple)",
      },
      maxWidth: {
        webpage: "var(--webpage-max-width)",
      },
      gridTemplateColumns: {
        header: "100px repeat(3, 110px) repeat(2, max-content)",
      },
      animation: {
        header: "header-entrance 1s ease-in-out forwards",
        body: "body-entrance 1s ease-in-out forwards",
        "article-hero": "article-hero-entrance 1s ease-in-out forwards",
        "jump-link-tracker":
          "jump-link-tracker-entrance 1s ease-in-out forwards",
        "article-body": "article-body-entrance 1s ease-in-out forwards",
        rotate: "rotate 1s linear infinite",
        prixClipFix: "prixClipFix 2s linear infinite",
        "skeleton-admin-pannel":
          "skeleton-loading 1s linear infinite alternate",
        "back-to-top-button": "bounce-back-to-top-button 1s infinite",
        "border-spin": "profile-border-spin 3s linear infinite",
      },
      keyframes: {
        "header-entrance": { "100%": { transform: "translateY(0%)" } },
        "body-entrance": {
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        "article-hero-entrance": {
          "100%": { transform: "translateX(0%)", opacity: "1" },
        },
        "jump-link-tracker-entrance": {
          "100%": { transform: "translateX(0%)", opacity: "1" },
        },
        "article-body-entrance": {
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-back-to-top-button": {
          "0%, 100%": {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -65%)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
          "50%": {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -35%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
        },
        prixClipFix: {
          "0%": {
            "clip-path": "polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)",
          },
          "25%": {
            "clip-path":
              "polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)",
          },
          "50%": {
            "clip-path":
              "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)",
          },
          "75%": {
            "clip-path":
              "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)",
          },
          "100%": {
            "clip-path":
              "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)",
          },
        },
        "skeleton-loading": {
          "0%": { backgroundColor: "hsl(200, 20%, 70%)" },
          "100%": { backgroundColor: "hsl(200, 20%, 95%)" },
        },
        "profile-border-spin": {
          from: {
            "--angle": "0deg",
          },
          to: {
            "--angle": "360deg",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
