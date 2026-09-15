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
          // Alias heredados: se eliminan en la Tarea 11.
          mint: "#35E0FF",
          deep: "#1A2C5E",
        },
        alert: "#FF6B78",
        warn: "#FFC35D",
        live: "#7FF0C8",
        // ---- Alias heredados: se eliminan en la Tarea 11 ----
        bg: {
          base: "#0A1024",
          elevated: "rgba(255,255,255,0.045)",
          glass: "rgba(255,255,255,0.045)",
        },
        border: { subtle: "rgba(255,255,255,0.10)", strong: "rgba(255,255,255,0.18)" },
        text: { primary: "#FFFFFF", secondary: "#AEB8CF", muted: "#8C98B3" },
        danger: "#FF6B78",
        "accent-teal": "#35E0FF",
        "accent-emerald": "#7FF0C8",
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
        // Alias heredado: se elimina en la Tarea 11.
        smooth: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      boxShadow: {
        panel: "0 60px 120px -30px rgba(0,0,0,0.75), 0 0 80px -20px rgba(79,134,230,0.35)",
        "btn-glow": "0 10px 30px -12px rgba(143,180,255,0.6)",
        "btn-glow-hover": "0 14px 38px -10px rgba(143,180,255,0.85)",
        toast: "0 20px 40px -12px rgba(0,0,0,0.6)",
        // Alias heredados: se eliminan en la Tarea 11.
        glow: "0 0 0 1px rgba(143,180,255,0.25), 0 12px 34px -16px rgba(143,180,255,0.5)",
        card: "0 18px 44px -26px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-48":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "fact-text": "linear-gradient(180deg, #FFFFFF, #AFC6FF)",
        // Alias heredado: se elimina en la Tarea 11.
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: { "cell-48": "48px 48px" },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "pulse-live": "pulseDot 1.2s ease-in-out infinite",
        beam: "beam 2.2s cubic-bezier(0.23, 1, 0.32, 1) 2 forwards",
        // Alias heredados: se eliminan en la Tarea 11.
        "marquee-slow": "marquee 38s linear infinite",
        "scroll-pulse": "scrollPulse 2.4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "aurora-drift": "auroraDrift 18s ease-in-out infinite",
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
      },
    },
  },
  plugins: [],
};

export default config;
