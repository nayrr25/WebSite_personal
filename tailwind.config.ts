import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#07090C",
          elevated: "#0C1014",
          glass: "rgba(255,255,255,0.04)",
        },
        border: {
          subtle: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
        },
        text: {
          primary: "#F5F7FA",
          secondary: "#A6ADBB",
          muted: "#6B7280",
        },
        accent: {
          cyan: "#5EE9F0",
          mint: "#7CF5C4",
          deep: "#0B1F3A",
        },
        danger: "#FF6B6B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "28px",
      },
      letterSpacing: {
        eyebrow: "0.18em",
        display: "-0.04em",
        tightish: "-0.03em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(94,233,240,0.15), 0 0 40px -10px rgba(94,233,240,0.45)",
        "glow-mint": "0 0 0 1px rgba(124,245,196,0.15), 0 0 40px -10px rgba(124,245,196,0.4)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      animation: {
        "marquee-slow": "marquee 38s linear infinite",
        "scroll-pulse": "scrollPulse 2.4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "aurora-drift": "auroraDrift 18s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollPulse: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        auroraDrift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%,-1%,0) scale(1.05)" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
