import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { joinUrl } from "@/lib/url";
import { seoDefaults } from "@/seo/config";

export const buildOpenGraph = ({
  title,
  description,
  canonical,
  imagePath,
}: {
  title: string;
  description: string;
  canonical: string;
  imagePath?: string;
}): NonNullable<Metadata["openGraph"]> => ({
  title,
  description,
  url: canonical,
  siteName: seoDefaults.siteName,
  type: "website",
  locale: seoDefaults.locale,
  images: [
    {
      url: joinUrl(siteConfig.siteUrl, imagePath ?? seoDefaults.defaultImagePath),
      width: 1200,
      height: 630,
      alt: seoDefaults.defaultImageAlt,
    },
  ],
});
