import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 40s linear infinite",
        marquee2: "marquee2 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        archivo: ["var(--font-archivo)"],
      },
      fontSize: {
        display: [
          "clamp(2.75rem, 6vw, 10rem)",
          {
            lineHeight: "85%",
            fontWeight: "800",
          },
        ],
        h1: "3.5rem",
        h2: "3rem",
        h3: "2.5rem",
        h4: [
          "2rem",
          {
            fontWeight: "800",
            letterSpacing: "-0.1rem",
          },
        ],
        h5: [
          "1.5rem",
          {
            fontWeight: "700",
            letterSpacing: "-0.05rem",
          },
        ],
        h6: "1.25rem",
        base: [
          "1.125rem",
          {
            fontWeight: "400",
            lineHeight: "120%",
          },
        ],
        sm: "1rem",
        xs: "0.875rem",
        xxs: "0.75rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
