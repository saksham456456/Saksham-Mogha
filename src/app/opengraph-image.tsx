import { ImageResponse } from "next/og";
import { site } from "../../content/site";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#090d16",
          backgroundImage: "radial-gradient(circle at 25px 25px, rgba(99, 102, 241, 0.15) 2%, transparent 0%)",
          backgroundSize: "50px 50px",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              color: "#a5b4fc",
              fontSize: "20px",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            SAKSHAM.DEV
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#10b981",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            ● VERIFIED DEVELOPER
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: "30px",
              color: "#94a3b8",
              lineHeight: 1.3,
              maxWidth: "900px",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1e293b",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#64748b",
            fontFamily: "monospace",
          }}
        >
          <div>Full-Stack · Android · On-Device ML</div>
          <div>github.com/saksham456456</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
