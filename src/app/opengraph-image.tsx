import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "N-AI — Data · Insights · AI";
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
          background: "#07090C",
          color: "#F5F7FA",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(94,233,240,0.25) 0%, rgba(94,233,240,0) 60%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            right: -200,
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle, rgba(124,245,196,0.18) 0%, rgba(124,245,196,0) 60%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid rgba(94,233,240,0.4)",
              background: "rgba(94,233,240,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                background: "#7CF5C4",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            N-AI
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#A6ADBB",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            · Nancy Artificial Intelligence
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontWeight: 500,
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Transforming Complex Data Ecosystems Into&nbsp;</span>
            <span
              style={{
                background:
                  "linear-gradient(90deg, #5EE9F0 0%, #7CF5C4 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Intelligent
            </span>
            <span>&nbsp;Systems.</span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#A6ADBB",
              maxWidth: 880,
              display: "flex",
            }}
          >
            AI-powered analytics, anomaly detection, data intelligence and strategic
            consulting.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#A6ADBB",
          }}
        >
          <div style={{ display: "flex" }}>n-ai.dev</div>
          <div style={{ display: "flex" }}>Data · Insights · AI</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
