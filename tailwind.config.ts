import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,css}"],
  // Hover solo en dispositivos que lo soportan: evita estados "pegados" al tocar.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1024",
          deep: "#070B18",
          panel: "#0C1328",
          band: "#0F1A3A",
          cta: "#0E1834",
        },
        surface: { DEFAULT: "rgba(255,255,255,0.045)", strong: "rgba(255,255,255,0.07)" },
        line: { DEFAULT: "rgba(255,255,255,0.10)", strong: "rgba(255,255,255,0.18)" },
        ink: { DEFAULT: "#FFFFFF", 2: "#AEB8CF", muted: "#8C98B3", soft: "#D3DAEA" },
        accent: {
          DEFAULT: "#8FB4FF",
          cyan: "#35E0FF",
        },
        alert: "#FF6B78",
        warn: "#FFC35D",
        live: "#7FF0C8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: { content: "1240px" },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "28px",
        card: "22px",
        band: "32px",
      },
      letterSpacing: {
        eyebrow: "0.14em",
        display: "-0.04em",
        tightish: "-0.02em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      boxShadow: {
        panel: "0 60px 120px -30px rgba(0,0,0,0.75), 0 0 80px -20px rgba(79,134,230,0.35)",
        "btn-glow": "0 10px 30px -12px rgba(143,180,255,0.6)",
        "btn-glow-hover": "0 14px 38px -10px rgba(143,180,255,0.85)",
        toast: "0 20px 40px -12px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-48":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "fact-text": "linear-gradient(180deg, #FFFFFF, #AFC6FF)",
      },
      backgroundSize: { "cell-48": "48px 48px" },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "pulse-live": "pulseDot 1.2s ease-in-out infinite",
        beam: "beam 2.2s cubic-bezier(0.23, 1, 0.32, 1) 2 forwards",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
        // El destello recorre la línea con transform (no con `left`).
        beam: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(530%)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
