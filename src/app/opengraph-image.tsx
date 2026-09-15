import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "N-AI · Consultoría experta en IA, automatización y analítica avanzada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(180deg, #0A1024 0%, #070B18 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 820,
            height: 620,
            display: "flex",
            background: "radial-gradient(circle, rgba(26,44,94,0.95) 0%, rgba(26,44,94,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#FFFFFF",
              color: "#0A1024",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800 }}>N-AI</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 74,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              fontWeight: 800,
              maxWidth: 1040,
            }}
          >
            <span>Consultoría experta en IA, automatización y&nbsp;</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #8FB4FF, #35E0FF)",
                backgroundClip: "text",
                color: "transparent",
                fontStyle: "italic",
              }}
            >
              analítica avanzada.
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#AEB8CF" }}>
            +400% créditos colocados · &gt;2.4M registros analizados · 47 patrones de anomalía
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#8C98B3" }}>
          <div style={{ display: "flex" }}>n-ai.dev</div>
          <div style={{ display: "flex" }}>Costa Rica y Latinoamérica</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
