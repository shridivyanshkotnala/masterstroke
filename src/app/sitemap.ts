import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site.config";
import { getAllServices } from "@/content/services";
import { getAllIndustries } from "@/content/industries";
import { getAllSolutions } from "@/content/solutions";
import { joinUrl } from "@/lib/url";

const contentPrefixes = [
  "/services",
  "/blog",
  "/industries",
  "/solutions",
  "/case-studies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const allServices = getAllServices();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const plannedContentIndexes: MetadataRoute.Sitemap = contentPrefixes.map((prefix) => ({
    url: joinUrl(siteConfig.siteUrl, prefix),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = allServices.map((service) => ({
    url: joinUrl(siteConfig.siteUrl, `/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.78,
  }));

  const industriesRoutes: MetadataRoute.Sitemap = getAllIndustries().map((item) => ({
    url: joinUrl(siteConfig.siteUrl, `/industries/${item.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.78,
  }));

  const solutionsRoutes: MetadataRoute.Sitemap = getAllSolutions().map((item) => ({
    url: joinUrl(siteConfig.siteUrl, `/solutions/${item.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.78,
  }));

  return [...staticRoutes, ...plannedContentIndexes, ...serviceRoutes, ...industriesRoutes, ...solutionsRoutes];
}
