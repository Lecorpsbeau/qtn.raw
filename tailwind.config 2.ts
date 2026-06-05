import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ─── Brand Colors ─── */
      colors: {
        raw: {
          teal:    "#3ecfcf",
          pink:    "#e879a0",
          green:   "#5aad3f",
          yellow:  "#f5c842",
          blue:    "#5ab4e0",
          lavender:"#b39ddb",
          gold:    "#f5c842",
          "gold-light": "#fde68a",
        },
      },

      /* ─── Brand Fonts ─── */
      fontFamily: {
        logo:   ["var(--font-dela)", "sans-serif"],
        serif:  ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-dancing)", "cursive"],
        sans:   ["var(--font-dm)", "system-ui", "sans-serif"],
      },

      /* ─── Border Radius ─── */
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      /* ─── Keyframes & Animations ─── */
      keyframes: {
        /* Mesh gradient drift */
        meshDrift: {
          "0%":   { backgroundPosition: "0% 50%",   filter: "hue-rotate(0deg) saturate(1.1)" },
          "50%":  { backgroundPosition: "100% 50%", filter: "hue-rotate(8deg)  saturate(1.2)" },
          "100%": { backgroundPosition: "0% 50%",   filter: "hue-rotate(-5deg) saturate(1.1)" },
        },
        /* Scroll indicator line */
        scrollLine: {
          "0%":   { opacity: "0", transform: "scaleY(0)", transformOrigin: "top"    },
          "50%":  { opacity: "1", transform: "scaleY(1)", transformOrigin: "top"    },
          "100%": { opacity: "0", transform: "scaleY(1)", transformOrigin: "bottom" },
        },
        /* Subtle float for hero logo */
        float: {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":      { transform: "translateY(-8px)" },
        },
        /* Fade up */
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        /* SVG stroke draw */
        strokeDraw: {
          "0%":   { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },

      animation: {
        "mesh-drift":  "meshDrift 18s ease-in-out infinite",
        "scroll-line": "scrollLine 1.8s ease-in-out infinite",
        "float":       "float 5s ease-in-out infinite",
        "fade-up":     "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "stroke-draw": "strokeDraw 1.4s cubic-bezier(0.16,1,0.3,1) forwards",
      },

      /* ─── Box Shadows ─── */
      boxShadow: {
        "card":        "0 4px 24px rgba(0,0,0,0.30)",
        "card-hover":  "0 16px 48px rgba(0,0,0,0.45)",
        "glass":       "0 8px 32px rgba(0,0,0,0.20)",
      },

      /* ─── Backdrop Blur ─── */
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
