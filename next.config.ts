import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const buildCspHeader = (): string => {
  const scriptSrc = ["'self'", "'unsafe-inline'", "https:"];
  const styleSrc = ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"];
  const fontSrc = ["'self'", "data:", "https://fonts.gstatic.com"];
  const connectSrc = ["'self'", "https:", "http:"];

  if (isDev) {
    scriptSrc.push("'unsafe-eval'");
    connectSrc.push("ws:", "wss:");
  }

  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    `style-src ${styleSrc.join(" ")}`,
    "img-src 'self' data: blob: https:",
    `font-src ${fontSrc.join(" ")}`,
    `connect-src ${connectSrc.join(" ")}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: buildCspHeader(),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
