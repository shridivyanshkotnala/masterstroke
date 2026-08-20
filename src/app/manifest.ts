import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Kotnala",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicons/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
