import { companyConfig } from "@/config/company.config";
import { seoConfig } from "@/config/seo.config";
import { siteConfig } from "@/config/site.config";

export const seoDefaults = {
  metadataBase: new URL(siteConfig.siteUrl),
  siteName: siteConfig.name,
  titleTemplate: seoConfig.titleTemplate,
  defaultTitle: seoConfig.defaultTitle,
  defaultDescription: seoConfig.defaultDescription,
  twitterHandle: seoConfig.twitterHandle,
  locale: seoConfig.locale,
  category: seoConfig.category,
  publisher: companyConfig.name,
  defaultImagePath: "/opengraph-image",
  defaultImageAlt: `${siteConfig.name} preview image`,
  robots: seoConfig.robots,
} as const;
