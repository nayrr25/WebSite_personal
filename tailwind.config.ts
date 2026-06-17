import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        // OPCIÓN C · tema claro. Mismos nombres que antes; valores nuevos.
        bg: {
          base: "#F3F5F9",
          elevated: "#FFFFFF",
          glass: "rgba(30,39,53,0.04)",
        },
        border: {
          subtle: "rgba(30,39,53,0.10)",
          strong: "rgba(30,39,53,0.16)",
        },
        text: {
          primary: "#1E2735",
          secondary: "#586172",
          muted: "#828BA0",
        },
        accent: {
          cyan: "#2F62C8", // azul navy (acento primario)
          mint: "#4F86E6", // azul claro (degradados)
          deep: "#1E3360", // navy profundo (CTA sólido / cabeceras)
        },
        danger: "#DC4C4C",
      },
      fontFamily: {
        // body / UI general
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // titulares (Archivo) — usado por las utilidades .text-display-*/.text-h*
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        // acento itálico ocasional
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
        display: "-0.03em",
        tightish: "-0.02em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        // sombras azules suaves (en claro queremos elevación real + halo de marca)
        glow: "0 0 0 1px rgba(47,98,200,0.18), 0 12px 34px -16px rgba(47,98,200,0.40)",
        "glow-mint": "0 0 0 1px rgba(79,134,230,0.18), 0 12px 34px -16px rgba(79,134,230,0.38)",
        card: "0 1px 2px rgba(30,39,53,0.04), 0 18px 44px -26px rgba(30,39,53,0.28)",
      },
      backgroundImage: {
        // líneas de grilla oscuras sobre claro
        "grid-faint":
          "linear-gradient(to right, rgba(30,39,53,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,39,53,0.05) 1px, transparent 1px)",
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
