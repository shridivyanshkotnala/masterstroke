import { companyConfig } from "@/config/company.config";
import type { Locale } from "@/types/config";

export const siteConfig = {
  name: companyConfig.name,
  description:
    "Kotnala Consultancy builds resilient, high-performance digital platforms for growth-stage and enterprise teams.",
  defaultLocale: "en" as Locale,
  locales: ["en"] as const,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kotnalaconsulting.com",
  ogImage: "/opengraph-image",
  twitterImage: "/twitter-image",
  isIndexable: true,
} as const;
