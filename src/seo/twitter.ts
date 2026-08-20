import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { joinUrl } from "@/lib/url";
import { seoDefaults } from "@/seo/config";

export const buildTwitter = ({
  title,
  description,
  imagePath,
}: {
  title: string;
  description: string;
  imagePath?: string;
}): NonNullable<Metadata["twitter"]> => ({
  card: "summary_large_image",
  title,
  description,
  creator: seoDefaults.twitterHandle,
  images: [joinUrl(siteConfig.siteUrl, imagePath ?? seoDefaults.defaultImagePath)],
});
