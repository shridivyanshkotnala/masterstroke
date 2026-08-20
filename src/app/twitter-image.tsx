import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Kotnala Consultancy";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(120deg, #f8fafc 0%, #cbd5e1 100%)",
          color: "#0f172a",
          fontSize: 60,
          fontWeight: 700,
          letterSpacing: "-0.03em",
        }}
      >
        Kotnala Consultancy
      </div>
    ),
    size,
  );
}
