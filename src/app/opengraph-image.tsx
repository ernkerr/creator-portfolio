import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F2EEE1",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#001AFF",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          PORTFOLIO
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#001AFF",
              fontSize: 180,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              color: "#001AFF",
              fontSize: 40,
              marginTop: 24,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#2E2E2E",
            fontSize: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>{site.email}</div>
          <div style={{ display: "flex" }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
